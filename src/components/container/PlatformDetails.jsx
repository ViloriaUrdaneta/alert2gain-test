import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../customHooks/useAxiosFetch.js';
import Sensor from '../pure/Sensor';

const PlatformDetails = () => {

    const [showReport, setShowReport] = useState(false);
    const [s3Content, setS3Content] = useState('');

    const { id } = useParams();
    const { data: platformsDetails, isLoading: platformsLoading, hasError: platformsError } = useFetch(
        `${process.env.REACT_APP_BACKEND_URL}/Platforms/${id}`
    );
    
    const handleLastReport = () => {
        fetch(platformsDetails?.data?.lastReport)
            .then(response => response.text())
            .then(content => setS3Content(content))
            .catch(error => console.error(error));
        setShowReport(!showReport);
    }

    if (platformsLoading) {
        return <div className="text-center">Cargando...</div>;
    }
    if (platformsError) {
        return <div className="text-center">Error: {platformsError.message}</div>;
    }

    return (
        <div className='pt-8'>
            <h2 className="text-5xl font-medium leading-tight pt-20 text-center text-gray-700">Detalles de {platformsDetails?.data?.name}</h2> 
            <div className="grid grid-cols-3 ml-20 mt-10">
                <div className='ml-20'>
                    <img
                        src={platformsDetails?.data?.img}
                        className="h-auto max-w-full rounded-lg shadow-lg dark:shadow-black/30 justify-center mt-10 "
                        alt="..."     
                    />
                    <button
                        type="button"
                        class="inline-block rounded bg-primary mt-10 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={handleLastReport}
                    >
                        {showReport ? "Ocultar Reporte" : "Mostrar Reporte"}
                    </button>
                </div>
                <div className= 'mt-10  text-gray-700'>
                    <h3 className=' text-2xl font-medium'>Sensores de la {platformsDetails?.data?.fleet}: </h3>
                    <ul class="w-96 ">
                            {platformsDetails?.data?.sensors.map((sensor) => (
                                <Sensor key={sensor.id} sensor={sensor} />
                            ))}
                    </ul>
                </div>
            <div>
                {showReport && (
                    <div className="mt-4  text-gray-700">
                        <div>
                            <h2>Contenido de la URL de S3:</h2>
                            <div dangerouslySetInnerHTML={{ __html: s3Content }} />
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}

export default PlatformDetails;

