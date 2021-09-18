import React from "react";
import './image_link.css';

function ImageLinkForm({ onInputChange, onSubmit }) {
    return (
        <div>
            <p className='f3'>
                { 'Bot training to detect human faces in your static media' }
            </p>
            <div className='pa4 br3 shadow-2 mh7 mv4 form'>
                <input className='f4 pv2 ph3 w-70 center bw0 outline-0' type='text' onChange={ onInputChange } />
                <button className='w-30 grow f4 ph3 pv2 white butt bw0 outline-0 pointer' onClick={ onSubmit } >Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;
