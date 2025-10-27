'use client';

import { useState } from 'react';
import { Lock, Shield, Database, Server, Code, FileText, Users, Zap, CheckCircle, TrendingUp, AlertCircle, GitBranch } from 'lucide-react';
import './pitch.css';

export default function PitchPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'faith2025') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

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
            <span>•</span>
            <span>CONFIDENTIAL</span>
          </div>
        </div>
      </section>

      {/* Slide 2: Technical Challenge */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">The Technical Challenge</h2>
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
          <p className="slide-note">Building a regulated financial platform, not just a website</p>
        </div>
      </section>

      {/* Slide 3: Engineering Constraints */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">Engineering Constraints</h2>
          <div className="constraints-grid">
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
        </div>
      </section>

      {/* Slide 4: Technical Architecture */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Technical Architecture</h2>
          <div className="solution-box">
            <h3>Built for Compliance, Designed for Scale</h3>
            <p>API-first architecture separates financial transactions from presentation, enabling seamless regulatory evolution</p>
          </div>
          <div className="architecture-grid">
            <div className="architecture-card">
              <div className="architecture-icon">
                <Code size={32} strokeWidth={1.5} />
              </div>
              <h3>Core Infrastructure</h3>
              <ul>
                <li>React frontend with real-time campaign dashboards</li>
                <li>FastAPI backend with decoupled transaction logic</li>
                <li>PostgreSQL with transactional integrity + audit trails</li>
                <li>AWS SOC 2 compliant hosting + S3 document storage</li>
              </ul>
            </div>
            <div className="architecture-card">
              <div className="architecture-icon">
                <GitBranch size={32} strokeWidth={1.5} />
              </div>
              <h3>Critical Integrations</h3>
              <ul>
                <li>Plaid: Bank verification, KYC, ACH transfers</li>
                <li>DocuSign: Legally binding e-signatures with audit certificates</li>
                <li>Polygon zkEVM: Immutable investment ledger</li>
                <li>Qualified escrow partner: Third-party fund custody</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: How It Works */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="flow-grid">
            <div className="flow-card">
              <div className="flow-icon">
                <FileText size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">01</div>
              <h3>Company Applies</h3>
              <p>Founder submits campaign, vetted by our compliance team</p>
            </div>
            <div className="flow-card">
              <div className="flow-icon">
                <Zap size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">02</div>
              <h3>Campaign Goes Live</h3>
              <p>Investors browse deals, review docs, ask questions</p>
            </div>
            <div className="flow-card">
              <div className="flow-icon">
                <TrendingUp size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">03</div>
              <h3>Investment & Close</h3>
              <p>Investor commits funds, signs docs, funds held in escrow</p>
            </div>
            <div className="flow-card">
              <div className="flow-icon">
                <CheckCircle size={32} strokeWidth={1.5} />
              </div>
              <div className="flow-number">04</div>
              <h3>Securities Issued</h3>
              <p>Company receives funds, investor gets blockchain-verified shares</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Technology Stack */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Technology Stack</h2>
          <p className="stack-philosophy">"Secure, Scalable, and Compliant from Day One"</p>
          <div className="tech-stack">
            <div className="tech-layer">
              <div className="tech-icon">
                <Code size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Frontend</div>
                <div className="tech-badge">React</div>
                <p>Dynamic investor & founder dashboards</p>
              </div>
            </div>
            <div className="tech-layer">
              <div className="tech-icon">
                <Server size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Backend</div>
                <div className="tech-badge">Python (FastAPI)</div>
                <p>Decoupled API architecture isolates financial transactions from presentation layer</p>
              </div>
            </div>
            <div className="tech-layer">
              <div className="tech-icon">
                <Database size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Database</div>
                <div className="tech-badge">PostgreSQL</div>
                <p>Transactional integrity & audit trails</p>
              </div>
            </div>
            <div className="tech-layer">
              <div className="tech-icon">
                <Shield size={24} strokeWidth={1.5} />
              </div>
              <div className="tech-content">
                <div className="tech-label">Infrastructure</div>
                <div className="tech-badge">AWS</div>
                <p>SOC 2 compliant cloud + S3 document storage</p>
              </div>
            </div>
          </div>
          <div className="integrations">
            <h4>Critical Integrations</h4>
            <div className="integration-badges">
              <span className="integration-badge">DocuSign</span>
              <span className="integration-badge">Plaid</span>
              <span className="integration-badge">Polygon zkEVM</span>
              <span className="integration-badge">Escrow Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Build Details */}
      <section className="slide alt-slide">
        <div className="container">
          <h2 className="section-title">How We Build It: Architecture & Compliance</h2>
          <div className="build-details">
            <div className="build-section">
              <div className="build-header">
                <Users size={28} strokeWidth={1.5} />
                <h3>Investor Onboarding & KYC</h3>
              </div>
              <ol className="build-steps">
                <li><strong>Express Interest:</strong> Investor signs up for campaign updates</li>
                <li><strong>Complete KYC:</strong> Plaid Identity verifies name, DOB, SSN, address</li>
                <li><strong>Calculate Limits:</strong> System determines max investment per RegCF rules</li>
                <li><strong>Legal Approval:</strong> Compliance team reviews before access granted</li>
              </ol>
            </div>
            <div className="build-section">
              <div className="build-header">
                <FileText size={28} strokeWidth={1.5} />
                <h3>Document Signing & Validation</h3>
              </div>
              <ol className="build-steps">
                <li><strong>Auto-Generated Agreements:</strong> Template with investor details pre-filled</li>
                <li><strong>DocuSign E-Signature:</strong> Legally binding with IP, timestamp, certificate</li>
                <li><strong>Encrypted Storage:</strong> AWS S3 with 7-year retention per SEC</li>
                <li><strong>Compliance Trail:</strong> Every action logged for regulatory audits</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Competitive Moat */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Our Competitive Moat</h2>
          <p className="moat-subtitle">Regulatory Compliance Is Our Competitive Advantage</p>
          <div className="moat-grid">
            <div className="moat-card">
              <div className="moat-icon">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h4>FINRA Registration</h4>
              <p>18+ month process to become a registered Funding Portal. High barrier to entry.</p>
            </div>
            <div className="moat-card">
              <div className="moat-icon">
                <CheckCircle size={32} strokeWidth={1.5} />
              </div>
              <h4>RegCF Compliance</h4>
              <p>Platform enforces SEC rules: investment limits, disclosures, communication controls.</p>
            </div>
            <div className="moat-card">
              <div className="moat-icon">
                <Lock size={32} strokeWidth={1.5} />
              </div>
              <h4>Security Audits</h4>
              <p>SOC 2 Type II + penetration testing before launch. Enterprise-grade from day one.</p>
            </div>
            <div className="moat-card">
              <div className="moat-icon">
                <AlertCircle size={32} strokeWidth={1.5} />
              </div>
              <h4>KYC/AML</h4>
              <p>Bank-level identity verification and anti-fraud systems on all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Technical Roadmap */}
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

      {/* Slide 10: Build Budget */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Technical Build Budget</h2>
          <div className="budget-breakdown">
            <div className="budget-item">
              <div className="budget-header">
                <h4>Engineering Team</h4>
                <span className="budget-percent">35%</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '35%' }}></div>
              </div>
              <p>CTO + 2-3 full-stack engineers</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Legal & Compliance</h4>
                <span className="budget-percent">30%</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '30%' }}></div>
              </div>
              <p>Securities counsel, FINRA registration, Head of Compliance</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Infrastructure & Integrations</h4>
                <span className="budget-percent">20%</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '20%' }}></div>
              </div>
              <p>AWS, Plaid, DocuSign, escrow, SOC 2 audit, pentest</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Operations</h4>
                <span className="budget-percent">10%</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '10%' }}></div>
              </div>
              <p>Insurance, accounting, corporate setup</p>
            </div>
            <div className="budget-item">
              <div className="budget-header">
                <h4>Contingency</h4>
                <span className="budget-percent">5%</span>
              </div>
              <div className="budget-bar">
                <div className="budget-fill" style={{ width: '5%' }}></div>
              </div>
              <p>Buffer for regulatory or technical surprises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 11: Build Timeline */}
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

      {/* Slide 12: Engineering Team */}
      <section className="slide">
        <div className="container">
          <h2 className="section-title">Engineering Team Structure</h2>
          <p className="team-intro">Building a FinTech platform requires specialized expertise across engineering, security, and compliance.</p>
          <div className="team-grid">
            <div className="team-card">
              <h4>CTO / Technical Founder</h4>
              <p>System architecture, technical strategy, security design, team leadership</p>
            </div>
            <div className="team-card">
              <h4>Senior Full-Stack Engineer #1</h4>
              <p>Backend (FastAPI), database design, API architecture, integrations</p>
            </div>
            <div className="team-card">
              <h4>Senior Full-Stack Engineer #2</h4>
              <p>Frontend (React), investor/founder UX, real-time dashboards</p>
            </div>
            <div className="team-card">
              <h4>DevSecOps Engineer</h4>
              <p>AWS infrastructure, CI/CD, security hardening, SOC 2 compliance</p>
            </div>
            <div className="team-card">
              <h4>Head of Compliance</h4>
              <p>RegCF expertise, FINRA liaison, legal coordination, audit management</p>
            </div>
          </div>
          <p className="team-note"><strong>External Partners:</strong> Securities counsel, SOC 2 auditor, penetration testing firm, escrow provider.</p>
        </div>
      </section>

      {/* Slide 13: Technical Risk Mitigation */}
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

      {/* Slide 14: Closing */}
      <section className="slide closing-slide">
        <div className="container">
          <h2 className="section-title">Building a Regulated Financial Platform</h2>
          <div className="closing-content">
            <div className="closing-section">
              <h3>Technical Philosophy</h3>
              <p>This isn&apos;t a website with payments—it&apos;s a FINRA-registered financial institution. Every line of code must serve compliance, security, and auditability. We&apos;re building for the long term.</p>
            </div>
            <div className="closing-section">
              <h3>What We&apos;ve Covered</h3>
              <ol>
                <li>Regulatory constraints and engineering challenges</li>
                <li>Technical architecture and compliance automation</li>
                <li>Detailed implementation flows (KYC, escrow, documents)</li>
                <li>Security framework and risk mitigation</li>
                <li>Build timeline and team structure</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pitch-footer">
        <div className="container">
          <p className="footer-confidential"><strong>CONFIDENTIAL</strong> - This document contains proprietary information. Do not distribute without written permission.</p>
          <p className="footer-pages">Use arrow keys or scroll to navigate • 14 slides</p>
        </div>
      </footer>
    </div>
  );
}
