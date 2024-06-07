import React, { useState, useRef, useEffect } from "react";
import Chat from "./Chat";
import NavBar from "./NavBar";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";

const Room = (props) => {
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  useEffect(() => {
    if (room === "") {
      alert("Room name cannot be empty");
    }
  }, [room]);

  const signUserOut = async () => {
    await signOut(auth);
    props.cookies.remove("auth-token");
    props.setIsAuth(false);
    setRoom(null);
  };
  return (
    <div>
      <NavBar />
      {room ? (
        <div>
          <Chat room={room} signUserOut={signUserOut} />
        </div>
      ) : (
        <div className="flex justify-center items-center  h-screen">
          <div className=" flex flex-col p-4 justify-center items-center h-[25rem] w-[20rem] rounded-2xl border border-slate-300 bg-[#F5F5F5] shadow-2xl">
            <label
              htmlFor="roomName"
              className="font-[roboto] text-xl font-semibold "
            >
              Enter room name:
            </label>
            <input
              type="text"
              name="roomName"
              id="roomName"
              ref={roomInputRef}
              className="border border-slate-500 outline-none rounded-md w-[15rem] p-2 mt-4"
            />
            <button
              onClick={() => setRoom(roomInputRef.current.value)}
              className="border border-slate-500 bg-blue-600 outline-none rounded-md w-[15rem] p-2
              text-white font-[roboto] font-medium text-xl mt-5 hover:bg-blue-400"
            >
              Enter Room
            </button>
            <button
              onClick={signUserOut}
              className="border border-slate-500 bg-red-600 outline-none rounded-md w-[15rem] p-2
              text-white font-[roboto] font-medium text-xl mt-5 hover:bg-blue-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
