import React, { useState,useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {adddata} from "./context/ContextProvider"



const Register = () => {

  const {udata,setUData} =useContext(adddata);

  const navigate = useNavigate("");
  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, description } = inpval;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        description,
      }),
    });
    
    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      alert("successfully added data");
      navigate("/");
      setUData(data);
      console.log("successfully added data");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="name" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="email" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" value={inpval.age} onChange={setdata} name="age" className="form-control" id="age" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input type="tel" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="mobile" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="work" className="form-label">Work</label>
            <input type="text" value={inpval.work} onChange={setdata} name="work" className="form-control" id="work" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" value={inpval.address} onChange={setdata} name="address" className="form-control" id="address" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" value={inpval.description} onChange={setdata} className="form-control" id="description" cols="30" rows="7"></textarea>
          </div>
          <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
