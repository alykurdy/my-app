// src/components/ProductInput.jsx
import React, { useState } from 'react';

const ProductInput = ({ onAddItem }) => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [qtyInput, setQtyInput] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('قطعة'); // حالة جديدة للوحدة

  // قائمة وهمية للوحدات، سيتم جلبها من الـ Backend لاحقًا
  const availableUnits = ['قطعة', 'علبة', 'كرتونة', 'كيلو جرام'];

  const handleAddProduct = () => {
    if (!barcodeInput && !nameInput) {
        alert("الرجاء إدخال باركود أو اسم الصنف.");
        return;
    }

    const newItem = {
        id: barcodeInput || `TEMP-PROD-${Date.now()}`,
        type: 'product',
        name: nameInput || `صنف #${barcodeInput || Math.floor(Math.random() * 1000)}`,
        qty: parseInt(qtyInput),
        price: 100.00, // سعر افتراضي
        unit: selectedUnit, // إضافة الوحدة هنا
        discountType: 'fixed',
        discountValue: 0.00,
    };
    onAddItem(newItem);
    setBarcodeInput('');
    setNameInput('');
    setQtyInput(1);
    setSelectedUnit('قطعة'); // إعادة تعيين الوحدة الافتراضية
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleAddProduct();
    }
  };

  return (
    <div className="product-input-section section-card">
      <h3>إضافة أصناف</h3>
      <div className="grid-3-cols"> {/* تغيير هنا إلى 4 أعمدة إذا أردنا */}
        <div>
          <label htmlFor="barcodeSerialInput">باركود / سيريال نمبر:</label>
          <input
            type="text"
            id="barcodeSerialInput"
            placeholder="أدخل الباركود أو السيريال"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="productNameInput">اسم الصنف:</label>
          <input
            type="text"
            id="productNameInput"
            placeholder="ابحث باسم الصنف"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label htmlFor="productQty">الكمية:</label>
          <input
            type="number"
            id="productQty"
            value={qtyInput}
            min="1"
            onChange={(e) => setQtyInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: '80px' }}
          />
        </div>
        <div> {/* حقل جديد للوحدة */}
          <label htmlFor="productUnit">الوحدة:</label>
          <select
            id="productUnit"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            {availableUnits.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="stock-info" style={{ marginTop: '15px', fontSize: '0.9em', color: '#555', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
        <p>كمية "الصنف المختار" في المخزن الحالي (المخزن الرئيسي): <strong>5</strong></p>
        <p>إجمالي الكمية في كل المخازن: <strong>15</strong></p>
      </div>
    </div>
  );
};

export default ProductInput;