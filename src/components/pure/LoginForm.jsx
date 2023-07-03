import React, { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { decodeToken } from 'react-jwt';
import { AuthContext } from '../../context/authContext';
import { ImWarning } from 'react-icons/im';

const LoginForm = ({ setOpenModal }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [respAuth, setRespAuth] = useState(false);
    const [messageAuth, setMessageAuth] = useState('');
    const { dispatch } = useContext(AuthContext);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleDecodeToken = (token) => {
        const decodedToken = decodeToken(token);
        dispatch({ type: 'DATAUSER', payload: decodedToken });
    };

    const handleLogin = (token) => {
        dispatch({ type: 'LOGIN', payload: token });
    };

    const initialCredentials = {
        email: '',
        password: '',
    };

    const credentialsSchema = Yup.object().shape({
        email: Yup.string()
            .email('Formato de correo inválido')
            .required('Campo obligatorio'),
        password: Yup.string().required('Campo obligatorio'),
    });

    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={credentialsSchema}
                onSubmit={async (values) => {
                    const url = process.env.REACT_APP_BACKEND_URL + '/Auth';
                    await axios
                        .post(url, values)
                        .then((res) => {
                            const { token } = res.data;
                            sessionStorage.setItem('userToken', token);
                            handleLogin(token);
                            handleDecodeToken(token);
                            setTimeout(() => {
                                setOpenModal(false);
                            }, 500);
                        })
                        .catch((err) => {
                            setRespAuth(true);
                            setMessageAuth(err.response.data.message);
                        });
                }}
            >
                {({ touched, errors }) => (
                    <Form className='flex flex-col mt-4'>
                        <div className='h-[4.5rem]'>
                            <Field
                                id='email'
                                name='email'
                                type='text'
                                placeholder='Correo Electrónico'
                                className='w-80 h-10 px-4 rounded-md border border-gray-300'
                            />
                            {errors.password && touched.password && (
                                <span className='flex items-center gap-1 text-error italic text-sm'>
                                    <ImWarning />
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className='h-[4.5rem]'>
                            <Field
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Contraseña'
                                className='w-80 h-10 px-4 rounded-md border border-gray-300 mb-1'
                            />
                            {errors.password && touched.password && (
                                <span className='flex items-center gap-1 text-error italic text-sm'>
                                    <ImWarning />
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className='flex items-center mb-4'>
                            <input
                                onClick={handleShowPassword}
                                id='default-checkbox'
                                type='checkbox'
                                value=''
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                            <label
                                htmlFor='default-checkbox'
                                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-900'
                            >
                                Mostrar contraseña
                            </label>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='w-80 h-10 bg-primary text-white rounded-md hover:opacity-80'
                            >
                                Iniciar Sesión
                            </button>
                            {respAuth && <div className='static mt-2 mb-5'>{messageAuth}</div>}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;
