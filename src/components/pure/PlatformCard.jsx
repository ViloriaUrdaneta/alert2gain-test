import React from 'react';
import { Link } from 'react-router-dom';

const PlatformCard = ({ platform }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg ">
            <img className="w-full" src={platform.img} alt={platform.name} />
            <div className='px-6 py-4'>
                <div class="font-bold text-xl mb-2 text-gray-500">{platform.name}</div>
                <p className="text-gray-700 text-base">{platform.fleet}</p>
                <button  className="mt-4 bg-primary hover:bg-blue-700 text-white py-1 px-4 rounded">
                    <Link to={`/platform/${platform.id}`}>
                        Detalles
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default PlatformCard;
