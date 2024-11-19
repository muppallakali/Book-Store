import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Backbutton from './Backbutton'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { API_URL } from "./Api"

export default function Deletebook() {
  let { id } = useParams()
  let navigate = useNavigate()
  let { enqueueSnackbar } = useSnackbar()
  async function handledelete() {
    try {
      let res = await fetch(`${API_URL}/book/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      console.log(res)
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        navigate("/")
        enqueueSnackbar("Book has been Deleted", { variant: "success" })
      } else {
        console.log(error.statusText)
      }
    }
    catch (error) {
      console.log(error)
      enqueueSnackbar("There was some problem in deleting the Book", { variant: "error" })
    }
  }

  return (

    <div className="border border-black rounded-md m-4 relative">
      <Backbutton className="absolute top-4 left-4" />
      <h1 className="text-center text-lg font-extrabold m-7">Are You sure Do you want to delete Book?</h1>
      <div className="flex items-center justify-center">
        <button onClick={handledelete} className="bg-red-300 w-28 m-7 border border-black rounded-lg cursor-pointer hover:bg-red-600">Delete</button>
      </div>

    </div>
  )
}
