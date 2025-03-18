export const moodTypes = [
  {
    value: 1,
    label: "Cheerful",
    color: "rgb(132 204 22 / var(--tw-bg-opacity, 1))",
    icon: "😄",
  },
  {
    value: 2,
    label: "Happy",

    color: "rgb(34 197 94 / var(--tw-bg-opacity, 1))",
    icon: "😊",
  },
  {
    value: 3,
    label: "Normal",
    color: "rgb(234 179 8 / var(--tw-bg-opacity, 1))",
    icon: "🙂",
  },
  {
    value: 4,
    label: "Angry",
    color: "rgb(251 146 60 / var(--tw-bg-opacity, 1))",
    icon: "😠",
  },
  {
    value: 5,
    label: "Sad",
    color: "rgb(6 182 212 / var(--tw-bg-opacity, 1))",
    icon: "😞",
  },
  {
    value: 6,
    label: "Depressed",
    color: "rgb(79 70 229 / var(--tw-bg-opacity, 1))",
    icon: "😢",
  },
];

export const monthNames = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getRandomMoodValue() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function generateMoodData() {
  const data = {};
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    let year = currentYear;
    let month = currentMonth - monthOffset;

    if (month <= 0) {
      month += 12;
      year -= 1;
    }

    if (!data[year]) {
      data[year] = {};
    }

    if (!data[year][month]) {
      data[year][month] = {};
    }

    const daysInMonth = getDaysInMonth(year, month);

    for (let day = 1; day <= daysInMonth; day++) {
      if (Math.random() < 0.8) {
        data[year][month][day] = getRandomMoodValue();
      }
    }
  }

  return data;
}

export function getAvailableYears(data) {
  return Object.keys(data)
    .map((year) => Number.parseInt(year))
    .sort();
}

export function getAvailableMonths(data, year) {
  if (!data) return [];
  if (!data[year]) return [];
  return Object.keys(data[year])
    .map((month) => Number.parseInt(month))
    .sort();
}

export function getMoodDataForMonth(data, year, month) {
  if (!data[year] || !data[year][month]) return [];

  return Object.entries(data[year][month])
    .map(([day, value]) => ({
      day: Number.parseInt(day),
      value,
    }))
    .sort((a, b) => a.day - b.day);
}

export function getMoodDistributionForMonth(data, year, month) {
  if (!data[year] || !data[year][month]) return [];

  const distribution = moodTypes.map((type) => ({
    mood: type.label,
    count: 0,
    color: type.color,
  }));

  Object.values(data[year][month]).forEach((value) => {
    distribution[value - 1].count++;
  });

  return distribution.filter((item) => item.count > 0);
}

export function getMoodByDayOfWeek(data, year, month) {
  if (!data[year] || !data[year][month]) return [];

  const dayOfWeekData = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  Object.entries(data[year][month]).forEach(([day, value]) => {
    const date = new Date(year, month - 1, Number.parseInt(day));
    const dayOfWeek = dayNames[date.getDay()];
    dayOfWeekData[dayOfWeek].push(value);
  });

  return dayNames.map((day) => ({
    day,
    value:
      dayOfWeekData[day].length > 0
        ? dayOfWeekData[day].reduce((sum, val) => sum + val, 0) /
          dayOfWeekData[day].length
        : 0,
  }));
}

export function getMoodByMonth(data, year) {
  if (!data[year]) return [];

  return Object.keys(monthNames).map((name, index) => {
    const monthNumber = index;
    if (!data[year][monthNumber]) {
      return { month: name, value: 0 };
    }

    const values = Object.values(data[year][monthNumber]);
    return {
      month: name,
      value:
        values.length > 0
          ? values.reduce((sum, val) => sum + val, 0) / values.length
          : 0,
    };
  });
}

export function getMoodDistributionForRadar(data, year, month) {
  const distribution = getMoodDistributionForMonth(data, year, month);

  return moodTypes.map((type) => ({
    subject: type.label,
    A: distribution.find((d) => d.mood === type.label)?.count || 0,
  }));
}

export function getComparisonData(data, year, month1, month2) {
  const categories = [
    { name: "Positive Moods", filter: (v) => v <= 2 },
    { name: "Neutral Moods", filter: (v) => v === 3 },
    { name: "Negative Moods", filter: (v) => v >= 4 },
    { name: "Average Mood", filter: (v) => true, isAverage: true },
  ];

  const month1Data = data[year]?.[month1]
    ? Object.values(data[year][month1])
    : [];
  const month2Data = data[year]?.[month2]
    ? Object.values(data[year][month2])
    : [];

  return categories.map((category) => {
    let month1Value = 0;
    let month2Value = 0;

    if (category.isAverage) {
      month1Value =
        month1Data.length > 0
          ? month1Data.reduce((sum, val) => sum + val, 0) / month1Data.length
          : 0;
      month2Value =
        month2Data.length > 0
          ? month2Data.reduce((sum, val) => sum + val, 0) / month2Data.length
          : 0;
    } else {
      month1Value = month1Data.filter(category.filter).length;
      month2Value = month2Data.filter(category.filter).length;
    }

    return {
      category: category.name,
      month1Value,
      month2Value,
    };
  });
}
