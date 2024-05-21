import axios from 'axios'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
    const [inputdata, setinputdata] = useState({
        email: "shivam@gmail.com",
        password: "12345678"
    })

    /////// for error handling  //////
    const [error, seterror] = useState(null)

    const navigate = useNavigate()

    //// token ko frontend me application me dikhane ke liye is line ka use karte hai///
    axios.defaults.withCredentials = true;
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/admin/users/user_login`, inputdata)
            .then(res => {
                console.log(res)
                if (res.data.loginStatus) {
                    toast.success(res.data.Message, { position: "top-center" })
                    
                    localStorage.setItem("valid", true) // value stor in localsorage
                    navigate('/user_detailes/'+ res.data.uid)
                }
                else {
                    seterror(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className=' p-3 rounded w-25 border loginForm'>

                {/* <p> error ko show kara liya </p> */}
                <div className='text-danger error'>
                    {error}
                </div>

                <h3 className='text-center mt-3 loginHeading'>User Login</h3>
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

export default UserLogin
