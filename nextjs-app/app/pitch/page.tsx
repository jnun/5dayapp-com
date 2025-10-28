'use client';

import { useState, useEffect } from 'react';
import { Lock, Shield, Database, Server, Code, FileText, Users, Zap, CheckCircle, TrendingUp, AlertCircle, GitBranch } from 'lucide-react';
import './pitch.css';

export default function PitchPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 16;

  // Check if already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth');
        const data = await response.json();
        if (data.authenticated) {
          setIsUnlocked(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsUnlocked(true);
        setPassword('');
      } else {
        setError(data.error || 'Incorrect password');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked) return;

    const slides = document.querySelectorAll('.slide');
    if (slides[currentSlide]) {
      slides[currentSlide].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSlide, isUnlocked]);

  if (loading && !isUnlocked) {
    return (
      <div className="password-gate">
        <div className="password-container">
          <div className="lock-icon-wrapper">
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="password-gate">
        <div className="password-container">
          <div className="lock-icon-wrapper">
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h1>Technical Build Overview</h1>
          <p>Please enter the password to access this document</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="off"
              required
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Unlock'}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="pitch-deck">
      {/* Slide 1: Cover */}
      <section className="slide cover-slide">
        <div className="container">
          <h1 className="cover-title">Hope Has Investors</h1>
          <p className="cover-subtitle">Faith Powered Equity Crowdfunding Platform</p>
          <div className="cover-meta">
            <span>TECHNICAL BUILD OVERVIEW</span>
          </div>
        </div>
      </section>

      {/* Slide 2: Our Approach */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Our Approach: Speed Without Compromise</h2>
          <div className="solution-box">
            <h3>Rapid Development + Enterprise Security + Delightful UX</h3>
            <p>We&apos;ve mastered the art of shipping fast by strategically leveraging battle-tested infrastructure and modern frameworks—enabling us to focus on what matters: user experience and innovation.</p>
          </div>
          <div className="architecture-grid">
            <div className="architecture-card">
              <div className="architecture-icon">
                <Zap size={32} strokeWidth={1.5} />
              </div>
              <h3>Fast to Market</h3>
              <ul>
                <li>Modern stack (React + FastAPI) enables rapid iteration</li>
                <li>Pre-integrated security and compliance tools accelerate timeline</li>
                <li>API-first design means we launch web now, expand to mobile later</li>
                <li>Our team specializes in shipping production-grade apps in weeks, not months</li>
              </ul>
            </div>
            <div className="architecture-card">
              <div className="architecture-icon">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h3>Blockchain-Backed Trust</h3>
              <ul>
                <li>Immutable blockchain records provide investor confidence and regulatory compliance in one</li>
                <li>Transparent, verifiable ledger eliminates disputes over ownership</li>
                <li>Future-proof: positions us for secondary market and digital securities innovation</li>
                <li>Industry-first for faith-based crowdfunding platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: UI Design Showcase - MOVED UP FOR IMPACT */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">See It In Action</h2>
          <p className="stack-philosophy">Experience what the app will feel like.</p>

          <div className="ui-showcase-grid">
            <a href="/invest" target="_blank" className="ui-showcase-card">
              <div className="showcase-number">01</div>
              <h3>Investment Discovery</h3>
              <p>Browse faith-based opportunities with beautiful filtering and real-time progress tracking.</p>
              <div className="showcase-link">
                <span>→ Try the live demo</span>
              </div>
            </a>

            <a href="/verify" target="_blank" className="ui-showcase-card">
              <div className="showcase-number">02</div>
              <h3>ID Verification Flow</h3>
              <p>Frictionless KYC with Plaid integration—bank-grade security that feels simple.</p>
              <div className="showcase-link">
                <span>→ Try the live demo</span>
              </div>
            </a>

            <a href="/sign" target="_blank" className="ui-showcase-card">
              <div className="showcase-number">03</div>
              <h3>Document Signing</h3>
              <p>Professional signing experience powered by DocuSign with clear progress tracking.</p>
              <div className="showcase-link">
                <span>→ Try the live demo</span>
              </div>
            </a>

            <a href="/certificate/abc123" target="_blank" className="ui-showcase-card">
              <div className="showcase-number">04</div>
              <h3>Blockchain Certificate</h3>
              <p>Blockchain-verified investment certificates with permanent ownership records.</p>
              <div className="showcase-link">
                <span>→ Try the live demo</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Slide 4: User Experience First */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">User Experience First</h2>
          <div className="flow-grid">
            <div className="flow-card">
              <div className="flow-icon">
                <FileText size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">01</div>
              <h3>Frictionless Onboarding</h3>
              <p>One-click KYC via Plaid. No forms, no uploads—just connect your bank and you&apos;re verified in seconds.</p>
            </div>
            <div className="flow-card">
              <div className="flow-icon">
                <Zap size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">02</div>
              <h3>Clear Campaign Pages</h3>
              <p>Beautiful, readable investment pages with real-time progress, FAQs, and direct founder communication.</p>
            </div>
            <div className="flow-card">
              <div className="flow-icon">
                <TrendingUp size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">03</div>
              <h3>One-Click Investing</h3>
              <p>Choose amount, e-sign via DocuSign, done. Funds go to escrow automatically—no confusion, no delays.</p>
            </div>
            <div className="flow-card">
              <div className="flow-icon">
                <CheckCircle size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">04</div>
              <h3>Blockchain Verification</h3>
              <p>Instant confirmation with a blockchain-backed certificate. Investors can verify ownership anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Technology Stack */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">Strategic Technology Choices</h2>
          <p className="stack-philosophy">"Battle-tested frameworks that let us move fast and stay secure"</p>
          <div className="tech-stack">
            <div className="tech-layer">
              <div className="tech-icon">
                <Code size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Frontend</div>
                <div className="tech-badge">React</div>
                <p>Industry standard with massive ecosystem—enables beautiful, responsive UX without reinventing the wheel</p>
              </div>
            </div>
            <div className="tech-layer">
              <div className="tech-icon">
                <Server size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Backend</div>
                <div className="tech-badge">Python (FastAPI)</div>
                <p>Fastest modern Python framework—rapid API development with automatic docs and validation</p>
              </div>
            </div>
            <div className="tech-layer">
              <div className="tech-icon">
                <Database size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Database</div>
                <div className="tech-badge">PostgreSQL</div>
                <p>Rock-solid reliability for financial data—ACID compliance, audit trails, and proven at scale</p>
              </div>
            </div>
            <div className="tech-layer">
              <div className="tech-icon">
                <Shield size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Blockchain</div>
                <div className="tech-badge">Enterprise Blockchain</div>
                <p>Immutable investment records—gives investors permanent proof of ownership with enterprise-grade reliability</p>
              </div>
            </div>
          </div>
          <div className="integrations">
            <h4>Best-in-Class Integrations</h4>
            <div className="integration-badges">
              <span className="integration-badge">Plaid (KYC/Banking)</span>
              <span className="integration-badge">DocuSign (E-Signature)</span>
              <span className="integration-badge">AWS (Infrastructure)</span>
              <span className="integration-badge">Qualified Escrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Accelerated Launch Strategy */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Accelerated Launch Strategy</h2>
          <p className="stack-philosophy">"Leverage Best-in-Class Infrastructure to Ship Faster"</p>
          <div className="build-details">
            <div className="build-section">
              <div className="build-header">
                <Zap size={28} strokeWidth={1.5} />
                <h3>Pre-Built Financial Infrastructure</h3>
              </div>
              <ul className="build-steps">
                <li><strong>Plaid Identity:</strong> Bank-grade KYC/AML verification out of the box—no need to build from scratch</li>
                <li><strong>DocuSign API:</strong> Legally binding e-signatures with built-in audit trails and compliance certificates</li>
                <li><strong>Qualified Escrow Partner:</strong> Licensed third-party fund custody—regulatory requirement handled externally</li>
                <li><strong>AWS Compliance Suite:</strong> SOC 2 certified infrastructure with immutable blockchain storage for SEC document retention and investment records</li>
              </ul>
            </div>
            <div className="build-section">
              <div className="build-header">
                <Code size={28} strokeWidth={1.5} />
                <h3>Modern Development Frameworks</h3>
              </div>
              <ul className="build-steps">
                <li><strong>React + FastAPI:</strong> Proven frameworks with extensive libraries—rapid feature development</li>
                <li><strong>PostgreSQL:</strong> Battle-tested database with built-in ACID compliance for financial transactions</li>
                <li><strong>Enterprise Blockchain:</strong> Turnkey blockchain integration for immutable investment records without building custom infrastructure</li>
                <li><strong>API-First Design:</strong> Clean separation enables web launch now, mobile apps later without rearchitecture</li>
              </ul>
            </div>
          </div>
          <p className="slide-note" style={{ marginTop: '2rem' }}><strong>Key Advantage:</strong> We integrate proven, audited solutions rather than reinventing the wheel—reducing time to market by months.</p>
        </div>
      </section>

      {/* Slide 7: Competitive Advantages */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">Our Competitive Advantages</h2>
          <p className="moat-subtitle">Speed + Security + Innovation = Unbeatable Combination</p>
          <div className="moat-grid">
            <div className="moat-card">
              <div className="moat-icon">
                <Zap size={32} strokeWidth={1.5} />
              </div>
              <h4>Execution Speed</h4>
              <p>Our team ships production-ready platforms in weeks, not quarters. While competitors are still planning, we&apos;re launching.</p>
            </div>
            <div className="moat-card">
              <div className="moat-icon">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h4>Blockchain Innovation</h4>
              <p>First faith-based crowdfunding platform with blockchain-verified investment records. Future-proof and investor-friendly.</p>
            </div>
            <div className="moat-card">
              <div className="moat-icon">
                <Users size={32} strokeWidth={1.5} />
              </div>
              <h4>User-Centric Design</h4>
              <p>We obsess over UX. Complex financial processes feel simple—driving higher conversion and user satisfaction.</p>
            </div>
            <div className="moat-card">
              <div className="moat-icon">
                <CheckCircle size={32} strokeWidth={1.5} />
              </div>
              <h4>Regulatory Ready</h4>
              <p>Built for compliance from day one—SOC 2, RegCF, FINRA requirements embedded in our architecture, not retrofitted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Technical Roadmap */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Technical Roadmap</h2>
          <div className="roadmap">
            <div className="roadmap-phase">
              <h3>Phase 1: MVP Build</h3>
              <ul>
                <li>Core platform: investor/founder dashboards</li>
                <li>KYC/AML integration (Plaid Identity)</li>
                <li>Document generation & e-signature (DocuSign)</li>
                <li>Escrow integration & payment flows</li>
                <li>RegCF compliance engine (investment limits, Form C)</li>
              </ul>
            </div>
            <div className="roadmap-phase">
              <h3>Phase 2: Security & Launch</h3>
              <ul>
                <li>Complete SOC 2 Type II audit</li>
                <li>Third-party penetration testing</li>
                <li>Blockchain ledger implementation</li>
                <li>Beta testing with pilot companies</li>
                <li>FINRA Funding Portal approval</li>
              </ul>
            </div>
            <div className="roadmap-phase">
              <h3>Phase 3: Scale</h3>
              <ul>
                <li>Native mobile apps (iOS/Android)</li>
                <li>Expand to Reg A+ offerings (larger raises)</li>
                <li>Build secondary market (ATS license required)</li>
                <li>API for institutional integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Build Budget */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">MVP Proof of Concept</h2>
          <p className="stack-philosophy">Estimated $300K-$500K for development + infrastructure</p>
          <div className="budget-breakdown">
            <div className="budget-item">
              <div className="budget-header">
                <h4>Development & Engineering</h4>
                <span className="budget-percent">$300K-$500K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '70%' }}></div>
              </div>
              <p>Full-stack development team: investor/founder dashboards, campaign flows, user management, real-time analytics, compliance automation, testing & QA</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Infrastructure & Integration Services</h4>
                <span className="budget-percent">$50K-$100K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '15%' }}></div>
              </div>
              <p>Plaid KYC subscription, DocuSign API, AWS hosting & infrastructure, escrow integration fees, blockchain implementation</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Security Audits & Testing</h4>
                <span className="budget-percent">$40K-$80K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '12%' }}></div>
              </div>
              <p>SOC 2 Type II audit, third-party penetration testing, security consultants, vulnerability assessments</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Legal & Compliance</h4>
                <span className="budget-percent">Separate Budget</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '3%', backgroundColor: '#ccc' }}></div>
              </div>
              <p>Securities counsel, FINRA registration, compliance personnel (handled separately from technical build)</p>
            </div>
          </div>
          <p className="slide-note" style={{ marginTop: '2rem' }}><strong>Total Technical Investment:</strong> $390K-$680K including all development, infrastructure, and security requirements</p>
        </div>
      </section>

      {/* Slide 10: Build Phases */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Build Phases</h2>
          <p className="stack-philosophy">Iterative development focused on speed, security, and regulatory readiness</p>
          <div className="timeline">
            <div className="timeline-phase">
              <div className="timeline-marker">Phase 1</div>
              <h4>Foundation & Planning</h4>
              <ul>
                <li>Engage securities counsel and compliance advisors</li>
                <li>File FINRA Funding Portal application</li>
                <li>Finalize technical architecture and integrations</li>
                <li>Set up core infrastructure and development environments</li>
              </ul>
            </div>
            <div className="timeline-phase">
              <div className="timeline-marker">Phase 2</div>
              <h4>Core Platform Build</h4>
              <ul>
                <li>Develop investor/founder dashboards and campaign flows</li>
                <li>Integrate KYC/AML (Plaid), e-signature (DocuSign), escrow</li>
                <li>Build RegCF compliance engine and investment limit automation</li>
                <li>Implement blockchain ledger integration</li>
              </ul>
            </div>
            <div className="timeline-phase">
              <div className="timeline-marker">Phase 3</div>
              <h4>Security & Testing</h4>
              <ul>
                <li>Complete SOC 2 Type II audit process</li>
                <li>Third-party penetration testing and remediation</li>
                <li>Beta testing with select pilot campaigns</li>
                <li>Performance optimization and security hardening</li>
              </ul>
            </div>
            <div className="timeline-phase">
              <div className="timeline-marker">Phase 4</div>
              <h4>Launch & Scale</h4>
              <ul>
                <li>Receive FINRA Funding Portal approval</li>
                <li>Launch first live campaigns</li>
                <li>Monitor systems, gather user feedback, iterate rapidly</li>
                <li>Plan growth initiatives and additional features</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 11: Development Approach */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">Development Approach</h2>
          <p className="team-intro">Lean, agile development with strategic use of specialized expertise and external partners.</p>
          <div className="team-grid">
            <div className="team-card">
              <h4>Core Development Team</h4>
              <p>Full-stack developers handling frontend (React), backend (FastAPI), database architecture, and API integrations</p>
            </div>
            <div className="team-card">
              <h4>Security & Infrastructure</h4>
              <p>DevSecOps expertise for AWS setup, CI/CD pipelines, security hardening, and ongoing infrastructure management</p>
            </div>
            <div className="team-card">
              <h4>External Specialists</h4>
              <p>SOC 2 auditors, penetration testing firms, securities counsel for regulatory guidance</p>
            </div>
            <div className="team-card">
              <h4>Integration Partners</h4>
              <p>Plaid (KYC/banking), DocuSign (e-signature), qualified escrow provider, enterprise blockchain solution</p>
            </div>
          </div>
          <p className="team-note"><strong>Strategy:</strong> Build fast with a lean core team, augmented by best-in-class third-party services and consultants.</p>
        </div>
      </section>

      {/* Slide 12: Technical Risk Mitigation */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Technical Risk Mitigation</h2>
          <div className="risk-grid">
            <div className="risk-card">
              <div className="risk-icon">
                <Code size={32} strokeWidth={1.5} />
              </div>
              <h4>Proven Architecture</h4>
              <p>API-first design enables web launch, then seamless mobile migration. No rearchitecture needed.</p>
            </div>
            <div className="risk-card">
              <div className="risk-icon">
                <GitBranch size={32} strokeWidth={1.5} />
              </div>
              <h4>Best-in-Class Integrations</h4>
              <p>Plaid, DocuSign, and AWS are battle-tested by thousands of FinTech companies. We leverage proven infrastructure.</p>
            </div>
            <div className="risk-card">
              <div className="risk-icon">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h4>Security First</h4>
              <p>SOC 2 audit and penetration testing BEFORE launch. Security is built in, not bolted on.</p>
            </div>
            <div className="risk-card">
              <div className="risk-icon">
                <CheckCircle size={32} strokeWidth={1.5} />
              </div>
              <h4>Compliance Automation</h4>
              <p>RegCF rules enforced in code: investment limits, disclosure requirements, mandatory review periods. Human error minimized.</p>
            </div>
          </div>
          <p className="risk-note"><strong>Key advantage:</strong> Compliance designed into the architecture from day one—not retrofitted after launch.</p>
        </div>
      </section>

      {/* Slide 13: Regulation Timelines */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">Regulation Timelines</h2>
          <div className="big-stat">
            <div className="stat-number">RegCF</div>
            <div className="stat-label">Building a FINRA-registered funding portal from scratch</div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">18+ mos</div>
              <div className="stat-desc">FINRA registration process timeline</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">SOC 2</div>
              <div className="stat-desc">Security compliance required for financial services</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">7 years</div>
              <div className="stat-desc">Document retention requirement per SEC rules</div>
            </div>
          </div>
          <div className="constraints-grid" style={{ marginTop: '2rem' }}>
            <div className="constraint-card">
              <div className="constraint-icon">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h3>Regulatory Requirements</h3>
              <ul>
                <li>Platform must enforce RegCF investment limits automatically</li>
                <li>Complete audit trail for every transaction and document access</li>
                <li>Cannot hold investor funds—must integrate qualified escrow</li>
                <li>Mandatory 21-day review period and Form C compliance</li>
              </ul>
            </div>
            <div className="constraint-card">
              <div className="constraint-icon">
                <Lock size={32} strokeWidth={1.5} />
              </div>
              <h3>Security & Compliance</h3>
              <ul>
                <li>Bank-level KYC/AML verification on all users</li>
                <li>AES-256 encryption + TLS 1.3 for all data</li>
                <li>SOC 2 Type II compliance before launch</li>
                <li>Immutable blockchain ledger for investment records</li>
              </ul>
            </div>
          </div>
          <p className="slide-note" style={{ marginTop: '2rem' }}>Building a regulated financial platform, not just a website</p>
        </div>
      </section>

      {/* Slide 14: FINRA vs. SOC 2 - Understanding Compliance */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Two Types of Compliance: Legal vs. Technical</h2>
          <p className="stack-philosophy">FINRA is our driver's license. SOC 2 is our vehicle safety report. We need both.</p>

          <div className="architecture-grid" style={{ marginBottom: '3rem' }}>
            <div className="architecture-card">
              <div className="architecture-icon">
                <FileText size={32} strokeWidth={1.5} />
              </div>
              <h3>FINRA Compliance: "What We Do"</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong>Legal & Regulatory Requirement</strong> – This IS our business. Cannot be outsourced.
              </p>
              <ul>
                <li><strong>Goal:</strong> Investor protection through proper business rules</li>
                <li><strong>Audits:</strong> Do we enforce investment limits? Display required disclosures? Follow securities law?</li>
                <li><strong>Who checks:</strong> SEC and FINRA regulators</li>
                <li><strong>Example failure:</strong> "We let someone invest beyond legal limits"</li>
              </ul>
            </div>
            <div className="architecture-card">
              <div className="architecture-icon">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h3>SOC 2 Compliance: "How We Do It"</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong>Technical & Security Standard</strong> – Proves our technology is secure. Partially outsourced.
              </p>
              <ul>
                <li><strong>Goal:</strong> Data security and operational trust</li>
                <li><strong>Audits:</strong> Are systems encrypted? Do we have backups? Is access controlled?</li>
                <li><strong>Who checks:</strong> Independent 3rd-party auditors (AICPA certified)</li>
                <li><strong>Example failure:</strong> "We had a data breach exposing user passwords"</li>
              </ul>
            </div>
          </div>

          <div className="solution-box" style={{ background: 'var(--bg-white)', padding: '2rem', borderRadius: '12px', border: '2px solid var(--border-color)' }}>
            <h3>Shared Responsibility Model</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem', textAlign: 'left' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>What We Inherit (Outsourced)</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <li style={{ padding: '0.4rem 0' }}>✓ AWS physical & network security</li>
                  <li style={{ padding: '0.4rem 0' }}>✓ Plaid's banking & KYC compliance</li>
                  <li style={{ padding: '0.4rem 0' }}>✓ DocuSign's e-signature legality</li>
                  <li style={{ padding: '0.4rem 0' }}>✓ Escrow partner's fund custody license</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>What We Own (Our Responsibility)</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <li style={{ padding: '0.4rem 0' }}>→ Our application code security</li>
                  <li style={{ padding: '0.4rem 0' }}>→ Our team's access controls</li>
                  <li style={{ padding: '0.4rem 0' }}>→ Our business logic (FINRA rules)</li>
                  <li style={{ padding: '0.4rem 0' }}>→ Our vendor management & oversight</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="slide-note" style={{ marginTop: '2rem' }}><strong>Bottom Line:</strong> We leverage world-class infrastructure for security, but we own and build the regulatory compliance logic that makes this platform unique.</p>
        </div>
      </section>

      {/* Slide 15: Closing */}
      <section className="slide alt-slide closing-slide">
        <div className="container">
          <h2 className="section-title">Why We'll Succeed</h2>
          <div className="closing-content">
            <div className="closing-section">
              <h3>Our Unfair Advantage</h3>
              <p>We build at startup speed, but with institutional-grade compliance. Our team's expertise turns regulatory complexity, most teams' biggest bottleneck, into our primary advantage. We ship secure, audited platforms in a fraction of the traditional timeline.</p>
            </div>
            <div className="closing-section">
              <h3>The Complete Package</h3>
              <ol>
                <li><strong>Speed:</strong> Rapid development using battle-tested frameworks and pre-built infrastructure</li>
                <li><strong>Security:</strong> Enterprise-grade from day one—SOC 2 compliance, bank-level KYC, immutable audit trails</li>
                <li><strong>Innovation:</strong> Blockchain-backed investment records set us apart in the crowdfunding space</li>
                <li><strong>User Experience:</strong> Simple, intuitive flows that make complex financial processes feel effortless</li>
                <li><strong>Regulatory Ready:</strong> Compliance designed into our architecture, not bolted on later</li>
              </ol>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="pitch-footer">
        <div className="container">
          <p className="footer-pages">Use arrow keys or scroll to navigate • 16 slides</p>
        </div>
      </footer>
    </div>
  );
}
