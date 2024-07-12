import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Modal, Pagination } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import moment from 'moment';

function Users() {
  const [userList, setuserList] = useState([])

  /////   for modal show   ///////
  const [showUdateModal, setshowUpdateModal] = useState(false);

  ////// show modal for role assigne and view role  ///////////////
  const [roleAssignModal, setroleAssignModal] = useState(false)
  const [viewRoleModal, setviewRoleModal] = useState(false)

  ////// Role Assign and view Role modal on clik me jo data aaya yaha store karaya  ///
  const [userName, setuserName] = useState("");
  const [viewRoleuid, setviewRoleuid] = useState("");
  // console.log(viewRoleuid)


  //////////////  all role get karke data yaha stor kiya   /////////////
  const [roleList, setroleList] = useState([])

  ///////////////  role post ke liye useState create  ////////////
  const [saveRole, setsaveRole] = useState({
    uid: "",
    roleid: ""
  })
  console.log(saveRole.uid)

  /////  for data update  /////
  const [newuid, setnewuid] = useState("");
  const [updateUser, setupdateUser] = useState({
    email: "",
    contact: "",
    qualification: ""
  })

  ///  for search  /////
  const [search, setsearch] = useState("")

  /////    for  pagination    /////   
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getUsers = () => {
    axios.get(`http://localhost:5000/api/admin/users/get_users`)
      .then(res => {
        // console.log(res)
        if (res.data.Status) {
          setuserList(res.data.result)
        }
        else {
          alert(res.data.Error)
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getUsers()
  }, [])
  //  console.log(userList)


  /// update  functionality //
  const updateValue = (uid, email, contact, qualification) => {
    console.log(uid, email, contact, qualification)
    setnewuid(uid)
    setupdateUser({
      ...updateUser,
      email: email,
      contact: contact,
      qualification: qualification
    })
    setshowUpdateModal(true)
  }

  const handleUpdate = () => {
    axios.patch(`http://localhost:5000/api/admin/users/update_users/` + newuid, updateUser)
      .then(res => {
        console.log(res)
        ///toast for alert message
        toast.success(res.data.Message, { position: "top-center" })
        getUsers()
        setshowUpdateModal(false)
      })
      .catch(err => console.log(err))
  }

  ///////====== modal open ke liye modalRoleAssign function ==========//////
  function modalRoleAssign(uid, name) {
    //  console.log(uid, name)
    setsaveRole({
      ...saveRole,
      uid: uid
    })
    setuserName(name)  ///username me name set kar diya 
    setroleAssignModal(true)  //// modal hai ye 
  }


  //////////////////    post role /////////////////////////
  const assigneRole = () => {
    axios.post(`http://localhost:5000/api/admin/roleassign/grantrole`, saveRole)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          ///toast for alert message
          toast.success(res.data.Message, { position: "top-center" })
          setroleAssignModal(false)
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
      .catch(err => console.log(err))
  }

  ////////////////  modal open ke liye modalViewRole function ///////////////
  const modalViewRole = (uid) => {
    // console.log(uid)
    setviewRoleuid(uid)
    setviewRoleModal(true)  /// modal function 
  }

  ///////  user ko kon sa rool diya gaya hai all assign role view  /////////////////
  const [rollAssignList, setroleAssignList] = useState([])

  const getUserRoleAssign = async (viewRoleuid) => {
    await axios.get(`http://localhost:5000/api/admin/roleassign/checkrole/${viewRoleuid}`)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          setroleAssignList(res.data.result)
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getUserRoleAssign(viewRoleuid)
  }, [viewRoleuid])


  ///////////////   delete assign role ////////////////////
  const deleteAssignRole = async (uid, roleid) => {
    await axios.delete(`http://localhost:5000/api/admin/roleassign/revokrole/${uid}/${roleid}`)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          toast.success(res.data.Message, { position: "top-center" })
          setviewRoleModal(false)
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  //////////// data base se all role list get kiya /////////////////
  const getRoles = () => {
    axios.get(`http://localhost:5000/api/admin/roles/show_roles`)
      .then(res => {
        // console.log(res)
        setroleList(res.data.result)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getRoles()
  }, [])


  ///////////////////  status activate  /////////////////////
  const updateStatusActive = async (uid) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/users/status_active/${uid}`);
      console.log(res);
      getUsers();
      if (res.data.Status) {
        toast.success(res.data.Message, { position: "top-center" })
      }
    } catch (error) {
      console.error('Error updating user status to active:', error);
    }
  };

  ///////////////////  status Deactivate  /////////////////////
  const updateStatusDeactive = async (uid) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/users/status_deactive/${uid}`);

      console.log(res);
      getUsers();
      if (res.data.Status) {
        toast.success(res.data.Message, { position: "top-center" })
      }
    } catch (error) {
      console.error('Error updating user status to inactive:', error);
    }
  };


  ////////////  onchange me compare  kiya ki yadi current status active hai to Deactive vala function chale or yadi deactive hai to active vala function chale  ///////

  const handleToggleStatus = async (uid, currentStatus) => {
    if (currentStatus === 'active') {
      await updateStatusDeactive(uid);
    } else {
      await updateStatusActive(uid);
    }
  };

  ///////////////////======= View All Users in moddal ======== //////////////////////
  const [allViewUser, setallViewUser] = useState({}) //object pass karege 
  const [showUsersModal, setshowUsersModal] = useState(false)

  const viewUsers = (ulist) => {
    setallViewUser(ulist)
    setshowUsersModal(true)  /////// modal call
  }


  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>All Users List</h3>
      </div>
      <div className='d-flex justify-content-between '>
        <Link to="/dashboard/add_users" className='btn btn-success'> +Add Users</Link>

        <input type='text' placeholder='search users' onChange={(e) => setsearch(e.target.value)} className='form-control w-25' />
      </div>

      <div className='mt-3 shadow'>
          <Table responsive="sm" className='' striped bordered hover variant="light shadow">
            <thead className='text-center'>
              <tr>
                <th>S.No.</th>
                <th>UID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Qualification</th>
                <th>Address</th>
                <th>Status</th>
                <th>View Role</th>
                <th>Role Assign</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
            {
              userList.filter((item) => {
                return search.toLowerCase() === '' ? item : item.uid.toString().toLowerCase().includes(search) || item.uid.includes(search) || item.name.includes(search) || item.name.toLowerCase().includes(search)
              })
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((ulist, index) => {
                  return (
                    <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ulist.uid}</td>
                          <td>{ulist.name}</td>
                          <td>{ulist.email}</td>
                          <td>
                            <img src={ulist.image} alt='userImage' style={{ height: "40px", width: "40", borderRadius: "50%" }} />
                          </td>
                          <td>{ulist.qualification}</td>
                          <td>{ulist.address}</td>
                          <td>
                            <Form.Check
                              type="switch"
                              id={`custom-switch-${index}`}
                              label=""
                              checked={ulist.status === 'active'}
                              onChange={() => handleToggleStatus(ulist.uid, ulist.status)}
                            />
                          </td>
                          <td>
                            <Button variant='success' onClick={() => modalViewRole(ulist.uid)}>
                              View Role
                            </Button>
                          </td>
                          <td>
                            <Button variant='success' onClick={() => modalRoleAssign(ulist.uid, ulist.name)}>
                              Role Assigne
                            </Button>
                          </td>
                          <td>
                            <span className='text-primary' onClick={() => viewUsers(ulist)}>
                              <RemoveRedEyeIcon />
                            </span>

                            <span className='text-success'
                              onClick={() => updateValue(ulist.uid, ulist.email, ulist.contact, ulist.qualification)}
                            >
                              <EditIcon />
                            </span>
                          </td>
                        </tr>
                    </>
                  )
                })
            }
            </tbody>
          </Table>
      </div>

      {/* <p> for pagination </p> */}
      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(userList.length / itemsPerPage) }, (_, index) => (
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
      <Modal show={showUdateModal} onHide={() => setshowUpdateModal(false)}>
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name='email' placeholder="Enter your email"
                value={updateUser.email}
                onChange={(e) => setupdateUser({ ...updateUser, [e.target.name]: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" name='contact' placeholder="Enter mibile number"
                value={updateUser.contact}
                onChange={(e) => setupdateUser({ ...updateUser, [e.target.name]: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" name='qualification' placeholder="Enter qualification" value={updateUser.qualification}
                onChange={(e) => setupdateUser({ ...updateUser, [e.target.name]: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>


      {/* <p> modal for role assigne </p> */}
      <Modal show={roleAssignModal} onHide={() => setroleAssignModal(false)}>
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block"> User Role Assign </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User ID </Form.Label>
              <Form.Control type="text" value={saveRole.uid} readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" name='name' value={userName} readOnly
              />
            </Form.Group>
            <Form.Select aria-label="Default select example" name='roleid'
              onChange={(e) => setsaveRole({ ...saveRole, [e.target.name]: e.target.value })}
            >
              <option>Select Role</option>
              {
                roleList.map((d, ind) => {
                  return (
                    <option value={d.roleid}>{d.rolename}</option>
                  )
                })
              }
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setroleAssignModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => assigneRole()}>
            Assign Role
          </Button>
        </Modal.Footer>
      </Modal>


      {/* <p> modal for view assign role </p> */}
      <Modal show={viewRoleModal} onHide={() => setviewRoleModal(false)}>
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block"> View Assign Role </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="light shadow">
            <thead className='text-center'>
              <tr>
                <th>S.No.</th>
                <th>Role ID</th>
                <th>Role Name</th>
                <th>Action</th>
              </tr>
            </thead>
            {
              rollAssignList.map((roleAssign, index) => {
                return (
                  <tbody className='text-center'>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{roleAssign.roleid}</td>
                      <td>{roleAssign.rolename}</td>
                      <td>
                        <Button variant='danger'
                          onClick={() => deleteAssignRole(viewRoleuid, roleAssign.roleid)}>
                          Revoke Role
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setviewRoleModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* <p> modal for view users details</p> */}
      <Modal show={showUsersModal} onHide={() => setshowUsersModal(false)}>
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block"> User Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center align-items-center'>
            <img src={allViewUser.image} alt='users' height={70} width={70}
              style={{ borderRadius: "50%" }} />
          </div>

          <div style={{ marginLeft: "110px" }}>
            <h5>User Name : <span style={{ marginLeft: "30px", color: "blue" }}>{allViewUser.name}</span> </h5>

            <h5>User ID : <span style={{ marginLeft: "65px", color: "blue" }}>{allViewUser.uid}</span> </h5>

            <h5>Email : <span style={{ marginLeft: "50px", color: "blue" }}>{allViewUser.email}</span> </h5>

            <h5>Mobile : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewUser.contact}</span> </h5>

            <h5>Aadhar : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewUser.aadhar}</span> </h5>

            <h5>DOB : <span style={{ marginLeft: "65px", color: "blue" }}>
              {moment(allViewUser.dob).format('DD-MM-YYYY')}
            </span> </h5>

            <h5>DOJ : <span style={{ marginLeft: "65px", color: "blue" }}>
              {moment(allViewUser.dob).format('DD-MM-YYYY')}
            </span> </h5>

            <h5>Qualification : <span style={{ marginLeft: "30px", color: "blue" }}>{allViewUser.qualification}</span> </h5>

            <h5>Address : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewUser.address}</span> </h5>

            <h5>Country : <span style={{ marginLeft: "50px", color: "blue" }}>{allViewUser.country}</span> </h5>

            <h5>State : <span style={{ marginLeft: "60px", color: "blue" }}>{allViewUser.state}</span> </h5>

            <h5>Pin : <span style={{ marginLeft: "60px", color: "blue" }}>{allViewUser.pin}</span> </h5>

            <h5>Satus : <span style={{ marginLeft: "50px", color: "blue" }}>{allViewUser.status}</span> </h5>

          </div>

        </Modal.Body>

        <Button variant="primary" onClick={() => setshowUsersModal(false)}>
          Close
        </Button>
      </Modal>
    </div>
  )
}

export default Users
