const endOfDay = (date) => {
  const nextDate = new Date(date);
  nextDate.setHours(23, 59, 59, 999);
  return nextDate;
};

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

exports.getDateRangeFilter = (range) => {
  const now = new Date();
  let startDate;
  let endDate;

  if (range === "today") {
    startDate = startOfDay(now);
    endDate = endOfDay(now);
  }

  if (range === "thisWeek") {
    const weekStart = startOfDay(now);
    const daysSinceMonday = (now.getDay() + 6) % 7;
    weekStart.setDate(now.getDate() - daysSinceMonday);
    startDate = weekStart;
    endDate = endOfDay(now);
  }

  if (range === "thisMonth") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = endOfDay(now);
  }

  if (range === "thisYear") {
    startDate = new Date(now.getFullYear(), 0, 1);
    endDate = endOfDay(now);
  }

  return {
    startDate,
    endDate,
  };
};
