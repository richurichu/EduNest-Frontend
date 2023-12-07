import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBookmark } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'
import { useRef,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApi from '../../Axios_instance/axios';

function Profile() {

    const navigate = useNavigate();
    const api = useApi()
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImg, setprofileImg] = useState('')
    const user_id = localStorage.getItem('user_id');

    const handleEditClick = () => {
      
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
     
      const file = event.target.files[0];
      if (file) {
        
        submitFile(file);
      }
    };
    
    const submitFile = async (pic) => {
      const formData = new FormData();
     
      if (pic) {
          formData.append('pic', pic);
      }
      
  
      console.log(formData)
      console.log('started request ')
    
      try {
          
         const response = await api.post(
            `set-profile-image/${user_id}/`,
            formData,
            {
                headers: {
                    
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }
        );
          if (response) {
              
              toast.success("You have posted successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored"
            });
            
              
          }
      } catch (error) {
        toast.error(error.response.data[0] || "error", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored"
      })
        
      }
    }
    const loadprofile = async () => {
      
    
      try {
          
         const response = await api.get(
            `profile-details/${user_id}/`,
           
            {
                
                withCredentials: true
            }
        );
          if (response) {
              
              console.log(response.data)
              setprofileImg(response.data.profile_image)
              
          }
      } catch (error) {
        toast.error(error.response.data[0] || "error", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored"
      })
        
      }
    }

    useEffect(() => {
      
      loadprofile()
      
    }, [])
    
  
  return (
    <>
       <div className="flex items-center justify-center h-screen">
      <div className="bg-gradient-to-r from-violet-200 via-red-300 to-yellow-100 p-36 rounded-md shadow-2xl flex flex-col items-center justify-center mb-8">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <FontAwesomeIcon
          icon={faEdit}
          className="absolute top-80 right-45 mt-20 ml-16 text-xl text-gray-800 cursor-pointer"
          onClick={handleEditClick}
        />
        {/* <img
          src={`http://localhost:8000/${profileImg}`}
          alt="Profile"
          className="rounded-full h-28 w-28 object-cover mb-4"
        /> */}
        <h2 className="text-2xl font-bold mb-2">Rahul</h2>
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
            rahul@gmail.com
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full">
            Quiz Points: 50
          </button>
        </div>

        {/* Additional buttons */}
        <div className="flex mt-8 space-x-4 ">
          <button onClick={()=>navigate('/saved-questions')} className="bg-yellow-500 text-white px-4 py-2 rounded-full">
            Saved Questions
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full">
            Saved Notes
          </button>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-full">
            Purchased Courses
          </button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full">
            Notifications
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile