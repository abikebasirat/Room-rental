
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileImage) {
      setError("Please upload a profile image.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:3500/auth/register", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image" className="image-upload-label">
            <img src="/assets/addImage.png" alt="Upload" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="preview"
              width="80"
            />
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>

        <a href="/login">Already have an account? Log In</a>
      </div>
    </div>
  );
};

export default RegisterPage;




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.scss";
// import axios from "axios";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ✅ Update inputs
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "profileImage" ? files[0] : value,
//     }));
//   };

//   // ✅ Ensure passwords match
//   useEffect(() => {
//     setPasswordMatch(
//       formData.password === formData.confirmPassword || formData.confirmPassword === ""
//     );
//   }, [formData.password, formData.confirmPassword]);

//   // ✅ Single submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.profileImage) {
//       setError("Please upload a profile image.");
//       return;
//     }

//     const form = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       form.append(key, value);
//     });

//     try {
//       const res = await axios.post("http://localhost:3500/api/auth/register", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       localStorage.setItem("token", res.data.token); // Save token
//       navigate("/admin-dashboard"); // Redirect after success
//     } catch (err) {
//       console.error("Registration error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="register">
//       <div className="register_content">
//         <form className="register_content_form" onSubmit={handleSubmit}>
//           <input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             required
//           />
//           <input
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />
//           <input
//             name="confirmPassword"
//             type="password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             required
//           />

//           {!passwordMatch && (
//             <p style={{ color: "red" }}>Passwords do not match</p>
//           )}

//           <input
//             id="image"
//             type="file"
//             name="profileImage"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="image" className="image-upload-label">
//             <img src="/assets/addImage.png" alt="Upload" />
//             <p>Upload Your Photo</p>
//           </label>

//           {formData.profileImage && (
//             <img
//               src={URL.createObjectURL(formData.profileImage)}
//               alt="preview"
//               width="80"
//             />
//           )}

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <button type="submit" disabled={!passwordMatch}>
//             REGISTER
//           </button>
//         </form>

//         <a href="/login">Already have an account? Log In</a>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
