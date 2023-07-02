import React from 'react';

const Sensor = ({ sensor }) => {
    return (
        <div>
            <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                <h3>{sensor.name}</h3>
                <p>{sensor.type}</p>
            </li>
        </div>
    );
}

export default Sensor;
