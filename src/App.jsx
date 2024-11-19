import React from 'react'
import{Route,Routes} from "react-router-dom"
import Home from "../src/components/Home"
import Deletebook from './components/Deletebook'
import CreateBook from './components/CreateBook'
import Updatebook from './components/Updatebook'
import ShowBook from './components/ShowBook'
import Card from './components/Cards'

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateBook/>}/>
      <Route path="/show/:id" element={<ShowBook/>}/>
      <Route path="/update/:id" element={<Updatebook/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/deletebook/:id" element={<Deletebook/>}/>
      <Route path='/card' element={<Card/>}></Route>
    </Routes>
  )
}
