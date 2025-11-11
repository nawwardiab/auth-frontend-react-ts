import { useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    repeatedPassword: "",
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data);
    }
  };
  return (
    <form onSubmit={handleForm}>
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        name="password"
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <input
        type="password"
        placeholder="Repeat Password"
        name="repeatedPassword"
        value={form.repeatedPassword}
        onChange={(e) =>
          setForm((f) => ({ ...f, repeatedPassword: e.target.value }))
        }
      />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default RegisterPage;
