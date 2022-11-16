
import React from 'react';

export default function Spinner() {
    return (
        <div className={'w-100 d-flex justify-content-center align-items-center'}>
            <div className="spinner-border" role="status" style={{ width: '1rem', height: '1rem', 'zIndex': ' 20' }}></div>
        </div>
    );
}


