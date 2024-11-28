import React, { useEffect, useState } from "react";
import "./GitHubCalendar.css";
import "./Loader.css";
import { defaultProps } from "./DefaultProps";
import { setTheme } from "./theme";
import Loader from "./Loader";
import { getStartDateOfYear, hexToRgba, fetchContributionsData } from "./helper";

const GitHubCalendar = ({
  token,
  username,
  year = defaultProps.year,
  theme = defaultProps.theme,
  cellSize = defaultProps.cellSize,
  showLabels = defaultProps.showLabels,
  background = defaultProps.background,
  labelColor = defaultProps.labelColor,
  showTotalContributions = defaultProps.showTotalContributions,
  fontSize = defaultProps.fontSize,
  titleColor = defaultProps.titleColor,
  showKeys = defaultProps.showKeys,
  customTheme = {}
}) => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  let contributionsPalette = theme !== "custom" ? setTheme(theme) : customTheme;

  if(theme==="honeymoon" || theme==="minecraft"){
    showKeys = false;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contributionsData = await fetchContributionsData(token, username, year);
        setDays(contributionsData);
        setTotalContributions(
          contributionsData.reduce((sum, day) => sum + day.contributionCount, 0)
        );
      } catch (error) {
        console.log("Couldn't fetch contributions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, username, year]);

  // cell styles for exclusive and default themes
if(theme === "minecraft"){
  background = "#c6c6c6"
  contributionsPalette = {
    noContributions : "#8b8b8b",
    low:"#868e07",
    moderate:"#6a750c",
    high:"#4a5c08",
    veryHigh: "#273e06"
  }
}
  const getCellStyle = (cell) => {
    const isValidDate = cell && cell.date && cell.date !== "";
    const cellStyle = {
      "minecraft": {
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        fontSize: `${cellSize - 5}px`,
        visibility: isValidDate ? "visible" : "hidden", // Hide invalid cells
        border: `1px solid ${hexToRgba(contributionsPalette.low, 0.12)}`,
        textShadow: `
        -1.1px -1.1px 0px black, /* Top-left shadow */
        1.1px -1.1px 0px black,  /* Top-right shadow */
        -1.1px 1.1px 0px black,  /* Bottom-left shadow */
        1.1px 1.1px 0px black    /* Bottom-right shadow */
      `,
      borderRadius:"0",
      borderLeft:"1px solid black",
      borderTop:"1px solid black",
      borderRight:"1px solid white",
      borderBottom:"1px solid white",
        backgroundColor: isValidDate
          ? getColorForContributions(cell?.contribution || 0)
          : "transparent",
      },
      "honeymoon": {
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        fontSize: `${cellSize - 5}px`,
        visibility: isValidDate ? "visible" : "hidden", // Hide invalid cells
      },
      "default": {
        backgroundColor: isValidDate
          ? getColorForContributions(cell?.contribution || 0)
          : "transparent",
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        border: `1px solid ${hexToRgba(contributionsPalette.low, 0.12)}`,
        visibility: isValidDate ? "visible" : "hidden",
      }
    }
    return cellStyle[theme] || cellStyle.default;
  }

  const getColorForContributions = (count) => {
    if (count === 0) return contributionsPalette.noContributions;
    if (count <= 1) return contributionsPalette.low;
    if (count <= 3) return contributionsPalette.moderate;
    if (count <= 5) return contributionsPalette.high;
    return contributionsPalette.veryHigh;
  };

  const generateCalendar = () => {
    const yearStart = getStartDateOfYear();
    const totalDaysInYear = 365 + (yearStart.getFullYear() % 4 === 0 ? 1 : 0);
    const calendar = [];
    let currentDay = yearStart;

    for (let i = 0; i < totalDaysInYear; i++) {
      const dayOfWeek = currentDay.getDay();
      const date = currentDay.toISOString().split("T")[0];

      calendar.push({
        day: i,
        dayOfWeek,
        contribution: days[i]?.contributionCount || 0,
        date: days[i]?.date || "",
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    const lastDay = calendar[calendar.length - 1];
    if (!lastDay || lastDay.date !== `${year}-12-31`) {
      calendar.push({
        day: totalDaysInYear - 1,
        dayOfWeek: 6,
        contribution: days[totalDaysInYear - 1]?.contributionCount || 0,
        date: `${year}-12-31`,
      });
    }

    return calendar;
  };

  const calendarData = generateCalendar();

  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (loading) return <Loader />;

  return (
    <div className="github-calendar">
      {showTotalContributions && (
        <div
          className="total-contributions"
          style={{ fontSize: `${fontSize}px`, color: `${titleColor}` }}
        >
          {totalContributions} contributions in {year}
        </div>
      )}
      <div className="border-container" style={{ backgroundColor: background }}>
        {showLabels && (
          <div
            className="calendar-labels"
            style={{
              fontSize: `${fontSize}px`,
              color: labelColor,
              paddingLeft: ` calc(${fontSize * 2.3}px + 0.5rem)`,
            }}
          >
            {monthLabels.map((month, index) => (
              <div
                key={index}
                className="calendar-month-label"
                style={{ width: `${cellSize * 4.75 + 12}px` }}
              >
                {month}
              </div>
            ))}
          </div>
        )}
        <div className="calendar-body">
          {showLabels && (
            <div className="day-labels" style={{ fontSize: `${fontSize}px`, color: labelColor }}>
              {dayLabels.map((day, index) => (
                <div key={index} className="day-label" style={{ height: `${cellSize}px` }}>
                  {day}
                </div>
              ))}
            </div>)}
          {Array.from({ length: 53 }, (_, weekIndex) => (
            <div className="week" key={weekIndex}>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayIndexInYear = weekIndex * 7 + dayIndex;
                const cell = calendarData[dayIndexInYear];
                const isValidDate = cell && cell.date && cell.date !== "";

                return (
                  <div
                    key={cell ? cell.day : `empty-${dayIndex}`}
                    className="calendar-cell"
                    data-contribution-tooltip={`${isValidDate ? cell?.contribution : 0
                      } contributions on ${new Date(cell?.date).toDateString()}`}
                    style={getCellStyle(cell)}

                  >
                    {theme === "honeymoon" && (cell?.contribution === 0 ? "🤍" : "♥️")}
                    {theme === "minecraft" && (
                      cell?.contribution === 0
                        ? ""  // No contributions 
                        : cell?.contribution <= 2
                          ? "🏹"  // Low contributions - Bow
                          : cell?.contribution <= 4
                            ? "🗡️"  // Moderate contributions - Sword
                            : cell?.contribution <= 6
                              ? "🍎"  // High contributions - Apple
                              : "🪙"  // Very high contributions - Coin
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {showKeys && (

          <div className="key" style={{fontSize:`${fontSize}px`, color: labelColor}}>
          Less
  {Object.entries(contributionsPalette).map(([key, color], index) => (
    <div
    key={index}
    className="calendar-cell"
    style={{
      height: `${cellSize}px`,
      width: `${cellSize}px`,
      backgroundColor: color,
      border: "1px solid rgba(0, 0, 0, 0.1)", // Optional: To make each cell more defined
    }}
    title={key} // Optional: Tooltip for better context
    ></div>
  ))}
  More
</div>
)}

      </div>
    </div>
  );
};

export default GitHubCalendar;
