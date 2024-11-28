const themes = {
    classic: {
        noContributions: "rgba(155, 155, 155, 0.2)",
        low: "#8CE89A",  // Brighter green
        moderate: "#3ACC6C",  // Vivid green
        high: "#33B54A",  // More intense green
        veryHigh: "#1C8B2E",  // Deep green
    },
    aurora: {
        noContributions: "rgba(180, 220, 250, 0.2)",
        low: "#6FB8D7",  // Bright blue
        moderate: "#8BCFF6",  // Vivid light blue
        high: "#A3E4FB",  // Bright pastel blue
        veryHigh: "#B5F2FD",  // Very light and vivid blue
    },
    velvet: {
        noContributions: "rgba(200, 130, 170, 0.2)",
        low: "#9D4290",  // Strong magenta
        moderate: "#D069A7",  // Bright magenta
        high: "#F38AC7",  // Very vivid pink
        veryHigh: "#F9B7DB",  // Soft but vivid pink
    },
    forest: {
        noContributions: "rgba(140, 200, 180, 0.2)",
        low: "#5B9075",  // Bright greenish
        moderate: "#7CCDA1",  // Vivid forest green
        high: "#A0E3B5",  // Soft but bright green
        veryHigh: "#B9F1D6",  // Very light, vivid green
    },
    crimson: {
        noContributions: "rgba(255, 160, 160, 0.2)",
        low: "#E84D47",  // Vivid crimson
        moderate: "#F37874",  // Bright red
        high: "#F89F9F",  // Light but vivid red
        veryHigh: "#FDC5C5",  // Soft red with high vibrancy
    },
    solar: {
        noContributions: "rgba(240, 170, 90, 0.2)",
        low: "#FF9B4D",  // Bright orange
        moderate: "#FFB85D",  // Vivid yellow-orange
        high: "#FFD46A",  // Light and vivid yellow
        veryHigh: "#FFF4C6",  // Very soft, but still vivid yellow
    },
    prism: {
        noContributions: "rgba(255, 200, 220, 0.2)",
        low: "#FF6BB6",  // Vivid pinkish red
        moderate: "#FF9C3D",  // Bright orange
        high: "#5BCBFF",  // Bright sky blue
        veryHigh: "#8AF398",  // Fresh vivid green
    },
    galaxy: {
        noContributions: "rgba(190, 130, 230, 0.2)",
        low: "#8E5BB7",  // Deep vibrant purple
        moderate: "#9D5FDB",  // Vivid medium purple
        high: "#E0569E",  // Bright magenta
        veryHigh: "#F3794A",  // Bright coral orange
    },
    pastel: {
        noContributions: "rgba(255, 210, 220, 0.2)",
        low: "#FFB2D5",  // Soft vivid pink
        moderate: "#FFEA6C",  // Bright yellow
        high: "#B3F8B3",  // Soft but bright green
        veryHigh: "#B2F1FF",  // Very light but bright cyan
    },
    monotone: {
        noContributions: "rgba(211, 211, 211, 0.2)",
        low: "#B9B9B9",  // Medium light grey
        moderate: "#9B9B9B",  // Soft medium grey
        high: "#6B6B6B",  // Darker grey
        veryHigh: "#4B4B4B",  // Dark grey
    },
    prison: {
        noContributions: "rgba(160, 200, 240, 0.2)",
        low: "#89CFF0",  // Soft bright blue
        moderate: "#7FFFD4",  // Vivid light cyan
        high: "#00FFFF",  // Bright ocean blue
        veryHigh: "#007FFF",  // Very soft but bright cyan
    },
    chocolate:{
        "noContributions": "#F8D1D1",
        "low": "#BF6C6E",
        "moderate": "#9D4A50",
        "high": "#58111A",
        "veryHigh": "#4E2A1F"
      },
};

const setTheme = (theme) => themes[theme] || themes.forest;

export { setTheme };
