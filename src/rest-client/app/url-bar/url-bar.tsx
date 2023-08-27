import { useState } from "react";
import { RestMethod, RestMethodEnum } from "../rest-method/rest-method";
import "./url-bar.css";

export const UrlBar = () => {
  const [url, setUrl] = useState("");

  const sendRequest = () => {
    console.log(url);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div className="url-bar-container">
      <RestMethod method={RestMethodEnum.GET} />
      <input
        placeholder="https://api.service.com/"
        type="text"
        className="input-bar"
        onChange={handleChange}
      />
      <button className="send-button" onClick={() => sendRequest()}>
        Send
      </button>
    </div>
  );
};
