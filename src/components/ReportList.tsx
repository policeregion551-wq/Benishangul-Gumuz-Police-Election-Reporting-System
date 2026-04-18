import React, { useEffect, useState, useRef } from "react";
import { collection, query, onSnapshot, orderBy, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Report } from "../types";
import { formatDate, cn } from "../lib/utils";
import { ShieldAlert, CheckCircle2, Eye, Clock, MapPin, BellRing, User, ChevronRight, ClipboardList } from "lucide-react";
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
  
  // Use a ref for lastCount to avoid re-triggering the effect on every snapshot update
  const lastCountRef = useRef(0);

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
      if (docs.length > lastCountRef.current && lastCountRef.current > 0) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("አዲስ ሪፖርት ደርሷል!", { 
            body: `${docs[0].woreda} ወረዳ አዲስ ሪፖርት ልኳል::`,
            icon: "/favicon.ico" 
          });
        }
      }
      lastCountRef.current = docs.length;
    });

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    return () => unsubscribe();
  }, [filter]); // Removed lastCount from dependencies

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

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      <p className="text-neutral-500 font-medium animate-pulse">መረጃዎችን እያመጣን ነው...</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass-card bg-white/5 border-dashed border-2 border-neutral-800">
          <ClipboardList className="w-16 h-16 text-neutral-800 mb-4" />
          <p className="text-neutral-500 font-medium tracking-wide">ምንም አይነት ሪፖርት አልተገኘም::</p>
        </div>
      ) : (
        <div className="report-table-section glass-card overflow-x-auto no-scrollbar border border-white/5 shadow-2xl">
          <div className="min-w-[800px] md:min-w-0">
            <div className="hidden md:grid grid-cols-[140px_140px_160px_1fr_120px_100px] bg-white/5 border-b border-white/5">
              <span className="px-6 py-4 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">ሰዓት (Time)</span>
              <span>ዞን (Zone)</span>
              <span>ወረዳ (Woreda)</span>
              <span>ሁኔታ (Status)</span>
              <span className="text-center">ሪፖርት (Badge)</span>
              <span className="text-center">ተግባር (Action)</span>
            </div>
            <div className="divide-y divide-white/5">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => handleViewDetails(report)}
                  className="group relative transition-all hover:bg-gold/5 cursor-pointer"
                >
                  <div className="p-4 md:p-0 md:grid md:grid-cols-[140px_140px_160px_1fr_120px_100px] items-center text-sm">
                    {/* Time - Desktop */}
                    <span className="hidden md:flex px-6 py-4 text-xs font-mono text-neutral-400 group-hover:text-gold transition-colors">
                       {formatDate(report.createdAt).split(", ")[1]}
                    </span>
                    
                    {/* Zone - Desktop */}
                    <span className="hidden md:flex px-4 py-4 font-bold text-text-light">{report.zone}</span>
                    
                    {/* Woreda - Desktop */}
                    <span className="hidden md:flex px-4 py-4 font-bold text-text-light">{report.woreda}</span>
                    
                    {/* Status/Content - Mobile & Desktop */}
                    <div className="px-1 md:px-4 py-1 md:py-4 flex flex-col md:flex-row md:items-center gap-3 overflow-hidden">
                       <div className="md:hidden flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                             <Clock className="w-3 h-3 text-neutral-500" />
                             <span className="text-[10px] text-neutral-500 font-mono">{formatDate(report.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gold/10 rounded border border-gold/20">
                             <MapPin className="w-3 h-3 text-gold" />
                             <span className="text-[10px] text-gold font-black uppercase tracking-tight">{report.zone} </span>
                             <span className="text-[10px] text-neutral-500">•</span>
                             <span className="text-[10px] text-gold font-bold">{report.woreda}</span>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                            report.isPeaceful 
                              ? "bg-accent-green/10 text-accent-green border border-accent-green/20" 
                              : "bg-accent-red/10 text-accent-red border border-accent-red/20 shadow-[0_0_15px_-5px_var(--color-accent-red)]"
                          )}>
                            {report.isPeaceful ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5 animate-pulse" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="truncate font-bold text-neutral-200 group-hover:text-white transition-colors">
                              {report.isPeaceful ? "ሰላም ነው (Peaceful)" : report.crimeType}
                            </span>
                            {!report.isPeaceful && (
                              <span className="text-[10px] text-neutral-500 truncate mt-0.5 line-clamp-1">
                                {report.description}
                              </span>
                            )}
                          </div>
                       </div>
                    </div>
                    
                    {/* Badge - Desktop */}
                    <div className="px-4 py-4 flex items-center md:justify-center mt-3 md:mt-0">
                      {report.status === "new" ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-red rounded-full shadow-[0_4px_12px_-2px_rgba(239,51,64,0.4)] animate-in zoom-in duration-300">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                          <span className="text-[10px] font-black text-white tracking-[0.1em] uppercase">አዲስ</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border border-neutral-800 px-3 py-1 rounded-full bg-neutral-900/50">
                          የታየ
                        </span>
                      )}
                    </div>
                    
                    {/* Action - Desktop */}
                    <div className="hidden md:flex px-6 py-4 items-center justify-center">
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 group-hover:text-gold transition-all">
                         <ChevronRight className="w-4 h-4" />
                       </div>
                    </div>
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

