import { useState, KeyboardEvent } from "react";
import { RestMethod, RestMethodEnum } from "../rest-method/rest-method";
import { useAppDispatch } from "../../store/hooks";
import { addCollection, addHistory, RequestState } from "../../store/state";
import { v4 as uuidv4 } from "uuid";

import "./url-bar.css";

export const UrlBar = (): React.ReactElement => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();

  const sendRequest = () => {
    const requestState: RequestState = {
      id: uuidv4(),
      url: url,
      date: new Date(),
      method: RestMethodEnum.GET,
      body: "",
      headers: "",
      response: "",
      error: "",
      loading: false,
    };
    if (url) {
      dispatch(addHistory(requestState));
      dispatch(addCollection(requestState));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.key === "Enter") {
      sendRequest();
    }
  };

  return (
    <div className="url-bar-container">
      <RestMethod method={RestMethodEnum.GET} />
      <input
        placeholder="https://api.service.com/"
        type="text"
        className="input-bar"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button className="send-button" onClick={() => sendRequest()}>
        Send
      </button>
    </div>
  );
};
