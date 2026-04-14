import { Link } from 'react-router-dom';
import ContactStrip from '../components/ContactStrip';

export default function SkillsPage() {
  return (
    <main>
      <section className="card section reveal page-hero">
        <p className="pill">Skills</p>
        <h1>Core Stack (Backend + Frontend)</h1>
        <p>Compact visual skill map with the technologies I use to ship production-ready full-stack applications.</p>
      </section>

      <section className="section reveal skill-sections">
        <article className="card skill-category">
          <h2>Backend Engineering</h2>
          <div className="skill-icon-grid">
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java icon" loading="lazy" /><span>Java</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring icon" loading="lazy" /><span>Spring Boot</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python icon" loading="lazy" /><span>Python</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js icon" loading="lazy" /><span>Node.js</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express icon" loading="lazy" /><span>Express.js</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" alt="Kafka icon" loading="lazy" /><span>Kafka</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" alt="GraphQL icon" loading="lazy" /><span>GraphQL</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI icon" loading="lazy" /><span>FastAPI</span></div>
          </div>
        </article>

        <article className="card skill-category">
          <h2>Frontend Engineering</h2>
          <div className="skill-icon-grid">
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React icon" loading="lazy" /><span>ReactJS</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js icon" loading="lazy" /><span>Next.js</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular icon" loading="lazy" /><span>Angular</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue icon" loading="lazy" /><span>Vue.js</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript icon" loading="lazy" /><span>TypeScript</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript icon" loading="lazy" /><span>JavaScript</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML icon" loading="lazy" /><span>HTML5</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS icon" loading="lazy" /><span>CSS3</span></div>
          </div>
        </article>

        <article className="card skill-category">
          <h2>Cloud and DevOps</h2>
          <div className="skill-icon-grid">
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS icon" loading="lazy" /><span>AWS</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker icon" loading="lazy" /><span>Docker</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes icon" loading="lazy" /><span>Kubernetes</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins icon" loading="lazy" /><span>Jenkins</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Actions icon" loading="lazy" /><span>GitHub Actions</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git icon" loading="lazy" /><span>Git / GitOps</span></div>
          </div>
        </article>

        <article className="card skill-category">
          <h2>Databases and Data Layer</h2>
          <div className="skill-icon-grid">
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL icon" loading="lazy" /><span>PostgreSQL</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL icon" loading="lazy" /><span>MySQL</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB icon" loading="lazy" /><span>MongoDB</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis icon" loading="lazy" /><span>Redis</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" alt="Oracle icon" loading="lazy" /><span>Oracle DB</span></div>
            <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" alt="SQL icon" loading="lazy" /><span>SQL</span></div>
          </div>
        </article>

        <article className="card skill-category">
          <h2>Security and Delivery Quality</h2>
          <div className="chips">
            <span>JWT</span><span>OAuth2</span><span>RBAC</span><span>IAM</span>
            <span>XSS Protection</span><span>CSRF Protection</span><span>PCI-DSS</span><span>TDD</span>
            <span>Agile / Scrum</span><span>Microservices</span><span>REST APIs</span><span>WebSockets</span>
          </div>
        </article>
      </section>

      <section className="section card reveal cta-band">
        <h2>Stack + Execution = Business Impact</h2>
        <p>I use this stack to deliver measurable outcomes: lower latency, faster releases, resilient systems, and smooth user experiences.</p>
        <div className="hero-actions">
          <Link className="btn btn-solid" to="/projects">See Projects</Link>
          <Link className="btn btn-outline" to="/experience">See Experience</Link>
        </div>
      </section>

      <ContactStrip description="Open to opportunities where this stack can create measurable product and platform impact." />
    </main>
  );
}
