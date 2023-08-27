import "./app.css";
import { UrlBar } from "./url-bar/url-bar";

export const App = () => {
  return (
    <div className="container">
      <div className="side-nav">Side-nav</div>
      <div className="url-bar">
        <UrlBar />
      </div>
      <div className="configuration">Configuration</div>
      <div className="output">Output</div>
    </div>
  );
};
