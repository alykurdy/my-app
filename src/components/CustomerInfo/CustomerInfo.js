// src/components/CustomerInfo/CustomerInfo.jsx
import React from 'react';
import './CustomerInfo.css'; // ملف CSS الخاص بمعلومات العميل

const CustomerInfo = ({ customer, onCustomerChange, onToggleCashCustomer }) => {
  return (
    <div className="customer-info-section section-card">
      <h3>بيانات العميل</h3>
      <div className="customer-grid">
        <div className="grid-item">
          <label htmlFor="customerName">اسم العميل:</label>
          {customer.isCashCustomer ? (
            <input
              type="text"
              id="customerName"
              value={customer.name}
              readOnly
              className="read-only-field"
            />
          ) : (
            <input
              type="text"
              id="customerName"
              placeholder="ابحث أو اكتب اسم العميل"
              value={customer.name}
              onChange={(e) => onCustomerChange('name', e.target.value)}
            />
          )}
        </div>
        <div className="grid-item">
          <label htmlFor="customerCode">كود العميل:</label>
          <input
            type="text"
            id="customerCode"
            value={customer.code}
            readOnly
            className="read-only-field"
          />
        </div>
        <div className="grid-item">
          <label htmlFor="customerBalance">رصيد العميل:</label>
          <input
            type="text"
            id="customerBalance"
            value={customer.balance.toFixed(2)}
            readOnly
            className="read-only-field"
          />
        </div>
        <div className="grid-item">
          <label htmlFor="customerNewBalance">الرصيد بعد الفاتورة:</label>
          <input
            type="text"
            id="customerNewBalance"
            value={customer.newBalance.toFixed(2)}
            readOnly
            className="read-only-field"
          />
        </div>
        {/* حقل رقم الهاتف يظهر فقط للعميل النقدي أو غير المسجل */}
        {!customer.isCashCustomer && ( // يظهر فقط إذا لم يكن العميل النقدي الافتراضي
          <div className="grid-item">
            <label htmlFor="customerPhone">رقم هاتف العميل (للعميل غير المسجل):</label>
            <input
              type="text"
              id="customerPhone"
              placeholder="رقم الهاتف"
              value={customer.phone}
              onChange={(e) => onCustomerChange('phone', e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="customer-actions">
        <button
          onClick={onToggleCashCustomer}
          className="toggle-customer-btn"
          style={{
            backgroundColor: customer.isCashCustomer ? '#007BFF' : '#28a745',
            color: 'white',
            marginTop: '15px'
          }}
        >
          {customer.isCashCustomer ? 'أخذ بيانات العميل (غير مسجل)' : 'العودة لعميل نقدي افتراضي'}
        </button>
        {/* زر لحفظ بيانات العميل غير المسجل - سيظهر فقط إذا كان العميل غير نقدي ولم يتم حفظه بعد */}
        {!customer.isCashCustomer && customer.name && customer.phone && (
          <button
            className="save-unregistered-btn"
            style={{ backgroundColor: '#ffc107', color: 'black', marginRight: '10px', marginTop: '15px' }}
            // هذه الوظيفة ستتفاعل مع الـ Backend لاحقًا
            onClick={() => alert(`Saving unregistered customer: ${customer.name}, ${customer.phone}`)}
          >
            حفظ عميل غير مسجل
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;