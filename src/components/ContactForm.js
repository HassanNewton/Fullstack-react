import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/contacts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setForm(response.data);
        } catch (error) {
          console.error("Error fetching contact:", error);
          navigate("/dashboard");
        }
      };
      fetchContact();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/api/contacts/${id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await axios.post(`http://localhost:3001/api/contacts`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving contact:", error);
      navigate("/dashboard");
    }
  };

  return (
    <div className="contact-form">
      <h2>{id ? "Edit Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">{id ? "Update" : "Add"} Contact</button>
          <button type="button" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
