import "../Styles/Dashboard.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );

  useEffect(() => {
    // نحدث القيمة لما تتغير صفحة
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, [location.pathname]); // أي تغيير في المسار يخلينا نعيد التحقق

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
      <h2>مرحبا بك </h2>
        <div>
      {!isAuthenticated ? (
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/register">تسجيل مستخدم جديد</Link>
          <Link to="/login">تسجيل الدخول</Link>
        </nav>
      ) : (
       
        <button className="soft-button" onClick={handleLogout} style={{ padding: '5px 10px' }}>
          تسجيل الخروج
        </button>
      )}
      </div>
    </div>
  );
}