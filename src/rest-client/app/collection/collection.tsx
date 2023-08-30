import { useAppSelector } from "../../store/hooks";
import { RequestState, selectCollections } from "../../store/state";
import { RestMethod } from "../rest-method/rest-method";
import "./collection.css";

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
            <div
              key={`collection-origin-${i}`}
              className="collection-origin-item"
            >
              <h3>{collectionOrigin}</h3>
              {collections[collectionOrigin].map((requestState, i) => (
                <div className="collection-item" key={`collection-item-${i}`}>
                  <RestMethod method={requestState.method} />
                  <div>{requestState.url.replace(collectionOrigin, "")}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
