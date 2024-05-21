import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

function Home() {
  const [adminTotal, setadminTotal] = useState();
  const [usersTotal, setusersTotal] = useState();
  const [categoryTotal, setcategoryTotal] = useState();
  const [subcategoryTotal, setsubcategoryTotal] = useState();

  useEffect(() => {
    totalAdmin()
    totalUsers()
    totalCategory()
    totalSubCategory()
  }, [])

  /////////// =======  admin total  ==================//////////////
  const totalAdmin = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/auth/total_admin`)
      console.log(res)
      if(res.data.Status){
        setadminTotal(res.data.result[0].totaladmin)
      }
    } catch (err) {
      console.log(err)
    }
  }

  /////////=========== users total ================////////////////
  const totalUsers = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/api/admin/users/total_users`)
      console.log(res)
      if(res.data.Status){
        setusersTotal(res.data.result[0].totalusers)
      }
    } catch (err) {
      console.log(err)
    }
  }

  
  /////////=========== category total ================////////////////
  const totalCategory = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/api/admin/category/total_category`)
      console.log(res)
      if(res.data.Status){
        setcategoryTotal(res.data.result[0].totalcategory)
      }
    } catch (err) {
      console.log(err)
    }
  }

  
  /////////=========== category total ================////////////////
  const totalSubCategory = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/api/admin/subcategory/total_subcategory`)
      console.log(res)
      if(res.data.Status){
        setsubcategoryTotal(res.data.result[0].totalsubcategory)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const seriesData = [{
    name: 'Servings',
    data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
  }];

  const optionsData = {
    annotations: {
      points: [{
        x: 'Bananas',
        seriesIndex: 0,
        label: {
          borderColor: '#775DD0',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: 'Bananas are good',
        }
      }]
    },
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2']
      }
    },
    xaxis: {
      labels: {
        rotate: -45
      },
      categories: ['Apples', 'Oranges', 'Strawberries', 'Pineapples', 'Mangoes', 'Bananas',
        'Blackberries', 'Pears', 'Watermelons', 'Cherries', 'Pomegranates', 'Tangerines', 'Papayas'
      ],
      tickPlacement: 'on'
    },
    yaxis: {
      title: {
        text: 'Servings',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
  };

  ////////////

  const [series, setSeries] = useState([44, 55, 13, 33]);

  const optionsData2 = {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          show: false
        }
      }
    }],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    }
  };

  const appendData = () => {
    const arr = [...series];
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
    setSeries(arr);
  };

  const removeData = () => {
    if (series.length === 1) return;
    const arr = [...series];
    arr.pop();
    setSeries(arr);
  };

  const randomize = () => {
    setSeries(series.map(() => Math.floor(Math.random() * (100 - 1 + 1)) + 1));
  };

  const reset = () => {
    setSeries([44, 55, 13, 33]);
  };


  return (
    <div>
      <div className='d-flex container-fluid row mt-3'>
        <div className='col-md-3 mb-3 '>
          <div className='px-3 pt-2 pb-3 border ' style={{ backgroundColor: "#B3C8CF" }}>
            <div className='text-center pb-1'>
              <h4>Admin</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-around '>
              <h5>Total:</h5>
              <h5>{adminTotal}</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3 mb-3'>
          <div className='px-3 pt-2 pb-3 border shadow-md' style={{ backgroundColor: "#B3C8CF" }} >
            <div className='text-center pb-1'>
              <h4>Users</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-around'>
              <h5>Total:</h5>
              <h5>{usersTotal}</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3 mb-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm' style={{ backgroundColor: "#B3C8CF" }}>
            <div className='text-center pb-1'>
              <h4>Product Category</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-around'>
              <h5>Total:</h5>
              <h5>{categoryTotal}</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3 mb-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm' style={{ backgroundColor: "#B3C8CF" }}>
            <div className='text-center pb-1'>
              <h4>Sub Category</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-around'>
              <h5>Total:</h5>
              <h5>{subcategoryTotal}</h5>
            </div>
          </div>
        </div>

      </div>

      {/* <div className='container-fluid'>
          <div className='row mt-4 '>
            <div className='col-md-12'>
              <h3 className='text-center'>List of Admins</h3>
              <div className='table-responsive shadow'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}

      <div className='d-flex container-fluid row'>
        <div className='px-2 col-md-6'>
          <Chart options={optionsData} series={seriesData} type="bar" height={350} />
        </div>

        <div className=' px-5 col-md-6 row mt-3'>
          <div className="chart-wrap" style={{ width: '50%' }}>
            <div id="chart">
              <ReactApexChart options={optionsData2} series={series} type="donut" width={380} />
            </div>
          </div>
          <div className="actions">
            <button onClick={appendData}>+ ADD</button>
            <button onClick={removeData}>- REMOVE</button>
            <button onClick={randomize}>RANDOMIZE</button>
            <button onClick={reset}>RESET</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
