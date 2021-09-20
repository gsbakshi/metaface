import React from 'react';

import './content-container.styles.scss';

import InputImageUrl from '../../components/input-image-url/input-image-url.component';
import FaceDetectionDisplay from '../../components/face-detection-display/face-detection-display.component';
import RankCounter from '../../components/rank-counter/rank-counter.component';

const ContentContainer = () => (
    <div className='content-container'>
        <div className='content'>
            <div className='content-data'>
                <RankCounter />
                <InputImageUrl />
            </div>
            <FaceDetectionDisplay />
        </div>
    </div>
);

export default ContentContainer;