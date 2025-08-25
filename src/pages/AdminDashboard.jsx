
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingListingId, setEditingListingId] = useState(null);
  const [editData, setEditData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data));
      

    axios
      .get("http://localhost:3500/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));

    axios
      .get("http://localhost:3500/api/admin/listings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setListings(res.data));
  }, [token]);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3500/api/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter((user) => user._id !== id));
  };

  const deleteListing = async (id) => {
    await axios.delete(`http://localhost:3500/api/admin/listing/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setListings(listings.filter((listing) => listing._id !== id));
  };

  const handleEditClick = (type, item) => {
    setEditData(item);
    if (type === "user") {
      setEditingUserId(item._id);
    } else if (type === "listing") {
      setEditingListingId(item._id);
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (type, id) => {
    const endpoint =
      type === "user"
        ? `http://localhost:3500/api/admin/user/${id}`
        : `http://localhost:3500/api/admin/listing/${id}`;

    const res = await axios.put(endpoint, editData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (type === "user") {
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
      setEditingUserId(null);
    } else {
      setListings(listings.map((l) => (l._id === id ? res.data : l)));
      setEditingListingId(null);
    }
  };

  // ✅ Make Admin
  const makeAdmin = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3500/api/admin/user/${id}/make-admin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error("Error making admin:", err);
    }
  };

  // ✅ Revoke Admin
  const revokeAdmin = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3500/api/admin/user/${id}/revoke-admin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error("Error revoking admin:", err);
    }
  };

  // Chart data
  const pieData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Listings", value: stats.totalListings || 0 },
    { name: "Bookings", value: stats.totalBookings || 0 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Stats Section */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overview</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Stats Breakdown</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pieData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Users Table */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              All Users
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {editingUserId === user._id ? (
                        <TextField
                          name="name"
                          value={editData.name || ""}
                          onChange={handleEditChange}
                          size="small"
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUserId === user._id ? (
                        <TextField
                          name="email"
                          value={editData.email || ""}
                          onChange={handleEditChange}
                          size="small"
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {editingUserId === user._id ? (
                        <>
                          <Button
                            onClick={() => saveEdit("user", user._id)}
                            size="small"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingUserId(null)}
                            size="small"
                            color="error"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleEditClick("user", user)}
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteUser(user._id)}
                            size="small"
                            color="error"
                          >
                            Delete
                          </Button>
                          {user.role !== "admin" ? (
                            <Button
                              onClick={() => makeAdmin(user._id)}
                              size="small"
                              color="secondary"
                            >
                              Make Admin
                            </Button>
                          ) : (
                            <Button
                              onClick={() => revokeAdmin(user._id)}
                              size="small"
                              color="warning"
                            >
                              Revoke Admin
                            </Button>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Listings Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              All Listings
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing._id}>
                    <TableCell>
                      {editingListingId === listing._id ? (
                        <TextField
                          name="title"
                          value={editData.title || ""}
                          onChange={handleEditChange}
                          size="small"
                        />
                      ) : (
                        listing.title
                      )}
                    </TableCell>
                    <TableCell>
                      {editingListingId === listing._id ? (
                        <TextField
                          name="price"
                          value={editData.price || ""}
                          onChange={handleEditChange}
                          size="small"
                        />
                      ) : (
                        `$${listing.price}`
                      )}
                    </TableCell>
                    <TableCell>
                      {editingListingId === listing._id ? (
                        <>
                          <Button
                            onClick={() => saveEdit("listing", listing._id)}
                            size="small"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingListingId(null)}
                            size="small"
                            color="error"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleEditClick("listing", listing)}
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteListing(listing._id)}
                            size="small"
                            color="error"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default AdminDashboard;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Grid,
// } from "@mui/material";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Footer from "../components/Footer";

// function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [listings, setListings] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editingListingId, setEditingListingId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const token = localStorage.getItem("token");

//   // ✅ Fetch all data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Stats
//         const statsRes = await axios.get("http://localhost:3500/api/admin/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(statsRes.data);

//         // Users
//         const usersRes = await axios.get("http://localhost:3500/api/admin/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(usersRes.data);

//         // Listings
//         const listingsRes = await axios.get("http://localhost:3500/api/admin/listings", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setListings(listingsRes.data);
//       } catch (err) {
//         console.error("Not an admin or invalid token", err);
//         window.location.href = "/";
//       }
//     };

//     if (token) fetchData();
//   }, [token]);

//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:3500/api/admin/user/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setUsers(users.filter((user) => user._id !== id));
//   };

//   const deleteListing = async (id) => {
//     await axios.delete(`http://localhost:3500/api/admin/listing/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setListings(listings.filter((listing) => listing._id !== id));
//   };

//   const handleEditClick = (type, item) => {
//     setEditData(item);
//     if (type === "user") {
//       setEditingUserId(item._id);
//     } else if (type === "listing") {
//       setEditingListingId(item._id);
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   const saveEdit = async (type, id) => {
//     const endpoint =
//       type === "user"
//         ? `http://localhost:3500/api/admin/user/${id}`
//         : `http://localhost:3500/api/admin/listing/${id}`;

//     const res = await axios.put(endpoint, editData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (type === "user") {
//       setUsers(users.map((u) => (u._id === id ? res.data : u)));
//       setEditingUserId(null);
//     } else {
//       setListings(listings.map((l) => (l._id === id ? res.data : l)));
//       setEditingListingId(null);
//     }
//   };

//   // ✅ Make Admin
//   const makeAdmin = async (id) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3500/api/admin/user/${id}/make-admin`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUsers(users.map((u) => (u._id === id ? res.data : u)));
//     } catch (err) {
//       console.error("Error making admin:", err);
//     }
//   };

//   // ✅ Revoke Admin
//   const revokeAdmin = async (id) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3500/api/admin/user/${id}/revoke-admin`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUsers(users.map((u) => (u._id === id ? res.data : u)));
//     } catch (err) {
//       console.error("Error revoking admin:", err);
//     }
//   };

//   // Chart data
//   const pieData = [
//     { name: "Users", value: stats.totalUsers || 0 },
//     { name: "Listings", value: stats.totalListings || 0 },
//     { name: "Bookings", value: stats.totalBookings || 0 },
//   ];
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

//   return (
//     <>
//       <Container sx={{ py: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Admin Dashboard
//         </Typography>

//         {/* Stats Section */}
//         <Grid container spacing={3} mb={4}>
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Overview</Typography>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Stats Breakdown</Typography>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <BarChart data={pieData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="value" fill="#1976d2" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Users Table */}
//         <Card sx={{ mb: 4 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               All Users
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>
//                       {editingUserId === user._id ? (
//                         <TextField
//                           name="name"
//                           value={editData.name || ""}
//                           onChange={handleEditChange}
//                           size="small"
//                         />
//                       ) : (
//                         user.name
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingUserId === user._id ? (
//                         <TextField
//                           name="email"
//                           value={editData.email || ""}
//                           onChange={handleEditChange}
//                           size="small"
//                         />
//                       ) : (
//                         user.email
//                       )}
//                     </TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       {editingUserId === user._id ? (
//                         <>
//                           <Button
//                             onClick={() => saveEdit("user", user._id)}
//                             size="small"
//                           >
//                             Save
//                           </Button>
//                           <Button
//                             onClick={() => setEditingUserId(null)}
//                             size="small"
//                             color="error"
//                           >
//                             Cancel
//                           </Button>
//                         </>
//                       ) : (
//                         <>
//                           <Button
//                             onClick={() => handleEditClick("user", user)}
//                             size="small"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             onClick={() => deleteUser(user._id)}
//                             size="small"
//                             color="error"
//                           >
//                             Delete
//                           </Button>
//                           {user.role !== "admin" ? (
//                             <Button
//                               onClick={() => makeAdmin(user._id)}
//                               size="small"
//                               color="secondary"
//                             >
//                               Make Admin
//                             </Button>
//                           ) : (
//                             <Button
//                               onClick={() => revokeAdmin(user._id)}
//                               size="small"
//                               color="warning"
//                             >
//                               Revoke Admin
//                             </Button>
//                           )}
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Listings Table */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               All Listings
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {listings.map((listing) => (
//                   <TableRow key={listing._id}>
//                     <TableCell>
//                       {editingListingId === listing._id ? (
//                         <TextField
//                           name="title"
//                           value={editData.title || ""}
//                           onChange={handleEditChange}
//                           size="small"
//                         />
//                       ) : (
//                         listing.title
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingListingId === listing._id ? (
//                         <TextField
//                           name="price"
//                           value={editData.price || ""}
//                           onChange={handleEditChange}
//                           size="small"
//                         />
//                       ) : (
//                         `$${listing.price}`
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingListingId === listing._id ? (
//                         <>
//                           <Button
//                             onClick={() => saveEdit("listing", listing._id)}
//                             size="small"
//                           >
//                             Save
//                           </Button>
//                           <Button
//                             onClick={() => setEditingListingId(null)}
//                             size="small"
//                             color="error"
//                           >
//                             Cancel
//                           </Button>
//                         </>
//                       ) : (
//                         <>
//                           <Button
//                             onClick={() => handleEditClick("listing", listing)}
//                             size="small"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             onClick={() => deleteListing(listing._id)}
//                             size="small"
//                             color="error"
//                           >
//                             Delete
//                           </Button>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </Container>
//       <Footer />
//     </>
//   );
// }

// export default AdminDashboard;
