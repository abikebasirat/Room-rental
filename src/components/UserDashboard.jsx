import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer"
import { useSelector } from "react-redux";
import "../styles/UserDashboard.scss";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Get user ID and token from Redux or localStorage
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || storedUser?._id;

  // Debugging: log userId and token
  console.log('UserDashboard userId:', userId);
  console.log('UserDashboard token:', token);

  // 🚀 Load profile and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          console.log('No userId found!');
          return;
        }

        if (!token) {
          console.log('No token found!');
          setError('Authentication token not found. Please login again.');
          setLoading(false);
          return;
        }

        const profileRes = await axios.get(`http://localhost:3500/api/user/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Profile response:', profileRes.data);
        setProfile(profileRes.data);
        setFormData(profileRes.data);

        const bookingsRes = await axios.get(`http://localhost:3500/api/user/${userId}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookingsRes.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setLoading(false);
        if (err.response && err.response.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (err.response && err.response.status === 404) {
          setError('User not found. Please register or log in again.');
        } else {
          setError('Failed to load dashboard. Please try again.');
        }
      }
    };

    fetchData();
  }, [userId, token]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3500/api/user/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error("Update failed:", err);
      const msg = err?.response?.data?.message || "Profile update failed.";
      setError(msg);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3500/api/user/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Cancel failed:", err);
      setError("Failed to cancel booking.");
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (!userId) return <div>User ID not found. Please login again.</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="user-dashboard" style={{ padding: "2rem" }}>
      <h2>User Dashboard</h2>

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      <section>
        <h3>Profile Info</h3>
        {editMode ? (
          <>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p>Listing: {booking.listing?.title || "N/A"}</p>
              <p>Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleCancelBooking(booking._id)}>
                Cancel Booking
              </button>
            </div>
          ))
        )}
         <Footer />
      </section>
    </div>
  );
};

export default UserDashboard;


