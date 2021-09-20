import React from 'react';

import './face-detection-display.styles.scss';

const FaceDetectionDisplay = ({ imageUrl }) => (
    <div className='face-detection-container'>
        <img
            className='input-image'
            alt='Detect Faces'
            src={ imageUrl }
        />
    </div>
);


export default FaceDetectionDisplay;