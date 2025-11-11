import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { getAddresses, type Address } from "../api/addressApi";

interface AddressForm {
  addr_1: string;
  addr_2?: string;
  zip: string;
  city: string;
  country: string;
  isdefault: boolean;
}

function HomePage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AddressForm>({
    addr_1: "",
    addr_2: "",
    zip: "",
    city: "",
    country: "",
    isdefault: false,
  });

  const navigate = useNavigate();

  // Helper function to fetch addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAddresses();
      setAddresses(data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  // fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/v1/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/v1/users/address/add", form);
      setForm({
        addr_1: "",
        addr_2: "",
        zip: "",
        city: "",
        country: "",
        isdefault: false,
      });
      setShowForm(false);
      fetchAddresses(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add address");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      await api.delete(`/v1/users/address/${id}`);
      fetchAddresses(); // Refresh list
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete address");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading addresses...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>My Addresses</h1>
        <button onClick={handleLogout} style={{ padding: "8px 16px" }}>
          Logout
        </button>
      </div>

      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <button
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: "20px", padding: "10px 20px" }}
      >
        {showForm ? "Cancel" : "Add New Address"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddAddress}
          style={{
            marginBottom: "30px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginTop: 0 }}>New Address</h3>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Address Line 1 *
            </label>
            <input
              type="text"
              placeholder="Street address"
              value={form.addr_1}
              onChange={(e) => setForm({ ...form, addr_1: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              placeholder="Apartment, suite, etc."
              value={form.addr_2}
              onChange={(e) => setForm({ ...form, addr_2: e.target.value })}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              City *
            </label>
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              ZIP Code *
            </label>
            <input
              type="text"
              placeholder="ZIP / Postal code"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Country *
            </label>
            <input
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={form.isdefault}
                onChange={(e) =>
                  setForm({ ...form, isdefault: e.target.checked })
                }
                style={{ marginRight: "8px" }}
              />
              Set as default address
            </label>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Address
          </button>
        </form>
      )}

      {addresses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", padding: "40px" }}>
          No addresses saved yet. Add your first address above.
        </p>
      ) : (
        <div>
          <h2 style={{ fontSize: "1.2em", marginBottom: "15px" }}>
            Saved Addresses ({addresses.length})
          </h2>
          {addresses.map((address, index) => (
            <div
              key={address.id || `address-${index}`}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "4px",
                backgroundColor: address.is_default ? "#f0f8ff" : "white",
              }}
            >
              {address.is_default && (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "3px",
                    fontSize: "0.85em",
                    marginBottom: "10px",
                  }}
                >
                  Default
                </span>
              )}
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                {address.addr_1}
              </p>
              {address.addr_2 && (
                <p style={{ margin: "5px 0" }}>{address.addr_2}</p>
              )}
              <p style={{ margin: "5px 0" }}>
                {address.city}, {address.zip}
              </p>
              <p style={{ margin: "5px 0" }}>{address.country}</p>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
