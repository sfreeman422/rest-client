import { useAppSelector } from "../../store/hooks";
import { RequestState, selectHistory } from "../../store/state";
import { RestMethod } from "../rest-method/rest-method";
import "./history.css";

export const History = () => {
  const history: RequestState[] = useAppSelector((state) =>
    selectHistory(state.appState)
  );

  return (
    <div className="history-container">
      <span>History</span>
      <div className="history-list">
        {history.map((requestState, i) => (
          <div className="history-item" key={`history-item-${i}`}>
            <RestMethod method={requestState.method} />
            <div>{requestState.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
