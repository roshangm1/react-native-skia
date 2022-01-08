import {
  BlurMask,
  Canvas,
  Fill,
  Paint,
  Skia,
  useTypeface,
} from "@shopify/react-native-skia";
import React from "react";
import { useTimestamp } from "@shopify/react-native-skia/src/animation/Animation/hooks";

import { COLS, ROWS, Symbol, SYMBOL } from "./Symbol";

const cols = new Array(COLS).fill(0).map((_, i) => i);
const rows = new Array(ROWS).fill(0).map((_, i) => i);

const randomArray = (from: number, to: number, blank?: boolean) => {
  const size = Math.round(from + Math.random() * (to - from));
  const a = new Array(size).fill(0).map((_, i) => (blank ? 0 : i / size));
  return a;
};

const streams = cols.map(() =>
  new Array(6)
    .fill(0)
    .map(() =>
      [
        randomArray(1, 4, true),
        randomArray(4, 16),
        randomArray(2, 8, true),
      ].flat()
    )
    .flat()
);

const useMatrixFont = () => {
  const typeface = useTypeface(require("./matrix-code-nfi.otf"));
  if (typeface === null) {
    return null;
  }
  return Skia.Font(typeface, SYMBOL.height);
};

export const Matrix = () => {
  const timestamp = useTimestamp();
  const font = useMatrixFont();
  if (font === null) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Paint>
        <BlurMask sigma={10} style="solid" />
      </Paint>
      {cols.map((_i, i) =>
        rows.map((_j, j) => (
          <Symbol
            timestamp={timestamp}
            key={`${i}-${j}`}
            i={i}
            j={j}
            font={font}
            stream={streams[i]}
          />
        ))
      )}
    </Canvas>
  );
};
