import React, { useState, useEffect, useContext } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";
import { adddata, updatedata, deldata } from "./context/ContextProvider";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { udata, setUData } = useContext(adddata);
  const { updata, setUPData } = useContext(updatedata);
  const { dltdata, setDLTData } = useContext(deldata);

  // Fetch data
  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:5000/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 404 || !data) {
        console.log("Error fetching data");
      } else {
        setUserdata(data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (udata) {
      const timer = setTimeout(() => setUData(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [udata]);

  useEffect(() => {
    if (updata) {
      const timer = setTimeout(() => setUPData(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [updata]);

  useEffect(() => {
    if (dltdata) {
      const timer = setTimeout(() => setDLTData(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [dltdata]);

  // Delete user
  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/deleteuser/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.status === 200) {
        setDLTData(data);
        getdata();
      } else {
        alert("❌ Failed to delete: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("❌ Error deleting user");
    }
  };

  // Filtered users
  const filteredUsers = getuserdata.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.work?.toLowerCase().includes(search) ||
      user.mobile?.toLowerCase().includes(search) ||
      user._id?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      {/* Alerts */}
      {udata && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{udata.name}</strong> added successfully!
          <button type="button" className="btn-close" onClick={() => setUData(null)}></button>
        </div>
      )}
      {updata && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{updata.name}</strong> updated successfully!
          <button type="button" className="btn-close" onClick={() => setUPData(null)}></button>
        </div>
      )}
      {dltdata && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{dltdata.name}</strong> deleted successfully!
          <button type="button" className="btn-close" onClick={() => setDLTData(null)}></button>
        </div>
      )}

      <div className="mt-5 container">
        {/* Search bar */}
        <div className="d-flex justify-content-between mb-3">
          <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Search..."
              className="form-control me-2"
              style={{ maxWidth: "300px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User table */}
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">ID</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.work}</td>
                  <td>{item.mobile}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`view/${item._id}`}>
                      <button className="btn btn-success"><VisibilityIcon /></button>
                    </NavLink>
                    <NavLink to={`edit/${item._id}`}>
                      <button className="btn btn-primary"><EditIcon /></button>
                    </NavLink>
                    <button className="btn btn-danger" onClick={() => deleteUser(item._id)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;

