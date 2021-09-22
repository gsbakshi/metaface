import React from 'react';

import './content-data.styles.scss';

import { ReactComponent as Logo } from '../../logos/default-monochrome.svg';

import InputImageUrl from '../input-image-url/input-image-url.component';
import RankCounter from '../rank-counter/rank-counter.component';

const ContentData = ({ input, onInputChange, onEnter, onSubmit, clear }) => (
    <div className='content-data'>
        <div className='logo-container'>
            <Logo className='logo' />
        </div>
        <div className='data'>
            <RankCounter />
            <InputImageUrl
                input={ input }
                onInputChange={ onInputChange }
                onEnter={ onEnter }
                onSubmit={ onSubmit }
            />
            { input &&
                (
                    <div
                        className='clear'
                        onClick={ clear }
                    >
                        <i className="fa fa-times" />
                        Clear
                    </div>
                )
            }
        </div>
        <div className='option'>
            Sign Out
        </div>
    </div>
);

export default ContentData;