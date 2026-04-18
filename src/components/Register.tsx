import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { UserPlus, Mail, Lock, User, Phone, MapPin, Loader2 } from "lucide-react";
import { Header } from "./Layout";
import { ZONES, UserProfile } from "../types";

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    zone: ZONES[0],
    woreda: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      const cleanPassword = formData.password;
      
      let user;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        user = userCredential.user;
      } catch (authErr: any) {
        if (authErr.code === "auth/email-already-in-use") {
          // If already in use, try to sign in and fix the profile if it's missing
          try {
             const signInCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
             user = signInCred.user;
          } catch (signInErr: any) {
             setError("ይህ ኢሜል አስቀድሞ ተመዝግቧል:: እባክዎ በትክክለኛው ፓስዎርድ ሎጊን (Login) ብለው ይግቡ::");
             setLoading(false);
             return;
          }
        } else if (authErr.code === "auth/weak-password") {
          setError("ፓስዎርዱ በጣም ደካማ ነው:: እባክዎ ቢያንስ 6 ቃላት ይጠቀሙ::");
          setLoading(false);
          return;
        } else {
          throw authErr;
        }
      }
      
      if (user) {
        const profile: UserProfile = {
          uid: user.uid,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          zone: formData.zone,
          woreda: formData.woreda.trim(),
          email: cleanEmail,
          role: "woreda",
        };

        // If it's the admin email, use admin role instead
        if (cleanEmail === "policeregion551@gmail.com") {
          profile.role = "admin";
        }

        await setDoc(doc(db, "users", user.uid), profile);
      }
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("ይህ ኢሜል አስቀድሞ ተመዝግቧል:: እባክዎ በትክክለኛው ፓስዎርድ ሎጊን (Login) ብለው ይግቡ::");
      } else if (err.code === "auth/weak-password") {
        setError("ፓስዎርዱ በጣም ደካማ ነው:: ቢያንስ 6 ቃላት ይጠቀሙ::");
      } else if (err.code === "auth/invalid-credential") {
        setError("የገቡት ፓስዎርድ ወይም መረጃ ትክክል አይደለም:: እባክዎ በትክክል ይሙሉ::");
      } else if (err.code === "auth/invalid-email") {
        setError("የገቡት ኢሜል ትክክል አይደለም::");
      } else {
        setError("ምዝገባው አልተሳካም:: " + (err.message || "እባክዎ መረጃዎን ቼክ ያድርጉ::"));
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-blue flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl glass-card p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold golden-text mb-2">የወረዳ ፖሊስ መመዝገቢያ (Register)</h2>
            <p className="text-neutral-400 text-sm italic">አዲስ የወረዳ ተጠቃሚ ለመሆን መረጃዎን በትክክል ያስገቡ</p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">ሙሉ ስም (Full Name)</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field w-full pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">ስልክ ቁጥር (Phone)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field w-full pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">ዞን (Zone)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <select
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="input-field w-full pl-10 appearance-none"
                  required
                >
                  {ZONES.map((zone) => (
                    <option key={zone} value={zone} className="bg-neutral-900">{zone}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">ወረዳ (Woreda)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={formData.woreda}
                  onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                  className="input-field w-full pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">ኢሜል (Email)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field w-full pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">ፓስዎርድ (Password)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field w-full pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="md:col-span-2 p-3 bg-eth-red/10 border border-eth-red/20 rounded-lg">
                <p className="text-eth-red text-sm font-medium italic">{error}</p>
              </div>
            )}

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5" /> መመዝገብ (Register)</>}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
            <p className="text-neutral-500 text-xs">
              አካውንት አለዎት? <a href="#login" className="text-gold hover:underline">ሎጊን (Login)</a> ያድርጉ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
