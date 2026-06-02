'use client'

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, LogOut, Settings, FolderKanban, GraduationCap, Briefcase, Zap, Eye, EyeOff, Sun, Moon, Upload, Menu } from "lucide-react";
import { IconPicker, getIconComponent } from "@/components/ui/icon-picker";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

// ── Types ──
interface Work { _id: string; title: string; content: string; image: string; link: string; }
interface EduItem { _id: string; title: string; subtitle: string; start: string; end: string; order: number; }
interface ExpItem { _id: string; title: string; company: string; start: string; end: string; description: string; order: number; }
interface SkillItem { _id: string; name: string; percent: number; icon: string; order: number; }
interface SiteSettings {
  name: string; role: string; bio: string; profilePic: string;
  email: string; phone: string; github: string; instagram: string; facebook: string; discord: string;
  tools: string[];
}

const emptyWork: Omit<Work, "_id"> = { title: "", content: "", image: "", link: "" };
const emptyEdu: Omit<EduItem, "_id"> = { title: "", subtitle: "", start: "", end: "", order: 0 };
const emptyExp: Omit<ExpItem, "_id"> = { title: "", company: "", start: "", end: "", description: "", order: 0 };
const emptySkill: Omit<SkillItem, "_id"> = { name: "", percent: 80, icon: "Code", order: 0 };
const emptySettings: SiteSettings = { name: "", role: "", bio: "", profilePic: "", email: "", phone: "", github: "", instagram: "", facebook: "", discord: "", tools: [] };

type Tab = "projects" | "education" | "experience" | "skills" | "settings";

export default function AdminPage() {
  const { theme, setTheme } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("projects");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileFileRef = useRef<HTMLInputElement>(null);

  // Works
  const [works, setWorks] = useState<Work[]>([]);
  const [workDialog, setWorkDialog] = useState<"add" | "edit" | null>(null);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [workForm, setWorkForm] = useState<Omit<Work, "_id">>(emptyWork);

  // Education
  const [eduItems, setEduItems] = useState<EduItem[]>([]);
  const [eduDialog, setEduDialog] = useState<"add" | "edit" | null>(null);
  const [editingEdu, setEditingEdu] = useState<EduItem | null>(null);
  const [eduForm, setEduForm] = useState<Omit<EduItem, "_id">>(emptyEdu);

  // Experience
  const [expItems, setExpItems] = useState<ExpItem[]>([]);
  const [expDialog, setExpDialog] = useState<"add" | "edit" | null>(null);
  const [editingExp, setEditingExp] = useState<ExpItem | null>(null);
  const [expForm, setExpForm] = useState<Omit<ExpItem, "_id">>(emptyExp);

  // Skills
  const [skillItems, setSkillItems] = useState<SkillItem[]>([]);
  const [skillDialog, setSkillDialog] = useState<"add" | "edit" | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [skillForm, setSkillForm] = useState<Omit<SkillItem, "_id">>(emptySkill);
  const [toolsInput, setToolsInput] = useState("");

  // Settings
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const login = async () => {
    setLoginError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token: t } = await res.json();
      sessionStorage.setItem("admin_token", t);
      setToken(t);
    } else {
      setLoginError("Invalid password");
    }
  };

  const logout = () => { sessionStorage.removeItem("admin_token"); setToken(null); };

  const authHeader = { Authorization: `Bearer ${token}` };

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  // Fetch all
  const fetchWorks = async () => { const r = await fetch("/api/works"); setWorks(await r.json()); };
  const fetchEdu = async () => { const r = await fetch("/api/education"); setEduItems(await r.json()); };
  const fetchExp = async () => { const r = await fetch("/api/experience"); setExpItems(await r.json()); };
  const fetchSkills = async () => { const r = await fetch("/api/skills"); setSkillItems(await r.json()); };
  const fetchSettings = async () => {
    const r = await fetch("/api/settings");
    const d = await r.json();
    const merged = { ...emptySettings, ...d };
    setSettings(merged);
    setToolsInput(Array.isArray(merged.tools) ? merged.tools.join(", ") : "");
  };

  useEffect(() => { if (token) { fetchWorks(); fetchEdu(); fetchExp(); fetchSkills(); fetchSettings(); } }, [token]);

  const uploadProfile = async (file: File) => {
    setUploadingProfile(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", headers: authHeader, body: fd });
    if (r.ok) {
      const { url } = await r.json();
      setSettings((s) => {
        const updated = { ...s, profilePic: url };
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeader },
          body: JSON.stringify({ ...updated, tools: updated.tools }),
        });
        return updated;
      });
      notify("Profile image uploaded & saved!");
    } else {
      notify("Upload failed");
    }
    setUploadingProfile(false);
  };

  // Works CRUD
  const saveWork = async () => {
    setLoading(true);
    if (workDialog === "add") {
      await fetch("/api/works", { method: "POST", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(workForm) });
      notify("Project added!");
    } else if (editingWork) {
      await fetch(`/api/works/${editingWork._id}`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(workForm) });
      notify("Project updated!");
    }
    setWorkDialog(null); await fetchWorks(); setLoading(false);
  };

  const deleteWork = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/works/${id}`, { method: "DELETE", headers: authHeader });
    notify("Deleted!"); fetchWorks();
  };

  // Education CRUD
  const saveEdu = async () => {
    setLoading(true);
    if (eduDialog === "add") {
      await fetch("/api/education", { method: "POST", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(eduForm) });
      notify("Education added!");
    } else if (editingEdu) {
      await fetch(`/api/education/${editingEdu._id}`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(eduForm) });
      notify("Education updated!");
    }
    setEduDialog(null); await fetchEdu(); setLoading(false);
  };

  const deleteEdu = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/education/${id}`, { method: "DELETE", headers: authHeader });
    notify("Deleted!"); fetchEdu();
  };

  // Experience CRUD
  const saveExp = async () => {
    setLoading(true);
    if (expDialog === "add") {
      await fetch("/api/experience", { method: "POST", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(expForm) });
      notify("Experience added!");
    } else if (editingExp) {
      await fetch(`/api/experience/${editingExp._id}`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(expForm) });
      notify("Experience updated!");
    }
    setExpDialog(null); await fetchExp(); setLoading(false);
  };

  const deleteExp = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE", headers: authHeader });
    notify("Deleted!"); fetchExp();
  };

  // Skills CRUD
  const saveSkill = async () => {
    setLoading(true);
    if (skillDialog === "add") {
      await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(skillForm) });
      notify("Skill added!");
    } else if (editingSkill) {
      await fetch(`/api/skills/${editingSkill._id}`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify(skillForm) });
      notify("Skill updated!");
    }
    setSkillDialog(null); await fetchSkills(); setLoading(false);
  };

  const deleteSkill = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE", headers: authHeader });
    notify("Deleted!"); fetchSkills();
  };

  const saveTools = async () => {
    const tools = toolsInput.split(",").map((t) => t.trim()).filter(Boolean);
    setLoading(true);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify({ ...settings, tools }) });
    setSettings((s) => ({ ...s, tools }));
    notify("Tools saved!"); setLoading(false);
  };

  // Settings
  const saveSettings = async () => {
    setLoading(true);
    const tools = toolsInput.split(",").map((t) => t.trim()).filter(Boolean);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify({ ...settings, tools }) });
    setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000);
    notify("Settings saved!"); setLoading(false);
  };

  // ── Login screen ──
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-card py-0 gap-0 ring-0 border border-border shadow-lg">
          <CardHeader className="text-center px-6 pt-6 pb-2">
            <CardTitle className="text-xl text-foreground">Admin Access</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">Portfolio dashboard</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-6 pb-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                className="bg-input border-input text-foreground pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <Button onClick={login} className="bg-foreground hover:bg-foreground/80 text-background w-full">Login</Button>
            <a href="/" className="text-xs text-muted-foreground text-center hover:text-foreground/80">← Back to portfolio</a>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sidebarItems: { key: Tab; icon: React.ReactNode; label: string }[] = [
    { key: "projects", icon: <FolderKanban size={16} />, label: "Projects" },
    { key: "education", icon: <GraduationCap size={16} />, label: "Education" },
    { key: "experience", icon: <Briefcase size={16} />, label: "Experience" },
    { key: "skills", icon: <Zap size={16} />, label: "Skills" },
    { key: "settings", icon: <Settings size={16} />, label: "Settings" },
  ];

  const NavItems = ({ onSelect }: { onSelect?: () => void }) => (
    <>
      {sidebarItems.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => { setTab(key); onSelect?.(); }}
          className={`flex items-center gap-2 px-3 py-2 rounded-none text-sm text-left w-full transition-all font-medium ${tab === key
            ? "bg-foreground/10 text-foreground border-l-2 border-foreground pl-[10px]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent pl-[10px]"
            }`}
        >
          {icon} {label}
        </button>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-foreground text-background px-4 py-2 rounded-lg text-sm shadow-lg font-medium">{toast}</div>
      )}

      <header className="border-b border-border px-4 md:px-6 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-muted-foreground hover:text-foreground p-2"
        >
          <Menu size={18} />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base md:text-lg font-bold text-foreground leading-tight">Portfolio Admin</h1>
          <p className="text-muted-foreground text-xs hidden sm:block">Manage your content</p>
        </div>
        <div className="flex gap-1 md:gap-2 items-center">
          <a href="/" target="_blank">
            <Button variant="outline" size="sm" className="hidden sm:flex">View Site</Button>
            <Button variant="ghost" size="sm" className="sm:hidden p-2" title="View Site">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </Button>
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground p-2"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-red-400 p-2"><LogOut size={16} /></Button>
        </div>
      </header>

      {/* Mobile Sheet sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-56 p-0 bg-background border-border">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="px-4 py-5 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Portfolio Admin</p>
            <p className="text-xs text-muted-foreground">Manage your content</p>
          </div>
          <nav className="p-4 flex flex-col gap-1">
            <NavItems onSelect={() => setSidebarOpen(false)} />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-48 border-r border-border p-4 flex-col gap-1">
          <NavItems />
        </aside>

        <main className="flex-1 overflow-auto p-6 bg-muted/30">

          {/* ── Projects ── */}
          {tab === "projects" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-lg font-semibold">Projects</h2><p className="text-muted-foreground text-sm">{works.length} total</p></div>
                <Button onClick={() => { setWorkForm(emptyWork); setEditingWork(null); setWorkDialog("add"); }} size="sm" className="bg-foreground hover:bg-foreground/80 text-background gap-1">
                  <Plus size={15} /> Add Project
                </Button>
              </div>
              <div className="grid gap-3">
                {works.map((w) => (
                  <Card key={w._id} className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm hover:border-foreground/30 hover:shadow-md transition-all">
                    <CardContent className="flex items-center gap-4 p-4">
                      {w.image && <img src={w.image} alt={w.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{w.title}</p>
                        <p className="text-muted-foreground text-sm truncate mt-0.5">{w.content}</p>
                        <a href={w.link} target="_blank" rel="noreferrer" className="text-muted-foreground text-xs hover:underline">{w.link}</a>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => { setWorkForm({ title: w.title, content: w.content, image: w.image, link: w.link }); setEditingWork(w); setWorkDialog("edit"); }} className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"><Pencil size={14} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteWork(w._id)} className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Education ── */}
          {tab === "education" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-lg font-semibold">Education</h2><p className="text-muted-foreground text-sm">{eduItems.length} items — newest first (highest order)</p></div>
                <Button onClick={() => { setEduForm(emptyEdu); setEditingEdu(null); setEduDialog("add"); }} size="sm" className="bg-foreground hover:bg-foreground/80 text-background gap-1">
                  <Plus size={15} /> Add
                </Button>
              </div>
              <div className="grid gap-3">
                {eduItems.map((item) => (
                  <Card key={item._id} className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm hover:border-foreground/30 hover:shadow-md transition-all">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-muted-foreground text-sm">{item.subtitle}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{item.start} — {item.end}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => { setEduForm({ title: item.title, subtitle: item.subtitle, start: item.start, end: item.end, order: item.order }); setEditingEdu(item); setEduDialog("edit"); }} className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"><Pencil size={14} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteEdu(item._id)} className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Experience ── */}
          {tab === "experience" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-lg font-semibold">Experience</h2><p className="text-muted-foreground text-sm">{expItems.length} items — newest first (highest order)</p></div>
                <Button onClick={() => { setExpForm(emptyExp); setEditingExp(null); setExpDialog("add"); }} size="sm" className="bg-foreground hover:bg-foreground/80 text-background gap-1">
                  <Plus size={15} /> Add
                </Button>
              </div>
              <div className="grid gap-3">
                {expItems.map((item) => (
                  <Card key={item._id} className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm hover:border-foreground/30 hover:shadow-md transition-all">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-muted-foreground text-sm">{item.company}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{item.start} — {item.end}</p>
                        {item.description && <p className="text-muted-foreground text-xs mt-1 truncate">{item.description}</p>}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => { setExpForm({ title: item.title, company: item.company, start: item.start, end: item.end, description: item.description, order: item.order }); setEditingExp(item); setExpDialog("edit"); }} className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"><Pencil size={14} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteExp(item._id)} className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Skills ── */}
          {tab === "skills" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-lg font-semibold">Skills</h2><p className="text-muted-foreground text-sm">{skillItems.length} skills — higher order shown first</p></div>
                <Button onClick={() => { setSkillForm(emptySkill); setEditingSkill(null); setSkillDialog("add"); }} size="sm" className="bg-foreground hover:bg-foreground/80 text-background gap-1">
                  <Plus size={15} /> Add Skill
                </Button>
              </div>
              <div className="grid gap-3 mb-8">
                {skillItems.map((item) => (
                  <Card key={item._id} className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm hover:border-foreground/30 hover:shadow-md transition-all">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-8 text-center text-muted-foreground">{(() => { const I = getIconComponent(item.icon); return <I size={20} />; })()}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-foreground rounded-full" style={{ width: `${item.percent}%` }} />
                          </div>
                          <span className="text-muted-foreground text-xs w-8">{item.percent}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => { setSkillForm({ name: item.name, percent: item.percent, icon: item.icon, order: item.order }); setEditingSkill(item); setSkillDialog("edit"); }} className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"><Pencil size={14} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteSkill(item._id)} className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm max-w-2xl">
                <CardHeader className="px-5 pt-5 pb-2">
                  <CardTitle className="text-base text-foreground">Tools &amp; Technologies</CardTitle>
                  <p className="text-muted-foreground text-xs">Comma-separated list shown as tags on the portfolio</p>
                </CardHeader>
                <CardContent className="grid gap-4 px-5 pb-5">
                  <Textarea
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    className="bg-input border-input text-foreground min-h-[80px]"
                    placeholder="Django, Electron, Next.js, Git, ..."
                  />
                  <Button onClick={saveTools} disabled={loading} size="sm" className="bg-foreground hover:bg-foreground/80 text-background w-fit">
                    Save Tools
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Settings ── */}
          {tab === "settings" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-lg font-semibold">Site Settings</h2><p className="text-muted-foreground text-sm">Profile info &amp; social links</p></div>
                <Button onClick={saveSettings} disabled={loading} size="sm" className="bg-foreground hover:bg-foreground/80 text-background">
                  {settingsSaved ? "Saved ✓" : "Save Changes"}
                </Button>
              </div>
              <div className="grid gap-6 max-w-2xl">
                <Card className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm">
                  <CardHeader className="px-5 pt-5 pb-2"><CardTitle className="text-base text-foreground">Profile</CardTitle></CardHeader>
                  <CardContent className="grid gap-4 px-5 pb-5">
                    {(["name", "role"] as const).map((k) => (
                      <div key={k} className="grid gap-1.5">
                        <Label className="text-foreground/80 capitalize">{k === "role" ? "Role / Title" : "Full Name"}</Label>
                        <Input value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="bg-input border-input text-foreground" />
                      </div>
                    ))}
                    <div className="grid gap-1.5">
                      <Label className="text-foreground/80">Bio</Label>
                      <Textarea value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="bg-input border-input text-foreground min-h-[100px]" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label className="text-foreground/80">Profile Picture</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={settings.profilePic}
                          onChange={(e) => setSettings({ ...settings, profilePic: e.target.value })}
                          className="bg-input border-input text-foreground"
                          placeholder="/assets/... or https://..."
                        />
                        <input
                          ref={profileFileRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && uploadProfile(e.target.files[0])}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => profileFileRef.current?.click()}
                          disabled={uploadingProfile}
                          className="flex-shrink-0 h-10 px-3"
                        >
                          {uploadingProfile ? "..." : <Upload size={14} />}
                        </Button>
                        {settings.profilePic && <img src={settings.profilePic} alt="preview" className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm">
                  <CardHeader className="px-5 pt-5 pb-2"><CardTitle className="text-base text-foreground">Contact Info</CardTitle></CardHeader>
                  <CardContent className="grid gap-4 px-5 pb-5">
                    {(["email", "phone"] as const).map((k) => (
                      <div key={k} className="grid gap-1.5">
                        <Label className="text-foreground/80 capitalize">{k}</Label>
                        <Input value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="bg-input border-input text-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card py-0 gap-0 ring-0 border border-border shadow-sm">
                  <CardHeader className="px-5 pt-5 pb-2"><CardTitle className="text-base text-foreground">Social Links</CardTitle></CardHeader>
                  <CardContent className="grid gap-4 px-5 pb-5">
                    {(["github", "instagram", "facebook", "discord"] as const).map((k) => (
                      <div key={k} className="grid gap-1.5">
                        <Label className="text-foreground/80 capitalize">{k}</Label>
                        <Input value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="bg-input border-input text-foreground" placeholder={`https://${k}.com/...`} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Work Dialog */}
      <Dialog open={!!workDialog} onOpenChange={() => setWorkDialog(null)}>
        <DialogContent className="bg-card ring-0 border border-border text-foreground max-w-md shadow-2xl rounded-lg">
          <DialogHeader><DialogTitle className="text-foreground">{workDialog === "add" ? "Add Project" : "Edit Project"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5"><Label className="text-foreground/80">Title</Label><Input value={workForm.title} onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })} className="bg-input border-input text-foreground" placeholder="Project name" /></div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Description</Label><Textarea value={workForm.content} onChange={(e) => setWorkForm({ ...workForm, content: e.target.value })} className="bg-input border-input text-foreground" placeholder="Short description" /></div>
            <div className="grid gap-1.5">
              <Label className="text-foreground/80">Image URL</Label>
              <div className="flex gap-2">
                <Input value={workForm.image} onChange={(e) => setWorkForm({ ...workForm, image: e.target.value })} className="bg-input border-input text-foreground" placeholder="/assets/... or https://..." />
                {workForm.image && <img src={workForm.image} alt="preview" className="w-10 h-10 object-cover rounded flex-shrink-0" />}
              </div>
            </div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">GitHub / Live Link</Label><Input value={workForm.link} onChange={(e) => setWorkForm({ ...workForm, link: e.target.value })} className="bg-input border-input text-foreground" placeholder="https://github.com/..." /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setWorkDialog(null)} className="text-muted-foreground">Cancel</Button>
            <Button onClick={saveWork} disabled={loading} className="bg-foreground hover:bg-foreground/80 text-background">{loading ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Education Dialog */}
      <Dialog open={!!eduDialog} onOpenChange={() => setEduDialog(null)}>
        <DialogContent className="bg-card ring-0 border border-border text-foreground max-w-md shadow-2xl rounded-lg">
          <DialogHeader><DialogTitle className="text-foreground">{eduDialog === "add" ? "Add Education" : "Edit Education"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5"><Label className="text-foreground/80">Degree / Certificate</Label><Input value={eduForm.title} onChange={(e) => setEduForm({ ...eduForm, title: e.target.value })} className="bg-input border-input text-foreground" placeholder="e.g. Software Engineering" /></div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Institution</Label><Input value={eduForm.subtitle} onChange={(e) => setEduForm({ ...eduForm, subtitle: e.target.value })} className="bg-input border-input text-foreground" placeholder="e.g. Lithan Academy" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5"><Label className="text-foreground/80">Start Year</Label><Input value={eduForm.start} onChange={(e) => setEduForm({ ...eduForm, start: e.target.value })} className="bg-input border-input text-foreground" placeholder="2023" /></div>
              <div className="grid gap-1.5"><Label className="text-foreground/80">End Year</Label><Input value={eduForm.end} onChange={(e) => setEduForm({ ...eduForm, end: e.target.value })} className="bg-input border-input text-foreground" placeholder="Present" /></div>
            </div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Order (higher = newer)</Label><Input type="number" value={eduForm.order} onChange={(e) => setEduForm({ ...eduForm, order: Number(e.target.value) })} className="bg-input border-input text-foreground" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEduDialog(null)} className="text-muted-foreground">Cancel</Button>
            <Button onClick={saveEdu} disabled={loading} className="bg-foreground hover:bg-foreground/80 text-background">{loading ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skill Dialog */}
      <Dialog open={!!skillDialog} onOpenChange={() => setSkillDialog(null)}>
        <DialogContent className="bg-card ring-0 border border-border text-foreground max-w-md shadow-2xl rounded-lg">
          <DialogHeader><DialogTitle className="text-foreground">{skillDialog === "add" ? "Add Skill" : "Edit Skill"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5"><Label className="text-foreground/80">Skill Name</Label><Input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="bg-input border-input text-foreground" placeholder="e.g. Python" /></div>
            <div className="grid gap-1.5">
              <Label className="text-foreground/80">Icon</Label>
              <IconPicker value={skillForm.icon} onChange={(name) => setSkillForm({ ...skillForm, icon: name })} />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-foreground/80">Proficiency % ({skillForm.percent}%)</Label>
              <input type="range" min={0} max={100} value={skillForm.percent} onChange={(e) => setSkillForm({ ...skillForm, percent: Number(e.target.value) })} className="accent-foreground" />
            </div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Order (higher = shown first)</Label><Input type="number" value={skillForm.order} onChange={(e) => setSkillForm({ ...skillForm, order: Number(e.target.value) })} className="bg-input border-input text-foreground" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSkillDialog(null)} className="text-muted-foreground">Cancel</Button>
            <Button onClick={saveSkill} disabled={loading} className="bg-foreground hover:bg-foreground/80 text-background">{loading ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Experience Dialog */}
      <Dialog open={!!expDialog} onOpenChange={() => setExpDialog(null)}>
        <DialogContent className="bg-card ring-0 border border-border text-foreground max-w-md shadow-2xl rounded-lg">
          <DialogHeader><DialogTitle className="text-foreground">{expDialog === "add" ? "Add Experience" : "Edit Experience"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5"><Label className="text-foreground/80">Job Title</Label><Input value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} className="bg-input border-input text-foreground" placeholder="e.g. Frontend Developer" /></div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Company</Label><Input value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} className="bg-input border-input text-foreground" placeholder="e.g. Acme Corp" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5"><Label className="text-foreground/80">Start</Label><Input value={expForm.start} onChange={(e) => setExpForm({ ...expForm, start: e.target.value })} className="bg-input border-input text-foreground" placeholder="2023" /></div>
              <div className="grid gap-1.5"><Label className="text-foreground/80">End</Label><Input value={expForm.end} onChange={(e) => setExpForm({ ...expForm, end: e.target.value })} className="bg-input border-input text-foreground" placeholder="Present" /></div>
            </div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Description</Label><Textarea value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} className="bg-input border-input text-foreground" placeholder="What you did..." /></div>
            <div className="grid gap-1.5"><Label className="text-foreground/80">Order (higher = newer)</Label><Input type="number" value={expForm.order} onChange={(e) => setExpForm({ ...expForm, order: Number(e.target.value) })} className="bg-input border-input text-foreground" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setExpDialog(null)} className="text-muted-foreground">Cancel</Button>
            <Button onClick={saveExp} disabled={loading} className="bg-foreground hover:bg-foreground/80 text-background">{loading ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
