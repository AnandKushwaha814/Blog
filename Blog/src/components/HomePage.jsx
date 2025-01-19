import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');


    // Featching data from API calls.
    const fetchData = async () => {
        try {
            const response = await axios.get('https://dummyapi.online/api/blogposts')
            setBlogs(response.data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    // search by id
    const isNumeric = (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str));
    };

    //Filter blogs based on content or title 
    const filteredBlogs = blogs.filter(blog => {
        if (isNumeric(search)) {
            return blog.id.toString() === search // Search by id
        }
        else {

            return blog.content.toLowerCase().includes(search.toLowerCase()) ||
                (blog.title && blog.title.toLowerCase().includes(search.toLowerCase()))
        }
    });
    // its show loading indicator if data is not loaded.
    if (!blogs) return <h1 className='p-4 m-5 text-red-600 font-bold text-5xl text-center'>Loading...</h1>
    return (
        <>
            <h1 className='flex items-center justify-center font-bold text-center p-5 text-[50px]'>Blog Post</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center p-4 overflow-hidden bg-slate-300 rounded-lg">
                {/* For Searching  */}
                <input className='p-4 col-span-2 mt-2 md:mt-0 border-solid border-2 border-rose-500 hover:border-slate-400 cursor-pointer rounded ' type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search by content, title, or ID...' />
                <div className="p-4 bg-slate-500 items-center rounded mt-2 md:mt-0 ml-[10px] text-white cursor-pointer hover:bg-green-400">
                    <FaSearch size={25} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 content-center m-3">
                {
                    // Any missing search then show this like undefined data title, content, id
                    filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => (
                            <div key={blog.id}>
                                <div className="text-center h-[270px] rounded-lg p-4 bg-slate-800">
                                    <Link to={`/blogposts/${blog.id}`}>
                                        <div className="flex justify-evenly text-yellow-300 font-bold">
                                            <h3 className='items-center justify-center flex text-red-500 font-bold bg-green-400 h-5 w-5 rounded-[50%]'>{blog.id}</h3>
                                            <h3>{blog.title}</h3>
                                        </div>
                                        <p className="text-wrap overflow-hidden text-justify text-ellipsis p-3 break-words text-sm text-white font-bold">
                                            {blog.content}
                                        </p>
                                        <div className="flex justify-between text-blue-600 font-bold">
                                            <h2>{blog.author}</h2>
                                            <h3>{blog.date_published}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Any missing search then show this like undefined data title, content, id
                        <h1 className='p-4 m-5 text-red-600 font-bold text-5xl text-center'>No blog post found.</h1>
                    )
                }
            </div>

        </>
    );
};
export default HomePage
