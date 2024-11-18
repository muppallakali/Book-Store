import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Backbutton from './Backbutton'
import { useParams } from 'react-router-dom'


export default function ShowBook() {
    let [loading,setLoading]=useState(true)
    let [bookdata,setBookdata]=useState([])
    let {id}=useParams()

    async function getdata(){ 
       try{
        setLoading(true)       
        let res=await fetch(`http://localhost:4000/book/getsinglebook/${id}`)
        let data=await res.json()
        setBookdata(data.singlebook)
       }
       catch(error){
        console.log(error)
       }
       finally{  
        setLoading(false)}
    }

   useEffect(()=>{getdata()},[])
    
   
  return (
    <div >
        <Backbutton/>
        <h1 className='text-3xl my-2'>Book Info</h1>
        {loading?<Loading/>:(
            <div className='flex flex-col border-2 border-red rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Id</span>
                    <span>{bookdata._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Book Name</span>
                    <span>{bookdata.book_Name}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Book Author</span>
                    <span>{bookdata.book_author}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                    <span>{bookdata.publish_year}</span>
                </div>                
            </div>
        )}
    </div>
  )
}
