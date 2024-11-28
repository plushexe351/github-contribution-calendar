const fetchContributionsData = async (token, username, year) => {
    const query = `
      {
        user(login: "${username}") {
          contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    // Initialize contributions data (365 days or 366 days for leap years)
    const contributionsData = new Array(365).fill({
      contributionCount: 0,
      date: "",
    });

    // Loop through the weeks and days from the query result
    const weeks =
      data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    weeks?.forEach((week) => {
      week?.contributionDays?.forEach((day) => {
        const dayOfYear = getDayOfYear(new Date(day.date));
        contributionsData[dayOfYear] = {
          contributionCount: day?.contributionCount,
          date: day?.date,
        };
      });
    });

    return contributionsData;
  };


const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

const getStartDateOfYear = () => {
    const date = new Date();
    date.setMonth(0); // January
    date.setDate(1); // First day of the year
    return date;
};

const hexToRgba = (hex, alpha) => {
    const rgb = hex.replace("#", "").match(/.{1,2}/g).map((x) => parseInt(x, 16));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};



export { getDayOfYear, getStartDateOfYear, hexToRgba, fetchContributionsData };