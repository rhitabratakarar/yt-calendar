import React from "react";
import moment from "moment";

const Month = ({ date }) => {
  const year = date.year();
  const month = date.month();
  const generateCalendarGrid = () => {
    const startOfMonth = moment([year, month]).startOf("month");
    const endOfMonth = moment([year, month]).endOf("month");
    const startOfWeek = startOfMonth.startOf("week");
    const endOfWeek = endOfMonth.endOf("week");

    let calendarGrid = [];
    let currentDay = startOfWeek.clone();

    while (currentDay.isSameOrBefore(endOfWeek)) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDay.clone());
        currentDay.add(1, "day");
      }
      calendarGrid.push(week);
    }

    return calendarGrid;
  };

  const calendarGrid = generateCalendarGrid();

  return (
    <div>
      <div className="my-calendar">
        <div className="my-calendar-header">
          {moment.weekdaysShort().map((day) => (
            <div key={day} className="my-calendar-header-cell">
              {day}
            </div>
          ))}
        </div>
        {calendarGrid.map((week, index) => (
          <div key={index} className="my-calendar-row">
            {week.map((day) => (
              <div key={day.format("YYYY-MM-DD")} className="my-calendar-cell">
                {day.format("D")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
