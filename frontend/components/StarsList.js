import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function StarsList() {
  const navigate = useNavigate()
  const [stars, setStars] = useState([])
  const Logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const token=localStorage.getItem('token')
    if (!token) {
      Logout()
    } else {
      const fetchStars=async()=>{
        try{
          const response=await axios.get('/api/stars',{headers:{Authorization:token}})
          setStars(response.data)
        }
        catch(error){
          if (error?.response?.status === 401) {
            Logout()
          }
          }
        }
        fetchStars()
      }
      }, [])
       
  return (
    <div className="container">
      <h3>StarsList <button onClick={Logout}>Logout</button></h3>
      {stars.length > 0 ? (
        <div>
          {stars.map((star) => (
            <div key={star.id} style={{ marginBottom: '20px' }} className="star">
              <h4>{star.fullName}</h4>
              <p>Born: {star.born}</p>
              <p>{star.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stars found.</p>
      )}
    </div>
  )
}
