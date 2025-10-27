'use client';

import { useState } from 'react';
import { FileText, Download, CheckCircle, AlertCircle, Eye, PenTool, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import './sign.css';

type SigningStep = 'review' | 'documents' | 'signing' | 'complete';

interface Document {
  id: string;
  name: string;
  type: string;
  pages: number;
  required: boolean;
  signed: boolean;
}

export default function SignPage() {
  const [currentStep, setCurrentStep] = useState<SigningStep>('review');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [signature, setSignature] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const investmentDetails = {
    company: 'Faith Forward Coffee',
    amount: 5000,
    shares: 250,
    sharePrice: 20,
  };

  const documents: Document[] = [
    {
      id: 'sub-agreement',
      name: 'Subscription Agreement',
      type: 'Legal Agreement',
      pages: 8,
      required: true,
      signed: false,
    },
    {
      id: 'risk-disclosure',
      name: 'Risk Disclosure Statement',
      type: 'Regulatory Document',
      pages: 4,
      required: true,
      signed: false,
    },
    {
      id: 'investor-cert',
      name: 'Investor Certification',
      type: 'Certification',
      pages: 2,
      required: true,
      signed: false,
    },
    {
      id: 'offering-memo',
      name: 'Offering Memorandum',
      type: 'Information Document',
      pages: 24,
      required: false,
      signed: false,
    },
  ];

  const handleContinueToDocuments = () => {
    if (acceptedTerms) {
      setCurrentStep('documents');
    }
  };

  const handleContinueToSigning = () => {
    setCurrentStep('signing');
  };

  const handleSign = () => {
    if (signature.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('complete');
      }, 2500);
    }
  };

  const handleBack = () => {
    if (currentStep === 'documents') setCurrentStep('review');
    if (currentStep === 'signing') setCurrentStep('documents');
  };

  return (
    <div className="sign-page">
      <div className="sign-container">
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`progress-step ${currentStep === 'review' ? 'active' : ''} ${['documents', 'signing', 'complete'].includes(currentStep) ? 'completed' : ''}`}>
            <div className="step-circle">1</div>
            <span>Review Investment</span>
          </div>
          <div className={`progress-step ${currentStep === 'documents' ? 'active' : ''} ${['signing', 'complete'].includes(currentStep) ? 'completed' : ''}`}>
            <div className="step-circle">2</div>
            <span>Review Documents</span>
          </div>
          <div className={`progress-step ${currentStep === 'signing' ? 'active' : ''} ${currentStep === 'complete' ? 'completed' : ''}`}>
            <div className="step-circle">3</div>
            <span>Sign</span>
          </div>
          <div className={`progress-step ${currentStep === 'complete' ? 'active completed' : ''}`}>
            <div className="step-circle">4</div>
            <span>Complete</span>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'review' && (
          <ReviewStep
            investmentDetails={investmentDetails}
            acceptedTerms={acceptedTerms}
            onAcceptTerms={setAcceptedTerms}
            onContinue={handleContinueToDocuments}
          />
        )}

        {currentStep === 'documents' && (
          <DocumentsStep
            documents={documents}
            onBack={handleBack}
            onContinue={handleContinueToSigning}
          />
        )}

        {currentStep === 'signing' && (
          <SigningStep
            investmentDetails={investmentDetails}
            signature={signature}
            onSignatureChange={setSignature}
            onBack={handleBack}
            onSign={handleSign}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 'complete' && (
          <CompleteStep investmentDetails={investmentDetails} />
        )}
      </div>
    </div>
  );
}

function ReviewStep({
  investmentDetails,
  acceptedTerms,
  onAcceptTerms,
  onContinue,
}: {
  investmentDetails: any;
  acceptedTerms: boolean;
  onAcceptTerms: (value: boolean) => void;
  onContinue: () => void;
}) {
  return (
    <div className="sign-step">
      <div className="step-header">
        <div className="step-icon">
          <Eye size={32} strokeWidth={1.5} />
        </div>
        <h1>Review Your Investment</h1>
        <p>Please carefully review the details of your investment before proceeding.</p>
      </div>

      <div className="investment-summary">
        <div className="summary-header">
          <h2>{investmentDetails.company}</h2>
        </div>

        <div className="summary-details">
          <div className="detail-row">
            <span className="detail-label">Investment Amount</span>
            <span className="detail-value">${investmentDetails.amount.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Number of Shares</span>
            <span className="detail-value">{investmentDetails.shares.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Price per Share</span>
            <span className="detail-value">${investmentDetails.sharePrice}</span>
          </div>
        </div>

        <div className="summary-total">
          <span className="total-label">Total Investment</span>
          <span className="total-value">${investmentDetails.amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="warning-box">
        <AlertCircle size={24} />
        <div>
          <strong>Important Investment Risks</strong>
          <p>
            Investing in early-stage companies involves significant risk, including potential loss of your entire investment.
            Please review all documents carefully and only invest what you can afford to lose.
          </p>
        </div>
      </div>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => onAcceptTerms(e.target.checked)}
        />
        <span>
          I have read and understand the investment risks, and I am ready to review and sign the required documents.
        </span>
      </label>

      <button
        className="btn btn-primary btn-large"
        onClick={onContinue}
        disabled={!acceptedTerms}
      >
        Continue to Documents
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

function DocumentsStep({
  documents,
  onBack,
  onContinue,
}: {
  documents: Document[];
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="sign-step">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="step-header">
        <div className="step-icon">
          <FileText size={32} strokeWidth={1.5} />
        </div>
        <h1>Review Investment Documents</h1>
        <p>Please review all required documents before signing. You can download copies for your records.</p>
      </div>

      <div className="documents-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <div className="document-icon">
              <FileText size={32} strokeWidth={1.5} />
            </div>

            <div className="document-info">
              <div className="document-header">
                <h3>{doc.name}</h3>
                {doc.required && <span className="required-badge">Required</span>}
              </div>
              <p className="document-type">{doc.type}</p>
              <p className="document-pages">{doc.pages} pages</p>
            </div>

            <div className="document-actions">
              <button className="btn-icon" title="Preview">
                <Eye size={20} />
              </button>
              <button className="btn-icon" title="Download">
                <Download size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="info-box">
        <Shield size={20} />
        <div>
          <strong>Powered by DocuSign</strong>
          <p>Your documents are secured with bank-level encryption and will be stored safely with blockchain verification.</p>
        </div>
      </div>

      <button className="btn btn-primary btn-large" onClick={onContinue}>
        Continue to Signature
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

function SigningStep({
  investmentDetails,
  signature,
  onSignatureChange,
  onBack,
  onSign,
  isProcessing,
}: {
  investmentDetails: any;
  signature: string;
  onSignatureChange: (value: string) => void;
  onBack: () => void;
  onSign: () => void;
  isProcessing: boolean;
}) {
  return (
    <div className="sign-step">
      <button className="back-button" onClick={onBack} disabled={isProcessing}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="step-header">
        <div className="step-icon">
          <PenTool size={32} strokeWidth={1.5} />
        </div>
        <h1>Sign Your Documents</h1>
        <p>By signing below, you agree to all terms and conditions outlined in the investment documents.</p>
      </div>

      <div className="signature-summary">
        <h3>Investment Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Company</span>
            <span className="summary-value">{investmentDetails.company}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Amount</span>
            <span className="summary-value">${investmentDetails.amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="signature-box">
        <label htmlFor="signature">Your Full Legal Name</label>
        <input
          id="signature"
          type="text"
          placeholder="Enter your full name as it appears on your ID"
          value={signature}
          onChange={(e) => onSignatureChange(e.target.value)}
          disabled={isProcessing}
        />
        {signature && (
          <div className="signature-preview">
            <span className="signature-text">{signature}</span>
          </div>
        )}
      </div>

      <div className="certification-box">
        <p>
          By signing, I certify that:
        </p>
        <ul>
          <li>I have reviewed all investment documents</li>
          <li>I understand the risks associated with this investment</li>
          <li>All information provided is accurate and truthful</li>
          <li>I meet all investor eligibility requirements</li>
        </ul>
      </div>

      <button
        className="btn btn-primary btn-large"
        onClick={onSign}
        disabled={!signature.trim() || isProcessing}
      >
        {isProcessing ? (
          <>
            <span className="spinner-small"></span>
            Processing...
          </>
        ) : (
          <>
            Sign & Complete Investment
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </div>
  );
}

function CompleteStep({ investmentDetails }: { investmentDetails: any }) {
  return (
    <div className="sign-step complete-step">
      <div className="success-icon">
        <CheckCircle size={80} strokeWidth={1.5} />
      </div>

      <h1>Documents Signed Successfully!</h1>
      <p className="step-subtitle">
        Your investment in {investmentDetails.company} is now complete. Your funds will be held in escrow until the campaign closes.
      </p>

      <div className="completion-details">
        <div className="detail-card">
          <FileText size={24} />
          <div>
            <strong>Blockchain Secured</strong>
            <p>Your investment record has been written to the blockchain for permanent verification</p>
          </div>
        </div>

        <div className="detail-card">
          <Shield size={24} />
          <div>
            <strong>Funds in Escrow</strong>
            <p>Your ${investmentDetails.amount.toLocaleString()} is safely held until the campaign closes</p>
          </div>
        </div>

        <div className="detail-card">
          <Download size={24} />
          <div>
            <strong>Documents Available</strong>
            <p>All signed documents are available in your dashboard for download</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button
          onClick={() => window.location.href = '/certificate/abc123'}
          className="btn btn-primary btn-large"
        >
          View Blockchain Certificate
        </button>
        <button
          onClick={() => window.location.href = '/notifications'}
          className="btn btn-outline"
        >
          View Notifications
        </button>
      </div>

      <div className="next-steps">
        <h3>What Happens Next?</h3>
        <ol>
          <li>You&apos;ll receive a confirmation email with all signed documents</li>
          <li>Your funds are held securely in escrow until the campaign closes</li>
          <li>When the campaign closes, you&apos;ll receive your blockchain-verified investment certificate</li>
          <li>You can track your investment and receive updates in your dashboard</li>
        </ol>
      </div>
    </div>
  );
}
