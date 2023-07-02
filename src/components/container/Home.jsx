import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import CardSection from './CardSection';
import Navbar from './Navbar';

const Home = () => {

    const { token } = useContext(AuthContext);

    return (
        <div>
            <Navbar/>
            {token && (
                <div className='py-8'>
                    <CardSection/>
                </div>
            )}
        </div>
    );
}

export default Home;

