// src/components/InvoiceHeader.jsx
import React from 'react';

const InvoiceHeader = ({ invoiceNumber, date, time }) => {
  return (
    <div className="invoice-header section-card" style={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '5px'
    }}>
      <p><strong>رقم الفاتورة:</strong> {invoiceNumber}</p>
      <p><strong>التاريخ:</strong> {date}</p>
      <p><strong>الوقت:</strong> {time}</p>
    </div>
  );
};

export default InvoiceHeader;