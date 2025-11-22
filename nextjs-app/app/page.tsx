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

      {/* Robot Brain Arrow */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0',
        background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.03))'
      }}>
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Brain/Robot Head */}
          <g opacity="0.8">
            {/* Main head circle */}
            <circle cx="60" cy="40" r="28" stroke="url(#gradient1)" strokeWidth="2" fill="rgba(99, 102, 241, 0.05)"/>

            {/* Brain patterns */}
            <path d="M 45 35 Q 50 30 55 35" stroke="url(#gradient1)" strokeWidth="1.5" fill="none"/>
            <path d="M 65 35 Q 70 30 75 35" stroke="url(#gradient1)" strokeWidth="1.5" fill="none"/>
            <path d="M 42 45 Q 48 42 54 45" stroke="url(#gradient1)" strokeWidth="1.5" fill="none"/>
            <path d="M 66 45 Q 72 42 78 45" stroke="url(#gradient1)" strokeWidth="1.5" fill="none"/>

            {/* Eyes - robot style */}
            <circle cx="50" cy="38" r="4" fill="url(#gradient1)"/>
            <circle cx="70" cy="38" r="4" fill="url(#gradient1)"/>

            {/* Antenna */}
            <line x1="60" y1="12" x2="60" y2="22" stroke="url(#gradient1)" strokeWidth="2"/>
            <circle cx="60" cy="10" r="3" fill="url(#gradient1)"/>
          </g>

          {/* Neck/Connection */}
          <rect x="56" y="68" width="8" height="12" fill="url(#gradient1)" opacity="0.6"/>

          {/* Arrow Body */}
          <rect x="56" y="80" width="8" height="60" fill="url(#gradient1)" opacity="0.7"/>

          {/* Arrow Head */}
          <path d="M 60 155 L 40 135 L 52 135 L 52 140 L 68 140 L 68 135 L 80 135 Z"
                fill="url(#gradient1)"
                opacity="0.8"/>

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            </linearGradient>
          </defs>

          {/* Animated glow effect */}
          <circle cx="60" cy="10" r="4" fill="#6366f1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

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
              <p>AI native experts multiply productivity without sacrificing quality. Save time and money on every sprint.</p>
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
