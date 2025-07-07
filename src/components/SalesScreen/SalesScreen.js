// src/components/SalesScreen/SalesScreen.jsx
import React, { useState } from 'react';
import './SalesScreen.css'; // ملف CSS الخاص بشاشة المبيعات
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import InvoiceHeader from '../InvoiceHeader';
import ProductInput from '../ProductInput';
import ServiceInput from '../ServiceInput';
import InvoiceItemsTable from '../InvoiceItemsTable';
import TotalsSummary from '../TotalsSummary';
import PaymentOptions from '../PaymentOptions';
import ActionButtons from '../ActionButtons';

const SalesScreen = () => {
  // حالة العميل
  const [customer, setCustomer] = useState({
    id: 'CASH', // ID افتراضي للعميل النقدي
    name: 'عميل نقدي',
    code: 'C-000',
    balance: 0.00,
    newBalance: 0.00,
    phone: '', // سيكون فارغًا للعميل النقدي الافتراضي
    isCashCustomer: true, // للإشارة إلى أنه عميل نقدي
  });

  // حالة الأصناف والخدمات في الفاتورة
  const [invoiceItems, setInvoiceItems] = useState([
    // مثال لصنف، سيتم إزالته أو ملؤه ديناميكيًا لاحقًا
    { id: 'P001', type: 'product', name: 'لابتوب ديل', qty: 1, price: 15000.00, discountType: 'fixed', discountValue: 0.00, total: 15000.00 },
    { id: 'S001', type: 'service', name: 'خدمة صيانة', qty: 1, price: 250.00, discountType: 'N/A', discountValue: 0.00, total: 250.00 },
  ]);

  // دالة لتحديث بيانات العميل
  const handleCustomerChange = (field, value) => {
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [field]: value,
    }));
  };

  // دالة للتبديل بين العميل النقدي وغير المسجل
  const handleToggleCashCustomer = () => {
    if (customer.isCashCustomer) {
      // إذا كان العميل نقديًا، جهز البيانات لعميل غير مسجل
      setCustomer({
        id: null, // لا يوجد ID حتى الآن لعميل غير مسجل
        name: '',
        code: 'غير مسجل',
        balance: 0.00,
        newBalance: 0.00,
        phone: '',
        isCashCustomer: false,
      });
    } else {
      // إذا كان غير مسجل، ارجع إلى العميل النقدي الافتراضي
      setCustomer({
        id: 'CASH',
        name: 'عميل نقدي',
        code: 'C-000',
        balance: 0.00,
        newBalance: 0.00,
        phone: '',
        isCashCustomer: true,
      });
    }
  };

  // دالة لحساب الإجمالي الفرعي
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);

  // *هنا يمكن إضافة المزيد من وظائف إدارة الأصناف مثل إضافة/حذف/تحديث*

  return (
    <div className="sales-screen-container">
      <h2>شاشة المبيعات</h2>

      <InvoiceHeader invoiceNumber="#000123" date="07/07/2025" time="05:56 PM" />

      <CustomerInfo
        customer={customer}
        onCustomerChange={handleCustomerChange}
        onToggleCashCustomer={handleToggleCashCustomer}
      />

      {/* معلومات الموظفين والفرع - حاليًا ثابتة */}
      <div className="staff-branch-info section-card">
        <h3>بيانات الموظفين والفرع</h3>
        <div className="grid-3-cols">
          <div>
            <label htmlFor="representative">المندوب:</label>
            <input type="text" id="representative" value="محمد السيد" readOnly />
          </div>
          <div>
            <label htmlFor="salesperson">البائع:</label>
            <input type="text" id="salesperson" value="أحمد سمير" readOnly />
          </div>
          <div>
            <label htmlFor="branch">الفرع:</label>
            <input type="text" id="branch" value="الفرع الرئيسي" readOnly />
          </div>
        </div>
      </div>

      <ProductInput />
      <ServiceInput />

      <InvoiceItemsTable items={invoiceItems} />

      <TotalsSummary subtotal={subtotal} />

      <PaymentOptions />

      <ActionButtons />
    </div>
  );
};

export default SalesScreen;