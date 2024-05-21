import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Table, Form, DropdownButton, Dropdown, Pagination, Modal, Button, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

function Offers() {

  const [offerList, setofferList] = useState([]);
  // console.log(offerList[0].offerid)
  const [offer, setoffer] = useState({
    offerid: "",
    offername: "",
    perdiscount: "",
    flatdis: "",
    uptodis: "",
    validfrom: "",
    validto: "",
    subcatid: "",
    termscondition: "",
  })
  console.log(offer)

  ////////////////  update items ///////////////////////
  const [showUdateModal, setshowUdateModal] = useState(false)
  const [newOfferId, setnewOfferId] = useState("")
  const [updateItems, setupdateItems] = useState({
    offername: "",
    subcatid: "",
    perdiscount: "",
    flatdis: "",
    uptodis: "",
    validfrom: "",
    validto: "",
    termscondition: ""
  })
  console.log(updateItems)

  /////    for  pagination    /////   
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /////////////  view offer modal  //////////////////////////
  const [showOfferModal, setshowOfferModal] = useState()
  const [allViewOfferList, setallViewOfferList] = useState({})

  const viewOffer = (offerstore) => {
    // console.log(offerList)
    setallViewOfferList(offerstore)
    setshowOfferModal(true)
  }


  ////////////////  update offer  //////////////////////
  const updateOffer = (offerid, offername, subcatid, perdiscount, flatdis, uptodis, validfrom, validto, termscondition) => {

    setnewOfferId(offerid)

    setupdateItems({
      ...updateItems,
      offername: offername,
      subcatid: subcatid,
      perdiscount: perdiscount,
      flatdis: flatdis,
      uptodis: uptodis,
      validfrom: validfrom,
      validto: validto,
      termscondition: termscondition
    })

    setshowUdateModal(true)
  }


  const hanldeUpdate = (newOfferId) => {
    console.log(newOfferId)
    axios.patch(`http://localhost:5000/api/admin/offer/upate_offer/OF2` + newOfferId, updateItems)
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          toast.success(res.data.Message, { position: "top-center" })
          setshowUdateModal(false)
        }
        else {
          toast.success(res.data.Error, { position: "top-center" })
        }
      })
  }


  /////////================  show Offer ==================//
  const showOffers = () => {
    try {
      axios.get(`http://localhost:5000/api/admin/offer/view_offer`)
        .then(res => {
          // console.log(res.data.result)
          setofferList(res.data.result)
        })
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    showOffers()
  }, [])


  /////////========    Add offer   =================////////////
  const addOffer = () => {
    try {
      axios.post(`http://localhost:5000/api/admin/offer/add_offer`, offer)
        .then(res => {
          console.log(res)
          if (res.data.Status) {
            toast.success(res.data.Message, { position: "top-center" })
            showOffers()
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


  ///////////////////  status activate  /////////////////////
  const updateStatusActive = async (offerid) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/offer/status_active/${offerid}`);
      console.log(res);
      showOffers();
      if (res.data.Status) {
        toast.success(res.data.Message, { position: "top-center" })
      }
    } catch (error) {
      console.error('Error updating user status to active:', error);
    }
  };

  ///////////////////  status Deactivate  /////////////////////
  const updateStatusDeactive = async (offerid) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/offer/status_deactive/${offerid}`);

      console.log(res);
      showOffers();
      if (res.data.Status) {
        toast.success(res.data.Message, { position: "top-center" })
      }
    } catch (error) {
      console.error('Error updating user status to inactive:', error);
    }
  };

  ////////////  onchange me compare  kiya ki yadi current status active hai to Deactive vala function chale or yadi deactive hai to active vala function chale  ///////

  const handleToggleStatus = async (offerid, currentStatus) => {
    if (currentStatus === 'active') {
      await updateStatusDeactive(offerid);
    } else {
      await updateStatusActive(offerid);
    }
  };


  return (
    <>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Add Offers">
          <div className='d-flex flex-column align-items-center pt-4 mb-4'>

            <div className="card mx-5  shadow-lg bg-light" style={{ width: '40%', border: '1px solid black' }}>
              <h3 className='text-center mt-2'>Add Offers</h3>

              <div className="card-body justify-content-center">
                <div className='d-flex p-1 gap-2'>
                  <div className="col-6">
                    <label className="form-label">Offer ID</label>
                    <input type="text" className="form-control" placeholder="Enter Offer Id" name='offerid'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Offer Name</label>
                    <input type="text" class="form-control" placeholder="Enter Offer Name" name='offername'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                </div>
                <div className='d-flex p-2 gap-2'>
                  <div className="col-6">
                    <label className="form-label">Percentage Discount</label>
                    <input type="text" className="form-control" placeholder="Enter Discount In %" name='perdiscount'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Flat Discount</label>
                    <input type="text" className="form-control" placeholder="Enter Flat Discount e.g 500$" name='flatdis'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                </div>
                <div className='d-flex p-1 gap-2'>
                  <div className="col-6">
                    <label className="form-label">Upto Discount</label>
                    <input type="text" className="form-control" placeholder="Enter Upto Discount " name='uptodis'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                  <div class="col-6">
                    <label className="form-label">Valid From</label>
                    <input type="date" className="form-control" placeholder="Enter Valid from" name='validfrom'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                </div>
                <div className='d-flex p-1 gap-2'>
                  <div className="col-6">
                    <label className="form-label">Valid To</label>
                    <input type="date" className="form-control" placeholder="Enter valid to" name='validto'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">SubCategory ID</label>
                    <input type="text" className="form-control" placeholder="Enter your subcategory id" name='subcatid'
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    />
                  </div>
                </div>
                <div className='d-flex p-1 gap-2'>
                  <div className="col-12">
                    <label className="form-label">Terms & Conditions</label>
                    <textarea class="form-control" rows="2" name='termscondition'
                      style={{ border: '1px solid gray' }}
                      onChange={(e) => setoffer({ ...offer, [e.target.name]: e.target.value })}
                    ></textarea>
                  </div>
                </div>


                <button type="button" class="btn col-12 btn-outline-dark mt-3"
                  onClick={() => addOffer()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

        </Tab>

        {/* <p>offer List</p> */}
        <Tab eventKey="profile" title="View Offers">
          <>
            <div className='px-5'>
              <div className='d-flex justify-content-center'>
                <h3>All Offers List</h3>
              </div>
              <div>
                <input type='text' placeholder='search users' className='border' />
              </div>

              <div className='mt-3 shadow'>
                <Table striped bordered hover variant="light shadow">
                  <thead className='text-center'>
                    <tr>
                      <th>S.No.</th>
                      <th>SubCatName</th>
                      <th>Offer Id</th>
                      <th>Offer Name</th>
                      <th>Valid From</th>
                      <th>Valid To</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {
                    offerList
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((d, index) => {
                        return (
                          <tbody className='text-center'>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{d.subcatname}</td>
                              <td>{d.offerid}</td>
                              <td>{d.offername}</td>
                              <td>{moment(d.validfrom).format('DD-MM-YYYY')}</td>
                              <td>{moment(d.validto).format('DD-MM-YYYY')}</td>
                              <td>
                                <Form.Check
                                  type="switch"
                                  id={`custom-switch-${index}`}
                                  label=""
                                  checked={d.status === 'active'}
                                  onChange={() => handleToggleStatus(d.offerid, d.status)}
                                />
                              </td>
                              <td>
                                <DropdownButton id="dropdown-basic-button" className='text-center'>
                                  <Dropdown.Item onClick={() => viewOffer(d)}>
                                    <VisibilityIcon className='text-primary' />
                                  </Dropdown.Item>

                                  <Dropdown.Item onClick={() => updateOffer(d.offerid, d.offername, d.subcatid, d.perdiscount, d.flatdis, d.uptodis, d.validfrom, d.validto, d.termscondition)}>
                                    <EditIcon className='text-success' />
                                  </Dropdown.Item>
                                </DropdownButton>
                              </td>
                            </tr>
                          </tbody>
                        )
                      })
                  }
                </Table>
              </div>
              {/* <p> for pagination </p> */}
              <Pagination className="justify-content-center">
                {Array.from({ length: Math.ceil(offerList.length / itemsPerPage) }, (_, index) => (
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

            {/* <p> modal for view users details</p> */}
            <Modal show={showOfferModal} onHide={() => setshowOfferModal(false)}>
              <Modal.Header className="d-block text-center">
                <Modal.Title className="d-inline-block">Offer Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ marginLeft: "110px" }}>
                  <h5> Offer ID : <span style={{ marginLeft: "50px", color: "blue" }}>{allViewOfferList.offerid}</span> </h5>

                  <h5>Offer Name : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewOfferList.offername}</span> </h5>
                  <h5>SubCat Name : <span style={{ marginLeft: "65px", color: "blue" }}>{allViewOfferList.subcatname}</span> </h5>

                  <h5>SubCat ID : <span style={{ marginLeft: "65px", color: "blue" }}>{allViewOfferList.subcatid}</span> </h5>

                  <h5>Discount IN % : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewOfferList.perdiscount}</span> </h5>

                  <h5>Flat Discount : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewOfferList.flatdis}</span> </h5>

                  <h5>Upto Discount : <span style={{ marginLeft: "40px", color: "blue" }}>{allViewOfferList.uptodis}</span> </h5>

                  <h5>Valid From : <span style={{ marginLeft: "65px", color: "blue" }}>
                    {moment(allViewOfferList.validfrom).format('DD-MM-YYYY')}
                  </span> </h5>

                  <h5>Valid To : <span style={{ marginLeft: "65px", color: "blue" }}>
                    {moment(allViewOfferList.validto).format('DD-MM-YYYY')}
                  </span> </h5>

                  <h5>Terms & Conditions : <span style={{ marginLeft: "20px", color: "blue" }}>{allViewOfferList.termscondition}</span> </h5>

                  <h5>Status : <span style={{ marginLeft: "30px", color: "blue" }}>{allViewOfferList.status}</span> </h5>
                </div>

              </Modal.Body>

              <Button variant="primary" onClick={() => setshowOfferModal(false)}>
                Close
              </Button>
            </Modal>

            {/* <p>modal for update</p> */}
            <Modal show={showUdateModal} onHide={() => setshowUdateModal(false)}>
              <Modal.Header className="d-block text-center">
                <Modal.Title className="d-inline-block">Update Offers List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div>
                    <Form.Group className="mb-3 clo-12">
                      <Form.Label>Offer Name</Form.Label>
                      <Form.Control type="text" name='offername'
                        value={updateItems.offername}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />
                    </Form.Group>
                  </div>
                  <div className='d-flex  gap-2'>
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>SubCat ID</Form.Label>
                      <Form.Control type="text" name='subcatid'
                        value={updateItems.subcatid}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />

                    </Form.Group>
                    <Form.Group className="mb-3 clo-6">
                      <Form.Label>Discount IN %</Form.Label>
                      <Form.Control type="text" name='perdiscount'
                        value={updateItems.perdiscount}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />
                    </Form.Group>
                  </div>
                  <div className='d-flex gap-2'>
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Flat Discount</Form.Label>
                      <Form.Control type="text" name='flatdis'
                        value={updateItems.flatdis}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />

                    </Form.Group>
                    <Form.Group className="mb-3 clo-6">
                      <Form.Label>Upto Discount</Form.Label>
                      <Form.Control type="text" name='uptodis'
                        value={updateItems.uptodis}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />
                    </Form.Group>
                  </div>
                  <div className='d-flex p-1 gap-2'>
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Valid From</Form.Label>
                      <Form.Control type="date" name='validfrom'
                        value={updateItems.validfrom}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />

                    </Form.Group>
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>Valid To</Form.Label>
                      <Form.Control type="date" name='validto'
                        value={updateItems.validto}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Label>Terms & Conditions</Form.Label>
                    <FloatingLabel
                      controlId="floatingTextarea"
                      className="mb-3"
                    >
                      <Form.Control as="textarea" placeholder="Leave a comment here"
                        name='termscondition'
                        value={updateItems.termscondition}
                        onChange={(e) => setupdateItems({ ...updateItems, [e.target.name]: e.target.value })}
                      />
                    </FloatingLabel>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setshowUdateModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => hanldeUpdate(newOfferId)}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Tab>
      </Tabs>


    </>
  )
}

export default Offers
