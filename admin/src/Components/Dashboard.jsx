import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';
import axios from 'axios';


function Dashboard() {
  const navigate = useNavigate();

  /////  admin log out api //////////
  axios.defaults.withCredentials = true; // jab ye line likhege tabhi token delete hoga.

  const adminLogout = () =>{
    axios.get(`http://localhost:5000/auth/adminlogout`)
    .then(res => {
      console.log(res)
      if(res.data.Status){
        /// jab logout ho to item remove ke liye //
        localStorage.removeItem("valid")
        
        navigate(`/`)
      }
      else{
        alert("error")
      }
    })
  }
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>

        {/* <p>sidebar code</p> */}
        <div className='col-2 col-sm-3 col-md-3 col-xl-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'
            style={{ position: "sticky", top: "0", left: "0", bottom: "0" }}
          >
            <Link to="/dashboard" className='d-flex align-items-center pb-3 mb-md-1 mt-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
              <span className='fs-5 fw-bolder d-none d-sm-inline'>
                Ecommerce
              </span>
            </Link>
            <ul
              className='nav nav-pills flex-colum mb-sm-auto mb-0 align-items-center align-items-sm-start'
              id='menu'
            >
              <li className='w-100'>
                <Link
                  to="/dashboard"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-house-door-fill ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/users"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i class=" fs-5 bi-people-fill ms-2"></i>

                  <span className='ms-2 d-none d-sm-inline'>Users</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/roles"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-person-fill-add ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Roles</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/category"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-grid-fill ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Catogery</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/subCategory"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-bag-check-fill ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Sub Catogery</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/retailer"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-slack ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Retailer</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/customers"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-4 bi-person-arms-up ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Customers</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/offers"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-tags-fill ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Offers</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to="/dashboard/other"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-grid-3x3-gap-fill ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Other</span>
                </Link>
              </li>
              <li className='w-100' onClick={()=> adminLogout()} >
                <Link
                  // to="/"
                  // to="/adminlogin"
                  className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-5 bi-power ms-2' />
                  <span className='ms-2 d-none d-sm-inline'>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <p>navbar code</p> */}
        <div className='col p-0 m-0' >
          <div className='p-3 d-flex justify-content-center shadow bg-dark text-white'
            style={{ position: "sticky", top: "0",left:"0",right:"0", zIndex: "1000" }}
          >
            <h5>Welcome to admin dashboard</h5>
          </div>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
