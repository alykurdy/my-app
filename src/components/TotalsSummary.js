// src/components/TotalsSummary.jsx
import React from 'react';

const TotalsSummary = ({ subtotal }) => {
  // هذه القيم ثابتة حاليًا، سيتم حسابها ديناميكيًا لاحقًا
  const invoiceDiscount = 0.00; // مثال
  const totalAfterDiscount = subtotal - invoiceDiscount;
  const vat = totalAfterDiscount * 0.14; // مثال 14%
  const profitTax = totalAfterDiscount * 0.05; // مثال 5%
  const deliveryFee = 50.00;
  const finalTotal = totalAfterDiscount + vat + profitTax + deliveryFee;

  return (
    <div className="totals-summary-section section-card" style={{ backgroundColor: '#f9f9f9' }}>
      <h3>ملخص الفاتورة</h3>
      <p><strong>الإجمالي الفرعي:</strong> {subtotal.toFixed(2)}</p>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="invoiceDiscount" style={{ fontWeight: 'bold', marginRight: '10px' }}>خصم على الفاتورة:</label>
        <select id="invoiceDiscount" style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px' }}>
          <option value="none">لا يوجد</option>
          <option value="fixed">مبلغ ثابت</option>
          <option value="percentage">نسبة مئوية</option>
        </select>
        <input type="number" value={invoiceDiscount.toFixed(2)} style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
      </div>

      <p><strong>الإجمالي بعد الخصم:</strong> {totalAfterDiscount.toFixed(2)}</p>
      <p><strong>ضريبة القيمة المضافة:</strong> {vat.toFixed(2)}</p>
      <p><strong>ضريبة الأرباح التجارية والصناعية:</strong> {profitTax.toFixed(2)}</p>
      <p><strong>قيمة التوصيل:</strong> {deliveryFee.toFixed(2)}</p>
      <h4 style={{ color: '#28a745', fontSize: '1.2em' }}>الإجمالي النهائي المستحق: {finalTotal.toFixed(2)}</h4>
    </div>
  );
};

export default TotalsSummary;