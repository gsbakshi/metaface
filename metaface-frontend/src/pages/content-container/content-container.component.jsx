import React from 'react';

import './content-container.styles.scss';

import InputImageUrl from '../../components/input-image-url/input-image-url.component';
import FaceRecoginitionDisplay from '../../components/face-recognition-display/face-recognition-display.component';

const ContentContainer = () => (
    <div className='content-container'>
        <div className='content'>
            <InputImageUrl />
            <FaceRecoginitionDisplay />
        </div>
    </div>
);

export default ContentContainer;