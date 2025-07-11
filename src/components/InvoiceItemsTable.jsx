// src/components/InvoiceItemsTable.jsx
import React from 'react';

const InvoiceItemsTable = ({ items, onUpdateItem, onRemoveItem }) => {
    return (
        <div className="invoice-items-section section-card">
            <h3>أصناف وخدمات الفاتورة</h3>
            {items.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#777' }}>لا توجد أصناف أو خدمات مضافة بعد.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الصنف/الخدمة</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الوحدة</th> {/* عمود جديد للوحدة */}
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الكمية</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>السعر</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الخصم</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإجمالي</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>إجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {item.name} ({item.type === 'service' ? 'خدمة' : 'صنف'})
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {item.type === 'product' ? item.unit : 'N/A'} {/* عرض الوحدة أو N/A للخدمات */}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {item.type === 'product' ? (
                                        <input
                                            type="number"
                                            value={item.qty}
                                            min="1"
                                            onChange={(e) => onUpdateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                                            style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }}
                                        />
                                    ) : (
                                        item.qty
                                    )}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <input
                                        type="number"
                                        value={item.price.toFixed()}
                                        onChange={(e) => onUpdateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                        style={{ width: '80px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }}
                                    />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {item.type === 'product' ? (
                                        <>
                                            <select
                                                value={item.discountType}
                                                onChange={(e) => onUpdateItem(item.id, 'discountType', e.target.value)}
                                                style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px', marginRight: '5px' }}
                                            >
                                                <option value="fixed">مبلغ</option>
                                                <option value="percentage">%</option>
                                            </select>
                                            <input
                                                type="number"
                                                value={item.discountValue.toFixed()}
                                                onChange={(e) => onUpdateItem(item.id, 'discountValue', parseFloat(e.target.value) || 0)}
                                                style={{ width: '70px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }}
                                            />
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.total.toFixed()}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InvoiceItemsTable;