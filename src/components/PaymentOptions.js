// src/components/PaymentOptions.jsx
import React from 'react';

const PaymentOptions = () => {
  return (
    <div className="payment-options-section section-card">
      <h3>خيارات الدفع</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>نقدي</button>
        <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>آجل</button>
        <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>تقسيط</button>
        <button style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>دليفري</button>
      </div>
    </div>
  );
};

export default PaymentOptions;