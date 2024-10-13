import { CATEGORIES } from "../data/categories";
import { Dispatch, useState, useEffect } from "react";
import { FormData } from "../../types";
import { FormDataActions, FormDataState } from "../reducers/formDataReducer";
import { v4 as uuidv4 } from "uuid";

type FormProps = {
  dispatch: Dispatch<FormDataActions>;
  state: FormDataState;
};

const initialState: FormData = {
  id: uuidv4(),
  category: 1,
  activity: "",
  calories: 0,
};

const Form = ({ dispatch, state }: FormProps) => {
  const [formData, setFormData] = useState<FormData>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.formData.filter(
        (activity) => activity.id === state.activeId
      )[0];
      setFormData(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setFormData({
      ...formData,
      [e.target.id]:
        isNumberField && e.target.value !== ""
          ? +e.target.value
          : e.target.value,
    });
  };

  const isDisabled = () => {
    const { activity, calories } = formData;
    return activity.trim() === "" || calories <= 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-form-data", payload: { newData: formData } });
    setFormData({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-4 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categorias:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={formData.category}
          onChange={handleChange}
        >
          <>
            {CATEGORIES.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Actividad:
        </label>
        <input
          id="activity"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Ej: Comida, Ensalada, Bicicleta, etc."
          value={formData.activity}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Calorias. ej: 200, 300, 400, etc."
          value={formData.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900
        text-white px-4 py-2 rounded-lg w-full 
           cursor-pointer uppercase disabled:opacity-50"
        value={formData.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={isDisabled()}
      />
    </form>
  );
};

export default Form;
