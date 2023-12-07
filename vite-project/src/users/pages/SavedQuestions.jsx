import React from 'react'
import useApi from '../../Axios_instance/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from 'react';
import Lottie from 'lottie-react'
import animationData from '../../lottieani/Animation - 1699975136031.json'



function SavedQuestions() {
    const [answerresponse, setAnswerresponse] = useState([])
    const [bookmarkedIds, setBookmarkedIds] = useState([]);
    
    const api = useApi()
    
    const user_id =  localStorage.getItem('user_id');
    
    
    

    const [showDropdown, setShowDropdown] = useState(() => Array(answerresponse.length).fill(false));

    const getAnswerkey = async () => {
            try {
              const response = await api.get(`testseries/saved-questions/${user_id}/`);
                 
                setAnswerresponse(response.data)
                
            } catch (error) {
              console.error('Error fetching answerkey:', error);
            }
          };
    useEffect(() => {

        getAnswerkey()
    
    }, [bookmarkedIds])


    const handlebookmark = async (questionId) => {
        try {
          const response = await api.post(`testseries/toggle_bookmark/${questionId}/`);
          console.log(response.data)
          console.log(bookmarkedIds)

          setBookmarkedIds((prevIds) => {
            if (response.data.is_bookmarked) {
              return [...prevIds, questionId];
            } else {
              return prevIds.filter((id) => id !== questionId);
            }
          });
         
          console.log(response.data , 'response))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))')
          
        

        } catch (error) {
          console.error('Error bookmarking:', error);
        }
      };




    const toggleDropdown = (index) => {
        setShowDropdown((prevShowDropdown) => {
          const updatedState = [...prevShowDropdown];
          updatedState[index] = !updatedState[index];
          return updatedState;
        });
      };

      console.log(answerresponse)


  return (
    <>
        {answerresponse.length  >0 ?( answerresponse.map((answer,index)=>(
            
        <div key={answer.id}
        className="p-4 rounded-md shadow-md mb-4 bg-white">
            
            
        <div className="flex items-center justify-between">
        
          <span className="text-lg font-bold">{answer.question.text}</span>
          <div className="flex items-center space-x-4 ">
          <button
           onClick={() => toggleDropdown(answer.id)}
            className=" text-black text-2xl focus:outline-none"
          >
            {showDropdown[answer.id] ? '-' : '+'}
          </button>
          <FontAwesomeIcon onClick={()=>handlebookmark(answer.id)}
        icon={faBookmark}
        className={answer.is_bookmarked ? 'text-blue-500' : 'text-gray-500'}
       
      />
        </div>
        </div>
  
        {showDropdown[answer.id] && (
          <div className="mt-4">
            <label className="block font-semibold mb-1">Correct Answer:</label>
            <span className="text-green-500 font-bold">{answer.correct_option.text}</span>
  
            <label className="block font-semibold mt-2 mb-1">Selelcted Option:</label>
            <span className={`font-bold ${bookmarkedIds.includes(answer.id) || answer.is_bookmarked ? 'text-blue-500' : 'text-gray-500'}`}>
            {answer.selected_option ? answer.selected_option.text : 'Not Attempted'}
            </span>

           
            </div>
        )}
        
      </div>
      ))):
      
             (
                <div className='flex items-center  ml-96'>
             <Lottie animationData={animationData} className="w-1/4 h-1/4 mt-2"  />
                <span > No results</span>
                </div>
             )}
             

      
      
      </>
      
  )
}

export default SavedQuestions