import { useMadeContext } from "./Context";
import useTime from "./useTime";

function Calculator() {
  const { workouts, number, dispatch, sets, speed, durationBreak } =
    useMadeContext();
  // console.log(workouts);
  const { mins, seconds } = useTime();
  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select
            value={number}
            onChange={(e) =>
              dispatch({ type: "enteredNumber", payload: e.target.value })
            }
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) =>
              dispatch({ type: "enteredSets", payload: e.target.value })
            }
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) =>
              dispatch({ type: "enteredSpeed", payload: e.target.value })
            }
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) =>
              dispatch({
                type: "enteredDurationBreak",
                payload: e.target.value,
              })
            }
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={() => {}}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={() => {}}>+</button>
      </section>
    </>
  );
}

export default Calculator;
