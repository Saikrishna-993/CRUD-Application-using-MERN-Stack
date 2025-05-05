import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Details = () => {
  const [getuserdata, setUserdata] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const res = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 404 || !data) {
        console.log("error");
      } else {
        setUserdata(data);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        alert("✅ User deleted successfully!");
        navigate("/");  
      } else {
        alert("❌ Failed to delete user.");
        console.error(data);
      }
    } catch (error) {
      alert("❌ Server error while deleting user.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <Link to={`/edit/${getuserdata._id}`}>
              <button className="btn btn-primary mx-2"><EditIcon /></button>
            </Link>
            <button className="btn btn-danger" onClick={deleteuser}><DeleteIcon /></button>
          </div>

          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.jpeg" style={{ width: 60 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getuserdata.age}</span>
              </h3>
              <p className="mt-3">
                <EmailIcon /> Email: <span>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon /> Working: <span>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon /> Mobile: <span>{getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon /> Location: <span>{getuserdata.address}</span>
              </p>
              <p className="mt-3">
                Description: <span>{getuserdata.description}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;

