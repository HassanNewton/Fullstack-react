import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  // const { logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Mina Kontakter</h1>
      {/* <button onClick={logout}>Logga ut</button> */}
      <div className="dashboard-header">
        <ContactForm onContactAdded={() => window.location.reload()} />
        <ContactList />
      </div>
    </div>
  );
};

export default Dashboard;
