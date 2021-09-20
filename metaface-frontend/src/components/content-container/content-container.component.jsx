import React, {useState} from 'react';

import './content-container.styles.scss';

import ContentData from '../content-data/content-data.component';
import FaceDetectionDisplay from '../face-detection-display/face-detection-display.component';

const ContentContainer = () => {
    const [input, setInput] = useState('');

    const onInputChange = event => {
        const value = event.target.value;
        // console.log('onInputChange :     ' + input);
        setInput(value);
    };

    const onEnter = async event => {
        const value = input.trim();
        // console.log('trimmed input :     ' + value);
        try {
            if (event.which === 13) {
                if (value.length !== 0) {
                    onSubmit();
                    // console.log('onEnter :     ' + value);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = () => {
        console.log('Submit');
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
                <FaceDetectionDisplay />
            </div>
        </div>
    );
}

export default ContentContainer;