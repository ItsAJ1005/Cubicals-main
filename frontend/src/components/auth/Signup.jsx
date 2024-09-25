import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle input change
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file change (Profile image)
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
            return toast.error("File size should be less than 5MB");
        }
        if (file && !file.type.startsWith("image/")) {
            return toast.error("Only image files are allowed.");
        }
        setInput({ ...input, file });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        // Basic validation before form submission
        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            return toast.error("Please fill in all fields.");
        }

        if (!/^\d{10}$/.test(input.phoneNumber)) {
            return toast.error("Please enter a valid 10-digit phone number.");
        }

        const formData = new FormData(); // FormData object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Redirect if the user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 shadow shadow-zinc-300 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>

                    <div className="my-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            id="fullname"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Ayush Singhai"
                        />
                    </div>

                    <div className="my-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="ayush@gmail.com"
                        />
                    </div>

                    <div className="my-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="9876543210"
                        />
                    </div>

                    <div className="my-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="r1"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="r2"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center gap-2">
                            <Label htmlFor="file">Profile Picture</Label>
                            <Input
                                id="file"
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {
                        loading
                            ? <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                            : <Button type="submit" className="w-full my-4">Signup</Button>
                    }

                    <span className="text-sm">
                        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
