//imports
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppForm } from "../hooks/useAppForm";
import { useBuild } from "../hooks/useBuild";
import { FormInput } from "../services/types";
import {
  DEF_BORDER,
  DEF_FONT,
  DEF_INP,
  DEF_INP_HOV,
  DEF_THEME,
} from "../services/constants";
import { ChangeEvent, useState } from "react";

function Login() {
  //custom hooks
  const { submit } = useAppForm();
  const { start, init } = useBuild();

  //react hook form
  const { register, handleSubmit } = useForm<FormInput>();

  //local state for player count
  //for the image element
  const [playerCount, setPlayerCount] = useState("2");

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    //send player count (main dependency)
    submit(+formData.count);
    //init starting values
    init();
    //show game
    start();
  };

  //form onChange to move between images when player count changes
  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setPlayerCount(event.target.value);
  }

  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-black">
      <form
        className={`h-4/6 w-10/12 ${DEF_BORDER} ${DEF_THEME} grid grid-rows-12 grid-cols-11 lg:w-6/12`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row-start-6 row-end-9 col-start-2 col-end-6 bg-black rounded-2xl">
          <img
            src={`${
              playerCount === "2"
                ? "2p.jpeg"
                : playerCount === "3"
                ? "3p.jpeg"
                : playerCount === "4"
                ? "4p.jpeg"
                : "1p.jpeg"
            }`}
            alt="https://www.freepik.com/free-photo/color-rag-dolls_959185.htm#fromView=search&page=1&position=12&uuid=4c7bd060-027f-48c8-9254-e1934066bddd"
            className="size-full rounded-full object-contain"
          />
        </div>
        <label
          className={`row-start-4 row-end-5 col-span-11 text-gray-400 ${DEF_FONT} text-center`}
        >
          Choose the number of players... &darr;
        </label>
        <select
          {...register("count", { onChange })}
          className={`row-start-6 row-end-7 col-start-7 col-end-10 ${DEF_THEME} ${DEF_INP} ${DEF_INP_HOV}`}
        >
          <option value={2} className={`${DEF_FONT} text-center`}>
            2
          </option>
          <option value={3} className={`${DEF_FONT} text-center`}>
            3
          </option>
          <option value={4} className={`${DEF_FONT} text-center`}>
            4
          </option>
        </select>
        <h2 className="fixed top-0 left-0 uppercase tracking-wide font-black text-yellow-500">
          !!! click <span className="lowercase">the </span>dice to{" "}
          <span className="text-green-500">end turn</span>,{" "}
          <span className="lowercase">and </span>
          <span className=" text-green-500">roll dice </span>for{" "}
          <span className="lowercase">the </span>{" "}
          <span className=" text-green-500">next player </span>!!!
        </h2>
        <button
          type="submit"
          className={`row-start-10 row-end-11 col-start-3 col-end-10 ${DEF_BORDER} ${DEF_INP} ${DEF_INP_HOV}`}
        >
          start
        </button>
      </form>
    </div>
  );
}

export default Login;
