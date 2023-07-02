import React, { useContext } from 'react';
import { Route, Routes  } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthContext } from '../context/authContext';
import Home from '../components/container/Home';
import PlatformDetails from '../components/container/PlatformDetails';
import ProtectedRoutes from './ProtectedRoute';


const RoutesApp = () => {

    const { token } = useContext(AuthContext);

    return (
        <div>
            <Suspense>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route 
                        path='/platform/:id' 
                        element={
                            <ProtectedRoutes isAutenticated={token}>
                                <PlatformDetails/>
                            </ProtectedRoutes>
                        }
                    />
                </Routes>
            </Suspense>
        </div>
    )
}

export default RoutesApp;
