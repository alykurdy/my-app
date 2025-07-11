// src/components/PaymentOptions.jsx
import React from 'react';

const PaymentOptions = ({ onPaymentMethodChange, selectedMethod }) => {
  return (
    <div className="payment-options-section section-card">
      <h3>خيارات الدفع</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onPaymentMethodChange('cash')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedMethod === 'cash' ? '#0056b3' : '#007BFF', // أغمق قليلاً عند التحديد
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          نقدي
        </button>
        <button
          onClick={() => onPaymentMethodChange('credit')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedMethod === 'credit' ? '#5a6268' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          آجل
        </button>
        <button
          onClick={() => onPaymentMethodChange('installment')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedMethod === 'installment' ? '#5a6268' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          تقسيط
        </button>
        <button
          onClick={() => onPaymentMethodChange('delivery')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedMethod === 'delivery' ? '#e0a800' : '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          دليفري
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;