import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';

const UserSection = () => {

    const { dispatch, token } = useContext(AuthContext);
    const decodedToken = decodeToken(token);
    const user = decodedToken
    
    const handlelogout = () => {
        dispatch({ type: 'LOGOUT' });
        sessionStorage.removeItem('userToken');
    };

    return (
        <div className='flex w-full flex-wrap items-center justify-between px-3'>
            <div className='self-center text-2xl text-gray-700 font-semibold whitespace-nowrap dark:text-white ml-5'>
                <h3>
                    <Link to={'/'}>
                        Alert2Gain
                    </Link>
                </h3>
            </div>
            <div className="items-center justify-between text-gray-700 hidden w-full md:flex md:w-auto md:order-1">
                <p className="text-lg">Bienvenido {user.name ? user.name : 'Usuario'}</p>
            </div>
            <div className='flex md:order-2 mr-5'>
                <button
                    onClick={handlelogout}
                    className='text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default UserSection;
