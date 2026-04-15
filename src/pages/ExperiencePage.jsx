import ContactStrip from '../components/ContactStrip';

export default function ExperiencePage() {
  return (
    <main>
      <section className="card section reveal page-hero">
        <p className="pill">Experience</p>
        <h1>Professional Experience</h1>
        <p>End-to-end delivery across backend systems, frontend products, cloud platforms, and production operations.</p>
      </section>

      <section className="section recruiter-grid reveal">
        <article className="card recruiter-card"><h3>4+ Years</h3><p>Full-stack engineering experience in fintech and enterprise environments.</p></article>
        <article className="card recruiter-card"><h3>120K Daily Transactions</h3><p>Built and optimized systems supporting high-volume financial operations.</p></article>
        <article className="card recruiter-card"><h3>Measured Performance Gains</h3><p>40% API latency reduction, 60% faster release cycles, and 60% lower MTTR.</p></article>
      </section>

      <section className="section reveal">
        <div className="timeline">
          <article className="timeline-item card" data-tilt>
            <div className="timeline-top"><p>Oracle America, Inc</p><span>02/2025 - Present</span></div>
            <h3>Software Development Engineer 2</h3>
            <ul>
              <li>Reduced critical API latency by 40% (850 ms to 510 ms) by profiling bottlenecks and refactoring high-traffic service paths.</li>
              <li>Engineered event-driven processing pipelines handling ~1,500 events/sec with stable throughput under production load.</li>
              <li>Led cloud-native microservice migration to OCI and Kubernetes, improving service availability to 99.99%.</li>
              <li>Optimized React UI rendering and payload strategy to significantly improve perceived load performance on key user workflows.</li>
            </ul>
            <div className="mini-tech-grid"><span>Java</span><span>Spring Boot</span><span>Kafka</span><span>OCI</span><span>Kubernetes</span><span>ReactJS</span><span>WebSockets</span><span>Jenkins</span></div>
          </article>

          <article className="timeline-item card" data-tilt>
            <div className="timeline-top"><p>Cylogic</p><span>07/2022 - 07/2023</span></div>
            <h3>Software Engineer</h3>
            <ul>
              <li>Modernized legacy backend and frontend modules into scalable React/Angular + Spring architecture with cleaner service boundaries.</li>
              <li>Integrated 15+ internal and third-party APIs, improving overall response latency by 25% through async handling and caching strategy.</li>
              <li>Reduced infrastructure cost by 20% by introducing Docker/Kubernetes-based deployment standardization.</li>
              <li>Mentored 12+ engineers on delivery practices and code quality, increasing sprint throughput by 30%.</li>
            </ul>
            <div className="mini-tech-grid"><span>ReactJS</span><span>Angular</span><span>FastAPI</span><span>Spring Boot</span><span>Docker</span><span>Kubernetes</span><span>AWS</span><span>JWT/OAuth2</span></div>
          </article>

          <article className="timeline-item card" data-tilt>
            <div className="timeline-top"><p>NXP Net Solution (Paytm)</p><span>06/2020 - 07/2022</span></div>
            <h3>Software Engineer</h3>
            <ul>
              <li>Scaled fintech transaction throughput from 15K TPS to 21K TPS through service optimization and resilient event-stream handling.</li>
              <li>Supported 1M+ daily financial operations while lowering p95 latency for critical payment flows.</li>
              <li>Automated CI/CD delivery pipelines, reducing release cycle time from 2 weeks to 3 days.</li>
              <li>Strengthened observability using centralized logging and metrics, reducing MTTR by 60% for production incidents.</li>
            </ul>
            <div className="mini-tech-grid"><span>Java</span><span>Spring WebFlux</span><span>Kafka</span><span>CI/CD</span><span>GitHub Actions</span><span>ELK</span><span>Prometheus</span><span>Microservices</span></div>
          </article>
        </div>
      </section>

      <section className="section reveal skill-sections">
        <article className="card skill-category">
          <h2>Core Tools Used Across Roles</h2>
          <div className="skill-icon-grid">
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java icon" loading="lazy" /><span>Java</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring icon" loading="lazy" /><span>Spring</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React icon" loading="lazy" /><span>ReactJS</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python icon" loading="lazy" /><span>Python</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" alt="Kafka icon" loading="lazy" /><span>Kafka</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker icon" loading="lazy" /><span>Docker</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes icon" loading="lazy" /><span>K8s</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins icon" loading="lazy" /><span>Jenkins</span></div>
          </div>
        </article>
      </section>

      <ContactStrip description="Happy to discuss software engineering roles focused on backend, frontend, or full-stack impact." />
    </main>
  );
}
