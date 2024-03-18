import React from 'react'

// import { Button } from 'flowbite-react';
// import { Flowbite } from 'flowbite-react'
// import CoursesList from './CoursesList';

import { useState } from 'react';
import imagee from '../../General/Images/video call.png'
import quiz from '../../General/Images/quiznice.png'
import poster from '../../General/Images/hd.png'

import Lottie from 'lottie-react'
import { useSpring, animated } from 'react-spring';
import animationData from '../../lottieani/Animation - 1702622557576.json'
import { useNavigate } from 'react-router-dom'



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
    config: { duration: 3000, tension: 300, friction: 20 },
    onRest: () => {
      // Change text when the animation finishes
      setTextIndex((prevIndex) => (prevIndex + 1) % textVariants.length);
    },
  });




  return (
    <>
      <div className="bg-gradient-to-t from-rose-100 to-indigo-300">
        {/* <CoursesList setIsLoading={setIsLoading} isLoading={isLoading}/> */}


        <div className="flex flex-col-reverse md:flex-row px-4 md:px-8 lg:px-16 xl:px-24  ">
          <div className="w-full md:w-7/12 mb-8 mt-28 md:mb-32">
            <h1 className="text-4xl md:text-6xl font-bold ml-4 text-center md:text-left md:mr-4">
              <span className='text-white block'>Unlock Your Path to</span>
              <span className='text-white block mt-2 md:mt-6'>Government Exams </span>
              <animated.span className='text-indigo-900 block mt-8 md:mt-6' style={textmultipleAnimation}>
                {textVariants[textIndex]}
              </animated.span>
            </h1>

            <animated.p className="text-base md:text-lg mt-24 ml-4" style={textAnimation}>
              Explore our app to access a variety of features designed to enhance
              your learning experience. Enjoy video courses, interactive quizzes,
              seamless note-taking, engaging discussions, and join specialized
              groups. Elevate your preparation with our comprehensive platform!
            </animated.p>

            <button onClick={() => navigate('/courses')} className="bg-transparent mt-2 ml-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 md:py-2 md:px-6 border-2 border-blue-500 hover:border-transparent rounded">
              Get Started
            </button>
          </div>

          <div className="w-full md:w-5/12 h-full mt-12">
            <Lottie animationData={animationData} className="w-full h-full" />
          </div>

        </div>
        <div className=' flex ' style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23d0f4de\' fill-opacity=\'1\' d=\'M0,224L80,208C160,192,320,160,480,122.7C640,85,800,43,960,42.7C1120,43,1280,85,1360,106.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="w-1/2  ">

            <img src={imagee} alt="My Image" style={{ borderRadius: '10px', marginLeft: '70px' }} />
          </div>
          <div className="w-1/2">
            <div className=" rounded-lg  p-12 ml-4 mx-auto">
              <h1 className="text-2xl md:text-6xl font-bold ">
                <span className='text-indigo-900 block'>INTERACTIVE</span>
                <span className='text-indigo-800 block  mt-2'>LEARNING </span>

              </h1>
              <h2 className="text-2xl text-gray-800 font-bold mt-4">Group Video Call for Studying</h2>
              <p className="text-gray-700 mt-4">
                Collaborate with peers in real-time study sessions. Share screens, ask questions, and discuss topics together. With the ability to create study groups, families can organize their students into dedicated chat rooms where they can plan study sessions, share resources, and schedule interactive video calls for collaborative learning experiences.
              </p>


            </div>



          </div>
        </div>
        <div className=' flex ' style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23d0f4de\' fill-opacity=\'1\' d=\'M0,256L80,224C160,192,320,128,480,128C640,128,800,192,960,197.3C1120,203,1280,149,1360,122.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

          <div className="w-1/2">
            <div className=" rounded-lg  p-12 ml-4 mt-16 mx-auto">
              <h1 className="text-2xl md:text-6xl font-bold ">
                <span className='text-indigo-900 block'>Test Your Confidence</span>
                {/* <span className='text-indigo-800 block  mt-2'>LEARNING </span> */}

              </h1>
              <h2 className="text-2xl text-gray-800 font-bold mt-4"> Master Your Skills with Our Quiz! </h2>
              <p className="text-gray-700 mt-4">
                Take our interactive quiz and test your knowledge! Get detailed analysis on your strengths and weaknesses to identify areas for improvement. Plus, save the questions you struggle with for future reference. It's the perfect way to learn, practice, and track your progress – all in one place!
              </p>


            </div>



          </div>
          <div className="w-1/2  " >

            <img src={quiz} alt="My Image" style={{ borderRadius: '10px', marginLeft: '10px', marginBottom: '70px', height: '500px', width: '500px' }} />
          </div>
        </div>





        <div style={{ position: 'relative', marginLeft: '50px' }}>

          <img src={poster} alt="My Image" style={{ borderRadius: '10px', height: '700px', width: '700px' }} />


          <div style={{
            position: 'absolute',
            top: '400px',
            left: '135px',
            width: '420px',
            height: '220px',
            backgroundColor: 'black',
            zIndex: '1',
            opacity: '0.4'
          }}></div>
        </div>

      </div>




    </>



  )
}

export default Home