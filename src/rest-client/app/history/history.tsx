import { useAppSelector } from "../../store/hooks";
import { RequestState, selectHistory } from "../../store/state";
import { RestMethod } from "../rest-method/rest-method";
import "./history.css";

export const History = () => {
  const history: Record<string, RequestState[]> = useAppSelector((state) =>
    selectHistory(state.appState)
  );

  return (
    <div className="history-container">
      <span>History</span>
      <div className="history-list">
        {Object.keys(history).map((historyDate, i) => {
          return (
            <div key={`history-date-${i}`} className="history-date-item">
              {historyDate}
              {history[historyDate].map((requestState, i) => (
                <div className="history-item" key={`history-item-${i}`}>
                  <RestMethod method={requestState.method} />
                  <div className="url">{requestState.url}</div>
                  <div>{requestState.date.toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
