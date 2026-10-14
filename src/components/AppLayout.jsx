import { useState } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronRight,
  CircleHelp,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLearning } from "../context/LearningContext";

const navigationLinks = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/courses", label: "Explore courses", icon: Compass },
  { to: "/learning", label: "My learning", icon: GraduationCap },
];

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { enrolled, user } = useLearning();

  return (
    <>
      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <button
          className="sidebar-scrim"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <BookOpen size={21} />
          </span>
          <span>
            skill<span className="brand-accent">up</span>
            <small>LEARN WITHOUT LIMITS</small>
          </span>
        </Link>
        <div className="nav-label">MENU</div>
        <nav>
          {navigationLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-link transition-colors duration-200 ease-out ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
              {to === "/learning" && (
                <span className="nav-count">{enrolled.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <CircleHelp size={18} />
            </div>
            <strong>Need a hand?</strong>
            <p>We're here to help you learn.</p>
            <a href="mailto:hello@skillup.example">
              Get support <ArrowRight size={14} />
            </a>
          </div>
          <div className="sidebar-user">
            <div className="avatar">DP</div>
            <div>
              <strong>{user?.name || "Guest learner"}</strong>
              <small>{user ? "Learner account" : "Welcome to SkillUp"}</small>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar() {
  const { user } = useLearning();
  const location = useLocation();
  const title = location.pathname.startsWith("/courses/")
    ? "Course details"
    : location.pathname === "/learning"
      ? "My learning"
      : location.pathname === "/courses"
        ? "Explore courses"
        : location.pathname === "/login" || location.pathname === "/register"
          ? "Your account"
          : "Learning dashboard";

  return (
    <header className="topbar">
      <div className="breadcrumbs">
        Pages <ChevronRight size={14} /> <strong>{title}</strong>
      </div>
      <div className="top-actions">
        <label className="top-search">
          <Search size={17} />
          <input
            placeholder="Search anything..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                window.location.href =
                  "/courses?q=" + encodeURIComponent(event.target.value);
              }
            }}
          />
        </label>
        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
          <i />
        </button>
        <Link to={user ? "/learning" : "/login"} className="top-profile">
          <span className="avatar small">
            {user?.name?.slice(0, 1).toUpperCase() || "D"}
          </span>
          <span>{user?.name?.split(" ")[0] || "Sign in"}</span>
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 SkillUp Academy</span>
      <span>
        Learn a little. Grow a lot. <span className="footer-heart">♥</span>
      </span>
    </footer>
  );
}

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <Topbar />
        <div className="page-wrap">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}