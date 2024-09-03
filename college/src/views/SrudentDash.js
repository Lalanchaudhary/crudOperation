import React, { useEffect, useState } from 'react'
import '../css/StudentDash.css'
import axios from 'axios'
import { Button, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
function StudentDash() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setFilteredData(
        userData.filter(user =>
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.course.toLowerCase().includes(search.toLowerCase()) ||
            user.semester.toString().includes(search)
        )
    );
}, [search, userData]);
  function Update(data) {
    navigate("/update", { state: { value: data } })
  }

  const fetchData = () => {
    axios.get('http://localhost:9000/student')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleRemoveItem = (id) => {
    axios.post('http://localhost:9000/delete', { id })
      .then(() => {
        setUserData(userData.filter(item => item._id !== id));
        console.log("Item deleted successfully");
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
};


//   const filteredData = userData.filter((item) => 
//     search === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
//   );
  return (
    <>
      <div className='body'>
        <div className='main-box'>
          <h2 style={{ textAlign: 'center' }}>Student List ({userData.length})</h2>
          <Container className='add-user'>
            <FaMagnifyingGlass className='search_icon' onClick={() => { setClick(true) }} />
            <input type="text" onChange={handleSearchChange} style={{ width: click === false ? 0 : 400, padding: 0, paddingLeft: click === false ? 0 : 40 }} className='admin-search' placeholder='search' />
            <Link to={"/studentform"} className='text-dark'><Button className='add-user-btn251'>Add Students <FaPlus color='white' className='mx-2' />
            </Button></Link>
          </Container>
          <Container className='header_container2'>
            <div className='box'> <span>Student Name</span></div>
            <div className='box'> <span> Course</span></div> 
            <div className='box'><span>Semester</span></div>
            <div className='box'> <span> Email id</span></div>
            <div className='box'> <span>Contact</span></div>
            <div className='box'><span>Dates</span></div> 
          </Container>
          {
filteredData.map((row) => {
              return <div className='inner-box'>
                <div className='colums fw-bold colums2'>{row.firstName} {row.lastName}</div>
                <div className='colums'>{row.course}</div>
                <div className='colums'>{row.semester}</div>
                <div className='colums'>{row.email}</div>
                <div className='colums'>{row.phoneNumber}</div>
                <div className='colums'>{row.createdAt.slice(0, 10)}</div>
                <div className='btn-div5'>
                  {/* <button className='admin' onClick={() => { gotoCart(row) }}>View</button> */}
                  {/* <button className='admin btn2' onClick={() => { Update(row) }}>Update</button> */}
                  {/* <button className='admin' style={{ backgroundColor: 'red' }} onClick={() => { RemoveItem(row._id) }}><MdDelete /> Delete</button> */}
                  {/* <button class="btn1 btn-delete" onClick={() => { handleRemoveItem(row._id) }}> */}
                    {/* <span class="mdi mdi-delete mdi-24px"></span>
                    <span class="mdi mdi-delete-empty mdi-24px"></span> */}
                    {/* <MdDelete /> */}
                    {/* <span>Delete</span> */}
                  {/* </button> */}
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default StudentDash
