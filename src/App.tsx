import "./App.css";
import Form from "./components/Form";
import { useEffect, useMemo, useReducer } from "react";
import { formDataReducer, initialState } from "./reducers/formDataReducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(formDataReducer, initialState);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(state.formData));
  }, [state.formData]);

  const handleReset = useMemo(() => state.formData.length, [state.formData]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg text-white font-bold uppercase">
            Contador calorias
          </h1>
          <button
            disabled={!handleReset}
            onClick={() => dispatch({ type: "reset-form-data" })}
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer text-sm rounded-lg disabled:opacity-10"
          >
            Reiniciar app
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.formData} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.formData} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
