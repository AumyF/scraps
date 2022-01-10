import { Reducer, useReducer, VFC } from "react";
import { definitions } from "types/supabase";
import { useSupabase } from "~/utils/supabase-client";

type State = {
  editting: boolean;
  content: string;
};

type Action =
  | {
      type: "reset";
    }
  | { type: "startEdit"; oldTitle: string }
  | { type: "update"; content: string };

const initialState = { editting: false, content: "" };

const reducer: Reducer<State, Action> = (_, action) => {
  switch (action.type) {
    case "reset": {
      return initialState;
    }
    case "startEdit": {
      return { editting: true, content: action.oldTitle };
    }
    case "update": {
      return { editting: true, content: action.content };
    }
  }
};

export const ScrapTitle: VFC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const supabase = useSupabase();

  return (
    <div className="flex justify-between gap-2">
      {state.editting ? (
        <>
          <input
            type="text"
            value={state.content}
            onChange={(event) =>
              dispatch({
                type: "update",
                content: event.target.value,
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
              dispatch({ type: "startEdit", oldTitle: title });
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};
