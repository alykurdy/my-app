// src/components/ActionButtons.jsx
import React from 'react';

const ActionButtons = ({ onSave, onSetInvoiceType, onPrint }) => {
  const handleSaveClick = (type) => {
    onSetInvoiceType(type); // تحديد نوع الفاتورة قبل الحفظ
    onSave(); // استدعاء دالة الحفظ
  };

  return (
    <div className="action-buttons-section" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px', backgroundColor: '#f2f2f2', borderRadius: '8px' }}>
      <button
        onClick={() => handleSaveClick('sale')}
        style={{ padding: '12px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}
      >
        حفظ (فاتورة بيع)
      </button>
      <button style={{ padding: '12px 25px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>تراجع</button>
      <button style={{ padding: '12px 25px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>تعديل الفاتورة</button>
      <button style={{ padding: '12px 25px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>فاتورة جديدة</button>
      <button
        onClick={onPrint}
        style={{ padding: '12px 25px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}
      >
        طباعة
      </button>
      <button
        onClick={() => handleSaveClick('quote')}
        style={{ padding: '12px 25px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}
      >
        جعلها عرض سعر
      </button>
    </div>
  );
};

export default ActionButtons;