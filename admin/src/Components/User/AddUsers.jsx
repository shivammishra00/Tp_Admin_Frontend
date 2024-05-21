import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { City, Country, State } from 'country-state-city';

function AddUsers() {
    const [users, setusers] = useState({
        uid: "",
        name: "",
        email: "",
        aadhar: "",
        address: "",
        qualification: "",
        contact: "",
        image: "",
        dob: "",
        doj: "",
        country: "",
        state: "",
        city: "",
        pin: "",
        password: "",
    })
    console.log(users)

    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");


    //////====== Fetching countries from the Country object================/////// 
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                let getcountries = await Country.getAllCountries();
                // console.log(,"country" , getcountries);
                setCountries(getcountries); //Assuming you want to update state with countries
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchCountry()
    }, [])
    // console.log(countries) /// get all country .

    ////////======== state select by country code ================////
    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        console.log(countryCode)
        setSelectedCountry(countryCode);
        
        setusers({...users, [e.target.name]:e.target.value})

        // Fetch states based on the selected country
        const countryStates = State.getStatesOfCountry(countryCode);
        console.log("states:", countryStates); //  chek all states after select country
        setStates(countryStates);

        // Clear states and cities when changing country
        setSelectedState("");
        setCities([]);
    };
    //  console.log(selectedCountry)
    //  console.log(states)


    ///////=========city select by country code and state code ================///////////
    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);

        setusers({...users, [e.target.name]:e.target.value})

        // Fetch cities based on the selected state
        const stateCities = City.getCitiesOfState(selectedCountry, stateCode,);
        console.log("Cities:", stateCities); //  chek all cities after select state
        setCities(stateCities);

        // Clear cities and pincode when changing state
        setSelectedCity("");
    };
    // console.log(selectedState)
    // console.log(cities)

     //////===============  city selct karne per find pincode ==============///////////////
     const handleCityChange = (e) => {
        const cityId = e.target.value;
        console.log("Selected City ID:", cityId); // Debugging statement
        setSelectedCity(cityId);

        setusers({...users, [e.target.name]:e.target.value})

        console.log("Cities array:", cities); //for check cities yaha hai ya nhi 
    };

    ///////   add user api    ///////
    const addUsers = (e) => {
        e.preventDefault()
        const formdata = new FormData();

        formdata.append('uid', users.uid)
        formdata.append('name', users.name)
        formdata.append('email', users.email)
        formdata.append('aadhar', users.aadhar)
        formdata.append('address', users.address)
        formdata.append('qualification', users.qualification)
        formdata.append('contact', users.contact)
        formdata.append('image', users.image)
        formdata.append('dob', users.dob)
        formdata.append('doj', users.doj)
        formdata.append('country', users.country);
        formdata.append('state', users.state);
        formdata.append('city', users.city);
        formdata.append('pin', users.pin)
        formdata.append('password', users.password)

        axios.post(`http://localhost:5000/api/admin/users/add_users`, formdata)
            .then(res => {
                console.log(res)
                ///toast for alert message
                toast.success(res.data.Message, { position: "top-center" })
                if (res.data.Status) {
                    navigate("/dashboard/users")
                }
                else {
                    toast.success(res.data.Error, { position: "top-center" })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>

            <h4>ADD USER DETAILS</h4>
            <hr />

            <form className="row g-2 w-50 shadow-lg p-3 mb-5 bg-light rounded" style={{ border: '1px solid black' }} onSubmit={addUsers}>

                <div className="col-6">
                    <label htmlFor="inputuid" className="form-label">User Id</label>
                    <input type="text" className="form-control" id="inputuid" placeholder='Enter user id' autoComplete='off' name='uid'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputName" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter user Name' autoComplete='off' name='name'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off' name='email'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputAadhar" className="form-label">Aadhar Number</label>
                    <input type="text" className="form-control" id="inputAadhar" placeholder="Enter Aadhar Number" autoComplete='off' name='aadhar'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Enter Address" autoComplete='off' name='address'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputQualification" className="form-label">Qualification</label>
                    <input type="text" className="form-control" id="inputQualification" placeholder="Enter Qualification" autoComplete='off' name='qualification'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputMobile" className="form-label">Contact Number</label>
                    <input type="text" className="form-control" id="inputMobile" placeholder="Enter Mobile" autoComplete='off' name='contact'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputGroupFile01" className="form-label">Photo</label>
                    <input type="file" className="form-control" id="inputGroupFile01" placeholder="Enter Photo" autoComplete='off' name='image'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.files[0] })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputDob" className="form-label">Date of Birth</label>
                    <input type="Date" className="form-control" id="inputDob" name='dob' autoComplete='off'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputDoj" className="form-label">Date of Joining</label>
                    <input type="Date" className="form-control" id="inputDoj" name='doj' autoComplete='off'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                {/* <p> country drop down</p> */}
                <div className="col-6">
                    <label htmlFor="inputCountry" className="form-label">Country </label>
                    <select className="form-select" id="inputCountry" name='country'
                        onChange={handleCountryChange}
                    >
                        <option >Select Country</option>
                        {countries.map((country,index) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* State dropdown */}
                <div className="col-6">
                    <label htmlFor="inputState" className="form-label">State </label>
                    <select className="form-select" id="inputState" name='state'
                        onChange={handleStateChange}
                    >
                        <option >Select State</option>
                        {states.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City dropdown */}
                <div className="col-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <select className="form-select" id="inputCity" name='city'
                        onChange={handleCityChange}
                    >
                        <option>Select City</option>
                        {cities.map((d, index) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-6">
                    <label htmlFor="inputPin" className="form-label">Pin Code</label>
                    <input type="text" className="form-control" id="inputPin" placeholder="Enter Pin" autoComplete='off' name='pin'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Enter Password" autoComplete="current-password"
                        name='password'
                        onChange={(e) => setusers({ ...users, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="col-6">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>
    )
}

export default AddUsers
