import React from 'react'

// import { Button } from 'flowbite-react';
// import { Flowbite } from 'flowbite-react'
// import CoursesList from './CoursesList';

import { useState } from 'react';

import Lottie from 'lottie-react'
import { useSpring, animated } from 'react-spring';
import animationData from '../../lottieani/Animation - 1702622557576.json'
import {useNavigate} from 'react-router-dom'



function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const navigate = useNavigate();


  const textAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0, translateY: -50 },
    delay: 500,
    config: { tension: 130, friction: 70 },
    reset: false,
  });

  const textVariants = [
    
    'with Study Groups',
    'with Interactive Courses',
    'with Mock Exams',
    
  ];

  const textmultipleAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: { duration: 3000 ,tension: 300, friction: 20  },
    onRest: () => {
      // Change text when the animation finishes
      setTextIndex((prevIndex) => (prevIndex + 1) % textVariants.length);
    },
  });




  return (
    <>
      {/* <CoursesList setIsLoading={setIsLoading} isLoading={isLoading}/> */}


      <div className="flex  px-24   bg-gradient-to-t from-rose-300 to-indigo-300 shadow-xl">
        <div className=" py-16  w-7/12 mb-32">
          <h1 className="text-6xl font-bold  ml-4 text-center  text-sky-700 tracking-wide md:text-left md:mr-4">
            <span className=' text-white block'>Unlock Your Path to</span>
            <span className='text-white block mt-6'>Government Exams </span>
            <animated.span className='text-indigo-900 block mt-6' style={textmultipleAnimation}>
              {textVariants[textIndex]}
            </animated.span>

          </h1>
           <animated.p className="text-lg mt-20 ml-4" style={textAnimation}>
            Explore our app to access a variety of features designed to enhance
            your learning experience. Enjoy video courses, interactive quizzes,
            seamless note-taking, engaging discussions, and join specialized
            groups. Elevate your preparation with our comprehensive platform!
          </animated.p>
          <button onClick={()=> navigate('/courses')} className="bg-transparent mt-2 ml-4  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded ">
            Get Started
          </button>
        </div>


        <div className=" w-5/12  h-full mt-24 "><Lottie animationData={animationData} className="w-full h-full" />
        </div>

      </div>
      
    </>



  )
}

export default Home