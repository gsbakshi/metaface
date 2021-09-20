import React from 'react';

import './content-container.styles.scss';

import InputImageUrl from '../../components/input-image-url/input-image-url.component';
import FaceRecoginitionDisplay from '../../components/face-recognition-display/face-recognition-display.component';

const ContentContainer = () => (
    <div className='content-container'>
        { 'Bot training to detect human faces in your static media' }
        <InputImageUrl />
        <FaceRecoginitionDisplay />
    </div>
);

export default ContentContainer;