import React from 'react';

import './face-detection-display.styles.scss';

const FaceDetectionDisplay = ({ imageUrl, boxes }) => (
    <div className='face-detection-container'>
        <div className='input-image'>
            { imageUrl && (
                <img
                    id='inputimage'
                    alt='Detect Faces'
                    src={ imageUrl }
                />
            ) }
            { boxes.map(box =>
                <div key={ `box${box.topRow}${box.rightCol}` }
                    className='bounding-box'
                    style={ { top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol } }>
                </div>
            ) }
        </div>
    </div>
);

export default FaceDetectionDisplay;