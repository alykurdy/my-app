import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdOutlineSecurityUpdate } from "react-icons/md";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // ⬅️ لتخزين المستخدم الجاري تعديله

  // 🔁 تحميل المستخدمين
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/show");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب المستخدمين", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑️ حذف المستخدم
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف المستخدم؟");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
      alert(response.data.message);
      fetchUsers(); // إعادة تحميل المستخدمين بعد الحذف
    } catch (error) {
      console.error("فشل في الحذف", error);
      alert("حدث خطأ أثناء حذف المستخدم");
    }
  };

  // ✏️ بدء التعديل
  const startEdit = (user) => {
    setEditUser(user);
  };

  // ✅ حفظ التعديلات
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${editUser.id}`, {
        name: editUser.name,
        email: editUser.email,
      });

      alert(response.data.message || "تم التعديل بنجاح");
      setEditUser(null); // إخفاء النموذج
      fetchUsers(); // تحديث القائمة
    } catch (error) {
      alert("حدث خطأ أثناء التعديل");
      console.error(error);
    }
  };

  // 🧾 عرض المستخدمين في الجدول
  const showUsers = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <MdOutlineSecurityUpdate
          size={20}
          color="blue"
          style={{ cursor: "pointer" }}
          onClick={() => startEdit(user)} // ⬅️ عند الضغط يبدأ التعديل
        />
      </td>
      <td>
        <button onClick={() => deleteUser(user.id)}>
          <MdDelete size={20} color="red" style={{ cursor: "pointer" }} />
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      {/* 🧾 جدول المستخدمين */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>البريد الإلكترونى</th>
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>{showUsers}</tbody>
        </table>
      </div>

      {/* ✍️ نموذج التعديل */}
      {editUser && (
        <div className="edit-form" style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>تعديل المستخدم</h3>
          <label>الاسم:</label>
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <br />
          <label>البريد الإلكترونى:</label>
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <br />
          <button onClick={handleUpdate} style={{ marginTop: "10px", marginRight: "10px" }}>
            حفظ التعديلات
          </button>
          <button onClick={() => setEditUser(null)} style={{ marginTop: "10px" }}>
            إلغاء
          </button>
        </div>
      )}
    </div>
  );
}
