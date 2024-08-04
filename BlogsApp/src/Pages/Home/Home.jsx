
import Header from '../../components/Header/Header'

import Posts from '../../Pages/Posts/Posts'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Home() {
  const [posts,setPosts] = useState([])

  const {search} = useLocation()
  

  useEffect( ()=>{
    const fetchData = async () => {
    try {
      const res = await axios.get('/api/posts'+ search); 
       //http://localhost:5173/?username=karan
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
   fetchData()
  },[search])
  
  
  return (
    <>
    <Header/>
    <div className='home'>
    <Posts posts ={posts}/>
   
    </div>
    </>
  )
}

export default Home




