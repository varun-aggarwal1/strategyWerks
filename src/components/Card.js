import React, { forwardRef } from "react";
import "./Card.css";
const Card = forwardRef(function Card(props, ref) {
  const { style } = props;
  console.log("ref", ref);
  return (
    <div ref={ref} style={style} className="card">
      Card
    </div>
  );
});
export default Card;
