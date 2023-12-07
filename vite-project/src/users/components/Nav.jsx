import React from 'react'
import { Link } from 'react-router-dom';
import {Avatar,Dropdown,Navbar} from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useApi from '../../Axios_instance/axios';
import { isAuthenticated } from '../../Routes/authh';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import TooltipWrapper from '../Tooltip';
import { useDispatch ,useSelector} from 'react-redux'
import {setCurrentRole,setMainRole} from '../../Redux/Slices/rolesSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'lottie-react'
import animationData from  '../../lottieani/animation_lo5qlz87.json'



function Nav() {
  const dispatch = useDispatch()
    // const [mainRole, setMainRole] = useState(localStorage.getItem('main_role'));
    // const [currentRole, setCurrentRole] = useState(localStorage.getItem('temp_role'));
    const mainRole = useSelector(state => state.roles.mainRole);
    const currentRole = useSelector(state => state.roles.currentRole);
    const api = useApi()

    

    const navigate = useNavigate();
    const gotoregister = () =>{
        navigate('/signup')

    }

    const handleRoleSwitch = () => {
        api.post('switch-role/')
          .then(response => {
            localStorage.setItem('temp_role', response.data.new_role);
            const temp_role = response.data.new_role
            dispatch(setCurrentRole(temp_role));
            // setCurrentRole(response.data.new_role)
            
          })
          .catch(error => {
            console.error("Error while switching role:", error);
          });
      }
    
    const username = localStorage.getItem('registrationusername');
    
    const logout = async () => {
        console.log('fromm local storage logout view ',localStorage.getItem('refresh_token'));
        const refreshToken = localStorage.getItem('refresh_token');
        
        
       
    
        try {
       
            await api.post('logout/', {
                refresh_token: refreshToken
            });
            
           
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('registrationusername');
            localStorage.removeItem('main_role');
            localStorage.removeItem('user_id');
            localStorage.removeItem('temp_role');
            localStorage.clear();
            dispatch(setCurrentRole('USER'));
            dispatch(setMainRole('USER'));
    
            delete api.defaults.headers.common["Authorization"];
            toast.success(" Logout Successfull", {
              position: toast.POSITION.BOTTOM_CENTER,
              theme: "colored"
            });
    
            navigate('/')
    
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }
    let nav_colour = ''
    if(currentRole==='TEACHER'){
       nav_colour = 'bg-sky-300';
    }
    else if(currentRole==='TEACHER'){
       nav_colour='bg-violet-300';
    }
    else if(currentRole==='USER'){
       nav_colour='bg-pink-300'
    }
    

    
  return (
    <Navbar fluid rounded className= {nav_colour}>
      <Navbar.Brand href="">
        <img src="edunest logo .png" className=" mr-3 h-14 w-14 sm:h-18 sm:w-18" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">EduNest</span>
      </Navbar.Brand>
      <div className="flex items-center space-x-2">
    <input type="text" placeholder="Search..." className="px-2 py-1 rounded-md border border-gray-300 focus:border-red-800 focus:outline-none" />
    <button className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500">
    <FontAwesomeIcon icon={faSearch} />
    </button>
    </div>
      <div className="flex md:order-2">
      <div className="flex md:order-2">
        {isAuthenticated() ? (
        <Dropdown
            arrowIcon={false}
            inline
            label={
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
        >
            <Dropdown.Header>
                <span className="block text-sm">Username : {username}</span>
                
            </Dropdown.Header>

            <Dropdown.Item>
            <Navbar.Link as={Link} to="/profile" className='text-sm'>Profile</Navbar.Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
            ) : (
                <button onClick={gotoregister} className="bg-sky-600  text-white px-4 py-2 font-medium rounded-md  hover:bg-red-300">Register</button>
            )}
            <Navbar.Toggle />
        </div>
      </div>
      <Navbar.Collapse>
      
        {/* <Navbar.Link as={Link} to="/faculty-dash" className='text-lg'>notes</Navbar.Link> */}
        
       {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <Navbar.Link as={Link} to="/"  className='text-lg'>Home</Navbar.Link>}
       {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <Navbar.Link as={Link} to="/courses"  className='text-lg'>Courses</Navbar.Link>}
      
       {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <Navbar.Link as={Link} to="discussion_page"  className='text-lg'>Discuss</Navbar.Link>}
       {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <Navbar.Link as={Link} to="/Quizlist"  className='text-lg'>Testseries</Navbar.Link>}
       {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <Navbar.Link as={Link} to="/family"  className='text-lg'>Family</Navbar.Link>}
       {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <Navbar.Link as={Link} to="/call"  className='text-lg'>chat</Navbar.Link>}
       {/* {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) &&<Navbar.Link as={Link} to="/discussion"  className='text-lg'>Discussion</Navbar.Link>} */}
       


        
        {currentRole === "TEACHER" && <Navbar.Link as={Link} to="/faculty-dash" className='text-lg'>Dashboard</Navbar.Link>}
        {currentRole === "TEACHER" && <Navbar.Link as={Link} to="/faculty-course-manage" className='text-lg'>Course Management</Navbar.Link>}
        {currentRole === "TEACHER" && <Navbar.Link as={Link} to="/faculty-testseries" className='text-lg'>Quiz Management</Navbar.Link>}

        {(mainRole === 'TEACHER' && currentRole !== 'USER') &&  <TooltipWrapper content="This switches to user side"> <button onClick={handleRoleSwitch}  className="bg-red-300 text-black font-semibold text-lg  px-1 py-1  border-2 border-white rounded-lg  hover:bg-red-400 "> User side</button> </TooltipWrapper>}
        {(mainRole === 'TEACHER' && currentRole === 'USER') &&  <TooltipWrapper content="This switches to Faculty side"> <button onClick={handleRoleSwitch}  className="bg-red-300 text-black font-semibold text-lg  px-1 py-1  border-2 border-white rounded-lg  hover:bg-red-400 "> Faculty side</button> </TooltipWrapper>}


        
        {currentRole === "ADMIN" && <Navbar.Link as={Link} to="/admin-dash" className='text-lg'> Dashboard</Navbar.Link>}
        {currentRole === "ADMIN" && <Navbar.Link as={Link} to="/admin-courses-manage" className='text-lg'>Course Management</Navbar.Link>}
        {currentRole === "ADMIN" && <Navbar.Link as={Link} to="/admin-user-manage" className='text-lg'>Users</Navbar.Link>}
        {currentRole === "ADMIN" && <Navbar.Link as={Link} to="/admin-faculties" className='text-lg'>Faculties</Navbar.Link>}
        
        {(!currentRole || (currentRole !== 'TEACHER' && currentRole !== 'ADMIN')) && <div className="flex items-center ">
         <Navbar.Link as={Link} to="/careers"  className='text-lg mb-2'>Careers</Navbar.Link>
         <div className="w-10 h-10">
        <Lottie animationData={animationData} className="w-full h-full mb-1" />
       </div>
      </div>}
        {(mainRole === 'ADMIN' && currentRole !== 'USER') &&  <TooltipWrapper content="This switches to user side"> <button onClick={handleRoleSwitch}  className="bg-red-300 text-black font-semibold text-lg  px-1 py-1  border-2 border-white rounded-lg  hover:bg-red-400 "> User side</button> </TooltipWrapper>}
        {(mainRole === 'ADMIN' && currentRole === 'USER') &&  <TooltipWrapper content="This switches to Admin side"> <button onClick={handleRoleSwitch}  className="bg-red-300 text-black font-semibold text-lg  px-1 py-1  border-2 border-white rounded-lg  hover:bg-red-400 "> Admin side</button> </TooltipWrapper>}

        
      </Navbar.Collapse>
      <ToastContainer />
      
    </Navbar>
  )
}

export default Nav