import { Children, useState } from "react";
import React, { Component } from "react";
import Menu from "../components/Menu";
import Button from "../components/Button";
import Canvas from "../components/Canvas";
import "../UI/Canvas.scss";
import "../UI/App.scss";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { increaseScore, setFood, setDirection, setGameOver, setPause } from "../store/gameSlice";

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="app">
      <div className="content">
        <main className="top-bar">
          <Button id="open-menu" onClick={() => {
            setMenuActive(true);
            dispatch(setPause(true));
            }}>
            Меню
          </Button>
          <Menu active={menuActive} setActive={setMenuActive}>
            <button className="menu-buttons">Продолжить</button>
            <button className="menu-buttons">Рекорд</button>

            <button className="menu-buttons" id="quit-game">
              Завершить игру
            </button>
          </Menu>

          <Counter className="score-counter"></Counter>
        </main>
        

      
        <Canvas id="game-field" className="game-field" />

        <Button id="start-game-btn" onClick={() => {
          dispatch(setGameOver(true)); 
          dispatch(setDirection('right'));
          }}>
            Начать игру</Button>
        <Button id="quit-game-btn" onClick={() => dispatch(setGameOver(true))}>Завершить игру</Button>
      </div>
    </div>
  );
};

export default App;
