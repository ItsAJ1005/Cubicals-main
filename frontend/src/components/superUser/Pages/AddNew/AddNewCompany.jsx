import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';

function AddNewCompany({ inputs = [], titlee }) {
    const [userInp, setUserInp] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
    });

    const [file, setFile] = useState('');

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInp);
    };
    
    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <p className="add_new_user">{titlee || "Add New Company"}</p>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <label htmlFor="file">
                                    Upload: <DriveFolderUploadIcon className="file_icon" />
                                </label>

                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            {inputs && inputs.map((detail) => (
                                <Input
                                    key={detail.id}
                                    {...detail}
                                    value={userInp[detail.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <button type="submit" className="submit_btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewCompany;
