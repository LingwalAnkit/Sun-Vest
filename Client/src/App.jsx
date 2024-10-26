// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Components/Dashboard';
import Projects from './Components/Project';
import PrivateRoute from './Components/PrivateRoute';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from "./Components/Home"
import Managment from "./Components/Managment"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/chart" element={< Charts />} /> */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/managment" 
            element={
              <PrivateRoute>
                <Managment/>
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;