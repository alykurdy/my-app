import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdOutlineSecurityUpdate } from "react-icons/md";
import '../Styles/Form.css';
export default function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [error, setError] = useState("");

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
      fetchUsers();
    } catch (error) {
      console.error("فشل في الحذف", error);
      alert("حدث خطأ أثناء حذف المستخدم");
    }
  };

  // ✏️ بدء التعديل
  const startEdit = (user) => {
    setEditUser(user);
  };

  // ✅ حفظ التعديل
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${editUser.id}`, {
        name: editUser.name,
        email: editUser.email,
      });

      alert(response.data.message || "تم التعديل بنجاح");
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      alert("حدث خطأ أثناء التعديل");
      console.error(error);
    }
  };

  // ➕ إضافة مستخدم جديد
  const createUser = async (e) => {
    e.preventDefault();
    setError("");

    if (newUser.password.length < 8) {
      setError("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
      return;
    }

    if (newUser.password !== newUser.password_confirmation) {
      setError("كلمة المرور غير متطابقة");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", newUser);
      alert("تم إنشاء المستخدم بنجاح");
      setNewUser({ name: "", email: "", password: "", password_confirmation: "" });
      fetchUsers();
    } catch (error) {
      if (error.response?.data?.errors?.email) {
        setError("البريد الإلكتروني موجود مسبقًا");
      } else if (error.response?.data?.errors?.name) {
        setError("اسم المستخدم موجود مسبقًا");
      } else {
        setError("حدث خطأ في التسجيل");
      }
    }
  };

  return (
    <div>
       {/* ➕ نموذج إضافة مستخدم */}
      <div className="form-container" >
        <h3 className="form-container h3">إضافة مستخدم جديد</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form  onSubmit={createUser} className="form-group">
          <div > 
            <label htmlFor="name">اسم المستخدم:</label>
          <input 
            type="text"
            placeholder="الاسم"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          </div>
          <div > 
          <label  htmlFor="email">البريد الإلكتروني:</label>
          <input 
            type="email"
            placeholder="البريد الإلكتروني"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          </div> 
          <div > 
           <label htmlFor="password">كلمة المرور:</label>
          <input 
            type="password"
            placeholder="كلمة المرور"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          </div>
          <div > 
            <label htmlFor="confirm-password">تأكيد كلمة المرور:</label>
          <input 
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={newUser.password_confirmation}
            onChange={(e) => setNewUser({ ...newUser, password_confirmation: e.target.value })}
            required
          />
          </div>
          
        </form>
        <button class="form-submit-button" type="submit">إضافة المستخدم</button>
      </div>
      {/* 🧾 جدول المستخدمين */}
      <div className="table-container">
        <h2>قائمة المستخدمين</h2>
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
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <MdOutlineSecurityUpdate
                    size={20}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => startEdit(user)}
                  />
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>
                    <MdDelete size={20} color="red" style={{ cursor: "pointer" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✍️ نموذج التعديل */}
      {editUser && (
        <div className="edit-form" style={{ marginTop: "30px", border: "1px solid #ccc", padding: "20px" }}>
          <h3>تعديل المستخدم</h3>
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            placeholder="اسم المستخدم"
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="البريد الإلكتروني"
          />
          <button onClick={handleUpdate}>حفظ التعديلات</button>
          <button onClick={() => setEditUser(null)} style={{ marginRight: "10px" }}>
            إلغاء
          </button>
        </div>
      )}

     
    </div>
  );
}
