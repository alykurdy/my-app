import { Link, useLocation } from "react-router-dom";
import "../Styles/Dashboard.css";

const menuItems = [
  { path: "/dashboard/Home", text: "الرئيسية" },
  { path: "/customers", text: "العملاء" },
  { path: "/invoices", text: "الفواتير" },
  { path: "/reports", text: "التقارير" },
  { path: "/settings", text: "الإعدادات" },
  { path: "/dashboard/users", text: "المستخدمين" }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-brand">نظام الحسابات</div>
      
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
}