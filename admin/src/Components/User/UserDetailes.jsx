import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';

function UserDetailes() {
  const [userInfo, setuserInfo] = useState({});
  const { uid } = useParams();
  // console.log(userInfo.name)

  const navigate = useNavigate();

  ///////=======  user details get kiya by params =============////////////
  const userDetailes = async (uid) => {
    try {
      await axios.get(`http://localhost:5000/api/admin/users/user_detailes/` + uid)
        .then(res => {
          console.log(res)
          if (res.data.Status) {
            setuserInfo(res.data.result[0])
          }
          else {
            toast.success(res.data.Error, { position: "top-center" })
          }
        })
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    userDetailes(uid)
  }, [uid])

  //////=======  user log out api ============////////
  const handleLogout = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users/user_logout`)
      console.log(res)
      if (res.data.Status) {
        /// jab logout ho to item remove ke liye //
        localStorage.removeItem("valid")
        
        navigate('/')
      }
      else {
        alert("Error")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className='p-2 d-flex justify-content-center shadow bg-dark text-white' style={{ position: "sticky", top: "0" }}>
        <h4>User Profile</h4>
      </div>
      <div className='d-flex justify-content-center  flex-column align-items-center mt-3 mb-4'>
        <div className='w-50 border shadow '>
          <div className='d-flex justify-content-center'>
            <img src={userInfo.image} alt='boy' className='emp_det_image' />
          </div>
          <div className='d-flex align-items-center flex-column mt-2'>
            <div className='d-flex justify-content-between col-4'>
              <h5>User Name : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.name}</h5>
            </div>
            <div className='d-flex justify-content-between col-3'>
              <h5>User ID : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.uid}</h5>
            </div>
            <div className='d-flex justify-content-around col-5'>
              <h5>Email : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.email}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Mobile : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.contact}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Aadhar : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.aadhar}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>DOB : </h5>
              <h5 style={{ color: "blue" }}>{moment(userInfo.dob).format('DD-MM-YYYY')}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>DOJ : </h5>
              <h5 style={{ color: "blue" }}>{moment(userInfo.doj).format('DD-MM-YYYY')}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Qualification : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.qualification}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Address : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.address}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Country : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.country}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>State : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.state}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Pin : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.pin}</h5>
            </div>
            <div className='d-flex justify-content-between col-4'>
              <h5>Status : </h5>
              <h5 style={{ color: "blue" }}>{userInfo.status}</h5>
            </div>
          </div>
          <div>
            <button className='btn  col-12 btn-outline-dark mt-2'
              onClick={() => handleLogout()}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailes
