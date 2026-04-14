import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="ref-main">
      <section className="ref-hero reveal">
        <div className="ref-hero-grid">
          <div className="ref-hero-content">
            <p className="hero-name">Kaushik Mahindra Kar</p>
            <h1>Software Development Engineer building <span>full-stack</span> products that scale</h1>
            <p>
              I design and deliver high-performance backend services and modern frontend experiences
              with strong reliability, security, and user-focused quality.
            </p>
            <div className="ref-actions">
              <Link className="btn btn-solid" to="/contact">Start a conversation</Link>
              <Link className="btn btn-outline" to="/projects">Explore projects</Link>
            </div>
            <div className="ref-facts">
              <span><i />Open to full-stack roles</span>
              <span>Based in San Jose, California</span>
              <span>Response within 24h</span>
            </div>
          </div>
          <aside className="profile-card" aria-label="Profile photo">
            <img src="/assets/profile/kaushik-mahindra-kar-web.png" alt="Kaushik Mahindra Kar graduation portrait" className="profile-photo" />
            <div className="profile-meta">
              <h3>Kaushik Mahindra Kar</h3>
              <p>Software Development Engineer</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="ref-showcase reveal">
        <article className="ref-card">
          <h3>Backend Engineering</h3>
          <p>Java, Spring Boot, Kafka, microservices, and cloud-native system design for high-throughput workloads.</p>
        </article>
        <article className="ref-card">
          <h3>Frontend Engineering</h3>
          <p>React, Next.js, TypeScript, and modern UI architecture for fast, responsive product experiences.</p>
        </article>
        <article className="ref-card">
          <h3>Delivery and Reliability</h3>
          <p>CI/CD automation, performance optimization, and production operations focused on measurable outcomes.</p>
        </article>
      </section>

      <section className="ref-metrics reveal">
        <article className="ref-metric-card">
          <h4 data-counter="120000">0</h4>
          <p>Daily transactions handled in production</p>
        </article>
        <article className="ref-metric-card">
          <h4 data-counter="340">0</h4>
          <p>Milliseconds reduced from API latency (850 ms to 510 ms)</p>
        </article>
        <article className="ref-metric-card">
          <h4 data-counter="11">0</h4>
          <p>Days removed from release cycle (14 days to 3 days)</p>
        </article>
        <article className="ref-metric-card">
          <h4 data-counter="50">0</h4>
          <p>Production services secured and maintained</p>
        </article>
      </section>

      <section className="ref-cta reveal">
        <h2>Need a strong full-stack engineer for your next product phase?</h2>
        <p>I can contribute across architecture, implementation, and production delivery.</p>
        <div className="ref-actions">
          <Link className="btn btn-solid" to="/contact">Talk to me</Link>
          <Link className="btn btn-outline" to="/experience">See experience</Link>
        </div>
      </section>
    </main>
  );
}
