//utils for timed durations and timestamps

export class Duration{
    
    constructor(hours,minutes){
        this.hours = hours;
        this.minutes = minutes;
    }

    Subtraction(Dur){
        let minutes = this.hours * 60 + this.minutes - Dur.hours*60 - Dur.minutes
        return new Duration(parseInt(minutes / 60),parseInt(minutes%60))
    }

    DurationToPay(HourlyRate){
        return HourlyRate*(this.hours + (this.minutes/60))
    }

    IsBigger(Dur){
        return (this.hours * 60 + this.minutes > Dur.hours*60 + Dur.minutes)
    }

    IsEqual(Dur){
        return (this.hours * 60 + this.minutes == Dur.hours*60 + Dur.minutes)
    }

    IsSmaller(Dur){
        return (this.hours * 60 + this.minutes < Dur.hours*60 + Dur.minutes)
    }

    ToMinutes(){
        return this.hours * 60 + this.minutes 
    }
/*
    get hours(){
        return this.hours;
    }

    get minutes(){
        return this.minutes;
    }
*/
}

export class WeeklyDuration{
    constructor(start , end){  //2 weekly timestamps
        this.start = start;
        this.end = end;
    }

    ToDuration(){
        if(this.end.IsBigger(this.start)){
            
        }
        else{

        }

    }

 
}

export class WeeklyTimeStamp{
    constructor(day,hour,minute){
        this.day = day;
        this.hour = hour;
        this.minute = minute;
    }

    IsBigger(TimeStamp){
        return ((this.day - TimeStamp.day) * 24 * 60 + (this.hour - TimeStamp.hour) * 60 + this.minute - TimeStamp.minute )> 0 //checks if a given timestamp is before (true) this timestamp or after (false)
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

export function IsTimeStampInsideTheWeeklyDuration(TimeStamp,WeeklyDuration){ //checks if a given weekly timestamp is inside a weekly duration

   if(WeeklyDuration.end.IsBigger(WeeklyDuration.start)){
    return TimeStamp.IsBigger(WeeklyDuration.start) && WeeklyDuration.end.IsBigger(TimeStamp)
   }
   else{
    return TimeStamp.IsBigger(WeeklyDuration.start) || WeeklyDuration.end.IsBigger(TimeStamp)
   }


}


/*
var dur = new Duration(8,30)
var dur2 = new Duration(2,34)
console.log(dur.Subtraction(dur2))
  */

/*
var restdays = new WeeklyDuration(new WeeklyTimeStamp(5,18,30), new WeeklyTimeStamp(1,0,0))
var time = new WeeklyTimeStamp(1,18,31)
console.log(IsTimeStampInsideTheWeeklyDuration(time , restdays))
*/