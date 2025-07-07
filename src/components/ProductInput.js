// src/components/ProductInput.jsx
import React from 'react';

const ProductInput = () => {
  return (
    <div className="product-input-section section-card">
      <h3>إضافة أصناف</h3>
      <div className="grid-3-cols">
        <div>
          <label htmlFor="barcodeSerialInput">باركود / سيريال نمبر:</label>
          <input type="text" id="barcodeSerialInput" placeholder="أدخل الباركود أو السيريال" />
        </div>
        <div>
          <label htmlFor="productNameInput">اسم الصنف:</label>
          <input type="text" id="productNameInput" placeholder="ابحث باسم الصنف" />
        </div>
        <div>
          <label htmlFor="productQty">الكمية:</label>
          <input type="number" id="productQty" value="1" min="1" style={{ width: '80px' }} />
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