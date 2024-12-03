import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import DropDown from '../ui/drop-down'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav className='bg-black text-white sm:p-4 xm:p-4'>

            <div className='flex gap-1 justify-center py-2'>
                <span>🚀</span>
                <div className='gradient-text-purple'>
                    Try our pro version to smash all the boundaries 
                </div>
                <div>
                    <Link to='/pricing'><button className='border text-sm ml-2 w-[8vw] py-[4.17px] rounded-3xl gradient-border sm:w-32'> <span className='relative  p-1 pl-7 pr-6 w-[8vw] rounded-3xl font-semibold bg-black'>Try Pro →</span></button></Link>
                </div>
            </div>
 

            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 nav-border'>
                <div>
                    <Link to='/'><h1 className='font-thin text-3xl'>Cubicles</h1></Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                    <li><DropDown/></li>
                                    
                                </>
                            ) : (
                                <>
                                    <li><Link onClick={()=>scrollToTop} to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                    <li><DropDown/></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className='text-black'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://img.icons8.com/?size=100&id=7819&format=png&color=C850F2"} alt="profile-img" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-gray-900 text-white">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 '>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer border-0 '>
                                                        {/*  User2 is a svg icon component */}
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile" className='text-white '>View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className='text-white'>Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
            
        </nav>
    )
}

export default Navbar