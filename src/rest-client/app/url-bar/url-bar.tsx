import { useState, KeyboardEvent } from "react";
import { RestMethod, RestMethodEnum } from "../rest-method/rest-method";
import { useAppDispatch } from "../../store/hooks";
import {
  addCollection,
  addCurrentOutput,
  addHistory,
  RequestState,
} from "../../store/state";
import { v4 as uuidv4 } from "uuid";

import "./url-bar.css";
import axios from "axios";

export const UrlBar = (): React.ReactElement => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();

  const sendRequest = () => {
    const requestState: RequestState = {
      id: uuidv4(),
      url: url,
      date: new Date(),
      method: RestMethodEnum.GET,
    };

    // Rewrite moodly origin to go through the Vite /api proxy in dev so CORS
    // isn't an issue. Otherwise use the full URL as entered.
    let requestUrl = requestState.url || "";
    try {
      const parsed = new URL(requestUrl);
      if (parsed.origin === "https://api.moodly.me") {
        requestUrl = `/api${parsed.pathname}${parsed.search}`;
      }
    } catch (e) {
      // ignore invalid URL; axios will report an error
    }

    axios({ method: requestState.method, url: requestUrl })
      .then((response) => {
        console.log(response);
        requestState.response = response.data;
        if (url) {
          dispatch(addHistory(requestState));
          dispatch(addCollection(requestState));
          dispatch(addCurrentOutput(requestState));
        }
      })
      .catch((err) => {
        console.error("Request failed", err);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasProtocol =
      event.target.value.startsWith("https://") ||
      event.target.value.startsWith("http://");
    if (hasProtocol) {
      setUrl(event.target.value);
    } else {
      const urlWithDefaultProtocol = `http://${event.target.value}`;
      setUrl(urlWithDefaultProtocol);
    }
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
