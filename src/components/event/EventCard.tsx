import { useState } from "react";
import { ICyclingEvent } from "interfaces/ICyclingEvent";
import EventPopupInput from "./popupInputs/PopupInput";
import "./EventCard.css";

interface EventCardProps {
  selectedDate: Date;
  setShowEventPopup: (show: boolean) => void;
  addEventCallback: (event: ICyclingEvent) => void;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  // todo: fix this bug: when closing the card and opening a new in another position it
  // seems as its loaded elsewhere and moved. also printing here something seems to be
  // rendered 4 times!
  const { selectedDate, setShowEventPopup, addEventCallback } = props;

  const [eventStartTime, setEventStartTime] = useState({
    hours: "00",
    minutes: "00",
  });
  const [eventDescription, setEventDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDistance, setEventDistance] = useState(0);
  const [eventRideTime, setEventRideTime] = useState(0);
  const [eventDifficulty, setEventDifficulty] = useState("");
  const [eventDifficultyLevel, setEventDifficultyLevel] = useState(0);
  const [eventRideLeader, setEventRideLeader] = useState("");
  const [eventRouteType, setEventRouteType] = useState("");
  const [eventStartPoint, setEventStartPoint] = useState("");
  const [editingEvent, setEditingEvent] = useState<ICyclingEvent | null>(null);

  const handleEventSubmit = () => {
    const newEvent = {
      date: selectedDate,
      title: eventTitle,
      startTime: eventStartTime,
      description: eventDescription,
      distance: eventDistance,
      rideTime: eventRideTime,
      difficulty: eventDifficulty,
      difficultyLevel: eventDifficultyLevel,
      rideLeader: eventRideLeader,
      routeType: eventRouteType,
      startPoint: eventStartPoint,
    } as ICyclingEvent;

    addEventCallback(newEvent);

    setEventStartTime({ hours: "00", minutes: "00" });
    setEventRideTime(0);
    setEventDistance(0);
    setEventTitle("");
    setEventDifficulty("");
    setEventDifficultyLevel(0);
    setEventDescription("");
    setEditingEvent(null);
    setEventRideLeader("");
    setEventRouteType("");
    setEventStartPoint("");
    setShowEventPopup(false);
  };

  // const handleTimeChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setEventStartTime((prevTime) => {
  //     return {
  //       ...prevTime,
  //       [name]: value.padStart(2, "0"),
  //     };
  //   });
  // };

  return (
    <div className="event-popup">
      {/* <div className="time-input">
        <div className="event-popup-time">Start Time</div>
        <input
          type="number"
          name="hours"
          min={0}
          max={24}
          className="hours"
          value={eventStartTime.hours}
          onChange={handleTimeChange}
        />
        <input
          type="number"
          name="minutes"
          min={0}
          max={24}
          className="minutes"
          value={eventStartTime.minutes}
          onChange={handleTimeChange}
        />
      </div>
      <textarea
        placeholder="Enter Event Text (Maximum 60 Characters)"
        value={eventDescription}
        onChange={(e) => {
          if (e.target.value.length <= 60) {
            setEventDescription(e.target.value);
          }
        }}
      ></textarea> */}
      <EventPopupInput
        label="Ride Time (H)"
        value={eventRideTime}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEventRideTime(Number(e.target.value))
        }
        className="ride-time"
      />
      <EventPopupInput
        label="Start Point"
        placeholder="Start Point"
        value={eventStartPoint}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEventStartPoint(e.target.value)
        }
        className="start-point"
      />
      <EventPopupInput
        label="Distance (Km)"
        value={eventDistance}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEventDistance(Number(e.target.value))
        }
        className="distance"
      />

      <button className="event-popup-btn" onClick={handleEventSubmit}>
        {editingEvent ? "Update Event" : "Add Event"}
      </button>
      <button
        className="close-event-popup"
        onClick={() => setShowEventPopup(false)}
      >
        <i className="bx bx-x"></i>
      </button>
    </div>
  );
};

export default EventCard;
