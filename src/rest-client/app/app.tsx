import "./app.css";
import { UrlBar } from "./url-bar/url-bar";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="side-nav">Side-nav</div>
        <div className="url-bar">
          <UrlBar />
        </div>
        <div className="configuration">Configuration</div>
        <div className="output">Output</div>
      </div>
    </Provider>
  );
};
