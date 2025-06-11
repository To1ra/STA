//utils for timed durations and timestamps

export class Duration{
    
    constructor(hours,minutes){
        this.hours = hours;
        this.minutes = minutes;
    }

    DurationToPay(HourlyRate){
        return HourlyRate*(this.hours + (this.minutes/60))
    }


}

export class WeeklyDuration{
    constructor(start , end){  //2 weekly timestamps
        this.start = start;
        this.end = end;
    }
 
}

export class WeeklyTimeStamp{
    constructor(day,hour,minute){
        this.day = day;
        this.hour = hour;
        this.minute = minute;
    }
}

export function DateToDuration(start, end){ //takes 2 dates and returns a duration
  const ms = Math.abs(end - start);
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return new Duration(hours,minutes)
}

export function DateToWeeklyDuration(start, end){ //takes 2 dates and return a weekly Durations
  return new WeeklyDuration(
    DateToWeeklyTimeStamp(start) , DateToWeeklyTimeStamp(end)
  )
}

export function DateToWeeklyTimeStamp(date){ //takes a date and returns a weekly timestamp
  return new WeeklyTimeStamp(date.getDay(),date.getHours(),date.getMinutes())
}



  