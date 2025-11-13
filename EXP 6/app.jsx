import React, { useRef, useState } from "react";
const SVG_NS = "http://www.w3.org/2000/svg";

export default function DrawingTool() {
  const svgRef = useRef(null);
  const drawingsRef = useRef([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#1976d2");
  const [radius, setRadius] = useState(8);

  const getPointInSvg = (evt) => {
    const rect = svgRef.current.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getPointInSvg(e);
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    svgRef.current.appendChild(circle);
    drawingsRef.current.push(circle);
    setCount(drawingsRef.current.length);
  };

  const undo = () => {
    const last = drawingsRef.current.pop();
    if (last) {
      svgRef.current.removeChild(last);
      setCount(drawingsRef.current.length);
    }
  };

  const clearAll = () => {
    while (drawingsRef.current.length) {
      const el = drawingsRef.current.pop();
      if (el && el.parentNode === svgRef.current) svgRef.current.removeChild(el);
    }
    setCount(0);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Radius:
          <input type="range" min={2} max={30} value={radius} onChange={(e) => setRadius(+e.target.value)} />
          <span>{radius}px</span>
        </label>
        <button onClick={undo} disabled={!count}>Undo</button>
        <button onClick={clearAll} disabled={!count}>Clear</button>
      </div>
      <svg ref={svgRef} width="500" height="400" style={{ border: "1px solid black", background: "white", touchAction: "none" }} onMouseDown={handleMouseDown}/>
    </div>
  );
}
