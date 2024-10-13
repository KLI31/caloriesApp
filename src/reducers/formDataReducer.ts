import { FormData } from "../../types";

export type FormDataActions =
  | {
      type: "save-form-data";
      payload: { newData: FormData };
    }
  | {
      type: "set-active-id";
      payload: { id: FormData["id"] };
    }
  | {
      type: "remove-activity";
      payload: { id: FormData["id"] };
    }
  | {
      type: "reset-form-data";
    };

export type FormDataState = {
  formData: FormData[];
  activeId: FormData["id"];
};

const localStorageActivity = (): FormData[] => {
  const storedActivities = localStorage.getItem("formData");
  return storedActivities ? JSON.parse(storedActivities) : [];
};

export const initialState: FormDataState = {
  formData: localStorageActivity(),
  activeId: "",
};

export const formDataReducer = (
  state: FormDataState = initialState,
  action: FormDataActions
) => {
  if (action.type === "save-form-data") {
    let updatedActivities: FormData[] = [];

    if (state.activeId) {
      updatedActivities = state.formData.map((activity) => {
        if (activity.id === state.activeId) {
          return action.payload.newData;
        }
        return activity;
      });
    } else {
      updatedActivities = [...state.formData, action.payload.newData];
    }
    return {
      ...state,
      formData: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-active-id") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "remove-activity") {
    let updatedActivities: FormData[] = [];
    updatedActivities = state.formData.filter(
      (activity) => activity.id !== action.payload.id
    );
    return {
      ...state,
      formData: updatedActivities,
    };
  }

  if (action.type === "reset-form-data") {
    return {
      formData: [],
      activeId: "",
    };
  }
  return state;
};
