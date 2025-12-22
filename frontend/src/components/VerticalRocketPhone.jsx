import React, { useRef, useState, useEffect } from "react";
import RocketFull from "../assets/RocketFull.svg";

export default function VerticalRocketPhone() {

    return (
        <div className="flex items-center justify-center " style={{ width: 100, height: 700, background: "#000" }}>
        <img src={RocketFull} alt="Rocket Full"  className="flex items-center justify-center"/>      
      </div>
    );
}