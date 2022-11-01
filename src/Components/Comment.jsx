import React from "react";
import moment from "moment/moment";
import { BiUser } from "react-icons/bi";


function Comment({ username, avatar, timestamp, comment }) {
  const Moment = moment(timestamp?.seconds*1000).fromNow()
  return (
    <div className="my-4 p-4">
      <div className="flex items-center gap-2">
       { avatar ? <img className="w-12 rounded-full border-2" src={avatar} alt="user" /> : <BiUser/>}
       <p className="bg-black text-white px-4 py-0 rounded-full">{username ? username : "Anonymous"}</p>
        <p className="text-gray-500 ">{Moment}</p>
      </div>
      <h4 className="capitalize">{comment}</h4>
    </div>
  );
}

export default Comment;
