import "../Styles/Dashboard.css";

export default function Upbar() {
  const userName = localStorage.getItem('name') || 'مستخدم';

  return (
    <div className="upbar">
      <div style={{ flex: 1 }}></div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span>مرحباً، {userName}</span>
      </div>
    </div>
  );
}