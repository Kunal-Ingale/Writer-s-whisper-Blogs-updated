import Topbar from './components/topBar/Topbar'
import Home from './Pages/Home/Home'
import './Pages/Home/home.css'
import SinglePost from './components/SinglePost/SinglePost'
//import SideBar from './Pages/Sidebar/SideBar'
import Write from './Pages/Write/Write'
import Setting from './Pages/Settings/Setting'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useContext } from 'react'
import { Context } from './Context/Context'
import About from './Pages/About/About'

function App() {
 const {user} = useContext(Context)

  return (
    <>
     <BrowserRouter>
     <Topbar/>
     
     <Routes>
       <Route path="/" element= {<Home/>} />
       <Route path="/register" element={user ? <Home/> : <Register />}/> 
       <Route path = "/login" element= {user ? <Home/> : <Login/>} />
       <Route path = "/setting" element= {user ?<Setting/> : <Register/>} />
       <Route path = "/write" element= {user ? <Write/> : <Register/>} /> 
       <Route path = "/post/:postId" element= {<SinglePost/>} />
       <Route path = "/about" element= {<About/>} />

     </Routes>
     
     </BrowserRouter>    
    </>
  )
}

export default App
