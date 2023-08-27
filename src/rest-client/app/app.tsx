import "./app.css";
import { UrlBar } from "./url-bar/url-bar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { History } from "../app/history/history";

export const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="side-nav">
          <History />
        </div>
        <div className="url-bar">
          <UrlBar />
        </div>
        <div className="configuration">Configuration</div>
        <div className="output">Output</div>
      </div>
    </Provider>
  );
};
