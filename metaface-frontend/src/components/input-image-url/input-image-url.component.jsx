import React from 'react';

import './input-image-url.styles.scss';

const InputImageUrl = ({ onInputChange, onSubmit }) => (
    // pa4 br3 shadow-2 mh7 mv4 form
    <div className='input-image-container'>
        {/* f4 pv2 ph3 w-70 center bw0 outline-0 */}
        <input className='url-input' type='text' onChange={ onInputChange } />
        {/* w-30 grow f4 ph3 pv2 white butt bw0 outline-0 pointer */}
        <button className='detect' onClick={ onSubmit } >Detect</button>
    </div>
);

export default InputImageUrl;