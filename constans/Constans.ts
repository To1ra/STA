const titleParser: Record<string, string> = {
  index: "Home",
  shiftTracker: "All Shifts",
  BasicSalary: "Salary Settings",
  ListWageRate: "All Wage Rates",
  WageRate: "Wage Rate",
  NewShift: "New Shift",
  ShowShift: "Show Shift",
};

const notSqlite = ["HW", "Break", "Bus"];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export { titleParser, months, days, notSqlite };
