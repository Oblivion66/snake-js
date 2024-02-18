import React from 'react';
import '../UI/Counter.scss'
import Canvas from './Canvas';
import useCanvas from '../features/useCanvas2';

const Counter = ({children, ...props}) => {
    return (
        <div {...props} className='myCounter'>
            {children}
        </div>
    );
};

export default Counter;