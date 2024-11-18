import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';


export default function Backbutton({destination="/"}) {
     return (
    <div className='flex'>
                <Link to={destination} className='bg-purple-50'><IoMdArrowRoundBack className='text-2xl'></IoMdArrowRoundBack></Link>
            </div>
  )
}
