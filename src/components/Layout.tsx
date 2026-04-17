import React from "react";
import { useAuth } from "../lib/AuthProvider";
import { LogOut, User, MapPin, Flag } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Header: React.FC = () => {
  const { profile, signOut } = useAuth();

  return (
    <header className="header-container sticky top-0 z-50 w-full overflow-hidden flex flex-col md:flex-row items-center px-4 md:px-6 py-4 justify-between min-h-[100px] gap-4">
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="flag w-[50px] md:w-[60px] h-[33px] md:h-[40px] relative mb-1 overflow-hidden shadow-lg border border-white/10">
            <div className="h-1/3 bg-[#009a44]" />
            <div className="h-1/3 bg-[#fed100] relative">
              {/* Star Emblem */}
              <div className="absolute inset-0 flex items-center justify-center -top-[11px] md:-top-[13px]">
                 <div className="w-[16px] md:w-[20px] h-[16px] md:h-[20px] bg-[#0039a6] rounded-full flex items-center justify-center border-[0.5px] border-yellow-400 z-10 shadow-sm overflow-hidden">
                    <svg viewBox="0 0 51 48" className="w-[11px] md:w-[14px] h-[11px] md:h-[14px] fill-[#fed100]">
                      <path d="M25.5 0L31.3259 17.9271H50.2229L34.9485 29.0459L40.7744 46.9729L25.5 35.8541L10.2256 46.9729L16.0515 29.0459L0.777083 17.9271H19.6741L25.5 0Z" />
                    </svg>
                 </div>
              </div>
            </div>
            <div className="h-1/3 bg-[#ef3340]" />
          </div>
          <span className="text-[9px] md:text-[10px] text-white font-bold tracking-tight">ኢትዮጵያ</span>
        </div>
        
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl golden-text font-black uppercase tracking-wider leading-tight truncate">
            ቤንሻንጉል ጉሙዝ ክልል ፖሊስ
          </h1>
          <p className="text-gold text-[10px] md:text-sm italic opacity-90 truncate">
            Election Security Reporting System
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 md:border-l md:border-white/10 md:pl-6">
        {profile && (
          <div className="flex flex-col md:items-end">
            <span className="text-xs md:text-sm font-bold text-gold line-clamp-1">{profile.name}</span>
            <span className="text-[9px] md:text-[10px] opacity-60 text-text-light">{profile.email}</span>
          </div>
        )}
        {profile && (
          <button
            onClick={signOut}
            className="p-2 md:p-3 bg-white/5 hover:bg-eth-red/20 rounded-full transition-all text-neutral-400 hover:text-eth-red border border-white/10"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="footer py-3 border-t border-border-subtle mt-auto bg-[#020617] flex justify-center items-center text-[11px] text-[#64748b]">
        በቤንሻንጉል ጉምዝ ክልል ፖሊስ ኮሚሽን ቴክኖሎጂ ማስፋፊያ የተዘጋጀ (Developed by BG Police Technology Expansion) &copy; 2026
      </footer>
    </div>
  );
};
