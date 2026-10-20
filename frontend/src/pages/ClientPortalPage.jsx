import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Asterisk, ArrowUpRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { useAuth } from "../context/auth";
export default function ClientPortalPage() {
  const { user, login, register, loading, restoring, sessionError } = useAuth();
  const [mode, setMode] = useState("login");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const from =
    location.state?.from?.pathname?.startsWith("/") &&
    !location.state.from.pathname.startsWith("//")
      ? location.state.from.pathname
      : "/dashboard";
  if (restoring)
    return (
      <div className="page-loading" role="status">
        <span className="spinner" />
        Checking your session…
      </div>
    );
  if (user) return <Navigate to={from} replace />;
  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  async function submit(e) {
    e.preventDefault();
    setError("");
    const result =
      mode === "login"
        ? await login(form.email, form.password)
        : await register(form.name, form.email, form.password, form.company);
    if (result.success) navigate(from, { replace: true });
    else setError(result.error);
  }
  return (
    <>
      <SEO title="Client portal — SiteGenIT" robots="noindex, nofollow" />
      <div className="portal-layout">
        <aside className="portal-art">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>
            Good work.
            <br />
            Great <span className="serif-word">connections.</span>
          </h1>
          <p>
            One place to keep your conversations and meeting requests moving
            forward.
          </p>
          <div className="orbit-art" aria-hidden="true">
            <i />
            <i />
            <i />
            <Asterisk size={95} />
          </div>
          <small>
            <ShieldCheck size={13} /> A private space for your collaboration.
          </small>
        </aside>
        <section className="portal-form">
          <div className="auth-tabs" aria-label="Account options">
            <button
              className={mode === "login" ? "selected" : ""}
              aria-pressed={mode === "login"}
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              Sign in
            </button>
            <button
              className={mode === "register" ? "selected" : ""}
              aria-pressed={mode === "register"}
              onClick={() => {
                setMode("register");
                setError("");
              }}
            >
              Create account
            </button>
          </div>
          <h2>
            {mode === "login" ? "Welcome back." : "Let’s get acquainted."}
          </h2>
          <p>
            {mode === "login"
              ? "Sign in to pick up where we left off."
              : "Create your account and start a conversation."}
          </p>
          {(error || sessionError) && (
            <div className="form-message error" role="alert">
              {error || sessionError}
            </div>
          )}
          <form onSubmit={submit}>
            {mode === "register" && (
              <>
                <div className="field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={150}
                    placeholder="Your name"
                    value={form.name}
                    onChange={update}
                  />
                </div>
                <div className="field">
                  <label htmlFor="auth-company">
                    Company <span>(optional)</span>
                  </label>
                  <input
                    id="auth-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={100}
                    placeholder="Where you do your thing"
                    value={form.company}
                    onChange={update}
                  />
                </div>
              </>
            )}
            <div className="field">
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={150}
                placeholder="you@company.com"
                value={form.email}
                onChange={update}
              />
            </div>
            <div className="field">
              <label htmlFor="auth-password">Password</label>
              <div className="password-field">
                <input
                  id="auth-password"
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  required
                  minLength={mode === "register" ? 8 : undefined}
                  placeholder={
                    mode === "login"
                      ? "Enter your password"
                      : "Create a strong password"
                  }
                  value={form.password}
                  onChange={update}
                  aria-describedby={
                    mode === "register" ? "password-help" : undefined
                  }
                />
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {mode === "register" && (
                <small className="password-help" id="password-help">
                  At least 8 characters. Avoid common passwords, only numbers,
                  or your personal details.
                </small>
              )}
            </div>
            <button
              type="submit"
              className="button button-dark"
              disabled={loading}
            >
              {loading
                ? "One moment…"
                : mode === "login"
                  ? "Sign in to your space"
                  : "Create your account"}
              <ArrowUpRight size={18} />
            </button>
          </form>
          {mode === "register" && (
            <p className="form-fineprint">
              By creating an account, you agree to our{" "}
              <Link to="/terms-conditions">terms</Link> and{" "}
              <Link to="/privacy-policy">privacy policy</Link>.
            </p>
          )}
          <p className="form-fineprint">
            Need a hand? <Link to="/quote">Get in touch with the studio.</Link>
          </p>
        </section>
      </div>
    </>
  );
}
