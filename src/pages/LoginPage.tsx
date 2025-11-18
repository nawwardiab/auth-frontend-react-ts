import { useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    try {
      await api.post("/login", form);
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Login failed";
      setError(
        typeof errorMessage === "string" ? errorMessage : String(errorMessage)
      );
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
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
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate("/register")}>
        Need an account? Register
      </button>
    </form>
  );
}

export default LoginPage;
