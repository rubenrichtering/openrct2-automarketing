function addWeeksToDate(weeks: number): {
  year: number;
  month: number;
  day: number;
} {
  const daysInMonth = [31, 30, 31, 30, 31, 30, 31, 31]; // March (0) to October (7)
  const currentDate = date; // Assume this is the current date object from OpenRCT2
  let totalDaysToAdd = weeks * 7;

  let newYear = currentDate.year;
  let newMonth = currentDate.month;
  let newDay = currentDate.day + totalDaysToAdd;

  // Adjust for overflow into the next month/year
  while (newDay > daysInMonth[newMonth]) {
    newDay -= daysInMonth[newMonth]; // Subtract days in the current month
    newMonth++; // Move to the next month

    if (newMonth >= daysInMonth.length) {
      newMonth = 0; // Wrap around to March (month 0 in OpenRCT2)
      newYear++; // Increment the year
    }
  }

  return {
    year: newYear,
    month: newMonth,
    day: newDay,
  };
}

function isDateEqualOrBefore(
  date1: { year: number; month: number; day: number },
  date2: { year: number; month: number; day: number }
): boolean {
  // Compare years
  if (date1.year < date2.year) {
    return true;
  } else if (date1.year > date2.year) {
    return false;
  }

  // Compare months (years are equal at this point)
  if (date1.month < date2.month) {
    return true;
  } else if (date1.month > date2.month) {
    return false;
  }

  // Compare days (years and months are equal at this point)
  return date1.day <= date2.day;
}
