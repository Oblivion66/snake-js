import React from 'react';
import { Stage, Layer, Rect } from "react-konva";

const myShape = () => {
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={5}
        />
      </Layer>
    </Stage>
  );
};

export default myShape;
