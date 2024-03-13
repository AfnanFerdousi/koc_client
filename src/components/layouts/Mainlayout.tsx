import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


const Mainlayout: React.FC<any> = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Mainlayout;