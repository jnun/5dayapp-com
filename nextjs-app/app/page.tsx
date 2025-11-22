import ContactForm from './components/ContactForm';
import { Calendar, Lightbulb, Rocket, Cpu, Puzzle } from 'lucide-react';

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
            <p className="hero-subtitle">We hand-pick the hottest talent for your specific launch. Nimble. Experienced. Capable. Backed by AI tools that save time and money. No extra staff. No wasted labor. Just the perfect team for your project.</p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">Start Your Project</a>
              <a href="#how-it-works" className="btn btn-outline">How We Work</a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">The Right Team. Zero Waste.</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Lightbulb size={48} strokeWidth={1.5} />
              </div>
              <h3>Hand-Picked Talent</h3>
              <p>We assemble the perfect team for your specific project. Only the people you need. Only the skills that matter.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Rocket size={48} strokeWidth={1.5} />
              </div>
              <h3>Battle-Tested Pros</h3>
              <p>Nimble, experienced engineers who have shipped real products. We know what works because we&apos;ve done it.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Calendar size={48} strokeWidth={1.5} />
              </div>
              <h3>Ship Every Friday</h3>
              <p>Weekly deliverables keep momentum high. Always see progress. Always have something to show stakeholders.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Cpu size={48} strokeWidth={1.5} />
              </div>
              <h3>AI-Augmented Speed</h3>
              <p>LAI native experts multiply productivity without sacrificing quality. Save time and money on every sprint.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Puzzle size={48} strokeWidth={1.5} />
              </div>
              <h3>Project-Specific Contract</h3>
              <p>No extra staff. No wasted labor. Team members contracted specifically to your project, then released.</p>
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
              <h3>Assemble Your Team</h3>
              <p>We hand-pick the perfect mix of talent for your specific project. The right skills. The right experience. Nothing more, nothing less.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3>Plan & Execute Weekly</h3>
              <p>Every Monday we plan Friday&apos;s deliverable. AI-augmented development with battle-tested pros building at startup speed.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3>Ship Every Friday</h3>
              <p>Weekly demos you can see, test, and share. When the project is done, the team disbands. No bloat. No waste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-content">
            <h2>Start Shipping This Friday</h2>
            <p>Let&apos;s plan your first weekly demo and get momentum building.</p>
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
