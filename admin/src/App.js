import React from "react";
import Login from "./Components/Admin/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Dashboard from "./Components/Dashboard";
import Users from "./Components/User/Users";
import Role from "./Components/Role/Role";
import Category from "./Components/Category/Category";
import SubCategory from "./Components/Subcategory/SubCategory";
import Retailer from "./Components/Retailer/Retailer";
import Customers from "./Components/Customer/Customers";
import Offers from "./Components/Offer/Offers";
import AddCategory from "./Components/Category/AddCategory";
import AddUsers from "./Components/User/AddUsers";
import Start from "./Components/Start";
import UserLogin from "./Components/User/UserLogin";
import UserDetailes from "./Components/User/UserDetailes";
import PrivateRoute from "./Components/PrivateRoute";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/user_login" element={<UserLogin />}></Route>
          <Route path="/user_detailes/:uid" element={<UserDetailes />}></Route>
          <Route path="/adminlogin" element={<Login />}></Route>

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path='' element={<Home />}></Route>
            <Route path="/dashboard/users" element={<Users />}></Route>
            <Route path="/dashboard/roles" element={<Role />}></Route>
            <Route path="/dashboard/category" element={<Category />}></Route>
            <Route path="/dashboard/subCategory" element={<SubCategory />}></Route>
            <Route path="/dashboard/retailer" element={<Retailer />}></Route>
            <Route path="/dashboard/customers" element={<Customers />}></Route>
            <Route path="/dashboard/offers" element={<Offers />}></Route>
            <Route path="/dashboard/add_category" element={<AddCategory />}></Route>
            <Route path="/dashboard/add_users" element={<AddUsers />}></Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
