import { useEffect } from "react";
import { useSelector } from "react-redux";

const Food = (ref) => {
  const isGameRunning = useSelector((state) => state.game.isGameRunning);
  const food = useSelector((state) => state.game.food);
  const box = useSelector((state) => state.game.box);
  const snake = useSelector((state) => state.game.snake);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (isGameRunning) {
      ctx.fillStyle = "rgb(209, 0, 66)";
      ctx.fillRect(food.x - 1, food.y - 1, box + 2, box + 2);
      console.log("food")
    }
  }, [box, food, food.x, food.y, isGameRunning, ref, snake]);

  return ref;
};

export default Food;
