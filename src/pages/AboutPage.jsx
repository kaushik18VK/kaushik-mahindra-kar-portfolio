import { Link } from 'react-router-dom';
import ContactStrip from '../components/ContactStrip';

export default function AboutPage() {
  return (
    <main>
      <section className="card section reveal page-hero about-hero">
        <p className="pill">About Me</p>
        <h1>Modern Full-Stack Engineer for Real Products, Real Scale, Real Impact</h1>
        <p>
          I design and build systems where backend performance and frontend experience
          work together. My engineering style is simple: fast APIs, smooth UI, secure
          architecture, and production-grade reliability.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-solid" to="/projects">See My Work</Link>
          <Link className="btn btn-outline" to="/contact">Contact Me</Link>
        </div>
      </section>

      <section className="section about-highlight-grid reveal">
        <article className="card about-highlight"><h3>Engineering Style</h3><p>Low latency, clear architecture, clean code, and measurable business impact.</p></article>
        <article className="card about-highlight"><h3>Domain Strength</h3><p>FinTech and enterprise systems with high-throughput and compliance requirements.</p></article>
        <article className="card about-highlight"><h3>Delivery Mindset</h3><p>From system design to deployment, with strong ownership and collaboration.</p></article>
      </section>

      <section className="section reveal">
        <div className="about-stack-grid">
          <article className="card stack-card">
            <h2>Frontend Stack</h2>
            <div className="chips">
              <span>ReactJS</span><span>Next.js</span><span>Angular</span><span>Vue.js</span><span>TypeScript</span><span>JavaScript (ES6+)</span><span>HTML5</span><span>CSS3</span><span>Tailwind CSS</span><span>Bootstrap</span><span>Sass</span><span>LESS</span><span>WebSockets</span><span>REST APIs</span><span>Webpack</span><span>NPM</span>
            </div>
          </article>
          <article className="card stack-card">
            <h2>Backend Stack</h2>
            <div className="chips">
              <span>Java</span><span>Spring Boot</span><span>Spring MVC</span><span>Spring WebFlux</span><span>Spring Security</span><span>Node.js</span><span>Express.js</span><span>Python</span><span>FastAPI</span><span>Kafka</span><span>Microservices</span><span>GraphQL</span><span>JPA / Hibernate</span><span>SQL</span><span>JDBC</span>
            </div>
          </article>
          <article className="card stack-card">
            <h2>Cloud, DevOps and Data</h2>
            <div className="chips">
              <span>OCI</span><span>AWS</span><span>Docker</span><span>Kubernetes</span><span>Jenkins</span><span>GitHub Actions</span><span>GitOps</span><span>PostgreSQL</span><span>MySQL</span><span>MongoDB</span><span>Oracle</span><span>Redis</span><span>Cassandra</span><span>DynamoDB</span><span>Prometheus</span><span>ELK Stack</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section grid-two reveal">
        <article className="card split-panel">
          <h2>Professional Strengths</h2>
          <ul className="panel-list">
            <li>Builds scalable backend + frontend solutions with clear architecture.</li>
            <li>Delivers measurable improvements in latency, throughput, and reliability.</li>
            <li>Strong in secure engineering: IAM, RBAC, JWT/OAuth2, PCI-focused controls.</li>
            <li>Brings product mindset: usability, performance, and maintainability together.</li>
            <li>Works smoothly with PM, design, QA, and platform teams.</li>
          </ul>
        </article>
        <article className="card split-panel">
          <h2>Methodology and Quality</h2>
          <ul className="panel-list">
            <li>Agile, SDLC, Scrum, and collaborative delivery.</li>
            <li>TDD-oriented with strong code review and mentorship habits.</li>
            <li>Performance-first implementation with profiling and optimization.</li>
            <li>Security-aware coding with XSS/CSRF protection and safe API handling.</li>
            <li>Production ownership from design to deployment and observability.</li>
          </ul>
        </article>
      </section>

      <ContactStrip description="Open to full-stack roles where engineering quality, scale, and user experience all matter." />
    </main>
  );
}
