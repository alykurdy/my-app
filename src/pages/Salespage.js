// src/components/SalesScreen/SalesScreen.jsx
import React from 'react';
// لا توجد استدعاءات لـ useState أو useEffect هنا
// ولا يتم استيراد المكونات الفرعية لتبسيط الكود وعرض الهيكل فقط

// يمكنك إضافة ملف CSS منفصل لتصميم هذه العناصر
// import './SalesScreen.css';

const SalesScreen = () => {
  return (
    <div className="sales-screen-container" style={{
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl', // للغة العربية
      textAlign: 'right',
      padding: '20px',
      maxWidth: '1200px',
      margin: '20px auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>شاشة المبيعات</h2>

      {/* --- Header / معلومات الفاتورة الأساسية --- */}
      <div className="invoice-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
        <p><strong>رقم الفاتورة:</strong> #000123</p>
        <p><strong>التاريخ:</strong> 07/07/2025</p>
        <p><strong>الوقت:</strong> 05:56 PM</p>
      </div>

      {/* --- بيانات العميل --- */}
      <div className="customer-info-section" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3>بيانات العميل</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label htmlFor="customerName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>اسم العميل:</label>
            <input type="text" id="customerName" placeholder="ابحث أو اكتب اسم العميل" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div>
            <label htmlFor="customerCode" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>كود العميل:</label>
            <input type="text" id="customerCode" value="C-DEFAULT" readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
          </div>
          <div>
            <label htmlFor="customerBalance" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>رصيد العميل:</label>
            <input type="text" id="customerBalance" value="0.00" readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
          </div>
          <div>
            <label htmlFor="customerNewBalance" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>الرصيد بعد الفاتورة:</label>
            <input type="text" id="customerNewBalance" value="0.00" readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
          </div>
          {/* حقل رقم الهاتف يظهر فقط للعميل النقدي الافتراضي */}
          <div>
            <label htmlFor="customerPhone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>رقم هاتف العميل (اختياري للنقدي):</label>
            <input type="text" id="customerPhone" placeholder="رقم الهاتف" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      {/* --- معلومات الموظفين والفرع --- */}
      <div className="staff-branch-info" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3 style={{ marginBottom: '15px' }}>بيانات الموظفين والفرع</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <div>
            <label htmlFor="representative" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>المندوب:</label>
            <input type="text" id="representative" placeholder="اسم المندوب" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div>
            <label htmlFor="salesperson" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>البائع:</label>
            <input type="text" id="salesperson" placeholder="اسم البائع" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div>
            <label htmlFor="branch" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>الفرع:</label>
            <input type="text" id="branch" placeholder="اسم الفرع" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      {/* --- إدخال الأصناف --- */}
      <div className="product-input-section" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3 style={{ marginBottom: '15px' }}>إضافة أصناف</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'flex-end' }}>
          {/* خانة الباركود/السيريال نمبر */}
          <div>
            <label htmlFor="barcodeSerialInput" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>باركود / سيريال نمبر:</label>
            <input type="text" id="barcodeSerialInput" placeholder="أدخل الباركود أو السيريال" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          {/* خانة اسم الصنف */}
          <div>
            <label htmlFor="productNameInput" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>اسم الصنف:</label>
            <input type="text" id="productNameInput" placeholder="ابحث باسم الصنف" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          {/* الكمية */}
          <div>
            <label htmlFor="productQty" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>الكمية:</label>
            <input type="number" id="productQty" value="1" min="1" style={{ width: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>
        {/* معلومات كمية الصنف */}
        <div className="stock-info" style={{ marginTop: '15px', fontSize: '0.9em', color: '#555', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
          <p>كمية "الصنف المختار" في المخزن الحالي (المخزن الرئيسي): <strong>5</strong></p>
          <p>إجمالي الكمية في كل المخازن: <strong>15</strong></p>
        </div>
      </div>

      {/* --- إضافة خدمة --- */}
      <div className="service-input-section" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3 style={{ marginBottom: '15px' }}>إضافة خدمة (مثل الصيانة)</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <label htmlFor="serviceName" style={{ fontWeight: 'bold' }}>اسم الخدمة:</label>
          <input type="text" id="serviceName" placeholder="اسم الخدمة" style={{ flexGrow: '1', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <label htmlFor="servicePrice" style={{ fontWeight: 'bold' }}>سعر الخدمة:</label>
          <input type="number" id="servicePrice" value="0.00" min="0" style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <button style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>إضافة خدمة</button>
        </div>
      </div>

      {/* --- جدول الأصناف والخدمات في الفاتورة (تم التعديل هنا لإضافة الخصم) --- */}
      <div className="invoice-items-section" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3>أصناف وخدمات الفاتورة</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الصنف/الخدمة</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الكمية</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>السعر</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الخصم (مبلغ/%)</th> {/* تم إضافة عمود الخصم */}
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإجمالي</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {/* مثال على صنف */}
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>لابتوب ديل</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input type="number" value="1" min="1" style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }} />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>15000.00</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {/* حقول الخصم للصنف */}
                <select style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px', marginRight: '5px' }}>
                  <option value="fixed">مبلغ</option>
                  <option value="percentage">%</option>
                </select>
                <input type="number" value="0.00" style={{ width: '70px', padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }} />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>15000.00</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>حذف</button>
              </td>
            </tr>
            {/* مثال على خدمة (الخدمات لا ينطبق عليها خصم الصنف عادة) */}
            <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>خدمة صيانة (خدمة)</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>250.00</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>N/A</td> {/* لا يوجد خصم على الخدمات */}
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>250.00</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <button style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>حذف</button>
                </td>
            </tr>
            {/* صفوف أخرى */}
          </tbody>
        </table>
      </div>

      {/* --- ملخص الإجمالي --- */}
      <div className="totals-summary-section" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h3>ملخص الفاتورة</h3>
        <p><strong>الإجمالي الفرعي:</strong> 15250.00</p>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="invoiceDiscount" style={{ fontWeight: 'bold', marginRight: '10px' }}>خصم على الفاتورة:</label>
          <select id="invoiceDiscount" style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px' }}>
            <option value="none">لا يوجد</option>
            <option value="fixed">مبلغ ثابت</option>
            <option value="percentage">نسبة مئوية</option>
          </select>
          <input type="number" value="0.00" style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <p><strong>الإجمالي بعد الخصم:</strong> 15250.00</p>
        <p><strong>ضريبة القيمة المضافة:</strong> 2135.00</p>
        <p><strong>ضريبة الأرباح التجارية والصناعية:</strong> 762.50</p>
        <p><strong>قيمة التوصيل:</strong> 50.00</p>
        <h4 style={{ color: '#28a745', fontSize: '1.2em' }}>الإجمالي النهائي المستحق: 18200.00</h4>
      </div>

      {/* --- خيارات الدفع --- */}
      <div className="payment-options-section" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3>خيارات الدفع</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>نقدي</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>آجل</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>تقسيط</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>دليفري</button>
        </div>
      </div>

      {/* --- أزرار الإجراءات --- */}
      <div className="action-buttons-section" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px', backgroundColor: '#f2f2f2', borderRadius: '8px' }}>
        <button style={{ padding: '12px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>حفظ</button>
        <button style={{ padding: '12px 25px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>تراجع</button>
        <button style={{ padding: '12px 25px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>تعديل الفاتورة</button>
        <button style={{ padding: '12px 25px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>فاتورة جديدة</button>
        <button style={{ padding: '12px 25px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>طباعة</button>
        <button style={{ padding: '12px 25px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}>جعلها عرض سعر</button>
      </div>

    </div>
  );
};

export default SalesScreen;