import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Globe2 } from "lucide-react";
import Brand from "./studio/Brand";
import api from "../services/api";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function subscribe(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await api.newsletter.subscribe(email);
      setStatus("You’re on the list. Thank you!");
      setEmail("");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <footer className="studio-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <span className="eyebrow light">
              GOOD THINGS START WITH A CONVERSATION
            </span>
            <h2>
              Have a good idea?
              <br />
              Let’s make it <em>great.</em>
            </h2>
          </div>
          <Link
            to="/quote"
            className="footer-circle"
            aria-label="Start a project"
          >
            <ArrowUpRight size={50} />
          </Link>
        </div>
        <div className="footer-grid">
          <div className="footer-about">
            <Brand />
            <p>
              Independent thinking.
              <br />
              Thoughtful design. Meaningful digital.
            </p>
            <span className="global-note">
              <Globe2 size={15} /> Based in Bangladesh. Working worldwide.
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            <Link to="/all-projects">Our work</Link>
            <Link to="/services">What we do</Link>
            <Link to="/about-us">The studio</Link>
            <Link to="/blog">Insights</Link>
          </div>
          <div>
            <h3>Let’s connect</h3>
            <Link to="/quote">
              Start a project <ArrowUpRight size={14} />
            </Link>
            <Link to="/partnership">Become a partner</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/client-portal">Client portal</Link>
          </div>
          <div className="footer-newsletter">
            <h3>A little inspiration. Occasionally.</h3>
            <p>Design thinking and useful digital ideas.</p>
            <form onSubmit={subscribe}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={busy}
              />
              <button disabled={busy} aria-label="Subscribe to newsletter">
                <ArrowRight size={20} />
              </button>
            </form>
            <p role="status">{status}</p>
            <small>
              By subscribing, you agree to our{" "}
              <Link to="/privacy-policy">privacy policy</Link>.
            </small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} SiteGenIT. Made with intention.
          </span>
          <div>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-conditions">Terms</Link>
            <Link to="/help">Help center</Link>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
