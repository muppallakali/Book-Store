import React, { useState } from 'react'
import Loading from './Loading'
import Backbutton from './Backbutton'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { API_URL } from "./Api"

export default function CreateBook() {
    let [loading, setLoading] = useState(false)
    let [book_Name, setbookname] = useState("")
    let [book_author, setbookAuthor] = useState("")
    let [publish_year, setbookPublished] = useState()
    let navigate = useNavigate()
    let { enqueueSnackbar } = useSnackbar()


    let handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let res = await fetch(`${API_URL}/book/Addbook`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book_Name, book_author, publish_year })
            })
            if (res.ok) {
                let data = await res.json()
                console.log(data)
            }
            console.log(res.status)
            setbookAuthor("")
            setbookPublished(0)
            setbookname("")
            navigate("/")
            enqueueSnackbar("Book created Successfully", { variant: "success" })
        }
        catch (error) {
            console.log(error)
            enqueueSnackbar("Something is wrong Book Adding Unsuccessfull", { variant: "error" })
            enqueueSnackbar("something went wrong", { variant: "error" })
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className='w-5/5 p-8 m-16 border border-separate border-black bg-yellow-100'  >
            <div>{<Backbutton />}</div>
            {loading && <Loading />}
            <form onSubmit={handlesubmit} className=" space-y-4 w-4/5 mx-auto flex flex-col justify-center items-center">
                <label className="block text-gray-700 font-medium">Book Name</label>
                <input required type="text" value={book_Name} onChange={(e) => setbookname(e.target.value)} className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5 px-3 py-2 border border-gray-300 rounded-lg" />
                <label className='block text-gray-700 font-medium'>Book Author</label>
                <input required type="text" value={book_author} onChange={(e) => setbookAuthor(e.target.value)} className='w-full sm:w-2/5 md:w-1/3 lg:w-2/5 px-3 py-2 border border-gray-300 rounded-lg' />
                <label htmlFor="" className='block text-gray-700 font-medium'>Book Published</label>
                <input required type="number" value={publish_year} onChange={(e) => setbookPublished(e.target.value)} className='w-full sm:w-2/5 md:w-1/3 lg:w-2/5 px-3 py-2 border border-gray-300 rounded-lg' />
                <input type="submit" className='block px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-100' />
            </form>
        </div>
    )
}
