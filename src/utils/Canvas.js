import { useEffect } from "react";
import "../UI/styles.scss";
import { useSelector } from "react-redux";

const useCanvas = (ref) => {
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const grid = useSelector((state) => state.game.grid);
  const snake = useSelector((state) => state.game.snake);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const canvasWidth = width;
    const canvasHeight = height;

    function createCanvasGrid() {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.lineStyle = "rgb(14, 18, 37);";

      let offsetX = Math.floor(canvasWidth / grid.width);
      let offsetY = Math.floor(canvasHeight / grid.height);

      for (let x = offsetX; x < canvasWidth; x += offsetX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
      }

      for (let y = offsetY; y < canvasHeight; y += offsetY) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
      }

      ctx.stroke();

      return canvas;
    }

    createCanvasGrid();
    
  }, [grid.height, grid.width, height, ref, width, snake]);

  return ref;
};

export default useCanvas;