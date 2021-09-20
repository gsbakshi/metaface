import React from 'react';

import './input-image-url.styles.scss';

import TextBox from '../text-box/text-box.component';

const InputImageUrl = ({ onInputChange, onEnter, onSubmit }) => (
    <div className='input-image-container'>
        <TextBox
            placeholder='Paste image link'
            component={
                <button
                    className='detect'
                    onClick={ onSubmit }
                    onChange={ onInputChange }
                    onKeyDown={ onEnter }
                >
                    <i class='fa fa-angle-right' />
                </button>
            }
        />
    </div>
);

export default InputImageUrl;