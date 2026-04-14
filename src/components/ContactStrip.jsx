export default function ContactStrip({ title = "Let's Connect", description }) {
  return (
    <section className="section card reveal contact-strip">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="contact-links">
        <a className="contact-link" href="mailto:kaushikm1155@gmail.com">
          <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7 8-5H4l8 5zm0 2-8-5v8h16V9l-8 5z"/></svg>
          <span className="contact-label">Email Me</span>
        </a>
        <a className="contact-link" href="tel:+15133990330">
          <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.3 22 2 13.7 2 3a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.24 1L6.6 10.8z"/></svg>
          <span className="contact-label">Call Me</span>
        </a>
        <a className="contact-link" href="https://www.linkedin.com/in/kaushikmahindrakar/" target="_blank" rel="noreferrer">
          <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3zM20.44 13.4c0-3.06-1.63-4.48-3.8-4.48-1.75 0-2.53.96-2.97 1.64V8.5h-3.38V20h3.38v-6.4c0-.34.02-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.02 1.88 2.5V20h3.38l-.02-6.6z"/></svg>
          <span className="contact-label">LinkedIn</span>
        </a>
      </div>
    </section>
  );
}
