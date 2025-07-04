import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState('');
   const [nameAvailable, setNameAvailable] = useState(null);
  const [checkingName, setCheckingName] = useState(false);

   // فحص الاسم أثناء الكتابة
  useEffect(() => {
    const timer = setTimeout(() => {
      if (name.length > 2) { // يبدأ الفحص بعد 3 أحرف
        checkNameAvailability(name);
      }
    }, 500); // تأخير 500 مللي ثانية بعد انتهاء الكتابة

    return () => clearTimeout(timer);
  }, [name]);

  const checkNameAvailability = async (name) => {
    setCheckingName(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/check-name?name=${name}`);
      setNameAvailable(res.data.available);
    } catch (error) {
      console.error('Error checking name:', error);
    } finally {
      setCheckingName(false);
    }
  };

  async function submit(event) {
    event.preventDefault();
    setAccept(true);
    setError('');

    // التحقق من صحة البيانات
    if (password.length < 8) {
      setError('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });

      console.log(response.data);
      alert('تم تسجيل المستخدم بنجاح');
      // إعادة تعيين الحقول بعد التسجيل الناجح
       if (response.status === 201 || response.status === 200) {
        window.localStorage.setItem(name, response.data.token);
        window.location.pathname = '/home';
      }
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
     
    }
    catch (error) {
    if (error.response?.data?.errors) {
        if (error.response.data.errors.name) {
            setError('اسم المستخدم موجود مسبقاً');
        } else if (error.response.data.errors.email) {
            setError('البريد الإلكتروني موجود مسبقاً');
        } else {
            setError('حدث خطأ في البيانات المدخلة');
        }
    } else {
        setError('حدث خطأ في الخادم');
    }
}
  }
  

  return (
    <div className="father">
      <div className="register">
        <h2 style={{ fontWeight: 'bold', marginBottom: '50px', fontSize: '24px' }}>
          تسجيل مستخدم جديد
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={submit}>
          <label htmlFor="name">اسم المستخدم:</label>
           <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder=" ادخل اسم المستخدم"
      />
      
      {checkingName && <p>جاري التحقق...</p>}
      
      {nameAvailable === false && (
        <p style={{ color: 'red' }}>هذا الاسم موجود مسبقاً!</p>
      )}
      
      {nameAvailable === true && (
        <p style={{ color: 'green' }}>هذا الاسم متاح ✓</p>
      )}
    </div>

          <label htmlFor="email">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="أدخل بريدك الإلكتروني"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="أدخل كلمة المرور الخاصة بك"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {accept && password.length < 8 && (
            <p className="error-text">يجب أن تكون كلمة المرور 8 أحرف على الأقل</p>
          )}

          <label htmlFor="confirm-password">تأكيد كلمة المرور:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="تأكيد كلمة المرور الخاصة بك"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {accept && password !== confirmPassword && (
            <p className="error-text">كلمة المرور غير متطابقة</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="signup-button">
              تسجيل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}