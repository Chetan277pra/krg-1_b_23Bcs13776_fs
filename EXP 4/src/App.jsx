import { useState } from "react";
import "./App.css";

function App() {
  const [drawings, setDrawings] = useState([]);
  const [color, setColor] = useState("#007bff");
  const [shape, setShape] = useState("circle");
  const [current, setCurrent] = useState(null); // shape being drawn

  const handleMouseDown = (e) => {
    const svg = e.target.closest("svg");
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    let newShape;
    if (shape === "circle") {
      newShape = { type: "circle", cx: startX, cy: startY, r: 0, fill: color };
    } else if (shape === "rect") {
      newShape = { type: "rect", x: startX, y: startY, width: 0, height: 0, fill: color };
    } else if (shape === "line") {
      newShape = { type: "line", x1: startX, y1: startY, x2: startX, y2: startY, stroke: color, strokeWidth: 2 };
    }

    setCurrent(newShape);
  };

  const handleMouseMove = (e) => {
    if (!current) return;

    const svg = e.target.closest("svg");
    const rect = svg.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    let updated = { ...current };

    if (current.type === "circle") {
      const dx = currX - current.cx;
      const dy = currY - current.cy;
      updated.r = Math.sqrt(dx * dx + dy * dy); // radius based on distance
    } else if (current.type === "rect") {
      updated.width = Math.abs(currX - current.x);
      updated.height = Math.abs(currY - current.y);
      updated.x = Math.min(currX, current.x);
      updated.y = Math.min(currY, current.y);
    } else if (current.type === "line") {
      updated.x2 = currX;
      updated.y2 = currY;
    }

    setCurrent(updated);
  };

  const handleMouseUp = () => {
    if (current) {
      setDrawings([...drawings, current]);
      setCurrent(null);
    }
  };

  const undo = () => {
    setDrawings(drawings.slice(0, -1));
  };

  return (
    <div className="app">
      <h2>🎨 Interactive SVG Drawing Tool</h2>

      <div className="controls">
        <label>
          Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>

        <label>
          Shape:
          <select value={shape} onChange={(e) => setShape(e.target.value)}>
            <option value="circle">Circle</option>
            <option value="rect">Rectangle</option>
            <option value="line">Line</option>
          </select>
        </label>

        <button onClick={undo}>Undo</button>
      </div>

      <svg
        id="canvas"
        width="600"
        height="400"
        style={{ border: "1px solid black", background: "#f9f9f9" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {drawings.map((s, i) => {
          if (s.type === "circle") return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} />;
          if (s.type === "rect") return <rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} fill={s.fill} />;
          if (s.type === "line") return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.stroke} strokeWidth={s.strokeWidth} />;
          return null;
        })}

        {current && current.type === "circle" && (
          <circle cx={current.cx} cy={current.cy} r={current.r} fill={current.fill} opacity="0.5" />
        )}
        {current && current.type === "rect" && (
          <rect x={current.x} y={current.y} width={current.width} height={current.height} fill={current.fill} opacity="0.5" />
        )}
        {current && current.type === "line" && (
          <line x1={current.x1} y1={current.y1} x2={current.x2} y2={current.y2} stroke={current.stroke} strokeWidth={current.strokeWidth} opacity="0.5" />
        )}
      </svg>
    </div>
  );
}

export default App;
