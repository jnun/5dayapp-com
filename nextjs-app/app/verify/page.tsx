'use client';

import { useState } from 'react';
import { Shield, CheckCircle, Building2, CreditCard, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import './verify.css';

type VerificationStep = 'intro' | 'plaid' | 'processing' | 'success';

export default function VerifyPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('intro');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartVerification = () => {
    setCurrentStep('plaid');
  };

  const handlePlaidConnect = () => {
    setCurrentStep('processing');
    setIsProcessing(true);

    // Simulate Plaid verification process
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('success');
    }, 3000);
  };

  const handleBack = () => {
    if (currentStep === 'plaid') {
      setCurrentStep('intro');
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        {currentStep === 'intro' && <IntroStep onNext={handleStartVerification} />}
        {currentStep === 'plaid' && <PlaidStep onConnect={handlePlaidConnect} onBack={handleBack} />}
        {currentStep === 'processing' && <ProcessingStep />}
        {currentStep === 'success' && <SuccessStep />}
      </div>
    </div>
  );
}

function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="verify-step intro-step">
      <div className="step-icon">
        <Shield size={64} strokeWidth={1.5} />
      </div>

      <h1>Verify Your Identity</h1>
      <p className="step-subtitle">
        To comply with SEC regulations, we need to verify your identity before you can invest. This process is quick, secure, and only takes a minute.
      </p>

      <div className="features-list">
        <div className="feature-item">
          <CheckCircle size={24} className="feature-icon" />
          <div>
            <h3>Bank-Grade Security</h3>
            <p>Your data is encrypted with the same standards used by major financial institutions</p>
          </div>
        </div>

        <div className="feature-item">
          <CheckCircle size={24} className="feature-icon" />
          <div>
            <h3>One-Time Process</h3>
            <p>Verify once and you&apos;re done. Invest in any campaign without additional verification</p>
          </div>
        </div>

        <div className="feature-item">
          <CheckCircle size={24} className="feature-icon" />
          <div>
            <h3>No Document Uploads</h3>
            <p>Simply connect your bank account via Plaid—no photos or manual document uploads required</p>
          </div>
        </div>
      </div>

      <div className="info-box">
        <Lock size={20} />
        <div>
          <strong>Your Privacy is Protected</strong>
          <p>We use Plaid Identity, trusted by thousands of financial apps. Your bank credentials are never shared with us.</p>
        </div>
      </div>

      <button className="btn btn-primary btn-large" onClick={onNext}>
        Start Verification
        <ArrowRight size={20} />
      </button>

      <p className="help-text">
        Have questions? <a href="/help">Read our verification FAQ</a>
      </p>
    </div>
  );
}

function PlaidStep({ onConnect, onBack }: { onConnect: () => void; onBack: () => void }) {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const popularBanks = [
    { id: 'chase', name: 'Chase', logo: '🏦' },
    { id: 'bofa', name: 'Bank of America', logo: '🏦' },
    { id: 'wells', name: 'Wells Fargo', logo: '🏦' },
    { id: 'citi', name: 'Citibank', logo: '🏦' },
    { id: 'capital', name: 'Capital One', logo: '🏦' },
    { id: 'usbank', name: 'U.S. Bank', logo: '🏦' },
  ];

  return (
    <div className="verify-step plaid-step">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="step-icon">
        <Building2 size={64} strokeWidth={1.5} />
      </div>

      <h1>Connect Your Bank</h1>
      <p className="step-subtitle">
        Select your bank to securely verify your identity. This connection is read-only and powered by Plaid.
      </p>

      <div className="bank-search">
        <input type="text" placeholder="Search for your bank..." />
      </div>

      <div className="banks-section">
        <h3 className="banks-title">Popular Banks</h3>
        <div className="banks-grid">
          {popularBanks.map(bank => (
            <button
              key={bank.id}
              className={`bank-card ${selectedBank === bank.id ? 'selected' : ''}`}
              onClick={() => setSelectedBank(bank.id)}
            >
              <div className="bank-logo">{bank.logo}</div>
              <div className="bank-name">{bank.name}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn btn-primary btn-large"
        onClick={onConnect}
        disabled={!selectedBank}
      >
        Continue with {selectedBank ? popularBanks.find(b => b.id === selectedBank)?.name : 'Selected Bank'}
        <ArrowRight size={20} />
      </button>

      <div className="plaid-badge">
        <Lock size={16} />
        <span>Secured by Plaid</span>
      </div>
    </div>
  );
}

function ProcessingStep() {
  return (
    <div className="verify-step processing-step">
      <div className="processing-animation">
        <div className="spinner"></div>
      </div>

      <h1>Verifying Your Identity</h1>
      <p className="step-subtitle">
        Please wait while we securely verify your information. This should only take a moment...
      </p>

      <div className="processing-steps">
        <div className="processing-item completed">
          <CheckCircle size={20} />
          <span>Bank connection established</span>
        </div>
        <div className="processing-item active">
          <div className="processing-dot"></div>
          <span>Verifying identity information</span>
        </div>
        <div className="processing-item">
          <div className="processing-dot"></div>
          <span>Checking compliance requirements</span>
        </div>
      </div>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="verify-step success-step">
      <div className="success-icon">
        <CheckCircle size={80} strokeWidth={1.5} />
      </div>

      <h1>Identity Verified!</h1>
      <p className="step-subtitle">
        You&apos;re all set! Your identity has been successfully verified and you can now invest in any campaign on the platform.
      </p>

      <div className="success-info">
        <div className="info-item">
          <Shield size={24} />
          <div>
            <strong>Secure & Private</strong>
            <p>Your verification is encrypted and stored securely</p>
          </div>
        </div>
        <div className="info-item">
          <CreditCard size={24} />
          <div>
            <strong>Ready to Invest</strong>
            <p>You can now make investments up to your annual limit</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <a href="/invest" className="btn btn-primary btn-large">
          Browse Investment Opportunities
          <ArrowRight size={20} />
        </a>
        <a href="/dashboard" className="btn btn-outline">
          Go to Dashboard
        </a>
      </div>

      <div className="success-note">
        <p>You&apos;ll receive a confirmation email with your verification details within a few minutes.</p>
      </div>
    </div>
  );
}
