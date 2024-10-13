import { FormData } from "../../types";
import { CATEGORIES } from "../data/categories";
import { Dispatch, useMemo } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FormDataActions } from "../reducers/formDataReducer";

type ActivityListProps = {
  activities: FormData[];
  dispatch: Dispatch<FormDataActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  // eslint-disable-react-hooks/exhaustive-deps
  const categoryName = useMemo(
    () => (category: FormData["category"]) =>
      CATEGORIES.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmptyActivity = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivity ? (
        <p className="text-center text-2xl mt-2 font-bold text-slate-600">
          No tienes actividades aún.
        </p>
      ) : (
        activities.map((activity) => {
          return (
            <div
              key={activity.id}
              className="px-5 py-10 bg-white mt-5 flex justify-between"
            >
              <div className="space-y-2 relative ">
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                    activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                  }`}
                >
                  {categoryName(activity.category)}
                </p>
                <p className="text-2lg font-bold pt-5">{activity.activity}</p>
                <p className="font-black text-4xl text-lime-500">
                  {activity.calories} <span>Calorias</span>
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-active-id",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <PencilSquareIcon className="w-8 h-8 text-gray-800" />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "remove-activity",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <TrashIcon className="w-8 h-8 text-red-600" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default ActivityList;
