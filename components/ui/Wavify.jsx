import React from "react";
import Wave from "react-wavify";

const WaveAnimation = ({
  fill = "#f79902",
  height = 20,
  amplitude = 20,
  speed = 0.15,
  points = 3,
}) => (
  <Wave
    fill={fill}
    paused={false}
    style={{ display: "flex" }}
    options={{
      height,
      amplitude,
      speed,
      points,
    }}
  />
);

export default WaveAnimation;
