import React, { useState, useEffect,useContext } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {updatedata} from './context/ContextProvider';



const Edit = () => {


  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const  {updata,setUPData} =useContext(updatedata)



  const navigate = useNavigate("");
  //const { id } = useParams();


  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  })



  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const { id } = useParams("");
  console.log(id);


  const getdata = async () => {
    try {
      const res = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 404 || !data) {
        console.log("error");
      } else {
        setINP(data);
        console.log("successfully got data");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);


  const updateuser = async (e) => {
    e.preventDefault();
    try {
      const { name, email, age, mobile, work, address, description } = inpval;

      const res2 = await fetch(`/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age, mobile, work, address, description })

      })

      const data2 = await res2.json();
      console.log(data2);
      if (res2.status === 200) {
        alert("✅ Successfully updated!");
        navigate("/");
        setUPData(data2);

      } else if (res2.status === 404 || !data2) {
        alert("⚠️ Please fill in all the details.");
      } else {
        alert("❌ Error in updating data.");
      }

    } catch (error) {
      alert("❌ Exception while updating data.");
      console.error("Update error:", error);
    }
  };



  return (
    <div className="container">
      <NavLink to="/">Home2</NavLink>
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
            <textarea
              name="description"
              className="form-control"
              id="description"
              cols="30"
              rows="7"
              value={inpval.description}
              onChange={setdata}
            />

          </div>

          <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Edit