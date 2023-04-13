import React, { useState } from "react";
import "../../styles.css";
import NoResponseComponent from "../NoResponseComponent";

function TimeSlotCard({ event, userType, deleteSlot, idx, setEvents }) {
  const { hour, min } = event;
  const [data, setData] = useState({ hour: hour, min: min });
  const [isEditing, setEditing] = useState(false);

  // const handleUpdate = (e, key) => {
  //   setData((prev) => {
  //     return { ...prev, [key]: e.target.value };
  //   });
  // };

  const handleSave = () => {
    setEvents((prev) => {
      if (prev.some((e) => e.hour === data.hour && e.min === data.min)) {
        alert("Same timeslot, data already exists!");
        return prev;
      } else {
        const tempData = [...prev];
        tempData[idx] = data;
        return tempData;
      }
    });
    setEditing(false);
  };

  return (
    <>
      <h4>
        {!isEditing && (
          <>
            HH: {hour} <span>MM: {min}</span>
          </>
        )}
        {isEditing && (
          <>
            {" "}
            {/* <input
              type="number"
              value={data.hour}
              onChange={(e) => handleUpdate(e, "hour")}
            />
            <input
              type="number"
              value={data.min}
              onChange={(e) => handleUpdate(e, "min")}
            /> */}
            <input
              id="appt-time"
              type="time"
              name="appt-time"
              defaultValue={event.hour + ":" + event.min}
              onChange={(e) => {
                const time = e.target.value.split(":");
                setData({ hour: time[0], min: time[1] });
              }}
            />
          </>
        )}
        {userType === "admin" && (
          <span>
            {!isEditing && (
              <button className="Button" onClick={() => setEditing(true)}>
                Update
              </button>
            )}
            {isEditing && (
              <button className="Button" onClick={handleSave}>
                Save
              </button>
            )}
            <button
              className="Button"
              disabled={isEditing}
              onClick={() => deleteSlot({ hour, min })}
            >
              Remove
            </button>
          </span>
        )}
      </h4>
    </>
  );
}

function AddEvent({ events, setEvents }) {
  const [slots, setSlots] = useState({ hour: "", min: "" });
  // const handleChange = (e, key) => {
  //   setSlots((prev) => {
  //     return { ...prev, [key]: e.target.value };
  //   });
  // };
  const saveSlot = () => {
    if (events.some((e) => e.hour === slots.hour && e.min === slots.min)) {
      alert("slots for same time Exists!");
    } else {
      setEvents((prevVal) => [...prevVal, slots]);
    }
    setSlots({ hour: "", min: "" });
  };
  return (
    <>
      <input
        id="appt-time"
        type="time"
        name="appt-time"
        value={slots.hour + ":" + slots.min}
        onChange={(e) => {
          const time = e.target.value.split(":");
          setSlots({ hour: time[0], min: time[1] });
        }}
      />
      {/* <input
        type="type"
        value={slots.hour}
        onChange={(e) => handleChange(e, "hour")}
      />
      <input
        type="number"
        value={slots.min}
        onChange={(e) => handleChange(e, "min")}
      /> */}
      <button
        className="Button"
        disabled={slots.hour === "" || slots.min === ""}
        onClick={saveSlot}
      >
        Add
      </button>
    </>
  );
}

export default function EventLists({ events = [], userType, setEvents }) {
  const deleteSlot = ({ hour, min }) => {
    setEvents((prev) =>
      prev.filter((e) => !(e.hour === hour && e.min === min))
    );
  };

  return (
    <>
      <div>
        {userType === "admin" && (
          <AddEvent events={events} setEvents={setEvents} />
        )}
      </div>
      {events.length > 0 ? (
        events.map((event, idx) => (
          <TimeSlotCard
            idx={idx}
            setEvents={setEvents}
            key={event.hour + "_" + event.min}
            event={event}
            userType={userType}
            deleteSlot={deleteSlot}
          />
        ))
      ) : userType === "admin" ? (
        <NoResponseComponent
          mainText={"All Slots are Empty ! "}
          subText={"Please Add some slots."}
        />
      ) : (
        <NoResponseComponent
          mainText={"All Slots are Empty ! "}
          subText={"Come Back Later."}
        />
      )}
    </>
  );
}
