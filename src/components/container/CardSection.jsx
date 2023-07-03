import React, { useState } from 'react';
import { useFetch } from '../../customHooks/useAxiosFetch.js';
import PlatformCard from '../pure/PlatformCard.jsx';

const CardSection = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [fleet, setFleet] = useState('ALL');

    const { data: platformsData, isLoading: platformsLoading, hasError: platformsError } = useFetch(
        `${process.env.REACT_APP_BACKEND_URL}/Platforms?pageNumber=${pageNumber}&pageSize=${pageSize}&fleet=${fleet}`
    );
    
    const platforms = platformsData?.data
    const totalPages = platformsData?.totalPages;
    const totalRecords = platformsData?.totalRecords;

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setPageNumber(1);
    };

    const handleFleetChange = (e) => {
        setFleet(encodeURIComponent(e.target.value));
        setPageNumber(1);
    };

    if (platformsLoading) {
        return <div className="text-center">Cargando...</div>;
    }
    if (platformsError) {
        return <div className="text-center">Error: {platformsError.message}</div>;
    }

    return (
        <div>
            <h2 class="text-5xl font-medium leading-tight pt-20 text-center text-gray-700">Listado de plataformas</h2>
            <div className="flex justify-center mt-2 mb-7  text-gray-700">
                <span>
                    Número de plataformas: {totalRecords}
                </span>
            </div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-5 gap-4">
                    {platforms?.map((platform) => (
                        <PlatformCard key={platform.id} platform={platform} />
                    ))}
                </div>
            </div>
            <div className='bg-secondary pb-10 mt-10'>
            <div className='flex flex-row justify-end pt-5 mr-10 xs:mt-0 '>
                <div className="flex mt-4 text-gray-700 mr-5">
                    <span className="mr-2">Entradas por página:</span>
                    <select
                        className="border border-gray-700 rounded px-3 py-1 text-gray-700"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex justify-center mt-4 text-gray-700 mr-10">
                    <span className="mr-2">Número de flota: </span>
                    <select
                        className="border border-gray-700 rounded px-3 py-1 text-gray-700"
                        onChange={handleFleetChange}
                    >
                        <option value={"ALL"}>all</option>
                        <option value={'Flota 1'}>1</option>
                        <option value={'Flota 2'}>2</option>
                        <option value={'Flota 3'}>3</option>
                        <option value={'Flota 4'}>4</option>
                        <option value={'Flota 5'}>5</option>
                        <option value={'Flota 6'}>6</option>
                        <option value={'Flota 7'}>7</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
                <span className="mx-4 text-gray-700">
                    Página {pageNumber} de {totalPages}
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    <button 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber === 1}
                    >
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                        Prev
                    </button>
                    <button 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber === totalPages}
                    >
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CardSection;
