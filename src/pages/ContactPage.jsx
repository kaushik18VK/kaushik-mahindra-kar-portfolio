import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const company = form.company.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setStatusType('error');
      setStatus('Please fill all required fields before sending.');
      return;
    }

    if (!formEndpoint) {
      setStatusType('error');
      setStatus('Form setup pending. Add VITE_FORMSPREE_ENDPOINT in your .env file.');
      return;
    }

    setSubmitting(true);
    setStatus('');
    setStatusType('');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company: company || 'N/A',
          subject,
          message
        })
      });

      if (!response.ok) {
        throw new Error('Form submit failed');
      }

      setStatusType('success');
      setStatus('Message sent successfully. Thanks for reaching out!');
      setForm({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch {
      setStatusType('error');
      setStatus('Unable to send right now. Please try again or use direct email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="card section reveal page-hero">
        <p className="pill">Contact</p>
        <h1>Let's Build Something Great</h1>
        <p>If you are hiring for backend, frontend, or full-stack roles, I would be glad to connect.</p>
      </section>

      <section className="section contact-page-grid reveal">
        <article className="card">
          <h2>Direct Contact</h2>
          <div className="contact-detail-list">
            <a className="contact-detail" href="mailto:kaushikm1155@gmail.com"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7 8-5H4l8 5zm0 2-8-5v8h16V9l-8 5z"/></svg><span className="contact-label">kaushikm1155@gmail.com</span></a>
            <a className="contact-detail" href="tel:+15133990330"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.3 22 2 13.7 2 3a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.24 1L6.6 10.8z"/></svg><span className="contact-label">+1 (513) 399-0330</span></a>
            <a className="contact-detail" href="https://www.linkedin.com/in/kaushikmahindrakar/" target="_blank" rel="noreferrer"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3zM20.44 13.4c0-3.06-1.63-4.48-3.8-4.48-1.75 0-2.53.96-2.97 1.64V8.5h-3.38V20h3.38v-6.4c0-.34.02-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.02 1.88 2.5V20h3.38l-.02-6.6z"/></svg><span className="contact-label">LinkedIn Profile</span></a>
          </div>
          <p>Location: San Jose, California</p>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-grid">
              <label className="form-field">
                <span>Name *</span>
                <input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your full name" required />
              </label>
              <label className="form-field">
                <span>Email *</span>
                <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
              </label>
            </div>
            <label className="form-field">
              <span>Company</span>
              <input type="text" name="company" value={form.company} onChange={onChange} placeholder="Company name (optional)" />
            </label>
            <label className="form-field">
              <span>Subject *</span>
              <input type="text" name="subject" value={form.subject} onChange={onChange} placeholder="Role / collaboration topic" required />
            </label>
            <label className="form-field">
              <span>Message *</span>
              <textarea name="message" value={form.message} onChange={onChange} rows="5" placeholder="Tell me about the role, team, and project context..." required />
            </label>
            <div className="form-actions">
              <button className="btn btn-solid" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              <a className="btn btn-outline" href="mailto:kaushikm1155@gmail.com">Email Directly</a>
            </div>
            <p className="form-note">Fields marked * are required.</p>
            {status ? <p className={`form-status ${statusType === 'error' ? 'error' : ''}`}>{status}</p> : null}
          </form>
          <div className="hero-actions">
            <a className="btn btn-outline" href="tel:+15133990330">Call Now</a>
          </div>
        </article>

        <article className="card">
          <h2>Professional Summary</h2>
          <p>4+ years of full-stack software engineering in fintech and enterprise systems.</p>
          <p>Core focus: Java, Spring Boot, Kafka, React, TypeScript, cloud-native architecture.</p>
          <p>Impact: latency reduction, delivery acceleration, and production-grade reliability.</p>
          <div className="hero-actions">
            <Link className="btn btn-outline" to="/experience">View Experience</Link>
            <Link className="btn btn-outline" to="/projects">View Projects</Link>
          </div>
        </article>
      </section>

      <section className="section card reveal contact-strip">
        <h2>Quick Reach</h2>
        <p>Best way to reach me is email. I typically respond quickly for relevant opportunities.</p>
        <div className="contact-links">
          <a className="contact-link" href="mailto:kaushikm1155@gmail.com"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7 8-5H4l8 5zm0 2-8-5v8h16V9l-8 5z"/></svg><span className="contact-label">Email Me</span></a>
          <a className="contact-link" href="tel:+15133990330"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.3 22 2 13.7 2 3a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.24 1L6.6 10.8z"/></svg><span className="contact-label">Call Me</span></a>
          <a className="contact-link" href="https://www.linkedin.com/in/kaushikmahindrakar/" target="_blank" rel="noreferrer"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3zM20.44 13.4c0-3.06-1.63-4.48-3.8-4.48-1.75 0-2.53.96-2.97 1.64V8.5h-3.38V20h3.38v-6.4c0-.34.02-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.02 1.88 2.5V20h3.38l-.02-6.6z"/></svg><span className="contact-label">LinkedIn</span></a>
        </div>
      </section>
    </main>
  );
}
