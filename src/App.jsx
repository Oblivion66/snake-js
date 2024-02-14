import { useState } from 'react';
import React, { Component } from "react";
import Snake from "./components/Snake";
import Food from "./components/Food";
import Menu from "./components/Menu";
import Button from "./components/Button";
import Canvas from "./canvas/Canvas";;
import './canvas/Canvas.scss';
import './App.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);

  const draw = (context,count) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = 'grey'
    const d = count % 800
    context.fillRect(10 +d , 10  , 100 , 100)
  }

  return (
    <div className='app'>
      <div className='content'>
        <main>
          <Button id="open-menu" onClick = {() => setMenuActive(true)}>Меню</Button>

        </main>
        <Menu active={menuActive} setActive={setMenuActive}>
            <button className='menu-buttons'>Продолжить</button>
            <button className='menu-buttons'>Рекорд</button>
            <button className='menu-buttons' id='quit-game'>Завершить игру</button>
        </Menu>


        <Canvas className="game-field" draw={draw}/>

        <Button id='start-game-btn'>Начать игру</Button>
        <Button id='quit-game-btn'>Завершить игру</Button>
        </div>
    </div>
  );
};

export default App;