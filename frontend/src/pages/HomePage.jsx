import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Asterisk,
  Sparkles,
  Code2,
  Layers3,
  Palette,
  Globe2,
  Check,
} from "lucide-react";
import SEO from "../components/SEO";
import useCollection from "../components/studio/useCollection";
import CollectionState from "../components/studio/CollectionState";
import ProjectCard from "../components/studio/ProjectCard";

const services = [
  {
    icon: Palette,
    title: "Brand & digital design",
    text: "A clear identity. An unmistakable presence. We give your brand a visual language of its own.",
    tags: "Brand identity / UI & UX / Design systems",
  },
  {
    icon: Code2,
    title: "Websites & development",
    text: "Beautiful on the surface. Powerful underneath. Digital experiences built to work as well as they look.",
    tags: "Websites / E-commerce / Web applications",
  },
  {
    icon: Globe2,
    title: "Strategy & growth",
    text: "Turn the right insights into your next opportunity. A thoughtful roadmap for what comes next.",
    tags: "Digital strategy / SEO / Performance",
  },
];
const steps = [
  [
    "01",
    "Discover",
    "We listen first. Together, we get clear on your audience, ambitions, and the problem worth solving.",
  ],
  [
    "02",
    "Design",
    "Ideas take shape. We explore, prototype, and refine a direction that feels distinctly yours.",
  ],
  [
    "03",
    "Develop",
    "We bring it to life. Thoughtful engineering turns the design into a fast, accessible experience.",
  ],
  [
    "04",
    "Deliver",
    "A confident launch. We test the details, share the knowledge, and help you take the next step.",
  ],
];
export default function HomePage() {
  const collection = useCollection(
    "/projects/?ordering=-is_featured,-created_at",
  );
  const projects = collection.data?.results || [];
  return (
    <>
      <SEO
        title="SiteGenIT — Independent Digital Design & Development Studio"
        description="We turn ambitious ideas into thoughtful brands, websites, and digital products. An independent creative studio in Bangladesh, working worldwide."
        url="/"
      />
      <section className="hero-studio shell">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" /> INDEPENDENT DIGITAL STUDIO
          </span>
          <h1>
            Good ideas.
            <br />
            Great design.
            <br />
            <span className="serif-word">Real impact.</span>
            <span className="hero-asterisk">
              <Asterisk />
            </span>
          </h1>
          <p>
            We bring a fresh perspective to brands, websites,
            <br className="desktop-break" /> and digital products. Built with
            care. Made to matter.
          </p>
          <div className="hero-buttons">
            <Link to="/quote" className="button button-dark">
              Let’s build something <ArrowUpRight size={19} />
            </Link>
            <Link to="/all-projects" className="text-link">
              Explore our work <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-note">
            <span className="mini-orbit">↗</span>
            <span>
              A small, focused team.
              <br />
              <strong>A world of possibilities.</strong>
            </span>
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="A conceptual brand and website design"
        >
          <div className="visual-grid" />
          <span className="visual-caption">A LITTLE OF WHAT’S POSSIBLE</span>
          <div className="mock-browser">
            <div className="browser-toolbar">
              <span />
              <span />
              <span />
              <small>made with intention</small>
              <ArrowUpRight size={12} />
            </div>
            <div className="mock-nav">
              <strong>
                forma<span>®</span>
              </strong>
              <span>Objects & spaces</span>
              <span>Menu +</span>
            </div>
            <div className="mock-body">
              <span className="mock-kicker">LESS, BUT BETTER.</span>
              <h2>
                Room for
                <br />
                <em>something</em>
                <br />
                extraordinary.
              </h2>
              <div className="sculpture">
                <div className="sculpture-arch" />
                <div className="sculpture-ball" />
                <div className="sculpture-plinth" />
              </div>
              <div className="mock-bottom">
                <span>
                  Thoughtfully crafted.
                  <br />
                  Every single detail.
                </span>
                <span className="mock-arrow">↗</span>
              </div>
            </div>
          </div>
          <div className="floating-label">
            <span>
              <Layers3 size={19} />
            </span>
            <div>
              Design meets purpose.<small>And a little bit of magic.</small>
            </div>
            <Sparkles size={17} />
          </div>
          <div className="visual-stamp">
            <span>GOOD DESIGN</span>
            <Asterisk size={38} />
            <span>GREAT POSSIBILITIES</span>
          </div>
        </div>
      </section>
      <section className="tools-strip shell">
        <span>GOOD IDEAS. SOLID FOUNDATIONS.</span>
        <div>
          <strong>
            React<span>↗</span>
          </strong>
          <strong>
            django<span>®</span>
          </strong>
          <strong>
            Figma<span>✳</span>
          </strong>
          <strong>
            WordPress<span>↗</span>
          </strong>
          <strong>
            Shopify<span>®</span>
          </strong>
        </div>
      </section>
      <section className="studio-section shell" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / WHAT WE DO</span>
            <h2>
              From first thought
              <br />
              to <span className="serif-word">next big thing.</span>
            </h2>
          </div>
          <p>
            Strategy, design, and technology.
            <br />
            The right mix to move your business forward.
          </p>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text, tags }, i) => (
            <Link to="/services" className="service-card" key={title}>
              <div className="service-card-top">
                <Icon size={30} strokeWidth={1.3} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-card-bottom">
                <small>{tags}</small>
                <ArrowUpRight size={21} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="work-section" id="portfolio">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / IDEAS IN ACTION</span>
              <h2>
                Made to stand out.
                <br />
                <span className="serif-word">Built to make sense.</span>
              </h2>
            </div>
            <Link to="/all-projects" className="button button-outline">
              Explore the portfolio <ArrowUpRight size={18} />
            </Link>
          </div>
          <p className="section-intro">
            A look at our portfolio concepts and digital explorations.
          </p>
          <CollectionState {...collection} empty={!projects.length} />
          <div className="work-grid">
            {projects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="about-band shell" id="about">
        <div className="about-art" aria-hidden="true">
          <span>
            DIFFERENT MINDS.
            <br />
            SHARED AMBITION.
          </span>
          <div className="orbit-art">
            <i />
            <i />
            <i />
            <Asterisk size={110} />
          </div>
          <small>THE BEST WORK HAPPENS TOGETHER. ↗</small>
        </div>
        <div className="about-copy">
          <span className="eyebrow">03 / SMALL STUDIO, BIG PICTURE</span>
          <h2>
            Your ambition.
            <br />
            Our <span className="serif-word">shared obsession.</span>
          </h2>
          <p>
            We’re designers, developers, and curious thinkers who believe the
            best digital work starts with a real conversation.
          </p>
          <p>
            No layers of handoffs. No one-size-fits-all answers. Just a focused
            team working closely with you to make something worth putting into
            the world.
          </p>
          <Link to="/about-us" className="text-link">
            Meet the studio <ArrowUpRight size={19} />
          </Link>
          <div className="about-principles">
            {[
              "Direct collaboration",
              "Thoughtful craftsmanship",
              "A global perspective",
            ].map((x) => (
              <span key={x}>
                <Check size={15} />
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="process-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">04 / HOW WE GET THERE</span>
              <h2>
                Good chemistry.
                <br />
                <span className="serif-word">A clear process.</span>
              </h2>
            </div>
            <p>
              From the first hello to the final detail,
              <br />
              you’ll know where we’re heading.
            </p>
          </div>
          <div className="process-grid">
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <span className="step-number">
                  {number}
                  <ArrowRight size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-cta shell">
        <span className="eyebrow">
          <span className="status-dot" /> OPEN TO GOOD CONVERSATIONS
        </span>
        <h2>
          Let’s make your
          <br />
          next move <span className="serif-word">a good one.</span>
        </h2>
        <Link className="button button-dark" to="/quote">
          Tell us what you’re thinking <ArrowUpRight size={19} />
        </Link>
        <Asterisk className="cta-asterisk" aria-hidden="true" />
      </section>
    </>
  );
}
