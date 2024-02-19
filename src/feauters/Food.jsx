import React, { useState, useRef, useEffect } from "react";
import store from "../store/store";
import actions from "../store/gameSlice";
import "../UI/styles.scss";
import { useSelector, useDispatch } from "react-redux";
import Game from "./Game";
import Snake from "./Snake";

const Food = () => {
    let food = useSelector(state => state.game.food)
    
    return (
        <div>
            
        </div>
    );
};
export default Food;