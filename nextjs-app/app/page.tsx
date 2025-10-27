import ContactForm from './components/ContactForm';
import { Zap, Lock, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <nav className="nav">
          <div className="container">
            <div className="nav-content">
              <div className="logo">5dayapp</div>
              <a href="#contact" className="btn btn-secondary">Get Started</a>
            </div>
          </div>
        </nav>

        <div className="container hero-content">
          <div className="hero-text">
            <h1>Ship Your Next Project<br /><span className="gradient-text">In 5 Days, Not 5 Months</span></h1>
            <p className="hero-subtitle">We build AI-powered teams that rapidly deliver enterprise-ready applications. Fast. Secure. Scalable.</p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">Start Your Project</a>
              <a href="#how-it-works" className="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Why Teams Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={48} strokeWidth={1.5} />
              </div>
              <h3>Lightning Fast</h3>
              <p>AI-augmented development that delivers in days what traditionally takes months. No compromises on quality.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Lock size={48} strokeWidth={1.5} />
              </div>
              <h3>Enterprise Secure</h3>
              <p>Built with security-first principles. SOC 2 compliance, penetration testing, and industry best practices baked in.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={48} strokeWidth={1.5} />
              </div>
              <h3>Production Ready</h3>
              <p>Not just prototypes. We ship production-grade applications with proper architecture, testing, and documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Discovery Call</h3>
              <p>We understand your requirements, timeline, and success criteria in a focused 60-minute session.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3>AI-Powered Build</h3>
              <p>Our expert team leverages cutting-edge AI tools to rapidly develop your application with precision.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3>Iterate & Deploy</h3>
              <p>Daily check-ins, rapid iterations, and seamless deployment to your production environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases">
        <div className="container">
          <h2 className="section-title">Perfect For</h2>
          <div className="use-cases-grid">
            <div className="use-case">
              <h3>MVPs & Prototypes</h3>
              <p>Validate your idea before heavy investment</p>
            </div>
            <div className="use-case">
              <h3>Internal Tools</h3>
              <p>Custom dashboards and automation systems</p>
            </div>
            <div className="use-case">
              <h3>API Integrations</h3>
              <p>Connect your tools and data sources</p>
            </div>
            <div className="use-case">
              <h3>Mobile & Web Apps</h3>
              <p>Full-stack applications that scale</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Ship Fast?</h2>
            <p>Let&apos;s discuss your project and how we can deliver it in record time.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">5dayapp</div>
              <p>AI-First Development Agency</p>
            </div>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 5dayapp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
