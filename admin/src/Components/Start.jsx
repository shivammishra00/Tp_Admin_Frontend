import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();

    ///ue page default route me chalega to yadi user ya admin me se koi bhi allredy login rahega to ye functionality use usi ke page me redirect kar degi ///

    useEffect(() => {
        axios.get(`http://localhost:5000/api/allverify/verify`)
            .then(res => {
                console.log(res)
                if (res.data.Status) {
                    if (res.data.role === "admin") {
                        navigate('/dashboard')
                    }
                    else if (res.data.role === "user") {
                        navigate(`/user_detailes/` + res.data.uid)
                    }
                }
                else {
                    navigate("/")
                }

            })
            .catch(err => console.log(err))
    }, [navigate])


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className=' p-3 rounded w-25 border loginForm'>
                <h2 className='text-center'>Login Page</h2>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <Button varient="primary"
                        onClick={() => navigate(`/adminlogin`)} >
                        Admin
                    </Button>
                    <Button varient="success"
                        onClick={() => navigate(`/user_login`)}>
                        Users
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Start
