import React, { useState,useEffect } from 'react'
import Backbutton from './Backbutton'
import { useNavigate, useParams } from 'react-router-dom'
import {useSnackbar} from "notistack"
import Loading from './Loading'

export default function Updatebook() {
    let [loading, setLoading] = useState(false)
    let [book_Name, setbookname] = useState("")
    let [book_author, setbookAuthor] = useState("")
    let [publish_year, setbookPublished] = useState()
    let { id } = useParams()
    let navigate=useNavigate()
    let{enqueueSnackbar}=useSnackbar()
    useEffect(() => {
        const getdata = async () => {
            try {
                setLoading(true)
                let res = await fetch(`http://localhost:4000/book/getsinglebook/${id}`);
                let data = await res.json();
                setbookname(data.singlebook.book_Name);
                setbookAuthor(data.singlebook.book_author);
                setbookPublished(data.singlebook.publish_year);
            } catch (error) {
                console.error(error);
            }
            finally{
                setLoading(false)
            }
        };

        getdata();
    }, [id]);

    let handlesubmit = async (e) => {
        e.preventDefault()
        // setLoading(true)
        try {          
            setLoading(true)
            let res = await fetch(`http://localhost:4000/book/updatebook/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book_Name, book_author, publish_year })
            })
            if (res.ok) {
                let data = await res.json()
                console.log(data)
            }
            setbookAuthor("")
            setbookPublished(0)
            setbookname("")
            navigate("/")
            enqueueSnackbar("Book Updated",{variant:"success"})
        }
        catch (error) {
            console.log(error)
            enqueueSnackbar("something went wrong",{variant:"error"})
        }
        finally{
            setLoading(false)
        }

    }

    return (
        <div className='w-5/5 p-8 m-16 border border-separate border-black bg-yellow-100'  >
            <div>{<Backbutton />}</div>
            {loading && <Loading />}
            <form onSubmit={handlesubmit} className=" space-y-4 w-4/5 mx-auto flex flex-col justify-center items-center">
                <label className="block text-gray-700 font-medium">Book Name</label>
                <input required type="text" value={book_Name} onChange={(e) => setbookname(e.target.value)} className="w-full sm:w-2/5 md:w-2/4 lg:w-2/5 px-3 py-2 border border-gray-300 rounded-lg" />
                <label className='block text-gray-700 font-medium'>Book Author</label>
                <input required type="text" value={book_author} onChange={(e) => setbookAuthor(e.target.value)} className='w-full sm:w-2/5 md:w-2/4 lg:w-2/5 px-3 py-2 border border-gray-300 rounded-lg' />
                <label htmlFor="" className='block text-gray-700 font-medium'>Book Published</label>
                <input required type="number" value={publish_year} onChange={(e) => setbookPublished(e.target.value)} className='w-full sm:w-2/5 md:w-2/4 lg:w-2/5 px-3 py-2 border border-gray-300 rounded-lg' />
                <input type="submit" className='block px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-100' />
            </form>
        </div>
    )
}