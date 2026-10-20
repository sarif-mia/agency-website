import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe2, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import api from "../services/api";
import { useAuth } from "../context/auth";
export default function ContactPage({ meeting = false, partnership = false }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user
      ? [user.first_name, user.last_name].filter(Boolean).join(" ")
      : "",
    email: user?.email || "",
    company: "",
    message: "",
    budget_range: "",
    project_timeline: "",
    preferred_date: "",
    preferred_time: "",
    meeting_type: "consultation",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (meeting)
        await api.meeting.scheduleRequest({
          name: form.name,
          email: form.email,
          company: form.company,
          meeting_type: form.meeting_type,
          preferred_date: form.preferred_date,
          preferred_time: form.preferred_time,
          project_description: form.message,
        });
      else
        await api.contact.sendMessage({
          name: form.name,
          email: form.email,
          company: form.company,
          subject: partnership ? "Partnership inquiry" : "New project inquiry",
          message_type: partnership ? "partnership" : "project",
          message: form.message,
          budget_range: form.budget_range,
          project_timeline: form.project_timeline,
        });
      setSuccess(true);
    } catch (err) {
      setError(
        err.name === "TimeoutError"
          ? "The request timed out. Check with us before sending again to avoid a duplicate."
          : err.message,
      );
    } finally {
      setBusy(false);
    }
  }
  const title = meeting
    ? "A good conversation changes things."
    : partnership
      ? "Better, together."
      : "Every great thing starts with an idea.";
  return (
    <div className="shell">
      <SEO
        title={`${meeting ? "Request a meeting" : partnership ? "Partnerships" : "Start a project"} — SiteGenIT`}
      />
      <div className="page-hero">
        <span className="eyebrow">
          {meeting
            ? "LET’S FIND A TIME"
            : partnership
              ? "COLLABORATION WITHOUT BORDERS"
              : "YOUR NEXT CHAPTER"}
        </span>
        <h1>{title}</h1>
        <p>
          {meeting
            ? "Tell us a little about your plans and suggest a time. We’ll review your request and confirm the details."
            : "Big plans or the beginning of a thought? We’d love to hear what you have in mind."}
        </p>
      </div>
      <div className="contact-layout page-content">
        <aside className="contact-aside">
          <h2>
            Good people.
            <br />
            <span className="serif-word">Great possibilities.</span>
          </h2>
          <p>
            Share your ambition, your challenge, or that idea you can’t stop
            thinking about. We’ll help you work out what comes next.
          </p>
          <div className="contact-detail">
            <h3>
              <Globe2 size={17} /> Close collaboration. Anywhere.
            </h3>
            <p>
              Based in Bangladesh.
              <br />
              Working with people around the world.
            </p>
          </div>
          <div className="contact-detail">
            <h3>What happens next?</h3>
            <p>
              We review your brief, ask the right questions, and arrange a
              conversation to explore the fit.
            </p>
          </div>
          {meeting && !user && (
            <div className="notice" style={{ marginTop: 24 }}>
              <Link
                className="text-link"
                to="/client-portal"
                state={{ from: { pathname: "/meeting" } }}
              >
                Sign in before requesting <ArrowUpRight size={15} />
              </Link>
              <p>So you can follow your request in your dashboard.</p>
            </div>
          )}
        </aside>
        <section className="form-panel">
          {success ? (
            <div className="empty-state" role="status">
              <CheckCircle2 size={40} strokeWidth={1} />
              <h2>
                {meeting
                  ? "Your meeting request is in."
                  : "Your idea is in good hands."}
              </h2>
              <p>
                {meeting
                  ? "Your requested time is not confirmed yet. The studio will review the details and follow up."
                  : "Your message has been saved. The studio will review it and get back to you."}
              </p>
              {meeting && user ? (
                <Link to="/dashboard" className="button button-dark">
                  View your dashboard <ArrowUpRight size={17} />
                </Link>
              ) : (
                <Link to="/all-projects" className="button button-dark">
                  Explore our work <ArrowUpRight size={17} />
                </Link>
              )}
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="contact-name">Your name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={form.name}
                    onChange={update}
                    placeholder="How should we call you?"
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="field field-wide">
                  <label htmlFor="contact-company">Company or brand</label>
                  <input
                    id="contact-company"
                    name="company"
                    maxLength={100}
                    autoComplete="organization"
                    value={form.company}
                    onChange={update}
                    placeholder="Your company (optional)"
                  />
                </div>
                {meeting ? (
                  <>
                    <div className="field field-wide">
                      <label htmlFor="meeting-type">
                        What would you like to discuss? *
                      </label>
                      <select
                        id="meeting-type"
                        name="meeting_type"
                        value={form.meeting_type}
                        onChange={update}
                      >
                        <option value="consultation">
                          Initial consultation
                        </option>
                        <option value="project">Project discussion</option>
                        <option value="support">Technical support</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="meeting-date">Preferred date *</label>
                      <input
                        id="meeting-date"
                        type="date"
                        name="preferred_date"
                        min={today}
                        required
                        value={form.preferred_date}
                        onChange={update}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="meeting-time">
                        Preferred time (UTC+6) *
                      </label>
                      <select
                        id="meeting-time"
                        name="preferred_time"
                        value={form.preferred_time}
                        onChange={update}
                        required
                      >
                        <option value="">Choose a time</option>
                        {[
                          "09:00",
                          "10:00",
                          "11:00",
                          "14:00",
                          "15:00",
                          "16:00",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time} · Bangladesh time
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="field">
                      <label htmlFor="contact-budget">Estimated budget</label>
                      <select
                        id="contact-budget"
                        name="budget_range"
                        value={form.budget_range}
                        onChange={update}
                      >
                        <option value="">Let’s discuss</option>
                        <option>$1,000–$5,000 USD</option>
                        <option>$5,000–$15,000 USD</option>
                        <option>$15,000–$30,000 USD</option>
                        <option>$30,000+ USD</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="contact-timeline">
                        Your ideal timeline
                      </label>
                      <select
                        id="contact-timeline"
                        name="project_timeline"
                        value={form.project_timeline}
                        onChange={update}
                      >
                        <option value="">I’m flexible</option>
                        <option>Within a month</option>
                        <option>1–3 months</option>
                        <option>3–6 months</option>
                        <option>Just exploring</option>
                      </select>
                    </div>
                  </>
                )}
                <div className="field field-wide">
                  <label htmlFor="contact-message">
                    Tell us a little more *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={meeting ? 20 : 10}
                    maxLength={10000}
                    value={form.message}
                    onChange={update}
                    placeholder="What are you working on? What would you love to make happen?"
                    rows={5}
                  />
                </div>
              </div>
              {error && (
                <p className="form-message error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="button button-dark"
                disabled={busy}
                type="submit"
              >
                {busy
                  ? "Sending…"
                  : meeting
                    ? "Request a conversation"
                    : "Send your idea"}
                <ArrowUpRight size={19} />
              </button>
              <p className="form-fineprint">
                By sending, you agree to our{" "}
                <Link to="/privacy-policy">privacy policy</Link>. Your
                information is used to respond to your inquiry.
              </p>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
