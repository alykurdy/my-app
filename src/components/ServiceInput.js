// src/components/ServiceInput.jsx
import React from 'react';

const ServiceInput = () => {
  return (
    <div className="service-input-section section-card">
      <h3>إضافة خدمة (مثل الصيانة)</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <label htmlFor="serviceName" style={{ fontWeight: 'bold' }}>اسم الخدمة:</label>
        <input type="text" id="serviceName" placeholder="اسم الخدمة" style={{ flexGrow: '1' }} />
        <label htmlFor="servicePrice" style={{ fontWeight: 'bold' }}>سعر الخدمة:</label>
        <input type="number" id="servicePrice" value="0.00" min="0" style={{ width: '100px' }} />
        <button style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>إضافة خدمة</button>
      </div>
    </div>
  );
};

export default ServiceInput;