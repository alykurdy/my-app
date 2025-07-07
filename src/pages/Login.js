import { useState } from 'react';
import axios from 'axios';
import '../index.css';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setAccept(true);
    setError('');

    if (password.length < 8) {
      setError('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        name: name,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;

        // تخزين التوكن وبيانات المستخدم
        window.localStorage.setItem('authToken', token);
        window.localStorage.setItem('userData', JSON.stringify(user));

        // توجيه المستخدم للداشبورد
        window.location.pathname = '/Dashboard';
      }

      setName('');
      setPassword('');
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول:', error);
      if (error.response) {
        setError(error.response.data.message || 'حدث خطأ أثناء تسجيل الدخول');
      } else {
        setError('حدث خطأ في الاتصال بالخادم');
      }
    }
  }

  return (
    <div className="father">
      <div className="register">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={submit}>
          <label htmlFor="name">اسم المستخدم:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="أدخل اسم المستخدم الخاص بك"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="signup-button">
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
