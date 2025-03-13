import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './Admin.css';
const CourseManagement = () => {
    // Dummy data for courses
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "AI for Beginners",
            description: "An introduction to Artificial Intelligence and its applications.",
            price: "$50"
        },
        {
            id: 2,
            title: "Advanced JavaScript",
            description: "Learn advanced JavaScript techniques for building modern web applications.",
            price: "$75"
        },
        {
            id: 3,
            title: "Data Science with Python",
            description: "A comprehensive course covering data analysis, visualization, and machine learning with Python.",
            price: "$120"
        },
        {
            id: 4,
            title: "Digital Marketing Essentials",
            description: "Learn the fundamentals of digital marketing including SEO, social media, and email marketing.",
            price: "$60"
        }
    ]);

    // Add new course
    const handleAddCourse = () => {
        const newCourse = {
            id: courses.length + 1,
            title: "New Course",
            description: "Course description",
            price: "$100"
        };
        setCourses([...courses, newCourse]);
    };

    // Edit course
    const handleEditCourse = (id) => {
        const updatedCourses = courses.map(course =>
            course.id === id ? { ...course, title: "Updated Course", price: "$150" } : course
        );
        setCourses(updatedCourses);
    };

    // Delete course
    const handleDeleteCourse = (id) => {
        const updatedCourses = courses.filter(course => course.id !== id);
        setCourses(updatedCourses);
    };

    return (
        <div className="bg-black text-gray-100 min-h-screen p-6 custom-scrollbar1">
            <Toaster />
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold mb-6 text-neutral-200">Course Management</h2>

                {/* Add Course Button */}
                <button
                    onClick={handleAddCourse}
                    className="px-4 py-2 mb-6 jus text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                    Add Course
                </button>
            </div>

            {/* Courses Table */}
            <div className="bg-[#101010] rounded-lg p-6 shadow-2xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#101010]">
                            {['ID', 'Course Title', 'Description', 'Pricing', 'Update', 'Delete'].map((header) => (
                                <th key={header} className="border border-[#212121] p-3 text-left text-gray-300">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-[#212121] transition-colors">
                                <td className="border border-[#212121] p-3">{course.id}</td>
                                <td className="border border-[#212121] p-3">{course.title}</td>
                                <td className="border border-[#212121] p-3">{course.description}</td>
                                <td className="border border-[#212121] p-3">{course.price}</td>

                                {/* Edit Button */}
                                <td className="border border-[#212121] p-3">
                                    <button
                                        onClick={() => handleEditCourse(course.id)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                                    >
                                        Update
                                    </button>
                                </td>

                                {/* Delete Button */}
                                <td className="border border-[#212121] p-3">
                                    <button
                                        onClick={() => handleDeleteCourse(course.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseManagement;
