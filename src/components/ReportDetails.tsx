import React, { useRef } from "react";
import { Report } from "../types";
import { X, Printer, Download, MapPin, User, Phone, Calendar, Clock, ShieldAlert, CheckCircle2, FileText, ClipboardList } from "lucide-react";
import { formatDate, cn } from "../lib/utils";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const ReportDetailsModal: React.FC<{ report: Report; onClose: () => void }> = ({ report, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleDownload = async () => {
    if (!printRef.current) return;
    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Report_${report.woreda}_${formatDate(report.createdAt)}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50">
          <h3 className="text-xl font-bold golden-text">የሪፖርት ዝርዝር / Report Details</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => handlePrint()} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-gold" title="Print">
              <Printer className="w-5 h-5" />
            </button>
            <button onClick={handleDownload} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-gold" title="Download PDF">
              <Download className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-eth-red ml-2" title="Close">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8" ref={printRef}>
          <div className="print:p-8 print:bg-white print:text-black">
            <div className="hidden print:flex flex-col items-center mb-8 border-b-2 border-black pb-6">
              <h1 className="text-2xl font-bold text-center">ቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን</h1>
              <h2 className="text-lg uppercase tracking-widest mt-1">Benishangul Gumuz Regional Police Commission</h2>
              <div className="mt-4 flex gap-4 text-sm font-bold">
                <span>ቀን (Date): {formatDate(report.createdAt)}</span>
                <span>ወረዳ (Woreda): {report.woreda}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-3 rounded-full", report.isPeaceful ? "bg-eth-green/20 text-eth-green" : "bg-eth-red/20 text-eth-red")}>
                    {report.isPeaceful ? <CheckCircle2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-tighter">ሁኔታ (Status)</p>
                    <p className="text-lg font-bold">{report.isPeaceful ? "ሰላም ነው (Peaceful)" : "ወንጀል ተከስቷል (Incident Reported)"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold mt-1" />
                    <div>
                      <p className="text-xs text-neutral-500">አድራሻ (Location)</p>
                      <p className="font-medium">{report.zone} - {report.woreda}</p>
                      {!report.isPeaceful && <p className="text-sm text-neutral-400">{report.stationName} ምርጫ ጣቢያ</p>}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gold mt-1" />
                    <div>
                      <p className="text-xs text-neutral-500">የተላከበት ቀንና ሰዓት (Reported At)</p>
                      <p className="font-medium">{formatDate(report.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {!report.isPeaceful && (
                <div className="bg-neutral-800/50 p-6 rounded-2xl border border-neutral-700/50 space-y-4 print:bg-gray-50 print:border-gray-300">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold mb-1">የወንጀል አይነት (Crime Type)</p>
                    <p className="text-lg font-bold text-eth-red">{report.crimeType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold mb-1">ኤግዝቢት (Exhibit)</p>
                    <p className="font-medium">{report.exhibit || "ምንም የለም"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold mb-1">ተጠርጣሪዎች የተያዙ (Suspects Caught)</p>
                    <p className="font-bold">{report.suspectsCaught ? "አዎ (YES)" : "አልተያዙም (NO)"}</p>
                  </div>
                </div>
              )}
            </div>

            {!report.isPeaceful && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-700 print:bg-white print:border-gray-300">
                    <p className="text-xs text-neutral-500 font-bold mb-2">ተጠርጣሪዎች ብዛት (Perpetrators)</p>
                    <div className="flex justify-between">
                      <span>ወንድ: {report.perpetrators?.male || 0}</span>
                      <span>ሴት: {report.perpetrators?.female || 0}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-700 print:bg-white print:border-gray-300">
                    <p className="text-xs text-neutral-500 font-bold mb-2">ተጎዱ ሰዎች ብዛት (Injured)</p>
                    <div className="flex justify-between">
                      <span>ወንድ: {report.injuredCount?.male || 0}</span>
                      <span>ሴት: {report.injuredCount?.female || 0}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-700 print:bg-white print:border-gray-300">
                    <p className="text-xs text-neutral-500 font-bold mb-2">ቀላል ጉዳት (Light)</p>
                    <div className="flex justify-between">
                      <span>ወንድ: {report.lightInjuries?.male || 0}</span>
                      <span>ሴት: {report.lightInjuries?.female || 0}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-700 print:bg-white print:border-gray-300 md:col-start-2">
                    <p className="text-xs text-neutral-500 font-bold mb-2">ከባድ ጉዳት (Heavy)</p>
                    <div className="flex justify-between">
                      <span>ወንድ: {report.heavyInjuries?.male || 0}</span>
                      <span>ሴት: {report.heavyInjuries?.female || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-gold font-bold mb-2">
                      <FileText className="w-4 h-4" /> በንብረት ላይ የደረሰ ጉዳት
                    </h4>
                    <p className="text-neutral-300 p-4 bg-neutral-800/20 rounded-lg min-h-[60px] print:bg-gray-50 print:text-black">
                      {report.propertyDamage || "ምንም ጉዳት አልደረሰም"}
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-gold font-bold mb-2">
                      <ClipboardList className="w-4 h-4" /> አጠቃላይ መግለጫ (Summary Description)
                    </h4>
                    <p className="text-neutral-300 p-4 bg-neutral-800/20 rounded-lg min-h-[100px] print:bg-gray-50 print:text-black leading-relaxed">
                      {report.description || "ምንም መግለጫ አልተሰጠም"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8 print:mt-24">
              <div className="space-y-1">
                <p className="text-xs text-neutral-500 uppercase font-bold">መረጃውን ያዘጋጀው (Reporter)</p>
                <p className="text-lg font-bold">{report.reporterName}</p>
                <p className="text-sm text-neutral-400 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {report.reporterPhone}
                </p>
              </div>
              <div className="flex flex-col items-end justify-end space-y-4">
                 <div className="w-48 border-b-2 border-neutral-700 pb-2 flex flex-col items-center">
                    <span className="text-[10px] text-neutral-600 uppercase">ፊርማ (Signature)</span>
                    <div className="h-12" />
                 </div>
              </div>
            </div>
            
            <div className="hidden print:block mt-8 text-center text-[10px] text-gray-400 italic">
               ሲስተሙ የቀረበው በቤንሻንጉል ጉምዝ ክልል ፖሊስ ኮሚሽን ቴክኖሎጂ ማስፋፊያ (System by BG Region Police Tech Expansion)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

