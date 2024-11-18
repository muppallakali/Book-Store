import React, { useEffect, useState } from 'react'
import Backbutton from './Backbutton'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
export default function Card() {
    let [bookdata, setBookdata] = useState([])
    let [loading, setLoading] = useState(false)
    let [tableview, setTableview] = useState(false)
    let navigate=useNavigate()
    tableview?navigate("/"):""
    async function handledata() {
        try {
            setLoading(true)
            let res = await fetch("http://localhost:4000/book/getAllBooks")
            if (!res.ok) { throw new Error(res.status) }
            let data = await res.json()
            setBookdata(data.allBooks)
            setLoading(false)
        }
        catch (error) {
            console.error("Error in fetching data: ", error)
            setLoading(false)
        }
    }
    useEffect(() => { handledata(), console.log(bookdata) }, [])
    return (
        <div className="border border-black m-8 bg-red-100">
            <div className='flex justify-between'>
                <div className="caption-top bo font-bold m-5 ">
                    All Books Data
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className={`bg-blue-300 hover:bg-blue-500 cursor-pointer border border-black rounded-md ${tableview ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTableview(true)}>
                        Table View
                    </button>
                    <button className={`bg-blue-300 hover:bg-blue-500 cursor-pointer border border-black rounded-md ${!tableview ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTableview(false)}>
                        Card View
                    </button>
                </div>
                <Link to={`/create`}><IoMdAdd className='text-2xl m-5 text-blue-500 ' /></Link>
            </div>
            <div className="flex flex-col m-5 p-2">
                <div className="flex justify-start items-start mb-10"><Backbutton />
                </div>
                <div className="grid grid-cols-1  md:grid-cols-3 gap-10">
                    {bookdata.map((x,i) => (
                        <div className='flex flex-col border-2 border-black rounded-xl  p-4' key={i}>
                            <div className='my-4 flex flex-wrap'>
                                <span className='text-xl mr-4  text-gray-500'>Book Name:</span>
                                <span className=''>{x.book_Name}</span>
                            </div>
                            <div className='my-4 flex flex-wrap'>
                                <span className='text-xl mr-4 text-gray-500'>Book Author</span>
                                <span>{x.book_author}</span>
                            </div>
                            <div className='my-4 flex flex-wrap'>
                                <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                                <span>{x.publish_year}</span>
                            </div>
                            <div className='flex justify-evenly '>
                                <Link to={`/show/${x._id}`}><MdInfo className='text-2xl gap-2 text-green-500' /></Link>
                                <Link to={`/update/${x._id}`}><MdEdit className='text-2xl gap-2 text-yellow-500' /></Link>
                                <Link to={`/deletebook/${x._id}`}><MdDelete className='text-2xl text-red-500' /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
