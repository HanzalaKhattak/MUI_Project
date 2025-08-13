import React from 'react';
import Toolkit from './Toolkit';

const Layout = ({children}) => (
  <>
    <Toolkit/>
    <main>
      {children}
    </main>
  </>
);

export default Layout;