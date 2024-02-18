import React, { useState, useRef, useEffect } from "react";
import store from "../store/store";
import actions from "../store/gameSlice";
import "../UI/styles.scss";
import { useSelector, useDispatch } from "react-redux";
import Food from "./Food";
import Game from "./Game";

const Snake = () => {
    const [snake, setSnake] = useState([
        {
          x: 18 * box,
          y: 9 * box,
        },
      ]);
    
      let direction = "";
      const [food, setFood] = useState(randomPosition);
    
      const changeDirectionWithKeys = (e) => {
        var { keyCode } = e;
        if (keyCode == "37" && direction != "right") direction = "left";
        if (keyCode == "38" && direction != "down") direction = "up";
        if (keyCode == "39" && direction != "left") direction = "right";
        if (keyCode == "40" && direction != "up") direction = "down";
      };
    
      document.addEventListener("keydown", changeDirectionWithKeys, false);


    return (
        <div>
            
        </div>
    );
};

export default Snake;