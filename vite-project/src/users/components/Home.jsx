import React from 'react'
import { Button } from 'flowbite-react';
import { Flowbite } from 'flowbite-react'
import CoursesList from './CoursesList';
import AudioRecorder from './AudioRecorder';
import { useState } from 'react';
import Loader from '../../General/loader';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
   
      
      <CoursesList setIsLoading={setIsLoading} isLoading={isLoading}/>
 
      
      
   
  
    </>
   
  
    
  )
}

export default Home