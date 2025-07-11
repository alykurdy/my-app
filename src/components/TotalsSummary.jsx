// src/components/TotalsSummary.jsx
import React from 'react';

const TotalsSummary = ({
    subtotal,
    invoiceDiscountType,
    invoiceDiscountValue,
    onDiscountTypeChange,
    onDiscountValueChange,
    vatAmount,
    profitTaxAmount,
    deliveryFee,
    finalTotal,
    toggleDeliveryService,
    isDeliveryAdded
}) => {
    return (
        <div className="totals-summary-section section-card" style={{ backgroundColor: '#f9f9f9' }}>
            <h3>ملخص الفاتورة</h3>
            <p><strong>الإجمالي الفرعي:</strong> {subtotal.toFixed()}</p>

            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="invoiceDiscount" style={{ fontWeight: 'bold', marginRight: '10px', minWidth: '120px' }}>خصم على الفاتورة:</label>
                <select
                    id="invoiceDiscountType"
                    value={invoiceDiscountType}
                    onChange={(e) => onDiscountTypeChange(e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px', flexGrow: '1' }}
                >
                    <option value="none">لا يوجد</option>
                    <option value="fixed">مبلغ ثابت</option>
                    <option value="percentage">نسبة مئوية</option>
                </select>
                {invoiceDiscountType !== 'none' && (
                    <input
                        type="number"
                        value={invoiceDiscountValue.toFixed()}
                        onChange={(e) => onDiscountValueChange(parseFloat(e.target.value) || 0)}
                        style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                )}
            </div>

            <p><strong>الإجمالي بعد الخصم:</strong> {finalTotal - vatAmount - profitTaxAmount - deliveryFee - subtotal + (subtotal - (vatAmount + profitTaxAmount + deliveryFee)) > 0 ? (subtotal - vatAmount - profitTaxAmount - deliveryFee) : 0}</p>
            <p><strong>ضريبة القيمة المضافة:</strong> {vatAmount.toFixed()}</p>
            <p><strong>ضريبة الأرباح التجارية والصناعية:</strong> {profitTaxAmount.toFixed()}</p>
            <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>قيمة التوصيل:</strong> {deliveryFee.toFixed()}</span>
                <button
                    onClick={toggleDeliveryService}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: isDeliveryAdded ? '#dc3545' : '#17a2b8', // أحمر إذا مضافة، أزرق سماوي إذا غير مضافة
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9em'
                    }}
                >
                    {isDeliveryAdded ? 'إزالة خدمة التوصيل' : 'إضافة خدمة التوصيل'}
                </button>
            </p>
            <h4 style={{ color: '#28a745', fontSize: '1.2em' }}>الإجمالي النهائي المستحق: {finalTotal.toFixed()}</h4>
        </div>
    );
};

export default TotalsSummary;