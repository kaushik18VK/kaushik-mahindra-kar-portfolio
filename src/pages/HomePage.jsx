import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="ref-main">
      <section className="ref-hero reveal">
        <div className="ref-hero-grid">
          <div className="ref-hero-content">
            <p className="hero-name">Kaushik Mahindra Kar</p>
            <h1>Full-Stack &amp; <span>AI Engineer</span> building products that scale</h1>
            <p>
              I design and deliver high-performance backend services, modern frontend experiences,
              and GenAI-powered features with strong reliability, security, and product-focused quality.
            </p>
            <div className="ref-actions">
              <Link className="btn btn-solid" to="/contact">Start a conversation</Link>
              <Link className="btn btn-outline" to="/projects">Explore projects</Link>
            </div>
            <div className="ref-facts">
              <span><i />Open to Full-Stack and AI roles</span>
              <span>Based in San Jose, California</span>
              <span>Response within 24h</span>
            </div>
          </div>
          <aside className="profile-card" aria-label="Profile photo">
            <img src="/assets/profile/kaushik-mahindra-kar-web.png" alt="Kaushik Mahindra Kar graduation portrait" className="profile-photo" />
            <div className="profile-meta">
              <h3>Kaushik Mahindra Kar</h3>
              <p>Full-Stack &amp; AI Engineer</p>
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
          <h3>AI and GenAI Engineering</h3>
          <p>LLM integration, prompt engineering, RAG workflows, and AI-assisted product features for real user impact.</p>
        </article>
      </section>

      <section className="section card reveal">
        <h2>AI Focus Areas</h2>
        <div className="chips">
          <span>GenAI Product Features</span><span>RAG Pipelines</span><span>Prompt Engineering</span>
          <span>AI Agents</span><span>Embeddings</span><span>Model Evaluation</span>
          <span>Semantic Search</span><span>LLM API Integrations</span>
        </div>
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
        <h2>Need a strong Full-Stack + AI engineer for your next product phase?</h2>
        <p>I can contribute across architecture, implementation, GenAI integration, and production delivery.</p>
        <div className="ref-actions">
          <Link className="btn btn-solid" to="/contact">Talk to me</Link>
          <Link className="btn btn-outline" to="/experience">See experience</Link>
        </div>
      </section>
    </main>
  );
}
