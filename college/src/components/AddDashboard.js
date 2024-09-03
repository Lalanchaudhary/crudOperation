import React, { useEffect, useState } from 'react'
import '../css/Adddash.css'
import axios from 'axios'
import { Button, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
function AdminDash() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function Update(data) {
    navigate("/update", { state: { value: data } })
  }

  const fetchData = () => {
    axios.get('http://localhost:9000')
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
    setSearch(e.target.value.trim());
  };

  const filteredData = userData.filter((item) => 
    search === '' ? item : item.name && item.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <>
      <div className='body'>
        <div className='main-box'>
          <h2 style={{ textAlign: 'center' }}>INSTITUTES ({userData.length})</h2>
          <Container className='add-user'>
            <FaMagnifyingGlass className='search_icon' style={{display:'none'}}  onClick={() => { setClick(true) }} />
            <input type="text" onChange={handleSearchChange}  style={{ width: click === false ? 0 : 400, padding: 0, paddingLeft: click === false ? 0 : 40 }} className='admin-search' placeholder='search' />
            <Link to={"/form"} className='text-dark'><Button className='add-user-btn25'>Add Institute</Button></Link>
          </Container>
          <Container className='header_container'>
            <div className='box'><BsBuilding /> <span>Institute Names</span></div>
            <div className='box'><IoLocationOutline /> <span>Institute Address</span></div>
            <div className='box'><MdCall /> <span>Contact number</span></div>
            <div className='box'> <span>Dates</span></div>
            <div className='box'><span>Operations</span></div>
          </Container>
          {
            userData.filter((event) => {
              return search.toLowerCase() === '' ? event : event.title.toLowerCase().includes(search);
            }).map((row) => {
              return <div className='inner-box'>
                <div className='colums fw-bold colums2'>{row.name}</div>
                <div className='colums'>{row.address}</div>
                <div className='colums'>{row.contact}</div>
                <div className='colums'>{row.createdAt.slice(0, 10)}</div>
                <div className='btn-div5'>
                  {/* <button className='admin' onClick={() => { gotoCart(row) }}>View</button> */}
                  <button className='admin btn2' onClick={() => { Update(row) }}>Update</button>
                  {/* <button className='admin' style={{ backgroundColor: 'red' }} onClick={() => { RemoveItem(row._id) }}><MdDelete /> Delete</button> */}
                  <button class="btn1 btn-delete" onClick={() => { handleRemoveItem(row._id) }}>
                    {/* <span class="mdi mdi-delete mdi-24px"></span>
                    <span class="mdi mdi-delete-empty mdi-24px"></span> */}
                    <MdDelete />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default AdminDash
