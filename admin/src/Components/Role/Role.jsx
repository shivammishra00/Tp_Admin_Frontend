import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';

function Role() {
  const [viewrole, setviewrole] = useState([])
  const [roles, setroles] = useState({
    roleid: "",
    rolename: ""
  })
  /////////  modal show ke liye  ///////////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /////////  update ke liye use state  /////////
  const [newroleid, setnewRoleId] = useState("")
  const [updaterole, setupdaterole] = useState({
    rolename: ""
  })

  /////////   for search  ///////////
  const [search, setsearch] = useState("")
  /////    for  pagination    /////   
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getRoles = () => {
    axios.get(`http://localhost:5000/api/admin/roles/show_roles`)
      .then(res => {
        // console.log(res)
        setviewrole(res.data.result)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getRoles()
  }, [])

  //////// add role ///////////
  const addRoles = async () => {
    await axios.post(`http://localhost:5000/api/admin/roles/add_roles`, roles)
      .then(res => {
        console.log(res)
        setroles({ roleid: "", rolename: "" })  /// for after role adding all field blank
        if (res.data.Status) {
          getRoles()
          ///toast for alert message
          toast.success(res.data.Message, { position: "top-center" })
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
      .catch(err => console.log(err))
  }


  /////////////update roles ///////
  const update = (roleid, rolename) => {
    console.log(roleid, rolename)
    setnewRoleId(roleid)
    setupdaterole({
      ...updaterole,
      rolename: rolename
    })
    handleShow()
  }

  const handleUpdate = () => {
    axios.patch(`http://localhost:5000/api/admin/roles/edit_roles/` + newroleid, updaterole)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          getRoles();
          ///toast for alert message
          toast.success(res.data.Message, { position: "top-center" })
          handleClose()
        }
      })
      .catch(err => console.log(err))
  }
  ///////////////////////////////////////////

  return (
    <div className="container d-flex justify-content-center mt-4">

      {/* <p> role form</p> */}
      <div className="card mx-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded"
        style={{ width: '20rem', border: '2px solid black', height: "55vh" }}>

        <h3 className='text-center mt-2'>Add Roles</h3>
        <div className="card-body justify-content-center">
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Role ID</label>
            <input type="email" className="form-control" placeholder="Enter Role Id"
              name='roleid'
              onChange={(e) => setroles({ ...roles, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Role Name</label>
            <input type="email" className="form-control" placeholder="Enter Role Name"
              name='rolename'
              onChange={(e) => setroles({ ...roles, [e.target.name]: e.target.value })}
            />
          </div>
          <button type="button" class="btn col-12 btn-outline-dark" onClick={() => addRoles()}>Save</button>
        </div>
      </div>

      {/* <p>table here</p> */}
      <div className='mx-5 mt-4 shadow-lg mb-2 bg-white rounded' style={{ border: '2px solid black', width: "30rem" }}>

        <h3 className='mt-2 text-center'>All Roles List</h3>
        <hr />
        <Col >
          <input
            type="text"
            placeholder="Search by rolename"
            style={{ marginLeft: "200px" }}
            onChange={(e) => setsearch(e.target.value)}
          />
          <Button className="btn btn-dark" style={{ boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', marginBottom: '5px' }}>
            Search
          </Button>
        </Col>

        <table className='table table-hover text-center bg-light'>
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            viewrole.filter((item) => {
              return search.toLowerCase() === '' ? item : item.roleid.toString().toLowerCase().includes(search) || item.roleid.includes(search) || item.rolename.includes(search) || item.rolename.toLowerCase().includes(search)
            })
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((rolelist, index) => {
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{index + 1} </td>
                      <td>{rolelist.roleid} </td>
                      <td>{rolelist.rolename} </td>
                      <td>
                        <button className='btn btn-warning'
                          onClick={() => update(rolelist.roleid, rolelist.rolename)}
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )
              })
          }
        </table>

        {/* <p> for pagination </p> */}
        <Pagination className="justify-content-center">
          {Array.from({ length: Math.ceil(viewrole.length / itemsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* <p>modal for update</p> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role Name</Form.Label>
              <Form.Control type="text" name='rolename' placeholder="Enter role name" value={updaterole.rolename}
                onChange={(e) => setupdaterole({ ...updaterole, [e.target.name]: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Role
