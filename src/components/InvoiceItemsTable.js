// src/components/InvoiceItemsTable.jsx
import React from 'react';

const InvoiceItemsTable = ({ items }) => {
  return (
    <div className="invoice-items-section section-card">
      <h3>أصناف وخدمات الفاتورة</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الصنف/الخدمة</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الكمية</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>السعر</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الخصم (مبلغ/%)</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإجمالي</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>إجراء</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name} ({item.type === 'service' ? 'خدمة' : 'صنف'})</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }}
                  readOnly={item.type === 'service'} // لا يمكن تغيير كمية الخدمات عادة
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.price.toFixed(2)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {item.type === 'product' ? (
                  <>
                    <select style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px', marginRight: '5px' }}>
                      <option value="fixed">مبلغ</option>
                      <option value="percentage">%</option>
                    </select>
                    <input
                      type="number"
                      value={item.discountValue.toFixed(2)}
                      style={{ width: '70px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }}
                    />
                  </>
                ) : (
                  'N/A' // للخدمات
                )}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.total.toFixed(2)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsTable;