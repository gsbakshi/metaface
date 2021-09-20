import React from 'react';

import './face-recognition-display.styles.scss';

const FaceRecognitionDisplay = ({ imageUrl }) => {
    return (
        <div className='tc'>
            <img scr={ imageUrl } alt='face detect' />
        </div>
    );
}

export default FaceRecognitionDisplay;