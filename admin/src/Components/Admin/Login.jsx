import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

function Login() {
    const [inputdata, setinputdata] = useState({
        email: "admin@gmail.com",
        password: "12345678"
    })
    /// error set kar dege ..
    const [error, seterror] = useState();

    const navigate = useNavigate();

    // jab axios use karte hai to cookie dekhne ke liye 
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/auth/adminlogin`, inputdata)
            .then(result => {
                console.log(result)
                if (result.data.loginStatus) {
                    toast.success(result.data.Message, {position:"top-center"})

                    localStorage.setItem("valid", true) // value stor in localsorage
                    navigate('/dashboard')
                }
                else {
                    // alert(result.data.Error)
                    seterror(result.data.Error)   //error set kar diya 
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className=' p-3 rounded w-25 border loginForm'>
                <div className='text-danger error'>
                    {error}
                </div>
                <h3 className='text-center mt-3 loginHeading'>Admin Login</h3>
                <Form onSubmit={handleSubmit} className='mt-3'>
                    <Form.Group className='mb-3'>
                        <lable htmlFor="email"><strong>Email </strong></lable><br />
                        <Form.Control type='email' placeholder='Enter Email' name='email'
                            className='form-control-rounded-0' value={inputdata.email}
                            onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <lable htmlFor="password"><strong>Password </strong></lable><br />
                        <Form.Control type='password' placeholder='Enter Password' name='password' className='form-control-rounded-0'
                            value={inputdata.password}
                            onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>
                    <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="You are Agree with terms & conditions" />
                    </Form.Group>
                </Form>
            </div>

        </div>
    )
}

export default Login
