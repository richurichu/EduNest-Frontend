import React from 'react'
import axios from 'axios';
import  { useState } from 'react'
import useApi from '../../Axios_instance/axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux'
import {setCurrentRole,setMainRole} from '../../Redux/Slices/rolesSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Buttons from '../../General/spinner';
import Lottie from 'lottie-react'
import animationData from '../../lottieani/animation_lo5zanlx.json'
import Loader from '../../General/loader';




function Login() {
    const usernam = localStorage.getItem('registrationusername');
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const api = useApi()
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };
        let isLoginSuccessful = false;
        try {
            const { data } = await api.post(
                'token/',
                user,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            // Storing tokens in localstorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('registrationusername', username);
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            try {
                const isOtpVerified = await api.post(`check-otp-verified/`,{ username: username }, {
                    headers: {
                        'Authorization': `Bearer ${data.access}`
                    }
                });
                if (!isOtpVerified.data.is_verified) {
                    toast.error("OTP not verified. Redirecting to resend OTP...", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        theme: "colored"
                    });

                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');

                    navigate('/resend_otp');
                    return;
                }
                
               
               
            } catch (roleError) {
                console.log(roleError)
                toast.error(" Sorry Admin has Blocked You !", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    theme: "colored"
                  });
                  
                  
            }

            try {
                const roleResponse = await api.get('get-user-role/', {
                    headers: {
                        'Authorization': `Bearer ${data.access}`
                    }
                });
                
                localStorage.setItem('temp_role', roleResponse.data.temp_role);
                localStorage.setItem('main_role', roleResponse.data.role);
                localStorage.setItem('user_id', roleResponse.data.user_id);
                localStorage.setItem('fam_id', roleResponse.data.fam_id);
                const temp_role = roleResponse.data.temp_role
                const main_role = roleResponse.data.role

                dispatch(setCurrentRole(temp_role));
                dispatch(setMainRole(main_role));
                // const mainRole = useSelector(state => state.roles.mainRole);
                // console.log(mainRole)

                console.log(roleResponse.data.temp_role)
                console.log(roleResponse.data.role)
                isLoginSuccessful = true;
            } catch (roleError) {
                console.log(roleError)
                toast.error(" Sorry Admin has Blocked You !", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    theme: "colored"
                  });
                  localStorage.clear()
                  setLoading(false)
                   navigate('/login');
                  
            }
            console.log(localStorage.getItem('access_token'));
            console.log(localStorage.getItem('refresh_token'));
        } catch (error) {
            toast.error("Username and password not matching ", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored"
              });
            setLoading(false)
        }
        if (isLoginSuccessful) {
            toast.success("Login Successful", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored"
            });
            navigate('/');
            setLoading(false)
        } else {
            setLoading(false)
            navigate('/login');
        }
    };

  return (
    <>
    { loading ? (<Loader />):(
    <div className="flex h-screen ">

    {/* Left Side - Vacant */}
    <div className="hidden lg:block lg:w-1/2 flex-col items-center justify-center h-full ml-48 mt-32 p-12">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back</h1>
    
    <div className="w-1/2 mb-8">
    <Lottie animationData={animationData} className="w-full h-full" />
    </div>

    <h2 className="text-2xl font-bold text-gray-700">EduNest: Shaping the Future of Education</h2>
</div>

    

    {/* Right Side - Login Form */}
    <div className="w-full lg:w-1/2 flex items-center justify-center h-full">
        <div className="p-12 rounded-md w-full lg:w-6/12 border border-gray-300 shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="text-4xl font-bold tracking-wider text-black text-shadow mb-6">Login</div>
    
    <div className="mb-4 mt-10">
      <label htmlFor="username" className="block font-medium text-black" style={{ fontSize: "20px" }}>Username</label>
      <textarea id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" style={{ resize: "none" }} className="w-full p-2 rounded-lg bg-white "></textarea>
    </div>

    <div className="mb-4">
      <label htmlFor="Password" className="block font-medium text-black" style={{ fontSize: "20px" }}>Password</label>
      <textarea id="Password"placeholder="Password" value={password}  onChange={e => setPassword(e.target.value)} style={{ resize: "none" }} className="w-full p-2 rounded-lg bg-white "></textarea> 
      <div>
      <p className="block font-semibold text-right cursor-pointer  text-black" style={{ fontSize: "15px" }}>Forgot Password</p>
      </div>
    </div>



    <div className="flex justify-center items-center mt-9">
  <button type="submit" className="bg-sky-600 text-white px-8 py-2 font-medium rounded-md transform hover:scale-105 hover:shadow-xl transition-all duration-300">
      Submit
  </button>
     </div>
  
  <div className="flex justify-center items-center mt-5">
      <p  onClick={()=>navigate('/signup')} className='font-medium cursor-pointer'>Not yet registered ?  </p>
  </div>
  </form>
  </div>
  <ToastContainer />
  </div>
  </div>
  ) }
  </>
  )
}

export default Login