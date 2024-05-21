import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function AddCategory() {
    const [category, setcategory] = useState({
        cid: "",
        cname: ""
    })

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/admin/category/add_category`, category)
            .then((res) => {
                console.log(res)
                toast.success(res.data.Message, { position: "top-center" })
                if (res.data.Status) {
                    navigate('/dashboard/category')
                }
                else {
                    toast.success(res.data.Error, { position: "top-center" })
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75 '>
            <div className=' p-3 w-25 border shadow black-border'>
                <h4 className='text-center'>Add Category</h4>
                <Form className='mt-4' onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <lable htmlFor="cid"><strong>Category Id: </strong></lable><br />
                        <Form.Control type='text' placeholder='Enter cid' name='cid'
                            className='form-control-rounded-0 mt-2' value={category.cid}
                            onChange={(e) => setcategory({ ...category, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <lable htmlFor="cname"><strong>Category Name: </strong></lable><br />
                        <Form.Control type='text' placeholder='Enter category name' name='cname' className='form-control-rounded-0 mt-2'
                            value={category.cname} onChange={(e) => setcategory({ ...category, [e.target.name]: e.target.value })}

                        />
                    </Form.Group>

                    <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
                </Form>
            </div>
        </div>
    )
}

export default AddCategory
