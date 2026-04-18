import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Report } from "../types";
import { formatDate, cn } from "../lib/utils";
import { ShieldAlert, CheckCircle2, Eye, Clock, MapPin, BellRing, User } from "lucide-react";
import { ReportDetailsModal } from "./ReportDetails";

interface ReportListProps {
  filter?: {
    zone?: string;
    woreda?: string;
    createdBy?: string;
  };
}

export const ReportList: React.FC<ReportListProps> = ({ filter }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [lastCount, setLastCount] = useState(0);

  useEffect(() => {
    let q = query(collection(db, "reports"), orderBy("createdAt", "desc"));

    if (filter?.zone) q = query(q, where("zone", "==", filter.zone));
    if (filter?.woreda) q = query(q, where("woreda", "==", filter.woreda));
    if (filter?.createdBy) q = query(q, where("createdBy", "==", filter.createdBy));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);

      // Simple notification for new reports
      if (docs.length > lastCount && lastCount > 0) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("አዲስ ሪፖርት ደርሷል!", { body: `${docs[0].woreda} ወረዳ አዲስ ሪፖርት ልኳል::` });
        }
      }
      setLastCount(docs.length);
    });

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    return () => unsubscribe();
  }, [filter, lastCount]);

  const handleViewDetails = async (report: Report) => {
    setSelectedReport(report);
    if (report.status === "new") {
      try {
        await updateDoc(doc(db, "reports", report.id), { status: "viewed" });
      } catch (err) {
        console.error("Error updating status:", err);
      }
    }
  };

  if (loading) return <div className="text-center py-12 text-neutral-500">በመጫን ላይ...</div>;

  return (
    <div className="space-y-1">
      {reports.length === 0 ? (
        <div className="text-center py-12 glass-card bg-white/5 text-neutral-500">
          ምንም አይነት ሪፖርት አልተገኘም::
        </div>
      ) : (
        <div className="report-table-section glass-card overflow-x-auto no-scrollbar">
          <div className="min-w-[700px] md:min-w-0">
            <div className="hidden md:grid grid-cols-[120px_140px_140px_1fr_120px_100px] table-header-custom">
            <span>ሰዓት (Time)</span>
            <span>ዞን (Zone)</span>
            <span>ወረዳ (Woreda)</span>
            <span>ሁኔታ (Status)</span>
            <span>ሪፖርት (Badge)</span>
            <span>ተግባር (Action)</span>
          </div>
          <div className="grid grid-cols-1 gap-px">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => handleViewDetails(report)}
                className="data-row-custom p-3 md:p-0 md:grid md:grid-cols-[120px_140px_140px_1fr_120px_100px] items-center text-sm cursor-pointer"
              >
                <span className="hidden md:flex px-4 py-3 text-xs text-neutral-400">
                   {formatDate(report.createdAt).split(", ")[1]}
                </span>
                <span className="hidden md:flex px-4 py-3 font-medium text-text-light">{report.zone}</span>
                <span className="hidden md:flex px-4 py-3 font-medium text-text-light">{report.woreda}</span>
                <div className="px-1 md:px-4 py-2 md:py-3 flex flex-col md:flex-row md:items-center gap-2 overflow-hidden">
                   <div className="md:hidden flex justify-between items-center mb-1">
                      <span className="text-[9px] text-neutral-500">{formatDate(report.createdAt)}</span>
                      <span className="text-[10px] text-gold font-bold uppercase tracking-tight">{report.zone} - {report.woreda}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-1.5 rounded-full flex-shrink-0",
                        report.isPeaceful ? "bg-accent-green/10 text-accent-green" : "bg-accent-red/10 text-accent-red"
                      )}>
                        {report.isPeaceful ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                      </div>
                      <span className="truncate font-medium text-text-light">
                        {report.isPeaceful ? "ሰላም ነው (Peaceful)" : report.crimeType}
                      </span>
                   </div>
                </div>
                <div className="px-4 py-3 flex items-center md:justify-center">
                  {report.status === "new" ? (
                    <span className="status-badge-new">አዲስ (NEW)</span>
                  ) : (
                    <span className="status-badge-seen">የታየ (Seen)</span>
                  )}
                </div>
                <div className="hidden md:flex px-4 py-3 items-center justify-center">
                   <span className="text-gold font-bold text-xs uppercase cursor-pointer hover:underline flex items-center gap-1">
                     <Eye className="w-3 h-3" /> ዝርዝር
                   </span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}

      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

