import Sidebar from "../components/Sidebar";  // ✅ صحيح
import Upbar from "../components/Upbar";     // ✅ صحيح
import "../Styles/Dashboard.css";           // ✅ صحيح

import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Upbar />
        <main className="main-content">
        <h2>لوحة التحكم الرئيسية</h2>
        <p>مرحباً بك في لوحة التحكم، يمكنك تصفح الأقسام من الشريط الجانبي</p>
        
        <div className="card">
          <div className="card-header">محتوى إحصائي</div>
          <div className="card-body">
            <p>هنا يمكنك عرض الإحصائيات المهمة</p>
          </div>
       
        </div>
      
         <Outlet/>
         </main>
      
    
    </div>
  );
}