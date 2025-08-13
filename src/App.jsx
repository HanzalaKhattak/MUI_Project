import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './reuseableComponents/layout';
import Home from './Home/Home';


const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App