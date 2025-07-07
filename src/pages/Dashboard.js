import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../Styles/Dashboard.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // استدعاء بيانات المستخدم من localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // دالة بسيطة للتحقق من الصلاحية
  const hasPermission = (perm) => {
    return user && user.permissions && user.permissions.includes(perm);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>لوحة التحكم الرئيسية</h2>
        <p>مرحباً بك في لوحة التحكم، يمكنك تصفح الأقسام من الشريط الجانبي</p>

        <div className="card">
          <div className="card-Navbar">محتوى إحصائي</div>
          <div className="card-body">
            <p>هنا يمكنك عرض الإحصائيات المهمة</p>

            {/* 👇 مثال لزر يظهر فقط إذا كان عنده صلاحية manage_users */}
            {hasPermission("manage_users") && (
              <button className="manage-btn">إدارة المستخدمين</button>
            )}
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
