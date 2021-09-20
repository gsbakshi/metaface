import React from 'react';

import './text-box.styles.scss';

const TextBox = ({ placeholder, onInputChange, onEnter, input, autofocus, component }) => (
    <div className='text-box-container'>
        <input
            className='text-box'
            type='text'
            placeholder={ placeholder }
            onChange={ onInputChange }
            onKeyDown={ onEnter }
            value={ input }
            autoFocus={ autofocus ?? false }
        />
        { component }
    </div>
);

export default TextBox;