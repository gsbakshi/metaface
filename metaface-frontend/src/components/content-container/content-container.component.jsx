import React, { useState } from 'react';

import './content-container.styles.scss';

import ContentData from '../content-data/content-data.component';
import FaceDetectionDisplay from '../face-detection-display/face-detection-display.component';

// const app = new Clarifai.App({
//     apiKey: process.env.CLARIFAI_API_KEY
// });

const ContentContainer = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('https://samples.clarifai.com/face-det.jpg');

    const onInputChange = event => {
        const value = event.target.value;
        setInput(value);
    };

    const onEnter = async event => {
        const value = input.trim();
        try {
            if (event.which === 13) {
                if (value.length !== 0) {
                    onSubmit();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = () => {
        const value = input.trim();
        console.log('Submit :       ', value);
        setImageUrl(value);
        // Trigger detection logic
    };

    const clear = () => {
        console.log('Clear');
        setInput('');
    };

    return (
        <div className='content-container'>
            <div className='content'>
                <ContentData
                    input={ input }
                    onInputChange={ onInputChange }
                    onEnter={ onEnter }
                    onSubmit={ onSubmit }
                    clear={ clear }
                />
                <FaceDetectionDisplay
                    imageUrl={imageUrl}
                />
            </div>
        </div>
    );
}

export default ContentContainer;