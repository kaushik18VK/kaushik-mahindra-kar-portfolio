import ContactStrip from '../components/ContactStrip';

const featured = [
  {
    img: '/assets/projects/market-data-candle-service.svg',
    title: 'Market Data Candle Service',
    desc: 'Java service for real-time bid/ask stream processing and OHLC candle aggregation with history APIs.',
    meta: 'Stack: Java, Streaming, API Design',
    link: 'https://github.com/kaushik18VK/market-data-candle-service'
  },
  {
    img: '/assets/projects/country-explorer.svg',
    title: 'Country Explorer',
    desc: 'TypeScript frontend app for exploring country datasets with responsive UI and API-driven views.',
    meta: 'Stack: TypeScript, Frontend, API Integration',
    link: 'https://github.com/kaushik18VK/country-explorer'
  },
  {
    img: '/assets/projects/checkers-game.svg',
    title: 'Checkers Game',
    desc: 'Java board game project demonstrating clean game logic and object-oriented architecture.',
    meta: 'Stack: Java, OOP, Game Logic',
    link: 'https://github.com/kaushik18VK/CheckersGame'
  }
];

const moreProjects = [
  ['todolist.svg', 'TodoList', 'Task management project with TypeScript-based frontend structure.', 'Stack: TypeScript', 'https://github.com/kaushik18VK/TodoList'],
  ['nike-ecommerce.svg', 'Nike Ecommerce', 'Ecommerce-style frontend project focused on shopping UI flow and component structure.', 'Stack: JavaScript, Frontend', 'https://github.com/kaushik18VK/Nike-Ecommerce'],
  ['newsapp.svg', 'NewsApp', 'News browsing UI application with dynamic content rendering patterns.', 'Stack: JavaScript', 'https://github.com/kaushik18VK/NewsApp'],
  ['foodapp.svg', 'FoodApp', 'Frontend app for food listing and interaction-focused user interface.', 'Stack: JavaScript, UI', 'https://github.com/kaushik18VK/FoodApp'],
  ['react-todo.svg', 'React Todo', 'React-based todo application showcasing component state and interaction basics.', 'Stack: React, JavaScript', 'https://github.com/kaushik18VK/react-todo'],
  ['contactme.svg', 'ContactME', 'Contact-focused frontend project with form-oriented user experience.', 'Stack: JavaScript, HTML/CSS', 'https://github.com/kaushik18VK/ContactME']
];

const ProjectCard = ({ img, title, desc, meta, link }) => (
  <article className="card project-card" data-tilt>
    <img className="project-cover" src={img} alt={`${title} project preview`} loading="lazy" />
    <h3>{title}</h3>
    <p>{desc}</p>
    <p className="project-meta">{meta}</p>
    <a href={link} target="_blank" rel="noreferrer">Open Repository</a>
  </article>
);

export default function ProjectsPage() {
  return (
    <main>
      <section className="card section reveal page-hero">
        <p className="pill">Projects</p>
        <h1>Engineering Portfolio Highlights</h1>
        <p>Selected projects that demonstrate backend depth, frontend quality, and practical product execution.</p>
        <div className="hero-actions project-head-actions">
          <a className="btn btn-outline" href="https://github.com/kaushik18VK" target="_blank" rel="noreferrer">View GitHub Profile</a>
        </div>
      </section>

      <section className="section reveal">
        <h2>Top 3 Featured Projects</h2>
        <div className="project-grid">
          {featured.map((project) => <ProjectCard key={project.title} {...project} />)}
        </div>
      </section>

      <section className="section reveal">
        <h2>More Projects</h2>
        <div className="project-grid">
          {moreProjects.map(([img, title, desc, meta, link]) => (
            <ProjectCard key={title} img={`/assets/projects/${img}`} title={title} desc={desc} meta={meta} link={link} />
          ))}
        </div>
      </section>

      <ContactStrip description="Open to software engineering opportunities across backend, frontend, and full-stack roles." />
    </main>
  );
}
