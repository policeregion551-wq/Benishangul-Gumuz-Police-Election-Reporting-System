import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/AuthProvider";
import { Send, CheckCircle2, AlertTriangle, User, Users, Home, ClipboardList, ShieldAlert, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export const ReportForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { profile } = useAuth();
  const [isPeaceful, setIsPeaceful] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    crimeType: "",
    stationName: "",
    perpetrators: { male: 0, female: 0 },
    injuredCount: { male: 0, female: 0 },
    lightInjuries: { male: 0, female: 0 },
    heavyInjuries: { male: 0, female: 0 },
    propertyDamage: "",
    suspectsCaught: false,
    exhibit: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    try {
      const reportData = {
        zone: profile.zone,
        woreda: profile.woreda,
        isPeaceful,
        ...(!isPeaceful ? formData : {}),
        reporterName: profile.name,
        reporterPhone: profile.phone,
        status: "new",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: profile.uid,
      };

      await addDoc(collection(db, "reports"), reportData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onSuccess();
      }, 3000);
    } catch (err) {
      console.error("Error submitting report:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center glass-card bg-eth-green/10 border-eth-green/20">
        <CheckCircle2 className="w-16 h-16 text-eth-green mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">ሪፖርቱ በትክክል ተልኳል!</h3>
        <p className="text-neutral-400">መረጃው ለክልል ፖሊስ ኮሚሽን ደርሷል:: እናመሰግናለን::</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
        <button
          type="button"
          onClick={() => setIsPeaceful(true)}
          className={cn(
            "flex-1 flex flex-row sm:flex-col items-center gap-3 sm:gap-2 p-4 sm:p-6 rounded-2xl border-2 transition-all",
            isPeaceful 
              ? "bg-eth-green/20 border-eth-green text-white shadow-lg shadow-eth-green/10" 
              : "bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700"
          )}
        >
          <CheckCircle2 className={cn("w-6 h-6 sm:w-10 sm:h-10 mb-0 sm:mb-2", isPeaceful ? "text-eth-green" : "text-neutral-600")} />
          <span className="font-bold text-sm sm:text-base">ሰላም ነው (Peaceful)</span>
        </button>
        <button
          type="button"
          onClick={() => setIsPeaceful(false)}
          className={cn(
            "flex-1 flex flex-row sm:flex-col items-center gap-3 sm:gap-2 p-4 sm:p-6 rounded-2xl border-2 transition-all",
            !isPeaceful 
              ? "bg-eth-red/20 border-eth-red text-white shadow-lg shadow-eth-red/10" 
              : "bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700"
          )}
        >
          <ShieldAlert className={cn("w-6 h-6 sm:w-10 sm:h-10 mb-0 sm:mb-2", !isPeaceful ? "text-eth-red" : "text-neutral-600")} />
          <span className="font-bold text-sm sm:text-base">ወንጀል ተከስቷል (Crime)</span>
        </button>
      </div>

      {!isPeaceful && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-gold font-serif text-xl border-b border-gold/20 pb-2">የወንጀሉ ዝርዝር</h4>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">የወንጀል አይነት</label>
              <input
                type="text"
                required={!isPeaceful}
                className="input-field w-full"
                value={formData.crimeType}
                onChange={(e) => setFormData({...formData, crimeType: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">የምርጫ ጣቢያ ስም</label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                <input
                  type="text"
                  required={!isPeaceful}
                  className="input-field w-full pl-10"
                  value={formData.stationName}
                  onChange={(e) => setFormData({...formData, stationName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">ተጠርጣሪዎች (ወንድ)</label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={formData.perpetrators.male}
                  onChange={(e) => setFormData({...formData, perpetrators: {...formData.perpetrators, male: parseInt(e.target.value)}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">ተጠርጣሪዎች (ሴት)</label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={formData.perpetrators.female}
                  onChange={(e) => setFormData({...formData, perpetrators: {...formData.perpetrators, female: parseInt(e.target.value)}})}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-neutral-700 bg-neutral-800 text-gold focus:ring-gold"
                  checked={formData.suspectsCaught}
                  onChange={(e) => setFormData({...formData, suspectsCaught: e.target.checked})}
                />
                <span className="text-neutral-300 group-hover:text-gold transition-colors">ተጠርጣሪዎች ተይዘዋል?</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-gold font-serif text-xl border-b border-gold/20 pb-2">የጉዳት መጠን</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">የተጎዱ (ወንድ)</label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={formData.injuredCount.male}
                  onChange={(e) => setFormData({...formData, injuredCount: {...formData.injuredCount, male: parseInt(e.target.value)}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">የተጎዱ (ሴት)</label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={formData.injuredCount.female}
                  onChange={(e) => setFormData({...formData, injuredCount: {...formData.injuredCount, female: parseInt(e.target.value)}})}
                />
              </div>
            </div>

            <div className="bg-neutral-900/50 p-4 rounded-xl space-y-4">
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">የጉዳት አይነቶች</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-neutral-500 italic">ቀላል ጉዳት</span>
                  <input placeholder="ወንድ" type="number" className="input-field w-full text-sm" value={formData.lightInjuries.male} onChange={(e) => setFormData({...formData, lightInjuries: {...formData.lightInjuries, male: parseInt(e.target.value)}})} />
                  <input placeholder="ሴት" type="number" className="input-field w-full text-sm" value={formData.lightInjuries.female} onChange={(e) => setFormData({...formData, lightInjuries: {...formData.lightInjuries, female: parseInt(e.target.value)}})} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-neutral-500 italic">ከባድ ጉዳት</span>
                  <input placeholder="ወንድ" type="number" className="input-field w-full text-sm" value={formData.heavyInjuries.male} onChange={(e) => setFormData({...formData, heavyInjuries: {...formData.heavyInjuries, male: parseInt(e.target.value)}})} />
                  <input placeholder="ሴት" type="number" className="input-field w-full text-sm" value={formData.heavyInjuries.female} onChange={(e) => setFormData({...formData, heavyInjuries: {...formData.heavyInjuries, female: parseInt(e.target.value)}})} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">በንብረት ላይ የደረሰ ጉዳት</label>
              <textarea
                className="input-field w-full h-24 resize-none"
                value={formData.propertyDamage}
                onChange={(e) => setFormData({...formData, propertyDamage: e.target.value})}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-gold font-serif text-xl border-b border-gold/20 pb-2">ተጨማሪ መረጃ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">ኤግዝቢት (Exhibit)</label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={formData.exhibit}
                  onChange={(e) => setFormData({...formData, exhibit: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">አጠቃላይ መግለጫ</label>
                <textarea
                  className="input-field w-full h-24 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isPeaceful && (
        <div className="glass-card bg-eth-green/5 border-eth-green/10 p-8 text-center max-w-lg mx-auto">
          <CheckCircle2 className="w-12 h-12 text-eth-green mx-auto mb-4" />
          <h4 className="text-xl font-bold text-white mb-2">ሁኔታው ሰላም ነው?</h4>
          <p className="text-neutral-400">ምንም አይነት የወንጀል ክስተት ከሌለ "ሪፖርት ላክ" የሚለውን በመጫን ሰላም መሆኑን ሪፖርት ያድርጉ::</p>
        </div>
      )}

      <div className="pt-8 border-t border-neutral-800">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-lg"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> ሪፖርት ላክ (Send Report)</>}
        </button>
      </div>
    </form>
  );
};
