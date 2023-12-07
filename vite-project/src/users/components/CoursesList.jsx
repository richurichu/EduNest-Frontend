
import React from 'react'
import useApi from '../../Axios_instance/axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import Skeleton from 'react-loading-skeleton';





function CoursesList() {
    const [isLoading, setIsLoading] = useState(true);

    const api = useApi()

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        async function fetchCourses() {
            try {
                const response = await api.get('courses-about/courses');
                setCourses(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching courses:", error);
                setIsLoading(false)
            }
        }

        fetchCourses();

    }, []);

    return (
        <div className="container mx-auto  mt-12 px-4">
            <h1 className="text-3xl font-bold mb-4 mr-8">Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
                
                Array(8).fill().map((_, idx) => (
                    <div key={idx} className="p-10 bg-gray-300 rounded">
                        <Skeleton height={250} />
                        <Skeleton className="mt-32"/>
                        <Skeleton className="mt-32"/>
                    </div>
                ))
            ) : (
                courses.map(course => (
                    course.image &&
                    (<div key={course.id} className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300  p-4 rounded shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <img 
                            src={course.image} 
                            alt={course.name} 
                            className="w-full h-40 object-cover rounded-t"
                        />
                        <Link to={`/chapters/${course.id}`} className="block mt-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                                {course.name}
                            </h5>
                            <h5 className="text-lg font-medium text-gray-600 mt-2">
                                {course.teacher.username}
                            </h5>
                        </Link>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-900">
                                ${course.price}
                            </span>
                            <Link 
                            to={`/chapters/${course.id}`}
                            className="text-white bg-cyan-700 px-4 py-2 rounded hover:bg-cyan-800 focus:outline-none inline-block"
                        >
                                Watch Now
                            </Link>
                        </div>
                    </div>
                    )
                    
                )))}
                
            </div>
            
        </div>
    );
    
}

export default CoursesList;

  