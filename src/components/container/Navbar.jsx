import React, { useState, useContext } from 'react';
import UserNavbar from '../pure/UserNavbar';
import AuthNavbar from '../pure/AuthNavbar';
import LoginModal from './modals/LoginModal';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {

    const [openModal, setOpenModal] = useState(false);
    const { token } = useContext(AuthContext);

    document.body.style.overflow = `${openModal ? 'hidden' : 'visible'}`;

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <nav className='flex items-center h-20 text-white justify-between px-2 py-3 bg-[#2738F5]'>
                    <ul className=' md:flex gap-4'>
                    {token ? (
                        <UserNavbar />
                    ) : (
                        <>
                            <AuthNavbar
                                handleOpenModal={handleOpenModal}
                            />
                            
                        </>
                    )}
                    {openModal && (
                        <LoginModal
                        handleCloseModal={handleCloseModal}
                        setOpenModal={setOpenModal}
                        />
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
