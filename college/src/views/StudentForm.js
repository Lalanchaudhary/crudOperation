import React, { useState } from 'react';
import '../css/StudentForm.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BasicDetailsForm = () => {
    const [state, setState] = useState(true);
    const [count, setCount] = useState(0);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',  // Ensure consistency in naming
        course:'',
        semester:''
    });
    const array = [
        ["B.tech(CSE)", "B.tech(civil)", "B.tech(Electrical)", "B.tech(Mechanical)", "B.pharma", "H.M", "Para Madical", "Diploma"],
        ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]
    ]
    const arr = ["Select Course", "Select Semester"]

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // e.preventDefault();  // Prevent form submission default behavior
        console.log(formData);
    };

    const HandleClick = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            course: count < 1 ? e : prevData.course,
            semester: count >= 1 ? e : prevData.semester,
        }));
        if (count < 1) {
            setCount((prevCount) => prevCount + 1);
        }
    };

    const AddStrudent = async (e) => {
        // e.preventDefault(); // Prevent page reload
        alert("User Added Successfully"); 
        try {
            await axios.post(`http://localhost:9000/StudentData`, formData);
            console.log("Done");
            navigate("/")
        } catch (error) {
            console.log("Error occurred", error);
        }
    };


    return (
        <>
            <div className='Outer_box'>
                <div className='LeftPart'>
                    <h2 className='text-light'>Student Verification</h2>
                    <div className='steps'>
                        <div className='steps-count' style={{ color: 'white' }}><div className='count' style={{ borderColor: 'white' }}>1</div><p>Basic Details</p> </div>
                        <div className='line' style={{ backgroundColor: state === false ? 'white' : 'grey' }}></div>
                        <div className='steps-count' style={{ color: state === false ? 'white' : 'grey' }}><div className='count' style={{ borderColor: state === false ? 'white' : 'grey' }} >2</div><p>Select Course</p> </div>
                        <div className='line' style={{ backgroundColor: count === 1 ? 'white' : 'grey' }}></div>
                        <div className='steps-count' style={{ color: count === 1 ? 'white' : 'grey' }}><div className='count' style={{ borderColor: count === 1 ? 'white' : 'grey' }}>3</div><p>Select semester</p> </div>
                    </div>
                </div>
                {state === false ?
                    <>
                        <h2 className='heading11121'>{arr[count]}</h2>
                        <div className='form-container2'>
                            {
                                array[count].map((e, index) => {
                                    return (
                                        <div
                                            key={index}  // Unique key added
                                            className='content_box'
                                            style={{ fontSize: count === 0 ? 16 : 28 }}
                                            onClick={() => { HandleClick(e) }}
                                        >
                                            {e}
                                        </div>
                                    )
                                })
                            }
                            <div className="form-actions">
                                {count === 1 && <button type="submit" className="continue-btn" onClick={AddStrudent}>Submit</button>}
                            </div>
                        </div>
                    </> :
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <h2>Basic Details</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"  // Corrected name
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <Form.Select aria-label="Default select example">
                                    <option>Select University</option>
                                    <option value="1">Sviet</option>
                                    <option value="2">Chitkara</option>
                                    <option value="3">Chandigarg</option>
                                </Form.Select>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="continue-btn" onClick={() => { setState(false) }}>Continue</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    );
};

export default BasicDetailsForm;
