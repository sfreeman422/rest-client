import { useAppSelector } from "../../store/hooks";
import { RequestState, selectCollections } from "../../store/state";

export const Collection = () => {
  const collections: Record<string, RequestState[]> = useAppSelector((state) =>
    selectCollections(state.appState)
  );

  return (
    <div className="collection-container">
      <span>Collection</span>
      <div className="collection-list">
        {Object.keys(collections).map((collectionOrigin, i) => {
          return (
            <div key={`collection-date-${i}`} className="collection-date-item">
              <h3>{collectionOrigin}</h3>
              {collections[collectionOrigin].map((requestState, i) => (
                <div className="collection-item" key={`collection-item-${i}`}>
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
