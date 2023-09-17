import YearlyCalendar from "../component/YearlyCalendar";
import Navbar from "../component/Navbar";
import { useState } from "react";
import dayjs from "dayjs";
import { YEAR } from "../../variables";
import React from "react";
import DataFetcher from "../../services/DataFetcher";
import DataFormatter from "../../services/DataFormatter";

export default function CalendarPage({ startDate, endDate, channelId }) {
  const [calendarView, setCalendarView] = useState(YEAR);
  const [date, setDate] = useState(dayjs());

  React.useEffect(() => {
    (async () => {
      const dataFetcher = new DataFetcher(channelId, startDate, endDate);
      await dataFetcher.initializeFetching(); // no await required since its not returning any promise...
      const dataFormatter = new DataFormatter(dataFetcher.YoutubeResponses);
      dataFormatter.standardizeDataFormat();
    })();
  }, []);

  return (
    <div className="flex flex-col height-full width-full">
      <div style={{ height: "70px", position: "fixed" }}>
        <Navbar
          calendarView={calendarView}
          setCalendarView={setCalendarView}
          date={date}
          setDate={setDate}
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      <div
        className="width-full flex"
        style={{ flexGrow: 1, marginTop: "70px" }}
      >
        <YearlyCalendar showNumberOfMonths={calendarView} date={date} />
      </div>
    </div>
  );
}
