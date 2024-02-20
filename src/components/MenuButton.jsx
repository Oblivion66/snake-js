import React from 'react';
import '../UI/MenuButton.scss';
import { setGameOver } from '../store/gameSlice';
import { useDispatch, useSelector } from "react-redux";
import { setGameRunning } from "../store/gameSlice";

const MenuButton = ({children, ...props}) => {
    return (
        <button {...props} >
            {children}
        </button>
    );
};

export default MenuButton;