import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Join/>} />
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

// Add your Chat component or any other components you want to render for specific routes

export default App;
