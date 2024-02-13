import React from 'react';
import classes from './Button.module.css';
import './Button.css';

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;