import React from 'react';
import TextBox from '../text-box/text-box.component';

import './input-image-url.styles.scss';

const InputImageUrl = ({ onInputChange, onEnter, onSubmit }) => (
    <div className='input-image-container'>
        {/* <input
            className='url-input'
            type='text'
            placeholder='Paste image link'
            onChange={ onInputChange }
            onKeyDown={ onEnter }
            // value={ input }
            // autoFocus={ true }
            />
        <button
            className='detect'
            onClick={ onSubmit }
        >
            <i class='fa fa-angle-right' />
        </button> */}
    <TextBox
        className='textbox'
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