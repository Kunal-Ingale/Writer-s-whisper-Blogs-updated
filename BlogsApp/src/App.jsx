import Topbar from './components/topBar/Topbar';
import Home from './Pages/Home/Home';
import './Pages/Home/home.css';
import SinglePost from './components/SinglePost/SinglePost';
import Write from './Pages/Write/Write';
import Setting from './Pages/Settings/Setting';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './Context/Context';
import About from './Pages/About/About';

function App() {
  const { user } = useContext(Context);
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/setting" element={isAuthenticated ? <Setting /> : <Navigate to="/login" />} />
          <Route path="/write" element={isAuthenticated ? <Write /> : <Navigate to="/login" />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
