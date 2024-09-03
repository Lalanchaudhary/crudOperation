import React, { useState } from 'react';
import '../css/Form.css';
import axios from 'axios';
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Addtest() {
    const navigate = useNavigate();
    const [institute, setInstitute] = useState({
        name: "",
        address: "",
        contact: ""
    });

    const handleChange = (e) => {
        setInstitute({ ...institute, [e.target.name]: e.target.value });
        console.log(institute);
    };

    const AddInstitute = async (e) => {
        e.preventDefault(); // Prevent page reload
        alert("User Added Successfully"); 
        try {
            await axios.post(`http://localhost:9000/collegeData`, institute);
            console.log("Done");
            navigate("/")
        } catch (error) {
            console.log("Error occurred", error);
        }
    };

    return (
        <div className="bdy2">
            <form action='POST' className="container" onSubmit={AddInstitute}>
                <div style={{ position: 'relative' }}>
                    <FaBuilding className='college-icon' />
                    <input type="text" className="boxes1" onChange={handleChange} value={institute.name} name="name" placeholder="Institute name" />
                </div>
                <div style={{ position: 'relative' }}>
                    <FaLocationDot className='college-icon' />
                    <input type="text" className="boxes13" onChange={handleChange} value={institute.address} name="address" placeholder="Address" />
                </div>
                <div style={{ position: 'relative' }}>
                    <RiContactsBook2Fill className='college-icon' />
                    <input type="number" className="boxes13" onChange={handleChange} value={institute.contact} name="contact" placeholder="Contact" />
                </div>
                <br />
                <button type='submit' className="btn1111">Add Institute</button>
            </form>
        </div>
    );
}

export default Addtest;
