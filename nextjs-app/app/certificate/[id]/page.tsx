'use client';

import { useState, use } from 'react';
import { Shield, Download, Share2, CheckCircle, ExternalLink, Copy, FileText, Calendar, DollarSign, Hash, Lock, ArrowLeft } from 'lucide-react';
import DemoModal from '../../components/DemoModal';
import './certificate.css';

interface CertificateData {
  id: string;
  company: string;
  investorName: string;
  investmentAmount: number;
  shares: number;
  sharePrice: number;
  investmentDate: string;
  closingDate: string;
  blockchainHash: string;
  blockchainNetwork: string;
  certificateNumber: string;
  verified: boolean;
}

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Mock data - in real app, this would be fetched based on params.id
  const certificate: CertificateData = {
    id: resolvedParams.id,
    company: 'Faith Forward Coffee',
    investorName: 'John Anderson',
    investmentAmount: 5000,
    shares: 250,
    sharePrice: 20,
    investmentDate: 'March 15, 2025',
    closingDate: 'March 30, 2025',
    blockchainHash: '0x7a9f8e3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    blockchainNetwork: 'Polygon zkEVM',
    certificateNumber: 'HHI-2025-FFC-00250',
    verified: true,
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificate.blockchainHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In real app, this would generate and download a PDF
    console.log('Downloading certificate...');
  };

  const handleShare = () => {
    setShareOpen(!shareOpen);
  };

  const blockchainUrl = `https://zkevm.polygonscan.com/tx/${certificate.blockchainHash}`;

  return (
    <div className="certificate-page">
      {/* Back to Pitch Link */}
      <div className="back-to-pitch">
        <a href="/pitch" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Pitch</span>
        </a>
      </div>

      <div className="certificate-container">
        {/* Header Actions */}
        <div className="certificate-actions">
          <button className="action-btn" onClick={handleDownload}>
            <Download size={20} />
            Download PDF
          </button>
          <button className="action-btn" onClick={handleShare}>
            <Share2 size={20} />
            Share
          </button>
        </div>

        {/* Certificate Display */}
        <div className="certificate-card">
          {/* Verification Badge */}
          <div className="verification-badge">
            <Shield size={24} />
            <div>
              <strong>Blockchain Verified</strong>
              <span>Secured on {certificate.blockchainNetwork}</span>
            </div>
            <CheckCircle size={24} className="verified-icon" />
          </div>

          {/* Certificate Header */}
          <div className="certificate-header">
            <div className="certificate-logo">
              <Shield size={64} strokeWidth={1.5} />
            </div>
            <h1>Investment Certificate</h1>
            <p className="certificate-platform">Hope Has Investors</p>
            <p className="certificate-number">Certificate No. {certificate.certificateNumber}</p>
          </div>

          {/* Certificate Body */}
          <div className="certificate-body">
            <p className="certificate-statement">
              This certifies that
            </p>

            <div className="investor-name">{certificate.investorName}</div>

            <p className="certificate-statement">
              has invested in
            </p>

            <div className="company-name">{certificate.company}</div>

            {/* Investment Details */}
            <div className="investment-details">
              <div className="detail-row">
                <div className="detail-item">
                  <DollarSign size={20} />
                  <div>
                    <div className="detail-label">Investment Amount</div>
                    <div className="detail-value">${certificate.investmentAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <FileText size={20} />
                  <div>
                    <div className="detail-label">Shares Purchased</div>
                    <div className="detail-value">{certificate.shares.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <DollarSign size={20} />
                  <div>
                    <div className="detail-label">Price Per Share</div>
                    <div className="detail-value">${certificate.sharePrice}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Calendar size={20} />
                  <div>
                    <div className="detail-label">Investment Date</div>
                    <div className="detail-value">{certificate.investmentDate}</div>
                  </div>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item full-width">
                  <Calendar size={20} />
                  <div>
                    <div className="detail-label">Campaign Closing Date</div>
                    <div className="detail-value">{certificate.closingDate}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="blockchain-section">
              <div className="blockchain-header">
                <Lock size={20} />
                <h3>Blockchain Verification</h3>
              </div>

              <div className="blockchain-info">
                <div className="blockchain-item">
                  <span className="blockchain-label">Network</span>
                  <span className="blockchain-value">{certificate.blockchainNetwork}</span>
                </div>

                <div className="blockchain-item hash-item">
                  <span className="blockchain-label">
                    <Hash size={16} />
                    Transaction Hash
                  </span>
                  <div className="hash-container">
                    <code className="hash-value">{certificate.blockchainHash}</code>
                    <button
                      className="copy-btn"
                      onClick={handleCopyHash}
                      title="Copy to clipboard"
                    >
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="blockchain-link"
                >
                  View on Blockchain Explorer
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="certificate-footer">
            <div className="footer-seal">
              <Shield size={32} />
            </div>
            <p className="footer-text">
              This certificate represents a legally binding investment agreement. The transaction
              has been recorded on the blockchain for permanent verification and cannot be altered.
            </p>
            <p className="footer-date">
              Certificate generated on {certificate.closingDate}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="info-section">
          <div className="info-card">
            <Shield size={24} />
            <div>
              <h4>Permanent Record</h4>
              <p>
                This investment is permanently recorded on the blockchain, providing immutable proof
                of ownership that can be verified by anyone, anywhere, at any time.
              </p>
            </div>
          </div>

          <div className="info-card">
            <FileText size={24} />
            <div>
              <h4>Legal Documents</h4>
              <p>
                All signed legal documents, including the subscription agreement and disclosures,
                are available for download in your dashboard.
              </p>
            </div>
          </div>

          <div className="info-card">
            <Lock size={24} />
            <div>
              <h4>Secure & Private</h4>
              <p>
                Your investment details are encrypted and stored securely. Only you have access
                to your complete investment information.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bottom-actions">
          <a href="/invest" className="btn btn-primary">
            Browse More Opportunities
          </a>
          <a href="/notifications" className="btn btn-outline">
            View Notifications
          </a>
        </div>

        {/* Share Modal */}
        {shareOpen && (
          <div className="share-modal-overlay" onClick={() => setShareOpen(false)}>
            <div className="share-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Share Certificate</h3>
              <p>Share a verification link to this certificate</p>
              <div className="share-link">
                <input
                  type="text"
                  value={`${window.location.origin}/certificate/${certificate.id}`}
                  readOnly
                />
                <button onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/certificate/${certificate.id}`);
                }}>
                  <Copy size={18} />
                </button>
              </div>
              <button className="btn btn-primary" onClick={() => setShareOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Demo Modal */}
        <DemoModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Blockchain Explorer"
          message="In the full platform, this would link to Polygon zkEVM's block explorer (PolygonScan) where you could verify this transaction on the blockchain and see its immutable record."
          suggestions={[
            'The transaction hash above can be used to verify the investment on any blockchain explorer',
            'Blockchain records are permanent and cannot be altered or deleted',
            'This provides transparent proof of ownership for all stakeholders'
          ]}
        />
      </div>
    </div>
  );
}
