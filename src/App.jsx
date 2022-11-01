import React from "react";
import { HomePage,Post,Login, Dashboard,Comment } from "./Pages";
import {Navbar,Signup} from './Components'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <ToastContainer/>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/post" element={<Post />} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/profile" element={<Dashboard/>}/>
          <Route path="/comment/:id" element={<Comment/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
