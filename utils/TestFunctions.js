//this file is to test potential function that we will use
//for example: monthly salary calculator, taxes calculator ect...
//this file can also be used to test which data structs we should use to keep out data, like shifts.






//the first building block of our app is the basic shift.
//the creation function should get: start and end date and time of shift, hourly rate of that shift, transport fees, and optional text. 
//it should create a object or struct that contains all the above data, but also calculated information like: salary for that day, special rates, overtime, overall duration.
//because overtime, rest day hours, and pay can change, each shift should also keep the value of the variable at the time the shift was created.

//should we use a class or struct?


//new idea, what if user would like to add special rates into specific times of the shift(cant do this in competitor)?

var HourlyRate = 34; // this variables should be global in our code or apart from a larger class.
var OvertimeStart = 8; 
var RestDays;


class Shift{
constructor(Start, End, HourlyRate, TransportFees, Text) {
    this.Start = Start;
    this.End = End;
    this.HourlyRate = HourlyRate;
    this.OvertimeStart = OvertimeStart;
    this.TransportFees = TransportFees;
    this.Text = Text;
    this.RestDays = RestDays;
  }

}