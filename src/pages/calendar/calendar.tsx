import { useState, useRef, useEffect } from "react";
import EventCard from "components/event/EventCard";
import { ICyclingEvent } from "interfaces/ICyclingEvent";
import { daysOfWeek, monthsOfYear } from "constants/calendar";
import "./calendar.css";

const CalendarPage = () => {
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState<ICyclingEvent[]>([]);
  const spanRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [clickedDate, setClickedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
    } else {
      setShowEventPopup(false);
    }
    setClickedDate(clickedDate);
  };

  useEffect(() => {
    if (showEventPopup && popupRef.current && spanRefs.current && clickedDate) {
      const day = clickedDate.getDate();
      const span = spanRefs.current[day];
      const popup = popupRef.current;

      if (!span || !popup) return;

      const spanRect = span.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();

      let newTop = spanRect.top + window.scrollY + spanRect.height + 10;
      let newLeft = spanRect.left + window.scrollX;

      // Adjust vertically if it overflows
      if (newTop + popupRect.height > window.scrollY + window.innerHeight) {
        newTop = spanRect.top + window.scrollY - popupRect.height - 10;
        if (newTop < window.scrollY) {
          newTop = window.scrollY + 10;
        }
      }

      // Adjust horizontally if it overflows
      if (newLeft + popupRect.width > window.scrollX + window.innerWidth) {
        newLeft = window.scrollX + window.innerWidth - popupRect.width - 10;
      }
      if (newLeft < window.scrollX) {
        newLeft = window.scrollX + 10;
      }

      setPopupPosition({ top: newTop, left: newLeft });
    }
  }, [showEventPopup, clickedDate]);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = (newEvent: ICyclingEvent) => {
    let updatedEvents = [...events, newEvent];

    updatedEvents.sort(
      (a: ICyclingEvent, b: ICyclingEvent) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setEvents(updatedEvents);
  };

  return (
    <div>
      <div className="calendar">
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]}</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`}></span>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              ref={(el) => (spanRefs.current[day + 1] = el)}
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
        {showEventPopup && (
          <div
            ref={popupRef}
            className="event-popup"
            style={{
              position: "absolute",
              top: popupPosition.top,
              left: popupPosition.left,
              zIndex: 1000, // Make sure it appears above other elements
            }}
          >
            <EventCard
              selectedDate={selectedDate}
              setShowEventPopup={setShowEventPopup}
              addEventCallback={handleEventSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
