import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { decodeToken } from 'react-jwt';

const UserSection = () => {

    const { dispatch, token } = useContext(AuthContext);
    const decodedToken = decodeToken(token);
    const user = decodedToken
    
    const handlelogout = () => {
        dispatch({ type: 'LOGOUT' });
        sessionStorage.removeItem('userToken');
    };

    return (
        <div>
            <li>
                <p className="">Bienvenido {user.name ? user.name : 'Usuario'}</p>
            </li>
            <li>
                <button
                    onClick={handlelogout}
                    className="md:block border-solid border-zinc-100 border py-1 px-1 rounded-md  hover:opacity-80"
                >
                    Cerrar Sesión
                </button>
            </li>
        </div>
    );
}

export default UserSection;
