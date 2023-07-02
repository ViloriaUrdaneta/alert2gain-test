import React from 'react';

const AuthSection = ({ handleOpenModal }) => {
    return (
        <>
            AuthSection
            <li className='w-40 h-2'>
                <button 
                    className='md:block border-solid border-zinc-100 border py-1 px-1 rounded-md  hover:opacity-80'
                    onClick={handleOpenModal}>
                    Iniciar Sesión
                </button>
            </li>
        </>
    );
}

export default AuthSection;
