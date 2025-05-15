import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/users/register`, form);
      navigate("/");
    } catch (error) {
      alert(
        "Registreringen misslyckades: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Registrera</button>
    </form>
  );
};

export default RegisterForm;
