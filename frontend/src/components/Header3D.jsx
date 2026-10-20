import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, UserRound } from "lucide-react";
import { useAuth } from "../context/auth";
import Brand from "./studio/Brand";
const links = [
  ["Work", "/all-projects"],
  ["Services", "/services"],
  ["Studio", "/about-us"],
  ["Insights", "/blog"],
];
export default function Header3D() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const toggle = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="studio-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            to={user ? "/dashboard" : "/client-portal"}
            className="portal-link"
          >
            <UserRound size={17} />
            <span>{user ? "Dashboard" : "Client portal"}</span>
          </Link>
          <Link className="button button-dark header-cta" to="/quote">
            Let’s talk <ArrowUpRight size={17} />
          </Link>
          <button
            ref={toggle}
            className="mobile-menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav shell"
          key={location.pathname}
          aria-label="Mobile navigation"
        >
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={20} />
            </NavLink>
          ))}
          <Link to="/quote" onClick={() => setOpen(false)}>
            Start a project <ArrowUpRight size={20} />
          </Link>
        </nav>
      )}
    </header>
  );
}
