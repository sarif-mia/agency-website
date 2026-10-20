import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="SiteGenIT home">
      <span className="brand-symbol">
        <ArrowUpRight size={24} strokeWidth={3} />
      </span>
      <span>
        sitegen<span className="brand-it">it</span>
        <span className="brand-dot">®</span>
      </span>
    </Link>
  );
}
