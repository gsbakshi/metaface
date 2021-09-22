import React, { useState } from 'react';

import './content-container.styles.scss';

import ContentData from '../content-data/content-data.component';
import FaceDetectionDisplay from '../face-detection-display/face-detection-display.component';

// const baseImage = 'https://samples.clarifai.com/face-det.jpg';

const ContentContainer = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [boxes, setBoxes] = useState([]);

    const onInputChange = event => {
        const value = event.target.value;
        setInput(value);
    };

    const onEnter = async event => {
        const value = input.trim();
        try {
            if (event.which === 13 && value.length !== 0) onSubmit()
        } catch (error) {
            console.error(error);
        }
    };

    const calculateFaceCoordinates = data => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
        return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box;
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height),
            }
        });
    }

    const detectAllFacesWithCoordinates = (boxes) => setBoxes(boxes);

    const onSubmit = () => {
        const value = input.trim();
        setImageUrl(value);

        // Trigger detection logic
        fetch('http://localhost:3001/imageurl', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: imageUrl
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    // fetch('http://localhost:3000/image', {
                    //     method: 'put',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({
                    //         id: this.state.user.id
                    //     })
                    // })
                    //     .then(response => response.json())
                    //     .then(count => {
                    //         this.setState(Object.assign(this.state.user, { entries: count }))
                    //     })
                    //     .catch(console.log)
                }
                detectAllFacesWithCoordinates(calculateFaceCoordinates(response))
                console.log(boxes);
            })
            .catch(error => console.log(error));
    };

    const clear = () => {
        setInput('');
        setImageUrl('');
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
                    imageUrl={ imageUrl }
                    boxes={boxes}
                />
            </div>
        </div>
    );
}

export default ContentContainer;