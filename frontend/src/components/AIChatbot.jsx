import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <section className="chat-panel" aria-label="Studio quick links">
          <header>
            <h2>A good place to start.</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close quick links"
            >
              <X size={18} />
            </button>
          </header>
          <div>
            <p>
              Have something in mind? Find what you need, or tell us about your
              idea.
            </p>
            {[
              ["Discuss a project", "/quote"],
              ["Explore our services", "/services"],
              ["Visit the help center", "/help"],
              ["Open the client portal", "/client-portal"],
            ].map(([title, path]) => (
              <Link to={path} key={path} onClick={() => setOpen(false)}>
                {title}
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </section>
      )}
      <button
        className="chat-launcher"
        aria-label={
          open ? "Close studio quick links" : "Open studio quick links"
        }
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span>Let’s connect</span>
      </button>
    </>
  );
}
