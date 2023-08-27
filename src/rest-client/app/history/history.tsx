import { useAppSelector } from "../../store/hooks";
import { RequestState, selectHistory } from "../../store/state";

export const History = () => {
  const history: RequestState[] = useAppSelector((state) =>
    selectHistory(state.appState)
  );
  return (
    <div className="history-container">
      <span>History</span>
      {history.map((requestState) => (
        <div className="history-item">
          {requestState.method}-{requestState.url}
        </div>
      ))}
    </div>
  );
};
