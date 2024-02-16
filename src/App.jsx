import { useState } from "react";
import React, { Component } from "react";
import Menu from "./components/Menu";
import Button from "./components/Button";
import Canvas from "./canvas/Canvas";
import "./UI/Canvas.scss";
import "./UI/App.scss";

const App = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="app">
      <div className="content">
        <main>
          <Button id="open-menu" onClick={() => setMenuActive(true)}>
            Меню
          </Button>

          <Menu active={menuActive} setActive={setMenuActive}>
            <button className="menu-buttons">Продолжить</button>
            <button className="menu-buttons">Рекорд</button>

            <button className="menu-buttons" id="quit-game">
              Завершить игру
            </button>
          </Menu>
        </main>

        <Canvas className="game-field" />

        <Button id="start-game-btn" >Начать игру</Button>
        <Button id="quit-game-btn" >Завершить игру</Button>
        
      </div>
    </div>
  );
};

export default App;
