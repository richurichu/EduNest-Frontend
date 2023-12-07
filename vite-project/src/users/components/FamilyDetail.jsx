import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import useApi from '../../Axios_instance/axios';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

function FamilyDetail() {
    const api = useApi()
    const navigate = useNavigate();
    const roomname = localStorage.getItem('fam_name');
    const room_id = localStorage.getItem('fam_idd');
    const is_owner = localStorage.getItem('is_owner')
    const user_id = localStorage.getItem('user_id');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [members, setMembers] = useState([])
    const [membersmodal, setMembersmodal] = useState(false)
    const [leaveMemberModal, setLeaveMemberModal] = useState(false)
    const [userBanId, setUserBanId] = useState('')

    const loadMembers = async () => {
        try {
            const response = await api.get(`families/get-members/${room_id}/`);
         
            setMembers(response.data)
          console.log(response.data , 'response))))))))********************************))))))))))))')
          
         
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      };

      const getMembers = () => {
        setMembersmodal(true)
        loadMembers()
    }



    const handleBlockMember = (ID) => {
        setUserBanId(ID)
        setIsDeleteModalOpen(true)

       
    }

    const handleLeaveFamily = () => {
        setLeaveMemberModal(true)
        
        
    }


    const ConfirmBlockMember = async () => {
        try {
            await api.post(`families/block-members/${userBanId}/`);
           
            toast.success("User Deleted successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored"
            });
            setIsDeleteModalOpen(false)
            setMembersmodal(false)
            
        } catch (error) {
            console.error("Error deleting chapter:", error);
        }
    }
    

    const ConfirmLeaveFamily = async () => {
        try {
            await api.post(`families/leave-family/${user_id}/${room_id}/`);
           
            toast.success("Leaved family successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored"
            });
            localStorage.removeItem('is_owner');
            localStorage.removeItem('fam_name');
            localStorage.removeItem('fam_idd');

            setLeaveMemberModal(false)
            navigate('/family')

        } catch (error) {
            console.error("Error deleting chapter:", error);
        }
    }
    
    
  return (
    <>
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300 p-2 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2 mb-4 mt-8"
          >
            <h1 className="text-lg font-semibold mb-2 ml-16 ">{roomname}</h1>
          </div>
      <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2 mb-4  mt-12"
          >
            <h3 className="text-lg font-semibold mb-2 ">Rank : 6</h3>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2 mb-4  mt-12"
          >
            <h3 className="text-lg font-semibold mb-2">Total Points : 17</h3>
          </div>
          <div onClick={()=>navigate('/call')} className="bg-blue-500 p-2 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2 mb-4  mt-20">
          <h3 className="text-lg font-semibold mb-2 text-white ml-20 mr-4 ">Voice Chat</h3>
    </div>
    <div onClick={()=>handleLeaveFamily()} className="bg-red-500 p-2 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2 mb-4  mt-20">
          <h3 className="text-lg font-semibold mb-2 text-white ml-20 mr-4 ">Leave Family</h3>
    </div>
    {is_owner === 'true' && (<div   onClick={getMembers }  className="bg-green-500 p-2 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2 mb-4  mt-20">
          <h3 className="text-lg font-semibold mb-2 text-white ml-24 mr-4 ">Actions</h3>
    </div>)}
    <Modal show={membersmodal} onClose={() => setMembersmodal(false)}>
    <Modal.Header>
       
    </Modal.Header>
    <Modal.Body>
    <div style={{maxHeight: '400px', overflowY: 'auto'}} className="w-full lg:w-full bg-slate-100 shadow-lg p-4 rounded-lg">
    <h3 className="text-xl font-bold mb-4">Members</h3>
    <ul>
      
        {members && members.map((member) => (
            <li className="mb-4 bg-white shadow-lg p-4 rounded flex items-center justify-start transform transition-transform duration-900 hover:scale-104 hover:bg-gray-200 cursor-pointer">
                
                <h3 className="flex-grow text-gray-700 ml-4 text-xl font-bold">{member.username}</h3>

                <button onClick={()=>handleBlockMember(member.pk)}
                    className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 ml-4 flex-none"
                    
                >
                    Ban
                </button>
            </li>
        
        ))}
        
    </ul>
</div>
    </Modal.Body>
    <Modal.Footer>
        <Button className="bg-violet-500" onClick={() => setMembersmodal(false)}>
            Close
        </Button>
    </Modal.Footer>
</Modal>

<Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
    <Modal.Header>
        Ban Member
    </Modal.Header>
    <Modal.Body>
        Are you sure you want to Ban Member?
    </Modal.Body>
    <Modal.Footer>
        <Button className="bg-violet-500" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
        </Button>
        <Button className="bg-red-600" onClick={ConfirmBlockMember}>
            Delete
        </Button>
    </Modal.Footer>
</Modal>


<Modal show={leaveMemberModal} onClose={() => setLeaveMemberModal(false)}>
    <Modal.Header>
        Leave Family
    </Modal.Header>
    <Modal.Body>
        Are you sure you want to Leave Family ?
    </Modal.Body>
    <Modal.Footer>
        <Button className="bg-violet-500" onClick={() => setLeaveMemberModal(false)}>
            Cancel
        </Button>
        <Button className="bg-red-600" onClick={ConfirmLeaveFamily}>
            Confirm
        </Button>
    </Modal.Footer>
</Modal>

    </>

  )
}

export default FamilyDetail