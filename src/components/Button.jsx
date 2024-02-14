import React from 'react';
import classes from './Button.module.scss';
import './Button.scss';

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;