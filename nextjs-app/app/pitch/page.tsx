'use client';

import { useState, useEffect } from 'react';
import { Lock, Shield, Database, Server, Code, FileText, Users, Zap, CheckCircle, TrendingUp, AlertCircle, GitBranch } from 'lucide-react';
import './pitch.css';

export default function PitchPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 13;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'faith2025') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password');
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
            />
            <button type="submit" className="btn btn-primary">Unlock</button>
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
                <li>Polygon zkEVM provides immutable investment records—investor confidence and regulatory compliance in one</li>
                <li>Transparent, verifiable ledger eliminates disputes over ownership</li>
                <li>Future-proof: positions us for secondary market and digital securities innovation</li>
                <li>Industry-first for faith-based crowdfunding platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: User Experience First */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">User Experience First</h2>
          <p className="stack-philosophy">Simple, intuitive flows that feel like consumer apps—but with enterprise-grade security underneath</p>
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

      {/* Slide 4: Technology Stack */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Strategic Technology Choices</h2>
          <p className="stack-philosophy">"Battle-tested tools that let us move fast and stay secure"</p>
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
                <div className="tech-badge">Polygon zkEVM</div>
                <p>Immutable investment records with low costs—gives investors permanent proof of ownership</p>
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

      {/* Slide 5: Accelerated Launch Strategy */}
      <section className="slide alt-slide">
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
                <li><strong>AWS Compliance Suite:</strong> SOC 2 certified infrastructure, S3 with immutable storage for SEC document retention</li>
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
                <li><strong>Polygon zkEVM:</strong> Turnkey blockchain integration for immutable investment records without building custom infrastructure</li>
                <li><strong>API-First Design:</strong> Clean separation enables web launch now, mobile apps later without rearchitecture</li>
              </ul>
            </div>
          </div>
          <p className="slide-note" style={{ marginTop: '2rem' }}><strong>Key Advantage:</strong> We integrate proven, audited solutions rather than reinventing the wheel—reducing time to market by months.</p>
        </div>
      </section>

      {/* Slide 6: Competitive Advantages */}
      <section className="slide">
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

      {/* Slide 7: Technical Roadmap */}
      <section className="slide alt-slide">
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
                <li>Blockchain ledger implementation (Polygon zkEVM)</li>
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

      {/* Slide 8: Build Budget */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Technical Build Budget</h2>
          <p className="stack-philosophy">Estimated $250K-$500K for complete technical platform</p>
          <div className="budget-breakdown">
            <div className="budget-item">
              <div className="budget-header">
                <h4>Core Platform Development</h4>
                <span className="budget-percent">$120K-$200K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '45%' }}></div>
              </div>
              <p>Full-stack development: investor/founder dashboards, campaign flows, user management, real-time analytics</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Infrastructure & Integrations</h4>
                <span className="budget-percent">$60K-$120K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '25%' }}></div>
              </div>
              <p>AWS hosting, Plaid KYC, DocuSign API, escrow integration, Polygon blockchain, database setup</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Security & Compliance Systems</h4>
                <span className="budget-percent">$40K-$80K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '20%' }}></div>
              </div>
              <p>SOC 2 Type II audit, penetration testing, security hardening, compliance automation tools</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Testing & QA</h4>
                <span className="budget-percent">$20K-$50K</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '10%' }}></div>
              </div>
              <p>Automated testing suite, beta testing infrastructure, bug fixes, performance optimization</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Legal & Compliance</h4>
                <span className="budget-percent">Separate Budget</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '0%', backgroundColor: '#ccc' }}></div>
              </div>
              <p>Securities counsel, FINRA registration, compliance personnel (handled separately from technical build)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Build Timeline */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">Build Timeline</h2>
          <div className="timeline">
            <div className="timeline-phase">
              <div className="timeline-marker">Q1</div>
              <h4>Team & Foundation</h4>
              <ul>
                <li>Hire CTO and lead engineers</li>
                <li>Engage securities counsel</li>
                <li>File FINRA Funding Portal application</li>
                <li>Finalize technical specs and architecture</li>
              </ul>
            </div>
            <div className="timeline-phase">
              <div className="timeline-marker">Q2-Q3</div>
              <h4>Core Development</h4>
              <ul>
                <li>Build MVP: investor/founder dashboards, campaign flows</li>
                <li>Integrate KYC/AML (Plaid), e-signature (DocuSign), escrow</li>
                <li>Implement RegCF compliance engine and investment limits</li>
                <li>Develop blockchain ledger integration (Polygon zkEVM)</li>
              </ul>
            </div>
            <div className="timeline-phase">
              <div className="timeline-marker">Q4</div>
              <h4>Security & Testing</h4>
              <ul>
                <li>Complete SOC 2 Type II audit</li>
                <li>Third-party penetration testing</li>
                <li>Beta test with 2-3 pilot campaigns</li>
                <li>Fix bugs, optimize performance, harden security</li>
              </ul>
            </div>
            <div className="timeline-phase">
              <div className="timeline-marker">Q5</div>
              <h4>Launch</h4>
              <ul>
                <li>Receive FINRA Funding Portal approval</li>
                <li>Launch first live campaigns</li>
                <li>Monitor systems, gather feedback, iterate</li>
                <li>Plan Series A and next-phase features</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: Development Approach */}
      <section className="slide">
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
              <p>Plaid (KYC/banking), DocuSign (e-signature), qualified escrow provider, Polygon (blockchain)</p>
            </div>
          </div>
          <p className="team-note"><strong>Strategy:</strong> Build fast with a lean core team, augmented by best-in-class third-party services and consultants.</p>
        </div>
      </section>

      {/* Slide 11: Technical Risk Mitigation */}
      <section className="slide alt-slide">
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

      {/* Slide 12: Regulation Timelines */}
      <section className="slide">
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

      {/* Slide 13: Closing */}
      <section className="slide closing-slide">
        <div className="container">
          <h2 className="section-title">Why We'll Succeed</h2>
          <div className="closing-content">
            <div className="closing-section">
              <h3>Our Unfair Advantage</h3>
              <p>We&apos;ve mastered the art of building complex financial platforms at startup speed. While others take years to launch, we ship secure, compliant, user-friendly platforms in months—without cutting corners. This isn&apos;t just faster development; it&apos;s a fundamental competitive advantage.</p>
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
          <p className="footer-pages">Use arrow keys or scroll to navigate • 13 slides</p>
        </div>
      </footer>
    </div>
  );
}
