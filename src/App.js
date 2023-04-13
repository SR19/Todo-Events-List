import React, { useEffect } from "react";
import "./styles.css";
import Header from "./Components/Header";
import EventLists from "./Components/EventLists";

export default function App() {
  const [userType, setUserType] = React.useState("admin");
  const savedData = localStorage.getItem("SavedData");
  const [events, setEvents] = React.useState(JSON.parse(savedData) || []);

  useEffect(() => {
    localStorage.setItem("SavedData", JSON.stringify(events));
  }, [events]);

  return (
    <div className="App">
      <Header setUserType={setUserType} />
      <EventLists events={events} userType={userType} setEvents={setEvents} />
    </div>
  );
}
