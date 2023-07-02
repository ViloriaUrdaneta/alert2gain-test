import React, { useState } from 'react';
import Navbar from './Navbar';
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
    console.log(platformsDetails)
    
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
        <div>
            <Navbar/>
            <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
                <img className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={platformsDetails?.data?.img}
                    alt={platformsDetails?.data?.name}/>
                <div className="flex flex-col justify-start p-6">
                    <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                        {platformsDetails?.data?.name}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        {platformsDetails?.data?.fleet}
                    </p>
                    <button
                        type="button"
                        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={handleLastReport}
                    >
                        {showReport ? "Ocultar Reporte" : "Mostrar Reporte"}
                    </button>
                </div>
            </div>
            <div>
                {showReport && (
                    <div className="mt-4">
                        <div>
                            <h2>Contenido de la URL de S3:</h2>
                            <div dangerouslySetInnerHTML={{ __html: s3Content }} />
                        </div>
                    </div>
                )}
            </div>
            <ul class="w-96">
                {platformsDetails?.data?.sensors.map((sensor) => (
                    <Sensor key={sensor.id} sensor={sensor} />
                ))}
            </ul>
        </div>
    );
}

export default PlatformDetails;
