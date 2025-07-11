// src/components/ServiceInput.jsx
import React, { useState } from 'react';

const ServiceInput = ({ onAddItem }) => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState(0.00);

  const handleAddService = () => {
    if (!serviceName || servicePrice <= 0) {
      alert('الرجاء إدخال اسم الخدمة وسعر موجب.');
      return;
    }
    const newService = {
      id: `SERV-${Date.now()}`,
      type: 'service',
      name: serviceName,
      qty: 1,
      price: parseFloat(servicePrice),
      discountType: 'N/A', // الخدمات لا يطبق عليها خصم صنف
      discountValue: 0,
    };
    onAddItem(newService);
    setServiceName('');
    setServicePrice(0.00);
  };

  return (
    <div className="service-input-section section-card">
      <h3>إضافة خدمة (مثل الصيانة)</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <label htmlFor="serviceName" style={{ fontWeight: 'bold' }}>اسم الخدمة:</label>
        <input
          type="text"
          id="serviceName"
          placeholder="اسم الخدمة"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ flexGrow: '1' }}
        />
        <label htmlFor="servicePrice" style={{ fontWeight: 'bold' }}>سعر الخدمة:</label>
        <input
          type="number"
          id="servicePrice"
          value={servicePrice.toFixed()}
          min="0"
          onChange={(e) => setServicePrice(parseFloat(e.target.value) || 0)}
          style={{ width: '100px' }}
        />
        <button
          onClick={handleAddService}
          style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          إضافة خدمة
        </button>
      </div>
    </div>
  );
};

export default ServiceInput;