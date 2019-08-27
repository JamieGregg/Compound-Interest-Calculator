//Fixed Values
var annualGrowth;
var initalInvestment;
var monthlyDeposit;
var yearsInvested;
var inflation;
var inflationRate;

//Year One Value
var yearOneValue;

//Update Every Year
var currentYear;
var yearlyDeposit;
var totalDeposit;
var yearlyInterest;
var totalInterest;
var investmentValue;

//assigning all the values to the variables
$(document).ready(function() {
  $(".submit-investment").click(function() {
    initalInvestment = $(".investment-value").val();
    annualGrowth = $(".interest-amount").val();
    monthlyDeposit = $(".monthly-amount").val();
    yearsInvested = $(".years-invested").val();
    inflation = $(".inflation-check").prop("checked");
    inflationRate = $(".inflation-amount").val();

    $(".table-investment td").remove();
    compoundInterestCalculation();
  });
});

//Checking to see if the inflation checkbox is checked
$(document).ready(function(){
  $(".inflation-check").change(function(){
    if(this.checked){
      $(".inflation-rate").fadeIn("fast");
    }
    else{
      $(".inflation-rate").fadeOut("fast");
    }
  });
});

function interestCompound(){
  var a;
  var a1;
  var p = monthlyDeposit;
  var r = inflationRate;
  var n = 12;
  var t = yearsInvested;
  var power = n*t;

  a1 = (1 + r/n);
  a = p * Math.pow(a1,power);

  return a;
}

function compoundInterestCalculation(){
  //Forumla Variables
  var compoundSubCalc = 0;
  var principalInterest = 0;
  var futureValueSubCalc = 0;
  var futureValueSeries = 0;
  var total = 0;

  //Declarations of input
  var principal = initalInvestment;
  var interestRate = annualGrowth/100;
  var monthlyContibution = monthlyDeposit;
  var months = 12;
  var time = 1;
  var powerCalc = months * time;

  //Variables for table input
  totalDeposit = initalInvestment;
  yearlyInterest = 0;
  totalInterest = 0;

  //Calculation of the compound interest using -> Total = [ P(1+r/n)^(nt) ] + [ PMT × (((1 + r/n)^(nt) - 1) / (r/n))
  for(var i = 1; i <= yearsInvested; i++){

    //ths works out inflation increase on deposits
    if(inflation == true && i > 1){
      var ans;
      var tempAns;
      var p = monthlyContibution;
      var r = inflationRate/100;
      var n = 12;
      var t = 1;
      var power = n*t;

      tempAns = (1 + r/n);
      ans = p * Math.pow(tempAns,power);

      monthlyContibution = ans;
    }

    compoundSubCalc = (parseFloat(1) + parseFloat(interestRate/months));
    principalInterest = principal * Math.pow(compoundSubCalc, powerCalc);
    futureValueSubCalc = parseFloat(1 + interestRate/ months);
    futureValueSeries = monthlyContibution * (Math.pow(futureValueSubCalc, powerCalc) -1) / (parseFloat(interestRate/months));
    total = principalInterest + futureValueSeries;
    total = (Math.round( total * 100 )/100 ).toString();

    //Assigning values into the table
    monthlyDeposit = monthlyContibution*12;
    parseFloat(monthlyDeposit);
    totalDeposit = parseFloat(totalDeposit) + parseFloat(monthlyContibution*12);
    parseFloat(totalDeposit);
    yearlyInterest = (total - principal) - (monthlyContibution*12);
    parseFloat(yearlyInterest);
    totalInterest = total - totalDeposit;
    parseFloat(totalInterest);
    principal = total;

    //Assigning values to the table

    $(".table-investment tr:last").after("<tr><td>" + i +"</td><td>£" + monthlyDeposit.toFixed(2) + "</td><td>£" + totalDeposit.toFixed(2) + "</td><td>£" + yearlyInterest.toFixed(2) + "</td><td>£" + totalInterest.toFixed(2) + "</td><td>£" + total +"</td></tr>");
  }
}
