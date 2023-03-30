export const getListRec = async () => {
  const url = "http://localhost:5001/list";
  const response = await fetch(url, {
    method: "GET",
  });
  return response;
};

export const getUserByName = async (name) => {
  const url = "http://localhost:5001/getUserByName";
  const data = { name: name };
  const response = await fetch(
    url,

    {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  );
  return response;
};

export const login = async (name) => {
  const url = "http://localhost:5001/login";
  const data = {
    name: name,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  return response;
};

export const sendMessage = async (senderID, recipID, subject, message) => {
  const url = "http://localhost:5001/sendMessage";
  const data = {
    sender_id: senderID,
    recipient_id: recipID,
    subject: subject,
    message: message,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  return response;
};

export const listSendMessage = async (myId, recId) => {
  const url = "http://localhost:5001/listSendMessage";
  const data = {
    sender_id: myId,
    recipient_id: recId,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  return response;
};

export const receivedMessage = async (myId) => {
  const url = "http://localhost:5001/receivedMessage";
  const data = {
    recipient_id: myId,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  return response;
};
