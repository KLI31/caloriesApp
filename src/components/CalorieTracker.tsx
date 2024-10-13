import { useMemo } from "react";
import { FormData } from "../../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: FormData[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (acc, activity) =>
          activity.category === 1 ? acc + activity.calories : acc,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (acc, activity) =>
          activity.category === 2 ? acc + activity.calories : acc,
        0
      ),
    [activities]
  );

  const caloriesDifference = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
        <CalorieDisplay text="Comida" calories={caloriesConsumed} />
        <CalorieDisplay text="Ejercicio" calories={caloriesBurned} />
        <CalorieDisplay text="Diferencia" calories={caloriesDifference} />
      </div>
    </>
  );
};

export default CalorieTracker;
