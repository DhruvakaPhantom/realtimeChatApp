import NavBar from "./Components/NavBar";
import Auth from "./Components/Auth";
import Cookies from "universal-cookie";
import { useState } from "react";
import Room from "./Components/Room";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  if (!isAuth) {
    return (
      <>
        <NavBar />
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return (
    <>
      <Room cookies={cookies} setIsAuth={setIsAuth} />
    </>
  );
}

export default App;
