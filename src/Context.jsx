import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import clickSound from "./ClickSound.m4a";

function reducer(state, action) {
  switch (action.type) {
    case "enteredNumber":
      return { ...state, number: action.payload };
    case "enteredSets":
      return { ...state, sets: action.payload };
    case "enteredSpeed":
      return { ...state, speed: action.payload };
    case "enteredDurationBreak":
      return { ...state, durationBreak: action.payload };
    case "sound":
      return { ...state, allowSound: !state.allowSound };
    default:
      throw new Error("Unknown action");
  }
}

const initialState = {
  sets: 3,
  number: 5,
  speed: 90,
  durationBreak: 5,
  allowSound: true,
};

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

const ContextComponent = createContext();

export default function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sets, speed, durationBreak, allowSound, number } = state;
  const [time, setTime] = useState(formatTime(new Date())); // ✅ Manage time separately

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date())); // ✅ Update time without affecting entire context
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const sound = useMemo(() => new Audio(clickSound), []);

  const playSound = useCallback(() => {
    if (!allowSound) return;
    sound.currentTime = 0;
    sound.play().catch((error) => console.error("Audio play error:", error));
  }, [allowSound]);

  const contextValue = useMemo(
    () => ({
      speed,
      allowSound,
      durationBreak,
      sets,
      dispatch,
      number,
      workouts: [
        {
          name: "Full-body workout",
          numExercises: time.slice(-2) === "AM" ? 9 : 8,
        },
        { name: "Arms + Legs", numExercises: 6 },
        { name: "Arms only", numExercises: 3 },
        { name: "Legs only", numExercises: 4 },
        { name: "Core only", numExercises: time.slice(-2) === "AM" ? 5 : 4 },
      ],
      playSound,
    }),
    [speed, allowSound, durationBreak, sets, dispatch, number, playSound]
  ); // ✅ Removed `time` from dependencies

  return (
    <ContextComponent.Provider value={contextValue}>
      {children}
    </ContextComponent.Provider>
  );
}

function TimeDisplay({ time }) {
  return { time };
}

function useMadeContext() {
  const context = useContext(ContextComponent);
  if (!context) {
    throw new Error("useMadeContext must be used within a ContextProvider");
  }
  return context;
}

export { useMadeContext, TimeDisplay };
