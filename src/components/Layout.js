import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- Lägg till detta

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // <-- Använd AuthContext

  const handleLogout = () => {
    logout(); // <-- Centraliserad logout
    navigate("/"); // Navigera efteråt
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          MyContacts
        </h1>
        <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;
