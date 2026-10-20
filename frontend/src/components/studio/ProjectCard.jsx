import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
const categories = {
  web: "Web development",
  mobile: "Mobile experience",
  branding: "Brand identity",
  marketing: "Digital strategy",
  design: "Product design",
};
export default function ProjectCard({ project, index = 0 }) {
  return (
    <Link
      className={`work-card work-tone-${index % 4}`}
      to={`/work/${project.slug}`}
    >
      <div className="work-image">
        <img
          src={project.image_url || project.image}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="work-view">
          <ArrowUpRight size={25} />
        </span>
        <span className="work-index">0{index + 1} / EXPLORATION</span>
      </div>
      <div className="work-caption">
        <div>
          <h3>{project.title}</h3>
          <p>{categories[project.category] || project.category}</p>
        </div>
        <ArrowUpRight size={24} />
      </div>
    </Link>
  );
}
