import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CostCalculatorModal = ({ isOpen, onClose, onOpenSpeakModal }) => {
  const [unitType, setUnitType] = useState('2bhk');
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  if (!isOpen) return null;

  const basePrice = unitType === '2bhk' ? 14500000 : 21500000; // ₹1.45 Cr vs ₹2.15 Cr
  const carpetArea = unitType === '2bhk' ? '1,240 sq. ft.' : '1,890 sq. ft.';

  const gstEstimate = basePrice * 0.05;
  const regEstimate = basePrice * 0.066;
  const totalPrice = basePrice + gstEstimate + regEstimate;

  const downPaymentAmount = (totalPrice * downPaymentPercent) / 100;
  const loanAmount = totalPrice - downPaymentAmount;

  // Monthly EMI Calculation: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#4A3428',
          color: '#FFFFFF',
          padding: '2.5rem',
          position: 'relative',
          borderRadius: '12px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(166, 70, 42, 0.3)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Calculator size={26} style={{ color: '#A6462A' }} />
          <span className="section-tag" style={{ margin: 0 }}>Transparent Pricing</span>
        </div>

        <h2 style={{ color: '#FFFFFF', fontSize: '1.85rem', marginBottom: '0.5rem' }}>
          Advithiya Shreyas Cost & EMI Estimator
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Itemized cost calculations with zero hidden multipliers.
        </p>

        {/* UNIT SELECTOR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setUnitType('2bhk')}
            style={{
              padding: '1.25rem',
              backgroundColor: unitType === '2bhk' ? '#563D2F' : 'rgba(255,255,255,0.04)',
              border: '1px solid',
              borderColor: unitType === '2bhk' ? '#A6462A' : 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#FFFFFF',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#A6462A', fontWeight: 600, textTransform: 'uppercase' }}>2 BHK Residence</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: "'Josefin Sans', sans-serif" }}>1,240 sq. ft. Carpet Area</div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>Base ₹1.45 Cr*</div>
          </button>

          <button
            onClick={() => setUnitType('3bhk')}
            style={{
              padding: '1.25rem',
              backgroundColor: unitType === '3bhk' ? '#563D2F' : 'rgba(255,255,255,0.04)',
              border: '1px solid',
              borderColor: unitType === '3bhk' ? '#A6462A' : 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#FFFFFF',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#A6462A', fontWeight: 600, textTransform: 'uppercase' }}>3 BHK Luxury Unit</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: "'Josefin Sans', sans-serif" }}>1,890 sq. ft. Carpet Area</div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>Base ₹2.15 Cr*</div>
          </button>
        </div>

        {/* SLIDERS GRID */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
              <span>Down Payment ({downPaymentPercent}%)</span>
              <strong style={{ color: '#A6462A' }}>{formatINR(downPaymentAmount)}</strong>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#A6462A', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
              <span>Loan Tenure ({tenureYears} Years)</span>
              <strong>{tenureYears * 12} Months</strong>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#A6462A', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
              <span>Interest Rate ({interestRate}% p.a.)</span>
              <strong>Standard Home Loan Rate</strong>
            </div>
            <input
              type="range"
              min="7.5"
              max="11"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#A6462A', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* RESULTS BREAKDOWN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: '#312119', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Estimated Total Cost</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#FFFFFF', fontFamily: "'Josefin Sans', sans-serif", margin: '0.25rem 0' }}>
              {formatINR(totalPrice)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
              Includes GST (5%) & Registration (6.6%)
            </div>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: '#563D2F', borderRadius: '8px', border: '1px solid #A6462A' }}>
            <div style={{ fontSize: '0.8rem', color: '#A6462A', textTransform: 'uppercase', fontWeight: 600 }}>Estimated Monthly EMI</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#A6462A', fontFamily: "'Josefin Sans', sans-serif", margin: '0.25rem 0' }}>
              {formatINR(emi)} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: '#FFF' }}>/ mo</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
              Loan Amount: {formatINR(loanAmount)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
            <ShieldCheck size={16} style={{ color: '#A6462A' }} />
            <span>Exact bank approval & custom payment schedules provided on request.</span>
          </div>

          <button
            className="btn btn-orange"
            onClick={() => {
              onClose();
              onOpenSpeakModal();
            }}
          >
            <span>Request Official Cost Sheet</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CostCalculatorModal;
