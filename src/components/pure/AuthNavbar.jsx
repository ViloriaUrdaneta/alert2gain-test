import React from 'react';

const AuthSection = ({ handleOpenModal }) => {
    return (
        <div className='flex w-full flex-wrap items-center justify-between px-3'>
            <div className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-5'>
                <h3>
                    Alert2Gain
                </h3>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <p className="text-lg">Por favor inicie sesión</p>
            </div>
            <div className='flex md:order-2 mr-5'>
                <button 
                    onClick={handleOpenModal}
                    className='text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}

export default AuthSection;
