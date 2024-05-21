import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';
import toast from 'react-hot-toast';

function Category() {
    const [showcat, setshowcat] = useState([])
    const [show, setShow] = useState(false);

    const [cid, setcid] = useState("");
    const [newcname, newsetcname] = useState({
        cname: ""
    })

    /////  for search  ////////
    const [search, setsearch] = useState("")

    /////    for  pagination    /////   
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategory = () => {
        axios.get(`http://localhost:5000/api/admin/category/show_category`)
            .then(res => {
                console.log(res)
                if (res.data.Status) {
                    setshowcat(res.data.result)
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getCategory()
    }, [])

    const update = (cid, cname) => {
        // console.log(cid, cname)
        setcid(cid)
        newsetcname({
            ...newcname,
            cname: cname
        })
        handleShow()
    }
    // console.log(cname)

    const handleUpdate = (cid) => {
        console.log(newcname.cname)
        // console.log("hiiii")
        axios.patch(`http://localhost:5000/api/admin/category/edit_category/` + cid, newcname)
            .then(res => {
                console.log(res)
                ///toast for alert message
                toast.success(res.data.Message, { position: "top-center" })
                if (res.data.Status) {
                    getCategory()
                    handleClose()
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    
    return (
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-center'>
                <h3>All Category List</h3>
            </div>
            <div className='d-flex justify-content-between '>
                <Link to="/dashboard/add_category" className='btn btn-success'> +Add Category</Link>

                <input type='text' placeholder='search category' className='border'
                    onChange={(e) => setsearch(e.target.value)}
                />
            </div>
            <div className='mt-3'>
                <table border={2} className='table shadow'>
                    <thead class="table-light">
                        <tr>
                            <th>S.No</th>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        showcat.filter((item) => {
                            return search.toLowerCase() === '' ? item : item.cid.toString().toLowerCase().includes(search) || item.cid.includes(search) || item.cname.includes(search) || item.cname.toLowerCase().includes(search)
                        })
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((d, index) => {
                                return (
                                    <>
                                        <tbody>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{d.cid}</td>
                                                <td>{d.cname}</td>
                                                <td>
                                                    <button className='btn btn-warning'
                                                        onClick={() => update(d.cid, d.cname)}
                                                    >
                                                        <i class="bi bi-pencil-square"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </>
                                )
                            })
                    }
                </table>
            </div>

            {/* <p> for pagination </p> */}
            <Pagination className="justify-content-center">
                {Array.from({ length: Math.ceil(showcat.length / itemsPerPage) }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* <p>modal for update</p> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" name='cname' placeholder="Enter category name" value={newcname.cname} onChange={(e) => newsetcname({ ...newcname, [e.target.name]: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate(cid)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Category
