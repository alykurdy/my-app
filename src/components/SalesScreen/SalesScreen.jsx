// src/components/SalesScreen/SalesScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';

// تم إزالة جميع الاستيرادات المتعلقة بالطباعة مثل useRef و useReactToPrint
// import { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

import './SalesScreen.css';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import InvoiceHeader from '../InvoiceHeader';
import ProductInput from '../ProductInput';
import ServiceInput from '../ServiceInput';
import InvoiceItemsTable from '../InvoiceItemsTable';
import TotalsSummary from '../TotalsSummary';
import PaymentOptions from '../PaymentOptions';
import ActionButtons from '../ActionButtons';
// تم إزالة استيراد InvoicePrintView حيث لم يعد يُستخدم في هذا الملف
// import InvoicePrintView from '../InvoicePrintView';

const VAT_RATE = 0.14;
const PROFIT_TAX_RATE = 0.05;
const DELIVERY_SERVICE_ID = 'SERV-DELIVERY-001';
const DELIVERY_SERVICE_NAME = 'خدمة توصيل';
const DEFAULT_DELIVERY_PRICE = 50.00;

const SalesScreen = () => {
    const [customer, setCustomer] = useState({
        id: 'CASH',
        name: 'عميل نقدي',
        code: 'C-000',
        balance: 0.00,
        newBalance: 0.00,
        phone: '',
        isCashCustomer: true,
    });

    const [invoiceItems, setInvoiceItems] = useState([
        { id: 'P001', type: 'product', name: 'لابتوب ديل', qty: 1, price: 15000.00, unit: 'قطعة', discountType: 'fixed', discountValue: 0.00, total: 15000.00 },
        { id: 'S001', type: 'service', name: 'خدمة صيانة', qty: 1, price: 250.00, discountType: 'N/A', discountValue: 0.00, total: 250.00 },
    ]);

    const [invoiceDiscountType, setInvoiceDiscountType] = useState('none');
    const [invoiceDiscountValue, setInvoiceDiscountValue] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [invoiceType, setInvoiceType] = useState('sale');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString('ar-EG'));
    const [invoiceTime, setInvoiceTime] = useState(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }));

    // تم إزالة useRef وأي useEffect يتعلق بالطباعة

    const handleAddItem = useCallback((newItem) => {
        setInvoiceItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id && item.type === 'product');
            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                const existingItem = updatedItems[existingItemIndex];
                if (existingItem.unit === newItem.unit) {
                    updatedItems[existingItemIndex] = {
                        ...existingItem,
                        qty: existingItem.qty + newItem.qty,
                        total: (existingItem.qty + newItem.qty) * (existingItem.price - (existingItem.discountType === 'fixed' ? existingItem.discountValue : existingItem.price * existingItem.discountValue / 100)),
                    };
                    return updatedItems;
                }
            }
            const itemPriceAfterDiscount = newItem.price - (newItem.discountType === 'fixed' ? newItem.discountValue : newItem.price * newItem.discountValue / 100);
            const itemTotal = newItem.qty * itemPriceAfterDiscount;
            return [...prevItems, { ...newItem, total: itemTotal }];
        });
    }, []);

    const handleUpdateItem = useCallback((id, field, value) => {
        setInvoiceItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    if (field === 'qty' || field === 'price' || field === 'discountValue' || field === 'discountType') {
                        let priceAfterItemDiscount = updatedItem.price;
                        if (updatedItem.discountType === 'fixed') {
                            priceAfterItemDiscount = updatedItem.price - updatedItem.discountValue;
                        } else if (updatedItem.discountType === 'percentage') {
                            priceAfterItemDiscount = updatedItem.price * (1 - updatedItem.discountValue / 100);
                        }
                        if (priceAfterItemDiscount < 0) priceAfterItemDiscount = 0;
                        updatedItem.total = updatedItem.qty * priceAfterItemDiscount;
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    }, []);

    const handleRemoveItem = useCallback((id) => {
        setInvoiceItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);

    const calculateTotalDiscount = useCallback(() => {
        if (invoiceDiscountType === 'fixed') {
            return parseFloat(invoiceDiscountValue);
        } else if (invoiceDiscountType === 'percentage') {
            return subtotal * (parseFloat(invoiceDiscountValue) / 100);
        }
        return 0;
    }, [subtotal, invoiceDiscountType, invoiceDiscountValue]);

    const totalDiscount = calculateTotalDiscount();
    const totalAfterDiscount = subtotal - totalDiscount;

    const vatAmount = totalAfterDiscount * VAT_RATE;
    const profitTaxAmount = totalAfterDiscount * PROFIT_TAX_RATE;

    const deliveryServiceItem = invoiceItems.find(item => item.id === DELIVERY_SERVICE_ID);
    const deliveryFee = deliveryServiceItem ? deliveryServiceItem.price : 0;

    const finalTotal = totalAfterDiscount + vatAmount + profitTaxAmount + deliveryFee;

    const toggleDeliveryService = useCallback(() => {
        setInvoiceItems(prevItems => {
            const isDeliveryAdded = prevItems.some(item => item.id === DELIVERY_SERVICE_ID);
            if (isDeliveryAdded) {
                return prevItems.filter(item => item.id !== DELIVERY_SERVICE_ID);
            } else {
                return [
                    ...prevItems,
                    {
                        id: DELIVERY_SERVICE_ID,
                        type: 'service',
                        name: DELIVERY_SERVICE_NAME,
                        qty: 1,
                        price: DEFAULT_DELIVERY_PRICE,
                        discountType: 'N/A',
                        discountValue: 0,
                        total: DEFAULT_DELIVERY_PRICE,
                    }
                ];
            }
        });
    }, []);

    const handleSaveInvoice = async () => {
        const invoiceData = {
            customer_id: customer.id,
            customer_name: customer.name,
            customer_phone: customer.phone,
            invoice_type: invoiceType,
            payment_method: paymentMethod,
            invoice_date: invoiceDate,
            invoice_time: invoiceTime,
            subtotal: subtotal,
            invoice_discount_type: invoiceDiscountType,
            invoice_discount_value: invoiceDiscountValue,
            total_after_discount: totalAfterDiscount,
            vat_amount: vatAmount,
            profit_tax_amount: profitTaxAmount,
            delivery_fee: deliveryFee,
            final_total: finalTotal,
            items: invoiceItems.map(item => ({
                item_id: item.id,
                item_type: item.type,
                name: item.name,
                quantity: item.qty,
                unit: item.type === 'product' ? item.unit : null,
                unit_price: item.price,
                item_discount_type: item.discountType,
                item_discount_value: item.discountValue,
                item_total: item.total,
            })),
        };

        console.log('بيانات الفاتورة النهائية:', invoiceData);
        alert(`الفاتورة جاهزة للحفظ كـ ${invoiceType === 'sale' ? 'فاتورة بيع' : 'عرض سعر'}. تحقق من الـ Console.`);
    };

    // دالة جديدة مؤقتة لزر الطباعة ترسل البيانات إلى Laravel
    const handlePrintRequestToLaravel = async () => {
        // يمكنك هنا بناء البيانات التي تريد إرسالها إلى Laravel
        const dataToSend = {
            customer: customer,
            items: invoiceItems,
            totals: {
                subtotal,
                totalDiscount,
                totalAfterDiscount,
                vatAmount,
                profitTaxAmount,
                deliveryFee,
                finalTotal
            },
            invoiceDetails: {
                invoiceType,
                paymentMethod,
                invoiceDate,
                invoiceTime
            }
            // أضف أي بيانات أخرى تحتاجها Laravel لإنشاء الإيصال
        };

        console.log('إرسال طلب الطباعة إلى Laravel مع البيانات:', dataToSend);
        alert('سيتم إرسال طلب الطباعة إلى Laravel. تحتاج إلى تنفيذ Backend ليتلقى هذا الطلب.');

        // هذا الجزء ستقوم بتفعيله وتعديله لاحقًا للاتصال بـ API Laravel الفعلي
        /*
        try {
            const response = await fetch('/api/print-invoice', { // هذا هو endpoint API في Laravel
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // إذا كان الـ API محميًا، أضف توكن المصادقة هنا
                    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert('تم إرسال الفاتورة بنجاح إلى الطابعة (عبر Laravel)!');
                console.log('استجابة API من Laravel:', await response.json());
            } else {
                const errorData = await response.json();
                alert(`حدث خطأ أثناء الطباعة من الخادم: ${errorData.message || response.statusText}`);
                console.error('خطأ API من Laravel:', errorData);
            }
        } catch (error) {
            console.error('فشل الاتصال بالخادم لإرسال الطباعة:', error);
            alert('فشل في إرسال طلب الطباعة. تحقق من اتصال الشبكة والخادم.');
        }
        */
    };

    return (
        <div className="sales-screen-container">
            <h2>شاشة المبيعات</h2>

            <InvoiceHeader invoiceNumber="#000123" date={invoiceDate} time={invoiceTime} />

            <CustomerInfo
                customer={customer}
                onCustomerChange={(field, value) => setCustomer(prev => ({ ...prev, [field]: value }))}
                onToggleCashCustomer={() => setCustomer(prev => ({
                    ...prev,
                    isCashCustomer: !prev.isCashCustomer,
                    name: prev.isCashCustomer ? '' : 'عميل نقدي',
                    code: prev.isCashCustomer ? 'غير مسجل' : 'C-000',
                    phone: prev.isCashCustomer ? '' : '',
                }))}
            />

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

            <ProductInput onAddItem={handleAddItem} />
            <ServiceInput onAddItem={handleAddItem} />

            <InvoiceItemsTable
                items={invoiceItems}
                onUpdateItem={handleUpdateItem}
                onRemoveItem={handleRemoveItem}
            />

            <TotalsSummary
                subtotal={subtotal}
                invoiceDiscountType={invoiceDiscountType}
                invoiceDiscountValue={invoiceDiscountValue}
                onDiscountTypeChange={setInvoiceDiscountType}
                onDiscountValueChange={setInvoiceDiscountValue}
                vatAmount={vatAmount}
                profitTaxAmount={profitTaxAmount}
                deliveryFee={deliveryFee}
                finalTotal={finalTotal}
                toggleDeliveryService={toggleDeliveryService}
                isDeliveryAdded={!!deliveryServiceItem}
            />

            <PaymentOptions onPaymentMethodChange={setPaymentMethod} selectedMethod={paymentMethod} />

            <ActionButtons
                onSave={handleSaveInvoice}
                onSetInvoiceType={setInvoiceType}
                onPrint={handlePrintRequestToLaravel} // تم تغيير الدالة هنا
            />

            {/* تم إزالة InvoicePrintView من هنا بالكامل */}
        </div>
    );
};

export default SalesScreen;