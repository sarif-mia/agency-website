import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  UserRound,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../context/auth";
import api from "../services/api";
import SEO from "../components/SEO";
import CollectionState from "../components/studio/CollectionState";
export default function ClientDashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [logoutError, setLogoutError] = useState("");
  const load = useCallback(() => {
    setState({ data: null, loading: true, error: "" });
    api.auth
      .overview()
      .then((data) => setState({ data, loading: false, error: "" }))
      .catch((error) =>
        setState({ data: null, loading: false, error: error.message }),
      );
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  async function signOut() {
    setLogoutError("");
    try {
      await logout();
    } catch {
      setLogoutError("We couldn’t securely sign you out. Please try again.");
    }
  }
  return (
    <div className="shell page-content">
      <SEO title="Your dashboard — SiteGenIT" robots="noindex, nofollow" />
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">YOUR CLIENT SPACE</span>
          <h1>Hello, {user.first_name || "there"}.</h1>
          <p>A clear view of your conversations with the studio.</p>
        </div>
        <button
          onClick={signOut}
          disabled={authLoading}
          className="button button-outline"
        >
          {authLoading ? "Signing out…" : "Sign out"}
          <LogOut size={16} />
        </button>
      </div>
      {logoutError && (
        <p role="alert" className="form-message error">
          {logoutError}
        </p>
      )}
      <CollectionState {...state} retry={load} />
      {state.data && (
        <>
          <div className="dashboard-cards">
            <article>
              <h2>
                <CalendarDays size={17} />
                Meeting requests
              </h2>
              <strong>{state.data.meeting_count}</strong>
              <p>Requested through your account</p>
            </article>
            <article>
              <h2>
                <Clock3 size={17} />
                Awaiting confirmation
              </h2>
              <strong>{state.data.pending_count}</strong>
              <p>We’ll be in touch to confirm</p>
            </article>
            <article>
              <h2>
                <UserRound size={17} />
                Your account
              </h2>
              <strong>↗</strong>
              <p>{user.email}</p>
            </article>
          </div>
          <div className="section-heading">
            <div>
              <span className="eyebrow">LET’S KEEP THINGS MOVING</span>
              <h2>Your meetings.</h2>
            </div>
            <Link to="/meeting" className="button button-dark">
              Request a meeting <ArrowUpRight size={17} />
            </Link>
          </div>
          {state.data.meetings.length ? (
            state.data.meetings.map((meeting) => (
              <article className="meeting-row" key={meeting.id}>
                <div>
                  <h3>
                    {meeting.meeting_type.replace(/^./, (x) => x.toUpperCase())}{" "}
                    with the studio
                  </h3>
                  <p>
                    {new Date(
                      meeting.preferred_date + "T12:00:00",
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {meeting.preferred_time} (Bangladesh time)
                  </p>
                  <p>{meeting.project_description}</p>
                </div>
                <span className="badge">{meeting.status}</span>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <CalendarDays size={34} strokeWidth={1} />
              <h3>Good conversations start here.</h3>
              <p>
                No meeting requests yet. Tell us what you’re working on, and
                let’s find a time to talk.
              </p>
              <Link to="/meeting" className="button button-outline">
                Request your first meeting <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </>
      )}
      <div className="inline-cta">
        <div>
          <h2>Something new on your mind?</h2>
          <p>Tell us about your next idea. We’d love to hear it.</p>
        </div>
        <Link to="/quote" className="button button-dark">
          Start a conversation <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
