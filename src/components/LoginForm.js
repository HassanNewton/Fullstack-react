import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  // Hämtar login-funktionen från AuthContext
  const { login } = useAuth();

  // useNavigate används för att skicka användaren till en ny sida efter inloggning
  const navigate = useNavigate();

  // useState används för att spara användarens inmatning (email och lösenord)
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindrar att sidan laddas om vid formulärskick
    try {
      // Skickar användarens inloggningsdata till backend med POST-anrop
      const res = await axios.post(
        `http://localhost:3001/api/users/login`,
        form
      );

      // Sparar det token vi får tillbaka i AuthContext och localStorage
      login(res.data.accessToken);

      // Skickar användaren vidare till dashboard-sidan efter lyckad inloggning
      navigate("/dashboard");
    } catch (error) {
      alert(
        "Inloggning misslyckades: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Logga in</button>
      <button type="button" onClick={() => navigate("/register")}>
        Registrera
      </button>
    </form>
  );
};

export default LoginForm;
