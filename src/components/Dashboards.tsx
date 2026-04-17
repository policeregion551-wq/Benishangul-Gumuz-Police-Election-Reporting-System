import React, { useState } from "react";
import { useAuth } from "../lib/AuthProvider";
import { Folder, MapPin, Clock, LayoutDashboard, FileText, BellRing, Info } from "lucide-react";
import { ReportList } from "./ReportList";
import { ReportForm } from "./ReportForm";
import { cn } from "../lib/utils";

export const ZoneDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"dashboard" | "manual">("dashboard");

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-2 border-b border-neutral-900 scroll-smooth">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm",
            activeTab === "dashboard" ? "bg-gold text-neutral-950 font-bold" : "text-neutral-400 hover:bg-neutral-900"
          )}
        >
          <LayoutDashboard className="w-4 h-4" /> ዳሽቦርድ (Dashboard)
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm",
            activeTab === "manual" ? "bg-gold text-neutral-950 font-bold" : "text-neutral-400 hover:bg-neutral-900"
          )}
        >
          <Info className="w-4 h-4" /> መመሪያ (Manual)
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold golden-text">የ{profile.zone} ፖሊስ መቆጣጠሪያ</h2>
          <p className="text-neutral-400 text-sm">በዞኑ ስር ያሉ ወረዳዎች የሚልኩትን ሪፖርት እዚህ ማየት ይችላሉ</p>
        </div>
        <div className="flex items-center gap-4 bg-neutral-900/50 px-6 py-3 rounded-2xl border border-neutral-800">
          <div className="text-right">
             <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">የዞን ኮድ</p>
             <p className="text-gold font-bold">{profile.zone}</p>
          </div>
          <MapPin className="w-8 h-8 text-gold opacity-20" />
        </div>
      </div>

      {activeTab === "dashboard" ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-neutral-400 mb-4 px-2">
            < BellRing className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">ከወረዳዎች የተላኩ የቅርብ ጊዜ ሪፖርቶች</span>
          </div>
          <ReportList filter={{ zone: profile.zone }} />
        </div>
      ) : (
        <ManualContent />
      )}
    </div>
  );
};

export const WoredaDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"form" | "reports" | "manual">("form");

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-2 border-b border-neutral-900 scroll-smooth">
        <button
          onClick={() => setActiveTab("form")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm",
            activeTab === "form" ? "bg-gold text-neutral-950 font-bold" : "text-neutral-400 hover:bg-neutral-900"
          )}
        >
          <FileText className="w-4 h-4" /> ሪፖርት መላኪያ (Send Report)
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm",
            activeTab === "reports" ? "bg-gold text-neutral-950 font-bold" : "text-neutral-400 hover:bg-neutral-900"
          )}
        >
          <Folder className="w-4 h-4" /> የእኔ ሪፖርቶች
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm",
            activeTab === "manual" ? "bg-gold text-neutral-950 font-bold" : "text-neutral-400 hover:bg-neutral-900"
          )}
        >
          <Info className="w-4 h-4" /> መመሪያ (Manual)
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold golden-text">የ{profile.woreda} ሪፖርት ማቅረቢያ</h2>
          <p className="text-neutral-400 text-sm">የጸጥታ ሪፖርቶችን ለክልል ፖሊስ ኮሚሽን ይላኩ</p>
        </div>
        <div className="bg-neutral-900/50 px-6 py-2 rounded-2xl border border-neutral-800 text-center">
           <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">ወረዳ (Woreda)</p>
           <p className="text-gold font-bold">{profile.woreda}</p>
        </div>
      </div>

      {activeTab === "form" && (
        <div className="glass-card p-4 md:p-8">
          <ReportForm onSuccess={() => setActiveTab("reports")} />
        </div>
      )}

      {activeTab === "reports" && (
        <ReportList filter={{ createdBy: profile.uid }} />
      )}

      {activeTab === "manual" && <ManualContent />}
    </div>
  );
};

const ManualContent: React.FC = () => (
  <div className="glass-card p-8 space-y-8 max-w-4xl mx-auto">
    <div className="text-center">
      <h3 className="text-3xl font-serif golden-text mb-2">የሲስተሙ አጠቃቀም መመሪያ</h3>
      <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
      <div className="space-y-4">
        <h4 className="text-gold font-bold border-l-4 border-gold pl-3">ለወረዳ ፖሊስ ተጠቃሚዎች</h4>
        <ul className="space-y-3 text-neutral-300 text-sm">
          <li className="flex gap-2"><span>1.</span> መጀመሪያ "ረጂሰተር" የሚለውን በመጫን መረጃዎን በትክክል ይመዝግቡ::</li>
          <li className="flex gap-2"><span>2.</span> ከገቡ በኋላ "ሪፖርት መላኪያ" በሚለው ፎርም መረጃዎችን ይሙሉ::</li>
          <li className="flex gap-2"><span>3.</span> ሁኔታው ሰላም ከሆነ "ሰላም ነው" የሚለውን ይጫኑ::</li>
          <li className="flex gap-2"><span>4.</span> ወንጀል ተከስቶ ከሆነ ዝርዝሮችን ሞልተው "ሪፖርት ላክ" ይበሉ::</li>
          <li className="flex gap-2"><span>5.</span> የላኳቸው ሪፖርቶች "የእኔ ሪፖርቶች" በሚለው ውስጥ ይቀመጣሉ::</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-gold font-bold border-l-4 border-gold pl-3">ለክልልና ለዞን ፖሊስ</h4>
        <ul className="space-y-3 text-neutral-300 text-sm">
          <li className="flex gap-2"><span>1.</span> በዳሽቦርዱ ላይ የተላኩ ሪፖርቶችን ማየት ይችላሉ::</li>
          <li className="flex gap-2"><span>2.</span> አዲስ ሪፖርት ሲደርስ "አዲስ (NEW)" የሚል ምልክት ያሳያል::</li>
          <li className="flex gap-2"><span>3.</span> እያንዳንዱን ሪፖርት መክፈት፣ ፕሪንት ማድረግና ዳውንሎድ ማድረግ ይቻላል::</li>
          <li className="flex gap-2"><span>4.</span> ክልል ፖሊስ ለዞን ተጠቃሚዎች አካውንት መፍጠር ይችላል::</li>
        </ul>
      </div>
    </div>
  </div>
);
