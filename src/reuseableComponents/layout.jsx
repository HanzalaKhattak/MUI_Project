import React from 'react';
import Toolkit from './Toolkit';
import Footer from './Footer';

const Layout = ({children}) => (
  <>
    <Toolkit/>
    <main>
      {children}
    </main>
    <Footer/>
  </>
);

export default Layout;