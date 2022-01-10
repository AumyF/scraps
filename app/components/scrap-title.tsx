import { Reducer, useReducer, VFC } from "react";
import { definitions } from "types/supabase";

import { useSupabase } from "~/utils/supabase-client";

type State = {
  content: string;
  editting: boolean;
};

type Action =
  | {
      type: "reset";
    }
  | { oldTitle: string, type: "startEdit"; }
  | { content: string, type: "update"; };

const initialState = { content: "", editting: false };

const reducer: Reducer<State, Action> = (_, action) => {
  switch (action.type) {
    case "reset": {
      return initialState;
    }
    case "startEdit": {
      return { content: action.oldTitle, editting: true };
    }
    case "update": {
      return { content: action.content, editting: true };
    }
  }
};

export const ScrapTitle: VFC<{ id: string, title: string; }> = ({
  id,
  title,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const supabase = useSupabase();

  return (
    <div className="flex gap-2 justify-between">
      {state.editting ? (
        <>
          <input
            type="text"
            value={state.content}
            onChange={(event) =>
              dispatch({
                content: event.target.value,
                type: "update",
              })
            }
            className="flex-1 p-2"
          />
          <button
            className="button secondary"
            onClick={() =>
              dispatch({
                type: "reset",
              })
            }
          >
            Cancel
          </button>
          <button
            className="button brand"
            onClick={async () => {
              console.log(id);
              const result = await supabase
                .from<definitions["scraps"]>("scraps")
                .update({ title: state.content }, { returning: "minimal" })
                .match({ id });
              if (result.error) console.error(result.error);
              dispatch({
                type: "reset",
              });
            }}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{title}</h1>
          <button
            className="button secondary"
            onClick={() => {
              dispatch({ oldTitle: title, type: "startEdit" });
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};
