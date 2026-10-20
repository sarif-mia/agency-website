import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Palette,
  Smartphone,
  Globe2,
  Compass,
  Layers3,
  Download,
  Asterisk,
} from "lucide-react";
import SEO from "../components/SEO";
import useCollection from "../components/studio/useCollection";
import CollectionState from "../components/studio/CollectionState";
import ProjectCard from "../components/studio/ProjectCard";

function PageIntro({ eyebrow, title, text }) {
  return (
    <div className="page-hero">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}
function NextStep({
  title = "Have something in mind?",
  text = "Let’s turn that first thought into a good next step.",
}) {
  return (
    <div className="inline-cta">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link to="/quote" className="button button-dark">
        Let’s talk <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
const serviceDetails = [
  [
    "Brand & identity",
    Palette,
    "A brand that knows who it is. We define your visual language and create a coherent identity across every touchpoint.",
    ["Brand direction", "Logo & visual identity", "Brand guidelines"],
  ],
  [
    "Web design & development",
    Code2,
    "Digital homes with real character. Fast, accessible websites designed around your audience and built for your goals.",
    ["Responsive websites", "Content management", "E-commerce"],
  ],
  [
    "Product & UX design",
    Layers3,
    "Make the complicated feel simple. We shape thoughtful products around the people who use them.",
    ["User journeys", "Interactive prototypes", "Design systems"],
  ],
  [
    "Mobile experiences",
    Smartphone,
    "Your product, wherever life happens. Useful, intuitive interfaces for people on the move.",
    ["Mobile UI & UX", "Cross-platform development", "Usability testing"],
  ],
  [
    "Digital strategy",
    Compass,
    "A clear direction before the first pixel. Get clarity on your proposition, priorities, and digital opportunities.",
    ["Discovery workshops", "Digital roadmaps", "Content strategy"],
  ],
  [
    "Search & performance",
    Globe2,
    "Help the right people find you. Technical foundations and useful content that support sustainable growth.",
    ["Technical SEO", "Website performance", "Analytics foundations"],
  ],
];
export function ServicesPage() {
  return (
    <div className="shell page-content">
      <SEO title="Services — SiteGenIT" />
      <PageIntro
        eyebrow="DESIGN, TECHNOLOGY & A LITTLE CURIOSITY"
        title={
          <>
            Built around your
            <br />
            <span className="serif-word">next big idea.</span>
          </>
        }
        text="From defining your brand to launching your next digital product. The right expertise, brought together around your ambition."
      />
      <div className="cards-grid">
        {serviceDetails.map(([title, Icon, text, tags], i) => (
          <article className="service-card" key={title}>
            <div className="service-card-top">
              <Icon size={32} strokeWidth={1.3} />
              <span>0{i + 1}</span>
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "-.7px",
                marginBottom: 16,
              }}
            >
              {title}
            </h2>
            <p>{text}</p>
            <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
              {tags.map((tag) => (
                <span key={tag} style={{ fontSize: 12 }}>
                  ↗ {tag}
                </span>
              ))}
            </div>
            <Link to="/quote" className="text-link" style={{ marginTop: 25 }}>
              Let’s explore <ArrowUpRight size={17} />
            </Link>
          </article>
        ))}
      </div>
      <NextStep />
    </div>
  );
}
export function ProjectsPage() {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const path = `/projects/?page=${page}${category ? `&category=${category}` : ""}`;
  const collection = useCollection(path);
  const projects = collection.data?.results || [];
  return (
    <div className="shell page-content">
      <SEO title="Work & explorations — SiteGenIT" />
      <PageIntro
        eyebrow="OUR CREATIVE PERSPECTIVE"
        title={
          <>
            A little bold.
            <br />
            <span className="serif-word">A lot of purpose.</span>
          </>
        }
        text="Explore our portfolio concepts across brands, websites, and digital products. Different challenges. The same attention to detail."
      />
      <div className="filter-bar" aria-label="Filter projects">
        {[
          ["", "All explorations"],
          ["web", "Websites"],
          ["mobile", "Mobile"],
          ["branding", "Branding"],
          ["design", "Design"],
          ["marketing", "Marketing"],
        ].map(([value, label]) => (
          <button
            key={value}
            aria-pressed={category === value}
            className={category === value ? "selected" : ""}
            onClick={() => {
              setCategory(value);
              setPage(1);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <CollectionState {...collection} empty={!projects.length} />
      <div className="work-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      {collection.data && (collection.data.next || page > 1) && (
        <div className="pagination">
          <button
            className="button button-outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            className="button button-outline"
            disabled={!collection.data.next}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
      <NextStep />
    </div>
  );
}
export function AboutPage() {
  return (
    <div className="shell page-content">
      <SEO title="The studio — SiteGenIT" />
      <PageIntro
        eyebrow="INDEPENDENT MINDS. SHARED AMBITION."
        title={
          <>
            Small by choice.
            <br />
            <span className="serif-word">Thoughtful by nature.</span>
          </>
        }
        text="We’re a digital studio bringing design and technology together to help ambitious people make good things happen."
      />
      <div className="about-band" style={{ paddingTop: 0 }}>
        <div className="about-art" aria-hidden="true">
          <span>
            THINK CLEARLY.
            <br />
            CREATE BOLDLY.
          </span>
          <div className="orbit-art">
            <i />
            <i />
            <i />
            <Asterisk size={100} />
          </div>
          <small>GOOD PEOPLE MAKE GOOD THINGS. ↗</small>
        </div>
        <div className="about-copy">
          <span className="eyebrow">
            BASED IN BANGLADESH. CONNECTED TO THE WORLD.
          </span>
          <h2>
            A fresh perspective.
            <br />
            <span className="serif-word">A personal approach.</span>
          </h2>
          <p>
            We believe a smaller, focused team can make a bigger difference. You
            work directly with the people thinking, designing, and building your
            project.
          </p>
          <p>
            We ask questions. We pay attention. We care about the decisions that
            make an experience easier, clearer, and a little more memorable.
          </p>
          <Link to="/quote" className="text-link">
            Get to know us <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE THINGS WE COME BACK TO</span>
          <h2>
            Our kind of <span className="serif-word">thinking.</span>
          </h2>
        </div>
      </div>
      <div className="service-grid">
        {[
          [
            "Clarity before complexity.",
            "Understand the problem before jumping to a solution. The best work makes things simpler.",
          ],
          [
            "Craft in every detail.",
            "A considered layout, a faster interaction, an accessible form. The little things add up.",
          ],
          [
            "Collaboration over handoffs.",
            "You bring the knowledge of your business. We bring the craft. Together, we make it stronger.",
          ],
        ].map(([title, text]) => (
          <article className="service-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <NextStep />
    </div>
  );
}
export function TeamPage() {
  return (
    <div className="shell page-content">
      <SEO title="Our people & approach — SiteGenIT" />
      <PageIntro
        eyebrow="THE STUDIO IS A TEAM SPORT"
        title={
          <>
            Different skills.
            <br />
            <span className="serif-word">One shared direction.</span>
          </>
        }
        text="Strategy, design, and development work best when the conversation is open. Here’s how our disciplines come together."
      />
      <div className="service-grid">
        {[
          [
            "01",
            "Strategy & collaboration",
            "Curious minds who ask the right questions, shape the brief, and keep the project moving.",
          ],
          [
            "02",
            "Design & experience",
            "Visual thinkers turning complex ideas into clear identities and intuitive digital experiences.",
          ],
          [
            "03",
            "Development & delivery",
            "Thoughtful engineers bringing the experience to life, testing the details, and building for the future.",
          ],
        ].map(([num, title, text]) => (
          <article className="content-card" key={num}>
            <div className="team-initials">{num} ↗</div>
            <div className="content-card-body">
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <NextStep title="Good work starts with good chemistry." />
    </div>
  );
}
export function ContentListPage({ kind = "blog" }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isBlog = kind === "blog";
  const isHelp = kind === "help";
  const title = isBlog ? (
    <>
      Fresh thoughts.
      <br />
      <span className="serif-word">Useful perspectives.</span>
    </>
  ) : isHelp ? (
    <>
      A little clarity.
      <br />
      <span className="serif-word">A lot less guesswork.</span>
    </>
  ) : (
    <>
      A closer look at
      <br />
      <span className="serif-word">the thinking.</span>
    </>
  );
  const collection = useCollection(
    `/${kind}/?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
  );
  const items = collection.data?.results || [];
  return (
    <div className="shell page-content">
      <SEO
        title={`${isBlog ? "Insights" : isHelp ? "Help center" : "Case studies"} — SiteGenIT`}
      />
      <PageIntro
        eyebrow={
          isBlog
            ? "NOTES FROM THE STUDIO"
            : isHelp
              ? "WE’RE HERE TO HELP"
              : "BEHIND THE EXPLORATIONS"
        }
        title={title}
        text={
          isBlog
            ? "Ideas on design, technology, and building a more thoughtful digital world."
            : isHelp
              ? "Answers to common questions about working with us, your account, and getting a project started."
              : "Portfolio concepts that explore the challenge, the approach, and a possible way forward."
        }
      />
      {!isHelp && (
        <div className="notice">
          {isBlog
            ? "From the studio library: introductory articles and ideas for your next project."
            : "These sample case studies illustrate possible approaches and outcomes. They are not verified client results."}
        </div>
      )}
      <div className="filter-bar">
        <label htmlFor="content-search" className="eyebrow">
          {isHelp ? "FIND AN ANSWER" : "EXPLORE THE LIBRARY"}
        </label>
        <input
          id="content-search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={isHelp ? "Search help articles…" : "Search articles…"}
          type="search"
        />
      </div>
      <CollectionState {...collection} empty={!items.length} />
      <div className="cards-grid">
        {items.map((item) => (
          <article className="content-card" key={item.id}>
            {(item.featured_image_url || item.featured_image) && (
              <img
                src={item.featured_image_url || item.featured_image}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <div className="content-card-body">
              <span className="eyebrow">
                {item.read_time
                  ? `${item.read_time} MIN READ`
                  : item.industry || item.category || "STUDIO NOTES"}
              </span>
              <h2>{item.title}</h2>
              <p>{item.excerpt || item.client_name}</p>
              <Link to={`/${kind}/${item.slug}`} className="text-link">
                Read the{" "}
                {isHelp ? "answer" : isBlog ? "article" : "exploration"}{" "}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {collection.data && (collection.data.next || page > 1) && (
        <div className="pagination">
          <button
            className="button button-outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            className="button button-outline"
            disabled={!collection.data.next}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
      {isHelp && (
        <div className="faq-list" style={{ marginTop: 35 }}>
          {[
            [
              "How do I start a project?",
              "Send us your idea through the project inquiry form. Include your goals, timeline, and any useful context. We’ll review it and get in touch to explore the fit.",
            ],
            [
              "Can we work together from another country?",
              "Yes. We work remotely and can plan a collaboration schedule around the time zones involved. Meeting requests are shown in Bangladesh time (UTC+6).",
            ],
            [
              "How do I track a meeting request?",
              "Create an account, sign in, and request a meeting while signed in. Your request and its status will appear in your client dashboard.",
            ],
            [
              "Is a requested meeting automatically confirmed?",
              "No. A meeting request is a suggested time. The studio reviews the details and contacts you to confirm.",
            ],
            [
              "What if I need help accessing my account?",
              "Use the project contact form and select a clear subject in your message. Do not include your password. We’ll help you find the next step.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      )}
      <NextStep title={isHelp ? "Still have a question?" : undefined} />
    </div>
  );
}
function plainContent(content) {
  if (!content) return "";
  const doc = new DOMParser().parseFromString(
    content.replace(/<\/(p|h[1-6]|div|li)>/gi, "</$1>\n\n"),
    "text/html",
  );
  doc.querySelectorAll("script,style").forEach((node) => node.remove());
  return doc.body.textContent || "";
}
export function DetailPage({ kind = "projects" }) {
  const { slug } = useParams();
  const collection = useCollection(`/${kind}/${encodeURIComponent(slug)}/`);
  const item = collection.data;
  const isProject = kind === "projects";
  const isCase = kind === "case-studies";
  const back = isProject ? "/all-projects" : `/${kind}`;
  return (
    <div className="shell page-content">
      <SEO
        title={
          item ? `${item.title} — SiteGenIT` : "Studio exploration — SiteGenIT"
        }
      />
      <div style={{ paddingTop: 35 }}>
        <Link to={back} className="text-link">
          ← Back to{" "}
          {isProject
            ? "work"
            : kind === "blog"
              ? "insights"
              : kind === "help"
                ? "help"
                : "case studies"}
        </Link>
      </div>
      <CollectionState {...collection} />
      {item && (
        <>
          <PageIntro
            eyebrow={
              isProject
                ? "PORTFOLIO CONCEPT"
                : isCase
                  ? "CASE STUDY EXPLORATION"
                  : kind === "help"
                    ? "HELP CENTER"
                    : "STUDIO NOTES"
            }
            title={item.title}
            text={item.description || item.excerpt}
          />
          {(isProject || isCase) && (
            <p className="notice">
              A portfolio concept from our studio library. Names and
              illustrative results in sample content do not represent verified
              client engagements.
            </p>
          )}
          {(item.image_url ||
            item.image ||
            item.featured_image_url ||
            item.featured_image) && (
            <img
              className="article-cover"
              src={
                item.image_url ||
                item.image ||
                item.featured_image_url ||
                item.featured_image
              }
              alt={item.title}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <article className="article-body">
            {isCase ? (
              <>
                {[
                  ["The challenge", item.challenge],
                  ["The approach", item.solution],
                  ["Illustrative outcomes", item.results],
                ].map(([heading, text]) => (
                  <section key={heading}>
                    <h2>{heading}</h2>
                    <p>{plainContent(text)}</p>
                  </section>
                ))}
              </>
            ) : (
              <p>
                {plainContent(
                  item.detailed_description || item.content || item.description,
                )}
              </p>
            )}
            {item.technologies?.length > 0 && (
              <>
                <h2>Built with</h2>
                <p>{item.technologies.join(" · ")}</p>
              </>
            )}
          </article>
          <NextStep title="What could this look like for you?" />
        </>
      )}
    </div>
  );
}
export function CareersPage() {
  const collection = useCollection("/careers/");
  const jobs = collection.data?.results || [];
  return (
    <div className="shell page-content">
      <SEO title="Careers — SiteGenIT" />
      <PageIntro
        eyebrow="GOOD PEOPLE MAKE GOOD THINGS"
        title={
          <>
            Bring your curiosity.
            <br />
            <span className="serif-word">Make your mark.</span>
          </>
        }
        text="We’re always interested in thoughtful people who care about their craft. Explore the current opportunities below."
      />
      <CollectionState {...collection} />
      {!collection.loading && !collection.error && !jobs.length ? (
        <div className="empty-state">
          <Asterisk size={40} />
          <h2>No open roles right now.</h2>
          <p>
            Have a skill and a perspective we should know about? Introduce
            yourself through our contact form.
          </p>
          <Link to="/quote" className="button button-dark">
            Say hello <ArrowUpRight size={17} />
          </Link>
        </div>
      ) : (
        <div className="cards-grid">
          {jobs.map((job) => (
            <article className="content-card" key={job.id}>
              <div className="content-card-body">
                <span className="eyebrow">
                  {job.department} / {job.job_type}
                </span>
                <h2>{job.title}</h2>
                <p>{job.location}</p>
                <Link className="text-link" to="/quote">
                  Ask about this role <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
export function ResourcesPage() {
  return (
    <div className="shell page-content">
      <SEO title="Resources — SiteGenIT" />
      <PageIntro
        eyebrow="A LITTLE HEAD START"
        title={
          <>
            Better questions.
            <br />
            <span className="serif-word">Better beginnings.</span>
          </>
        }
        text="Practical resources to help you prepare for your next website, brand, or digital product."
      />
      <div className="resources-download">
        <div>
          <span className="eyebrow">FREE DOWNLOAD / MARKDOWN</span>
          <h2 style={{ fontSize: 27, fontWeight: 500, marginTop: 12 }}>
            The project brief checklist
          </h2>
          <p>
            A simple guide to defining your goals, audience, scope, and success
            criteria.
          </p>
        </div>
        <a
          href="/resources/project-brief-checklist.md"
          download
          className="button button-dark"
        >
          Download checklist <Download size={17} />
        </a>
      </div>
      <div className="detail-list">
        {[
          [
            "Start with the problem.",
            "Describe what’s difficult today and what you want to change. A clear problem is more useful than a list of features.",
          ],
          [
            "Know your audience.",
            "Who are we designing for? What do they need to find, understand, or do?",
          ],
          [
            "Define the essentials.",
            "Separate what you need at launch from what can wait. It keeps the project focused.",
          ],
          [
            "Choose meaningful measures.",
            "Decide how you’ll judge the result: clearer inquiries, easier tasks, or a faster, more accessible experience.",
          ],
        ].map(([title, text]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <NextStep />
    </div>
  );
}
export function LegalPage({ terms = false }) {
  return (
    <div className="shell page-content">
      <SEO title={`${terms ? "Terms of use" : "Privacy policy"} — SiteGenIT`} />
      <PageIntro
        eyebrow="THE IMPORTANT DETAILS"
        title={terms ? "Terms of use" : "Privacy policy"}
        text="Please read this information before using our website and client portal."
      />
      <article className="legal-copy">
        {terms ? (
          <>
            <h2>Using this website</h2>
            <p>
              This website introduces SiteGenIT’s services and provides a way to
              contact the studio, request a meeting, and manage your account.
              Use it lawfully and do not attempt to access another person’s
              account or disrupt the service.
            </p>
            <h2>Projects and proposals</h2>
            <p>
              Submitting an inquiry or requesting a meeting does not create a
              contract or confirm an appointment. Project scope, pricing,
              timelines, ownership, and support are agreed separately in writing
              before work begins.
            </p>
            <h2>Portfolio and library content</h2>
            <p>
              Portfolio concepts and sample case studies are presented as
              explorations. Illustrative clients, metrics, and outcomes are not
              verified client engagements. Content on this website is general
              information rather than a guarantee of results.
            </p>
            <h2>Your account</h2>
            <p>
              Keep your password private and provide accurate contact details.
              You are responsible for activity through your account. Contact the
              studio if you suspect unauthorized access.
            </p>
            <h2>Availability and changes</h2>
            <p>
              We aim to keep the website accurate and available, but content and
              services may change. These website terms do not replace the terms
              of a signed project agreement.
            </p>
          </>
        ) : (
          <>
            <h2>Information you share</h2>
            <p>
              When you send an inquiry, subscribe, create an account, or request
              a meeting, we collect the information you provide. This may
              include your name, email, company, project details, and preferred
              meeting time. Please do not send passwords or sensitive documents
              through public forms.
            </p>
            <h2>How information is used</h2>
            <p>
              We use your information to respond to your inquiry, manage your
              account, arrange meetings, and deliver the updates you request.
              Account passwords are stored as one-way hashes, not readable text.
            </p>
            <h2>Service providers</h2>
            <p>
              The website runs on Vercel, and application records are stored in
              a Neon PostgreSQL database. These providers process information
              needed to operate the service. External font and image providers
              may receive standard browser request information.
            </p>
            <h2>Browser storage</h2>
            <p>
              The client portal stores an authentication token in your browser
              so you can remain signed in. Signing out revokes the token on the
              server and removes it from your browser. Do not use a shared
              browser without signing out when finished.
            </p>
            <h2>Your requests</h2>
            <p>
              You can contact the studio to ask about access, correction, or
              deletion of your information, or to stop receiving updates.
              Retention depends on the purpose of the record and any applicable
              obligations.
            </p>
          </>
        )}
        <h2>Questions?</h2>
        <p>
          <Link className="text-link" to="/quote">
            Contact the studio <ArrowUpRight size={16} />
          </Link>
        </p>
      </article>
    </div>
  );
}
export function NotFoundPage() {
  return (
    <div className="shell not-found">
      <SEO title="Page not found — SiteGenIT" robots="noindex, follow" />
      <span className="eyebrow">A SMALL DETOUR</span>
      <div>
        <strong>404</strong>
      </div>
      <h1>This page took a different direction.</h1>
      <p>Let’s get you back to a good place.</p>
      <Link to="/" className="button button-dark">
        Back to the studio <ArrowRight size={18} />
      </Link>
    </div>
  );
}
