import React from "react";
import moment from "moment/moment";

function Message({ children, title, description, timestamp, styles }) {
  // const date = new Date(timestamp?.seconds * 1000);
  const Moment = moment(timestamp?.seconds * 1000).fromNow();
  return (
    <div className={`shadow-sm  ${styles} my-2 p-2 capitalize`}>
      <p className="text-xs text-gray-600 mb-1">{Moment}</p>
      <h1 className="text-2xl rounded-lg mb-1 text-blue-600 px-4 py-2 border-gray-200  border-2 bg-cyan-200">
        {title}
      </h1>
      <h2 className="bg-white border-2 p-4 rounded-lg">{description}</h2>
      {children}
    </div>
  );
}

export default Message;
