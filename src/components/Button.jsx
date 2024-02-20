import React from 'react';
import classes from '../UI/Button.module.scss';
import '../UI/Button.scss';
import { setGameOver } from '../store/gameSlice';

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;