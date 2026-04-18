import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./lib/AuthProvider";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AdminDashboard } from "./components/AdminDashboard";
import { ZoneDashboard, WoredaDashboard } from "./components/Dashboards";
import { Loader2 } from "lucide-react";

const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [route, setRoute] = useState(window.location.hash || "#login");

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-blue flex flex-col items-center justify-center p-6 text-center">
        <div className="header-container w-full absolute top-0" />
        <div className="flag w-[70px] md:w-[80px] h-[45px] md:h-[50px] relative mb-6 overflow-hidden shadow-2xl border border-white/10 animate-fade-in">
          <div className="h-1/3 bg-[#009a44]" />
          <div className="h-1/3 bg-[#fed100] relative">
            <div className="absolute inset-0 flex items-center justify-center -top-[14px] md:-top-[16px]">
               <div className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] bg-[#0039a6] rounded-full flex items-center justify-center border-[0.5px] border-yellow-400 z-10 overflow-hidden">
                  <svg viewBox="0 0 51 48" className="w-[14px] md:w-[18px] h-[14px] md:h-[18px] fill-[#fed100]">
                    <path d="M25.5 0L31.3259 17.9271H50.2229L34.9485 29.0459L40.7744 46.9729L25.5 35.8541L10.2256 46.9729L16.0515 29.0459L0.777083 17.9271H19.6741L25.5 0Z" />
                  </svg>
               </div>
            </div>
          </div>
          <div className="h-1/3 bg-[#ef3340]" />
        </div>
        <Loader2 className="w-10 md:w-12 h-10 md:h-12 text-gold animate-spin mb-4" />
        <p className="text-gold font-serif text-sm md:text-lg tracking-[0.2em] animate-pulse uppercase">በመጫን ላይ / Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!profile) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto px-4">
           <h2 className="text-2xl font-bold golden-text mb-4">መረጃው እየተረጋጋጠ ነው...</h2>
           <p className="text-neutral-400 mb-8">የእርስዎ ፕሮፋይል በሲስተሙ ላይ እየተፈለገ ነው:: መግባት ካልቻሉ እባክዎ እንደገና ይሞክሩ::</p>
           <button 
             onClick={() => window.location.reload()} 
             className="btn-primary w-full mb-4"
           >
             እንደገና ሞክር (Retry)
           </button>
           <button 
             onClick={() => {
               const { signOut } = useAuth();
               signOut();
             }} 
             className="text-xs text-neutral-500 hover:text-eth-red transition-colors"
           >
             ውጣ (Sign Out)
           </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {profile.role === "admin" && <AdminDashboard />}
      {profile.role === "zone" && <ZoneDashboard />}
      {profile.role === "woreda" && <WoredaDashboard />}
    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
