export default function intlDates({ locale = "default", date = null } = {}) {
  // Set options passed to Intl calls
  const intlBaseOptions = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const intlMonthWeekdayLongOptions = {
    month: "long",
    weekday: "long",
  };

  const intlMonthWeekdayShortOptions = {
    month: "short",
    weekday: "short",
  };

  const findStartOfWeek = (intlValues) => {
    const weekday = intlValues[0].value;
    const dayOfMonth = intlValues[4].value;

    switch (weekday) {
      case "Sunday":
        return Number(dayOfMonth);
      case "Monday":
        return Number(dayOfMonth) - 1;
      case "Tuesday":
        return Number(dayOfMonth) - 2;
      case "Wednesday":
        return Number(dayOfMonth) - 3;
      case "Thursday":
        return Number(dayOfMonth) - 4;
      case "Friday":
        return Number(dayOfMonth) - 5;
      case "Saturday":
        return Number(dayOfMonth) - 6;
      default:
        return null;
    }
  };

  const findEndOfWeek = (intlValues) => {
    const weekday = intlValues[0].value;
    const dayOfMonth = intlValues[4].value;

    switch (weekday) {
      case "Sunday":
        return Number(dayOfMonth) + 6;
      case "Monday":
        return Number(dayOfMonth) + 5;
      case "Tuesday":
        return Number(dayOfMonth) + 4;
      case "Wednesday":
        return Number(dayOfMonth) + 3;
      case "Thursday":
        return Number(dayOfMonth) + 2;
      case "Friday":
        return Number(dayOfMonth) + 1;
      case "Saturday":
        return Number(dayOfMonth);
      default:
        return null;
    }
  };

  const daysInMonth = (monthAsNum, yearAsNum) => {
    switch (monthAsNum) {
      case 1:
        return 31;
      case 2:
        // Determine if it is a leap year and adjust Feburary if needed
        if (yearAsNum % 4 !== 0) {
          return 28;
        } else if (yearAsNum % 100 !== 0) {
          return 29;
        } else if (yearAsNum % 400 !== 0) {
          return 28;
        } else {
          return 29;
        }
      case 3:
        return 31;
      case 4:
        return 30;
      case 5:
        return 31;
      case 6:
        return 30;
      case 7:
        return 31;
      case 8:
        return 31;
      case 9:
        return 30;
      case 10:
        return 31;
      case 11:
        return 30;
      case 12:
        return 31;
      default:
        return null;
    }
  };

  // Set startValues with Intl -- locale needs to stay English here so switch above can match
  const baseFormatter = new Intl.DateTimeFormat("en-US", intlBaseOptions);
  const startValues = baseFormatter.formatToParts(
    !!date ? new Date(date) : new Date()
  );

  // Save commonly used values from startValues
  const startValuesYear = startValues[6].value;
  const startValuesMonth = startValues[2].value;
  const startValuesDayNum = startValues[4].value;

  /* Derive this week start and end dates to export */
  // Week Start Date
  let weekStartDate;
  const beginOfMonthDiff = findStartOfWeek(startValues);

  // Check if start of week is in previous month
  if (beginOfMonthDiff <= 0) {
    let prevYear = null;
    let prevMonth = Number(startValuesMonth) - 1;

    // Make date adjustments if start of week is in previous year
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = Number(startValuesYear) - 1;
    }

    const daysInPrevMonth = daysInMonth(prevMonth, Number(startValuesYear));

    weekStartDate = `${prevYear || startValuesYear}-${prevMonth}-${
      daysInPrevMonth + beginOfMonthDiff
    }`;
  } else {
    weekStartDate = `${startValuesYear}-${startValuesMonth}-${beginOfMonthDiff}`;
  }

  // Week End Date
  let weekEndDate;
  const endOfMonthDiff =
    findEndOfWeek(startValues) -
    daysInMonth(Number(startValuesMonth), Number(startValuesYear));

  // Check if end of week is in next month
  if (endOfMonthDiff > 0) {
    let nextYear = null;
    let nextMonth = Number(startValuesMonth) + 1;

    // Make date adjustments if end of week is in next year
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = Number(startValuesYear) + 1;
    }

    weekEndDate = `${
      nextYear || startValuesYear
    }-${nextMonth}-${endOfMonthDiff}`;
  } else {
    weekEndDate = `${startValuesYear}-${startValuesMonth}-${findEndOfWeek(
      startValues
    )}`;
  }

  // Set additional values to export
  const dateYMD = `${startValuesYear}-${startValuesMonth}-${startValuesDayNum}`;

  const dateDMY = `${startValuesDayNum}-${startValuesMonth}-${startValuesYear}`;

  const dateMDY = `${startValuesMonth}-${startValuesDayNum}-${startValuesYear}`;

  const monthNumeric = startValuesMonth;

  const dayOfMonth = startValuesDayNum;

  const year = startValuesYear;

  // Set monthLong weekdayLong values to export
  const longFormatter = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayLongOptions
  );
  const longFormatted = longFormatter.formatToParts(
    !!date ? new Date(date) : new Date()
  );

  const monthLong = longFormatted[0].value;
  const weekdayLong = longFormatted[2].value;

  // Set monthShort and weekdayShort values to export
  const shortFormatter = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayShortOptions
  );
  const shortFormatted = shortFormatter.formatToParts(
    !!date ? new Date(date) : new Date()
  );

  const monthShort = shortFormatted[0].value;
  const weekdayShort = shortFormatted[2].value;

  const dates = {
    weekStartDate,
    weekEndDate,
    dateYMD,
    dateDMY,
    dateMDY,
    weekdayLong,
    weekdayShort,
    dayOfMonth,
    monthNumeric,
    monthLong,
    monthShort,
    year,
  };

  return dates;
}
