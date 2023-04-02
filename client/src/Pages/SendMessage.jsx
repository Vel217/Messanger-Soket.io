// import { useEffect } from "react";
// import { getlist } from "../API";
// import AutocompleteInput from "../components/Autocomplete";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:5001");
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

import { useEffect, useState } from "react";
import { getListRec, listSendMessage, sendMessage } from "../API";
import { Select } from "evergreen-ui";
import { useLocation } from "react-router-dom";
import Messages from "./Messages";
import { useCallback } from "react";

function SendMessage() {
  const [itemList, setItemList] = useState([]);
  const [subject, setSubject] = useState("");
  const [textarea, setTextarea] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [currentRecipientId, setCurrentRecipientId] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  let location = useLocation();

  useEffect(() => {
    const a = location.pathname.slice(
      location.pathname.lastIndexOf("/") + 1,
      location.pathname.length + 1
    );
    setCurrentRecipientId(a);
  }, [location.pathname]);

  useEffect(() => {
    getListRec()
      .then((res) => res.json())
      .then((data) => {
        setItemList(data);
      });
    setActiveId(window.localStorage.getItem("activeUserId"));
  }, []);

  const getMessages = useCallback(() => {
    listSendMessage(activeId, currentRecipientId)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [activeId, currentRecipientId]);

  const onSend = () => {
    if (!subject || !textarea || !currentRecipientId) {
      setEmptyError(true);
    }
    sendMessage(activeId, currentRecipientId, subject, textarea).then((res) => {
      if (res.status === 200) {
        setSubject("");
        setTextarea("");
        getMessages();
      }
    });
  };
  useEffect(() => {
    setError(false);
  }, [subject, textarea, currentRecipientId]);

  useEffect(() => {
    listSendMessage(activeId, currentRecipientId)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [activeId, currentRecipientId]);

  const findName = (id) => {
    if (!!itemList.length && !!id) {
      const currentItem = itemList.find((item) => {
        return +item.id === +id;
      });
      return currentItem?.name;
    }
  };

  return (
    <div className="h-full text-sm">
      <div className="h-2/5  mb-2 p-2 border-solid border-indigo-900 rounded-lg border-2 flex flex-col gap-1">
        <div className="relative mb-3 mt-3">
          <label
            htmlFor="name"
            className="inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Receiver name
          </label>
          <Select
            value={currentRecipientId}
            onChange={(event) => setCurrentRecipientId(event.target.value)}
          >
            <option>Select name</option>
            {itemList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="relative mb-3 mt-3">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Letter subject
          </label>
          <input
            type="text"
            name="subject"
            id="name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Subject of mail"
          />
        </div>
        {emptyError && <p className="text-red-800">fields can't be empty </p>}

        <div className="flex items-start space-x-4 mt-2">
          <div className="min-w-0  flex-1 relative">
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                rows={3}
                name="comment"
                id="comment"
                value={textarea}
                className="block w-full h-36 resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
                placeholder="Add your text message..."
                onChange={(e) => setTextarea(e.target.value)}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={onSend}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Messages
        messages={messages}
        currentRecipientName={findName(currentRecipientId)}
      />
    </div>
  );
}

export default SendMessage;
