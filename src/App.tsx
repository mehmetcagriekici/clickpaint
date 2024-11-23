import Dice from "./components/Dice";
import Login from "./components/Login";
import Map from "./components/Map";
import Result from "./components/Result";
import Watch from "./components/Watch";
import { useBuild } from "./hooks/useBuild";
import { DEF_THEME } from "./services/constants";

function App() {
  const { isOn, showResult } = useBuild();
  return (
    <div className={`h-dvh w-dvw grid grid-cols-10 grid-rows-12 ${DEF_THEME}`}>
      {isOn || <Login />}
      {isOn && <Map />}
      {isOn && <Dice />}
      {isOn && <Watch />}
      {showResult && isOn && <Result />}
    </div>
  );
}

export default App;
