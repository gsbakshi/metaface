import React from 'react';

function FaceRecognition({ imageUrl }) {
    return (
        <div className='tc'>
            <img scr={ imageUrl } alt='face detect' />
        </div>
    );
}

export default FaceRecognition;