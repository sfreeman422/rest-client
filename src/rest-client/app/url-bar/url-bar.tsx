import { useState } from "react";
import { RestMethod, RestMethodEnum } from "../rest-method/rest-method";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addModifyRequestState,
  selectHistory,
  RequestState,
} from "../../store/state";

import "./url-bar.css";

export const UrlBar = () => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const history: RequestState[] = useAppSelector((state) =>
    selectHistory(state.appState)
  );

  const sendRequest = () => {
    const requestState: RequestState = {
      url: url,
      method: RestMethodEnum.GET,
      body: "",
      headers: "",
      response: "",
      error: "",
      loading: false,
    };
    if (url) {
      console.log(requestState);
      dispatch(addModifyRequestState(requestState));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  console.log(history);
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
