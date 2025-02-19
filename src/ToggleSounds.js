import { memo } from "react";
import { useMadeContext } from "./Context";

const ToggleSounds = memo(function ToggleSounds() {
  const { allowSound, dispatch } = useMadeContext();

  console.log("Current allowSound state:", allowSound); // ✅ Check if state updates

  return (
    <button className="btn-sound" onClick={() => dispatch({ type: "sound" })}>
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});

export default ToggleSounds;
