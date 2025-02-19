import React from "react";
import { useMadeContext } from "./Context";

export default function useTime() {
  const { durationBreak, sets, speed, number } = useMadeContext();
  const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  return {
    duration,
    mins,
    seconds,
  };
}
