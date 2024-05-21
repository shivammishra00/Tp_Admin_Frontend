import React, { useState, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';

function SubCategory() {
  const [catList, setcatList] = useState([]);
  const [subCatList, setsubCatList] = useState([]);
  const [dataList, setdataList] = useState({
    cid: "",
    subcatid: "",
    subcatname: "",
    image: ""
  })
  console.log(dataList)

  const [search, setsearch] = useState("")

  /////    for  pagination    /////   
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  ////////////  updated subcat value ko stor karaya gaya  /////////
  const [newsubCateValue, setnewsubCateValue] = useState({
    image: ""
  })
  const [newsubCatId, setnewsubCatId] = useState("")

  //////////======== modal open ke liye useState create kiya ==========////////
  const [subCatModal, setSubCatModal] = useState(false)

  ////////////  category list ko get kiya gaya /////////////////
  useEffect(() => {
    const getCategory = async () => {
      await axios.get(`http://localhost:5000/api/admin/category/show_category`)
        .then(res => {
          console.log(res)
          if (res.data.Status) {
            setcatList(res.data.result)
          }
          else {
            alert(res.data.Error)
          }
        })
        .catch(err => console.log(err))
    }
    getCategory()
  }, [])

  //////////////  add sub category //////////////////////
  const addSubCategoy = () => {
    const formdata = new FormData();
    formdata.append('cid', dataList.cid)
    formdata.append('subcatid', dataList.subcatid)
    formdata.append('subcatname', dataList.subcatname)
    formdata.append('image', dataList.image)
    axios.post(`http://localhost:5000/api/admin/subcategory/add_subCategory`, formdata)
      .then(res => {
        console.log(res)
        viewSubcategory()
        if (res.data.Status) {
          ///toast for alert message
          toast.success(res.data.Message, { position: "top-center" })
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
      .catch(err => console.log(err))
  }


  ////////    View sub Category  ////////////////
  const viewSubcategory = async () => {
    await axios.get(`http://localhost:5000/api/admin/subcategory/view_subCategory`)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          setsubCatList(res.data.result)
        }
        else {
          alert(res.data.Error)
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    viewSubcategory()
  }, [])

  ///////////////   delete subcategory api ///////////////////
  const deleteSubCategory = async (subcatid) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/subcategory/delete_subCategory/` + subcatid)
        .then(res => {
          console.log(res)
          viewSubcategory()
          if (res.data.Status) {
            toast.success(res.data.Message, { position: "top-center" })
          }
          else {
            toast.success(res.data.Error, { position: "top-center" })
          }
        })
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }


  //////////////// modal open karne me value update sub category   /////////////
  const updateValueSubCat = (subcatid, image) => {
    // console.log(subcatid)
    setnewsubCatId(subcatid)
    setnewsubCateValue({
      ...newsubCateValue,
      image: image
    })
    setSubCatModal(true)   ////// modal call kiya .....
  }

  const updateSubCategory = async () => {
    const formdata2 = new FormData()
    formdata2.append('image', newsubCateValue.image)

    await axios.patch(`http://localhost:5000/api/admin/subcategory/update_subCategory/` + newsubCatId, formdata2)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          toast.success(res.data.Message, { position: "top-center" })
          setSubCatModal(false)
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container d-flex justify-content-center mt-4">

      {/* <p> role form</p> */}
      <div className="card mx-5 mt-4 shadow-lg p-3 mb-5 bg-white rounded"
        style={{ width: '20rem', border: '2px solid black', height: "75vh" }}>

        <h3 className='text-center mt-2'>Add Sub Categories</h3>
        <div className="card-body justify-content-center">
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">Category</label>
            <select className="form-select" aria-label="Default select example" name='cid'
              onChange={(e) => setdataList({ ...dataList, [e.target.name]: e.target.value })}
            >
              <option >Select Product Category</option>
              {
                catList.map((clist, index) => {
                  return (
                    <option value={clist.cid}>{clist.cname}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">Sub Category Id</label>
            <input type="text" className="form-control" placeholder="enter sub category id" name='subcatid'
              onChange={(e) => setdataList({ ...dataList, subcatid: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">Sub Category Name</label>
            <input type="text" className="form-control" placeholder="enter sub category name" name='subcatname'
              onChange={(e) => setdataList({ ...dataList, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">Sub Category Image</label>
            <input type="file" className="form-control" name='image'
              onChange={(e) => setdataList({ ...dataList, [e.target.name]: e.target.files[0] })}
            />
          </div>
          <button type="button" className="btn col-12 btn-outline-dark mt-3"
            onClick={() => addSubCategoy()} >
            Save
          </button>
        </div>
      </div>

      {/* <p>table here</p> */}
      <div className='mx-4 mt-4 shadow-lg mb-2 bg-white rounded' style={{ border: '2px solid black', height: "75vh", width: "40rem" }}>

        <h3 className='mt-2 text-center'>All Sub Categories List</h3>
        <hr />
        <Col >
          <input
            type="text"
            placeholder="Search by rolename"
            style={{ marginLeft: "320px" }}
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
              <th>Category Name</th>
              <th>S.ID</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Added On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              subCatList.filter((item) => {
                return search.toLowerCase() === '' ? item : item.cname.includes(search) || item.cname.toLowerCase().includes(search) || item.subcatname.includes(search) || item.subcatname.toLowerCase().includes(search)
              })
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((d, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{d.cname}</td>
                      <td>{d.subcatid}</td>
                      <td>{d.subcatname}</td>
                      <td>
                        <img src={d.image} alt='product' height={40} width={40} className='rounded'
                        />
                      </td>
                      <td>{moment(d.addedon).format('DD-MM-YYYY')}</td>
                      <td>
                        <DropdownButton id="dropdown-basic-button" title="">
                          <Dropdown.Item
                            onClick={() => updateValueSubCat(d.subcatid, d.image)} className='bg-warning' >
                            <b>Edit</b>
                          </Dropdown.Item>

                          <Dropdown.Item onClick={() => deleteSubCategory(d.subcatid)}
                            className='bg-danger text-white' >
                            <b>Delete</b>
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>

        {/* <p> for pagination </p> */}
        <Pagination className="justify-content-center">
          {Array.from({ length: Math.ceil(subCatList.length / itemsPerPage) }, (_, index) => (
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


      {/* <p> modal for update sub category </p> */}
      <Modal show={subCatModal} onHide={() => setSubCatModal(false)}>
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block"> Update Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" name='image'
                onChange={(e) => setnewsubCateValue({
                  ...newsubCateValue, image: e.target.files[0]
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSubCatModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateSubCategory()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SubCategory
