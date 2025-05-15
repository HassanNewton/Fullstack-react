import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/contacts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="contacts-list">
      <h2>My Contacts</h2>
      {/* <button onClick={() => navigate("/contacts/new")} className="add-button">
        Add New Contact
      </button> */}
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div key={contact._id} className="contact-card">
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <div className="contact-actions">
              <button onClick={() => navigate(`/contacts/edit/${contact._id}`)}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
