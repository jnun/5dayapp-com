'use client';

import { X } from 'lucide-react';
import './DemoModal.css';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  suggestions?: string[];
}

export default function DemoModal({ isOpen, onClose, title, message, suggestions }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="demo-modal-content">
          <h2>{title}</h2>
          <p>{message}</p>

          {suggestions && suggestions.length > 0 && (
            <div className="demo-modal-suggestions">
              <h3>Try these instead:</h3>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="demo-modal-button" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
