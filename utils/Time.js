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

export function DateToDuration(start, end){
  const ms = Math.abs(end - start);
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return new Duration(hours,minutes)
}



/* tests
dur = new Duration(8,20);
console.log(dur.DurationToPay(30))
*/