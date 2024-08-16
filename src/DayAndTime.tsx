import { useEffect, useState } from "react";

function DayAndTime() {
  const today = new Date();
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = today.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-end">
        <h2 className="text-3xl">{currentTime}</h2>
      </div>
      <div className="flex justify-end">
        <p className="text-xl">{formattedDate}</p>
      </div>
    </div>
  );
}

export default DayAndTime;
