import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import Context, { TimeDisplay, useMadeContext } from "./Context";
import { memo } from "react";

function App() {
  return (
    <Context>
      <MainContent />
    </Context>
  );
}

const MainContent = memo(function MainContent() {
  // const { time } = useMadeContext();
  const { time } = TimeDisplay();
  console.log(time);

  return (
    <main>
      <h1>Workout Timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds />
      <Calculator />
    </main>
  );
});
export default App;
