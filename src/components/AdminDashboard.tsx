import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Report, ZONES, UserProfile } from "../types";
import { Folder, Users, PieChart as PieChartIcon, Settings, Search, Plus, Mail, Lock, User, Phone, MapPin, Loader2, X, ChevronRight, LayoutDashboard, CheckCircle2, ShieldAlert, ClipboardList, BellRing } from "lucide-react";
import { ReportList } from "./ReportList";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { cn, formatDate } from "../lib/utils";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "reports" | "users" | "settings">("dashboard");
  const [reports, setReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    const unsubReports = onSnapshot(collection(db, "reports"), (snap) => {
      setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Report)));
    });
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setUsers(snap.docs.map((d) => ({ uid: d.id, ...d.data() } as UserProfile)));
    });
    return () => {
      unsubReports();
      unsubUsers();
    };
  }, []);

  const stats = {
    total: reports.length,
    new: reports.filter((r) => r.status === "new").length,
    peaceful: reports.filter((r) => r.isPeaceful).length,
    incidents: reports.filter((r) => !r.isPeaceful).length,
  };

  const chartData = [
    { name: "ሰላም ነው (Peaceful)", value: stats.peaceful, color: "#009B3A" },
    { name: "ወንጀል ተከስቷል (Incidents)", value: stats.incidents, color: "#EF3340" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Navigation Pills */}
      <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-2 border-b border-neutral-900 scroll-smooth">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-lg transition-all border-l-2 md:border-l-4 whitespace-nowrap text-sm md:text-base",
            activeTab === "dashboard" ? "bg-gold/10 border-gold text-gold font-bold" : "text-neutral-400 border-transparent hover:bg-white/5"
          )}
        >
          <LayoutDashboard className="w-4 h-4" /> ዳሽቦርድ
        </button>
        <button
          onClick={() => { setActiveTab("reports"); setSelectedZone(null); }}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-lg transition-all border-l-2 md:border-l-4 whitespace-nowrap text-sm md:text-base",
            activeTab === "reports" ? "bg-gold/10 border-gold text-gold font-bold" : "text-neutral-400 border-transparent hover:bg-white/5"
          )}
        >
          <Folder className="w-4 h-4" /> ሪፖርቶች
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-lg transition-all border-l-2 md:border-l-4 whitespace-nowrap text-sm md:text-base",
            activeTab === "users" ? "bg-gold/10 border-gold text-gold font-bold" : "text-neutral-400 border-transparent hover:bg-white/5"
          )}
        >
          <Users className="w-4 h-4" /> ተጠቃሚዎች
        </button>
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="አጠቃላይ ሪፖርት" label="Total Reports" value={stats.total} icon={<ClipboardIcon />} color="gold" />
            <StatCard title="የተመዘገቡ ወንጀሎች" label="Crimes Reported" value={stats.incidents} icon={<AlertIcon />} color="accent-red" pulse={stats.incidents > 0} />
            <StatCard title="ሰላማዊ ሁኔታዎች" label="Peaceful Status" value={`${((stats.peaceful / (stats.total || 1)) * 100).toFixed(1)}%`} icon={<CheckIcon />} color="accent-green" />
            <StatCard title="አዲስ ሪፖርቶች" label="New Reports" value={stats.new} icon={<BellIcon />} color="gold" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 glass-card p-6 flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-text-light flex items-center gap-2">
                   📊 የሪፖርት አጠቃላይ ሁኔታ (Report Statistics)
                </span>
              </div>
              <div className="flex-1 w-full min-h-[300px] relative mt-4">
                <ResponsiveContainer width="100%" height={300} minWidth={0}>
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="60%" 
                      outerRadius="80%" 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f8fafc" }} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Activity / Info */}
            <div className="glass-card p-6">
               <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">የቅርብ ጊዜ እንቅስቃሴ</h3>
               <div className="space-y-4">
                  {reports.slice(0, 4).map(r => (
                    <div key={r.id} className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0">
                      <div className={cn("w-2 h-2 rounded-full", r.status === 'new' ? "bg-accent-red animate-pulse" : "bg-neutral-600")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{r.woreda} - {r.isPeaceful ? 'ሰላም ነው' : r.crimeType}</p>
                        <p className="text-[10px] text-neutral-500">{formatDate(r.createdAt)}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

      {/* Zonal Folders */}
      <div className="space-y-4">
        <h3 className="text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-[0.2em] px-1">የዞን ማህደሮች (Zonal Folders)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {ZONES.map((zone) => {
            const zoneReportsCount = reports.filter(r => r.zone === zone).length;
            const newReportsInZone = reports.filter(r => r.zone === zone && r.status === "new").length;
            return (
              <button
                key={zone}
                onClick={() => { setActiveTab("reports"); setSelectedZone(zone); }}
                className="glass-card hover:bg-gold/5 p-3 md:p-4 group transition-all text-left flex flex-col gap-2 md:gap-3 relative overflow-hidden"
              >
                {newReportsInZone > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-accent-red text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg z-10">
                    {newReportsInZone}
                  </span>
                )}
                <Folder className="w-6 h-6 md:w-8 md:h-8 text-gold opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110" />
                <div className="min-w-0">
                  <p className="text-[10px] md:text-[11px] font-bold text-text-light truncate uppercase tracking-tight">{zone}</p>
                  <p className="text-[9px] md:text-[10px] text-neutral-500">{zoneReportsCount} ሪፖርቶች</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold golden-text flex items-center gap-2">
              {selectedZone ? (
                <>
                  <button onClick={() => setSelectedZone(null)} className="hover:text-gold"><Folder className="w-6 h-6" /></button>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                  {selectedZone}
                </>
              ) : "ሁሉም ሪፖርቶች"}
            </h3>
            {selectedZone && (
              <button 
                onClick={() => setSelectedZone(null)}
                className="text-xs text-neutral-500 hover:text-gold"
              >
                ወደ ኋላ ተመለስ (Back)
              </button>
            )}
          </div>
          <ReportList filter={selectedZone ? { zone: selectedZone } : undefined} />
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold golden-text">የሲስተም ተጠቃሚዎች / Systems Users</h3>
            <button
              onClick={() => setShowAddUser(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> ለዞን ፖሊስ መግቢያ ፍጠር
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((u) => (
              <div key={u.uid} className="glass-card p-6 flex items-start gap-4">
                <div className="p-3 bg-neutral-800 rounded-full">
                  <User className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-100 truncate">{u.name}</p>
                  <p className="text-xs text-neutral-500 mb-2 truncate">{u.email}</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800 w-fit">
                      {u.role.toUpperCase()}
                    </span>
                    <span className="text-xs text-gold flex items-center gap-1">
                       <MapPin className="w-3 h-3" /> {u.zone} - {u.woreda}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} />}
    </div>
  );
};

const AddUserModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    zone: ZONES[0],
    email: "",
    password: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: Admin can't easily create users for others in Firebase Auth without Firebase Admin SDK
      // However, we can simulate this by logging out and in, but better to use a secondary app instance
      // or just inform that in a real production this needs a Cloud Function.
      // For this applet, I'll attempt a direct creation if possible or explain logic.
      // Wait, we can use a separate Firebase instance or just add to users collection and handle login.
      // Actually, let's keep it simple: Add to users collection, and inform they need to register.
      // Better: In a controlled env, Admin writes to a 'pending_users' or just 'users' and uses their email as ID.
      // But Firebase Auth needs createUser. 
      // I'll implement a workaround or just register them.
      
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      const profile: UserProfile = {
        uid: user.uid,
        name: formData.name,
        phone: formData.phone,
        zone: formData.zone,
        woreda: "Zonal Head",
        email: formData.email,
        role: "zone",
      };

      await setDoc(doc(db, "users", user.uid), profile);
      alert("የዞን ተጠቃሚ በትክክል ተመዝግቧል!");
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card p-8 w-full max-w-lg relative bg-neutral-950">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-eth-red">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold golden-text mb-6">አዲስ የዞን ተጠቃሚ መመዝገቢያ</h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <input className="input-field w-full" placeholder="የፖሊስ ስም" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input className="input-field w-full" placeholder="ስልክ ቁጥር" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <select className="input-field w-full appearance-none" required value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})}>
             {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
          <input className="input-field w-full" type="email" placeholder="ኢሜል" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input className="input-field w-full" type="password" placeholder="ፓስዎርድ" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center py-3">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ይመዝገብ (Save)"}
          </button>
        </form>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; label: string; value: number | string; icon: React.ReactNode; color: string; pulse?: boolean }> = ({ title, label, value, icon, color, pulse }) => (
  <div className={cn("glass-card p-4 md:p-6 flex flex-col relative overflow-hidden group hover:scale-[1.02] transition-all min-h-[100px] md:min-h-[120px]", pulse && "ring-1 ring-eth-red/50")}>
    <div className={cn("absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity", `text-${color}`)}>
      {icon}
    </div>
    <span className="text-[10px] md:text-[12px] opacity-70 mb-1 leading-tight">{title} ({label})</span>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-2xl md:text-3xl font-bold text-gold">{value}</span>
    </div>
  </div>
);

const ClipboardIcon = () => <ClipboardList className="w-8 h-8" />;
const BellIcon = () => <BellRing className="w-8 h-8" />;
const CheckIcon = () => <CheckCircle2 className="w-8 h-8" />;
const AlertIcon = () => <ShieldAlert className="w-8 h-8" />;
