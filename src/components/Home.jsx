import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { API_URL } from "./Api"


export default function Home() {
    let [bookdata, setBookdata] = useState([])
    let [loading, setLoading] = useState(false)
    let [tableview, setTableview] = useState(true)
    let navigate = useNavigate()
    !tableview ? navigate("/card") : ""
    async function handledata() {
        try {
            setLoading(true)
            let res = await fetch(`${API_URL}/book/getAllBooks`)
            if (!res.ok) { throw new Error(res.status) }
            let data = await res.json()
            setBookdata(data.allBooks)
        }
        catch (error) {
            console.error("Error in fetching data: ", error)
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => { handledata() }, [])
    return (
        <div className=" m-[30px]  bg-sky-200 h-[90vh] overflow-scroll scrollbar-hide">
            <div className='flex justify-between'>
                <div className="caption-top bo font-bold m-5 ">
                    All Books Data
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                        className={`bg-blue-300 hover:bg-blue-500 cursor-pointer border border-black rounded-md ${tableview ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTableview(true)}
                    >
                        Table View
                    </button>
                    <button
                        className={`bg-blue-300 hover:bg-blue-500 cursor-pointer border border-black rounded-md ${!tableview ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTableview(false)}
                    >
                        Card View
                    </button>
                </div>
                <Link to={`/create`}><IoMdAdd className='text-2xl m-5 text-blue-500 ' /></Link>
            </div>
            {loading ? <Loading /> : (<table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr><td className='border border-slate-400 text-center'>Book Name</td>
                        <td className='border border-slate-400 text-center'>Author Name</td>
                        <td className='border border-slate-400 text-center'>Year of publication</td>
                        <td className='border border-slate-400 text-center'>Operations</td>
                    </tr>
                </thead>
                <tbody>{
                    bookdata.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td className='border border-slate-400 rounded-md text-center'>{x.book_Name}</td>
                                <td className='border border-slate-400 rounded-md text-center'>{x.book_author}</td>
                                <td className='border border-slate-400 rounded-md text-center'>{x.publish_year}</td>
                                <td className='border border-slate-400 rounded-md text-center'>
                                    <div className='flex justify-center '>
                                        <Link to={`/show/${x._id}`}><MdInfo className='text-2xl gap-2 text-green-500 ' /></Link>
                                        <Link to={`/update/${x._id}`}><MdEdit className='text-2xl gap-2 text-yellow-500' /></Link>
                                        <Link to={`/deletebook/${x._id}`}><MdDelete className='text-2xl text-red-500' /></Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>)}
        </div>
    )
}
