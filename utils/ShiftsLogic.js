//this file is to test potential function that we will use
//for example: monthly salary calculator, taxes calculator ect...
//this file can also be used to test which data structs we should use to keep out data, like shifts.
import {Duration , WeeklyDuration , WeeklyTimeStamp , DateToDuration, DateToWeeklyDuration, DateToWeeklyTimeStamp} from "./Time.js";




//the first building block of our app is the basic shift.
//the creation function should get: start and end date and time of shift, hourly rate of that shift, transport fees, and optional text. 
//it should create a object or struct that contains all the above data, but also calculated information like: salary for that day, special rates, overtime, overall duration.
//because overtime, rest day hours, and pay can change, each shift should also keep the value of the variable at the time the shift was created.

//should we use a class or struct?


//new idea, what if user would like to add special rates into specific times of the shift(cant do this in competitor)?

var HourlyRate = 34; // this variables should be global in our code or apart from a larger class.
//var RestDays = new WeeklyDuration(new WeeklyTimeStamp(5,18,0),new WeeklyTimeStamp(5,18,0)); //how do we keep reaccuring days and hours for rest days? well we can just keep the days sunday to saturday (0-6) , hours (0-23), and minutes (0-59) , we can easily get the current time of the format by using:
// const date = new Date(); 
// day = date.getDay();
// hour = date.getHours();
// minute date.getMinutes();

class Overtime{
  constructor(StartDuration , IncreaseDuration, SpecialRate1 , SpecialRate2){
      this.StartDuration = StartDuration; //start of overtime (8 hours)
      this.IncreaseDuration = IncreaseDuration; // duration between start of overtime to larger overtime (2 hours)
      this.SpecialRate1 = SpecialRate1
      this.SpecialRate2 = SpecialRate2
  }

  Calc1StepOverTimeDuration(ShiftDuration){

    if(ShiftDuration.IsBigger(this.StartDuration)){
        if(ShiftDuration.Subtraction(this.StartDuration).IsBigger(this.IncreaseDuration)){
          return this.IncreaseDuration
        } // if Shift was longer than start of overtime(8 hours) + start of higher overtime (10 hours)
        return ShiftDuration.Subtraction(this.StartDuration)

    }
    return new Duration(0,0)
  }

  Calc2StepOverTimeDuration(ShiftDuration){
  
    if(ShiftDuration.Subtraction(this.StartDuration).IsBigger(this.IncreaseDuration)){ // if Shift was longer than start of overtime(8 hours) + start of higher overtime (10 hours)
      return ShiftDuration.Subtraction(this.StartDuration).Subtraction(this.IncreaseDuration);
      } 
      return new Duration(0,0)
    
  }

  CalculateOvertime(HourlyRate , ShiftDuration){
    return this.Calc1StepOverTimeDuration(ShiftDuration).DurationToPay(HourlyRate * this.SpecialRate1) + this.Calc2StepOverTimeDuration(ShiftDuration).DurationToPay( HourlyRate * this.SpecialRate2);
  } 


}


class RestDays{
constructor(WeeklyDuration , SpecialRate){
      this.WeeklyDuration = WeeklyDuration; //start of overtime (8 hours)
      this.SpecialRate = SpecialRate; // duration between start of overtime to larger overtime (2 hours)
  }

  CalcRestDaysDuration(ShiftWeeklyDuration){ // recives a weekly duration and returns a duration of time inside the restdays
    

}

}

class Shift{

constructor(Start, End, HourlyRate, TransportFees, Text , Overtime,RestDays) {
    this.Start = Start; //date object
    this.End = End; // date object
    this.HourlyRate = HourlyRate; //double? 
    this.OvertimeStart = OvertimeStart; //how many [hours,minutes] to wait until overtime
    this.TransportFees = TransportFees; 
    this.Text = Text; //string
    this.RestDays = RestDays; 
    this.Overtime = Overtime
    this.pay = this.CalcShiftPay();
  }

  CalcShiftPay(){


  }



}


var over = new Overtime(new Duration(8,30),new Duration(2,0),0.25,0.50)
console.log(over.Calc1StepOverTimeDuration(new Duration(11,0)))
console.log(over.Calc2StepOverTimeDuration(new Duration(11,0)))
console.log(over.CalculateOvertime(HourlyRate,new Duration(11,0)))