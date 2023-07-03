import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import CardSection from './CardSection';

const Home = () => {

    const { token } = useContext(AuthContext);

    return (
        <div>         
            {token ? (
                <div className='pt-8'>
                    <CardSection/>
                </div>
            ) : (
                <div className="h-screen flex items-center justify-center">
                    <img src="/background.jpg" alt="Background" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
    );
}

export default Home;

