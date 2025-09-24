import { useAppSelector } from "../../store/hooks";
import { selectCurrentOutput } from "../../store/state";
import JsonView from "@uiw/react-json-view";
import "./output.css";
import { defaultTheme } from "./output-theme";

export const Output = (): React.ReactElement => {
  const currentOutput = useAppSelector((state) =>
    selectCurrentOutput(state.appState)
  );

  return (
    <div className="output-container">
      <span>Response</span>
      {!!currentOutput && typeof currentOutput === "object" && (
        <JsonView
          value={currentOutput}
          displayDataTypes={false}
          style={defaultTheme}
        />
      )}
      {!!currentOutput && typeof currentOutput !== "object" && (
        <pre>{String(currentOutput)}</pre>
      )}
    </div>
  );
};
