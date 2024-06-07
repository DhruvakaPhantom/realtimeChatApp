import { useForm } from "react-hook-form";
import { db } from "../Config/firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth } from "../Config/firebase";

const Chat = (props) => {
  const { register, handleSubmit, watch } = useForm();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", props.room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  const onSubmit = async (data) => {
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: props.room,
    });
    setNewMessage("");
  };

  return (
    <div className=" h-screen flex justify-center items-center flex-col">
      <div className=" h-[35rem] w-[22rem] flex flex-col items-center rounded-2xl  bg-[#F5F5F5] shadow-2xl justify-between border-2 border-black">
        <div className="bg-blue-600 w-full text-center p-4 text-white text-2xl font-semibold font-[roboto] rounded-t-2xl">
          Welcome to room: {props.room}
        </div>
        <div className=" h-[25rem] w-[20rem] overflow-y-scroll ">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center gap-1 p-2 ">
              <div className="font-[roboto] text-lg font-semibold ">
                {message.user}:
              </div>
              <div className="font-[roboto] text-lg  ">{message.text}</div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-blue-600 w-full flex h-[4rem] justify-center items-center rounded-b-2xl space-x-2 "
        >
          <input
            type="text"
            className="border-2 border-black outline-none w-[15rem] h-[3rem] p-2 rounded-xl font-[roboto]"
            placeholder="Type your message..."
            name="newMessage"
            {...register("newMessage")}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            value={newMessage}
          />
          <button
            type="submit"
            className=" border-2 border-black p-2 outline-none bg-green-600 text-white font-[roboto] font-medium h-[3rem] w-[5rem] text-xl rounded-xl"
          >
            Send
          </button>
        </form>
      </div>
      <button
        onClick={props.signUserOut}
        className="border border-slate-500 bg-red-600 outline-none rounded-md w-[15rem] p-2
              text-white font-[roboto] font-medium text-xl mt-5 hover:bg-blue-400"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Chat;
