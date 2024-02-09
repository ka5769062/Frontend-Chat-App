import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png"
import {Link} from "react-router-dom"

let user;

const Join = () => {

  const sendUser = () =>{

    user = document.getElementById('joinInput').value
    document.getElementById('joinInput').value = ""
  }

    const [name,setName] = useState('')

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt='' />
        <h1>Chit Chat</h1>
        <input placeholder="Enter Your Name" onChange={(e)=> setName(e.target.value)} type='text' id='joinInput'/>
       <Link onClick={(e)=> !name ?e.preventDefault():null} to="/chat"><button className='joinbtn' onClick={sendUser}> Join</button></Link>
      </div>
    </div>
  )
}

export default Join;
export {user}
