let moneyQuarterArray = [];
let moneyCompoundedArray = [];
let monthsArray = [];
moneyQuarterArray.push(2187);
moneyCompoundedArray.push(127187);

// function that creates the chart
function CreateChart() {
  let chart = new Highcharts.chart("container", {
    chart: {
      backgroundColor: "#232734",
      type: "area",
      width: 800,
    },
    gapSize: 1,
    xAxis: {
      categories: monthsArray,
    },
    yAxis: { visible: false },
    tooltip: {
      backgroundColor: "white",
      borderColor: "white",
      borderRadius: 3,
      borderWidth: 4,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "QUARTER",
        lineColor: "#b37749",
        color: "#b37749",
        // data: function () {
        //   //   let formattedArray = Number(moneyQuarterArray.push(finalPayout));
        //   //   console.log("DESPOINA");
        //   //   console.log(typeof formattedArray);
        //   // },

        // },
        // data:function (){
        //   for (let i=0; i <=11; i++){ //there are 12 possible month quarters
        //     let quarterValue = document.getElementById("orange-divs-input").value;
        //     return quarterValue;
        //   }
      },
      {
        name: "COMPOUNDED",
        lineColor: "#b37749",
        color: "#b37749",
        data: function () {
          for (let i = 0; i <= 11; i++) {
            let monthAmount = document.getElementById("white-divs-input").value;
            return monthAmount;
          }
        },
        // data: function () {
        //   let formattedArray = Number(moneyCompoundedArray.push(finalPayout));
        //   console.log("DESPOINA");
        //   console.log(typeof formattedArray);
        // },
        //   [100, 140, 220, 480],
      },
    ],
  });
}

//function that formats the decimals etc
function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    let result =
      negativeSign +
      (j ? i.substring(0, j) + thousands : "") +
      i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands); // +
    // (decimalCount
    //   ? decimal +
    //     Math.abs(amount - i)
    //       .toFixed(decimalCount)
    //       .slice(2)
    //   : "")
    return result;
  } catch (e) {
    console.log(e);
  }
}

function totalQuarterPayout(moneyAmount, monthAmount) {
  //factor that the money are calculated with
  const factor = 0.0175;
  let money = moneyAmount.replace(",", "");
  //transforming the strings to numbers
  money = Number(money);
  //making the calculations
  let payout = money * (monthAmount / 3) * factor;
  //formatting the calculated amount of money
  let finalPayout = formatMoney(payout);
  //setting the right value where it has to be set - inside the orange div
  document.getElementById("orange-divs-input").innerHTML = finalPayout;
  console.log("DESPOINA" + finalPayout);
}

function totalCompoundedPayout(moneyAmount, monthAmount) {
  //factor that the money are calculated with
  const factor = 0.0175;
  //replacing the , with empty space so that we can make the calculations
  let money = moneyAmount.replace(",", "");
  //transforming the strings to numbers
  money = Number(money);
  //making the calculation
  const payout = money + money * (monthAmount / 3) * factor;
  //formatting the calculated amount of money
  let finalPayout = formatMoney(payout);
  //setting the right value where it has to be set - inside the orange div
  document.getElementById("white-divs-input").innerHTML = finalPayout;
  console.log("DESPOINA" + finalPayout);
}

//function that takes the user input from the range input and gives the value to the span "Your Investment"
function changeRangeValue1(inputValue) {
  //giving the inputValue which is event.target.value from the UI at the other elements
  let newInputValue = formatMoney(inputValue);
  document.getElementById("range-value1").innerHTML = newInputValue;
  document.getElementById("moneyAmount").innerHTML = `${newInputValue} USD `;
  //taking the months value from the other range element
  let months = Number(document.getElementById("range2").value);
  let stringedMoney =newInputValue.toString();
  let stringedMonths =months.toString();
  // for(let i=0; i<=monthsArray.length; i++){
  //   if(stringedMonths !== monthsArray[i] ){
  //     monthsArray.push(stringedMonths);
  //   };
  // };
  // console.log(months);
  // console.log(monthsArray);
  //calling the function that calculates the Total Quarter Payout
  totalQuarterPayout(stringedMoney, stringedMonths);
  //calling the function that calculates the Total Compounded Payout
  totalCompoundedPayout(stringedMoney, stringedMonths);
  console.log("chart1");
  CreateChart();
}

//function that takes the user input from the range input and gives the value to the span  "Tenure"
function changeRangeValue2(inputValue) {
  //giving the inputValue which is event.target.value from the UI at the other elements
  let newInputValue = Number(inputValue);
  let months = formatMoney(newInputValue);
  //giving the inputValue which is event.target.value from the UI at the other elements
  document.getElementById("range-value2").innerHTML = `
      ${months}
     Months`;
  document.getElementById("months").innerHTML = `
      ${months}  Months `;
  //taking the months value from the other range element
  let money = Number(document.getElementById("range1").value);
  //transformation again to strings so that we can replace the , with empty space
  let stringedMoney =money.toString();
  let stringedMonths =months.toString();
  for(let i=0; i<=monthsArray.length; i++){
    if(stringedMonths !== monthsArray[i] ){
      monthsArray.push(stringedMonths);
    };
  };
  console.log(months);
  console.log(monthsArray);
  //calling the function that calculates the Total Quarter Payout
  totalQuarterPayout(stringedMoney,stringedMonths);
  //calling the function that calculates the Total Compounded Payout
  totalCompoundedPayout(stringedMoney,stringedMonths);
    monthsArray.push(months);
    console.log(months);
    console.log(monthsArray);
  console.log("chart2");
  CreateChart();
}

document.getElementById("range1").addEventListener("change", (e) => {
  changeRangeValue1(e.target.value);
});
document.getElementById("range2").addEventListener("change", (e) => {
  changeRangeValue2(e.target.value);
});

document.getElementById("body").addEventListener("DOMContentLoaded", (e) => {
  let chart = Highcharts.chart("container", {
    chart: {
      backgroundColor: "#232734",
      type: "area",
      width: 800,
    },
    gapSize: 1,
    xAxis: {
      categories: monthsArray,
    },
    yAxis: { visible: false },
    tooltip: {
      backgroundColor: "white",
      borderColor: "white",
      borderRadius: 3,
      borderWidth: 4,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "QUARTER",
        lineColor: "#b37749",
        color: "#b37749",
      },
      {
        name: "COMPOUNDED",
        lineColor: "#b37749",
        color: "#b37749",
        data: function () {
          for (let i = 0; i <= 11; i++) {
            let monthAmount = document.getElementById("white-divs-input").value;
            return monthAmount;
          }
        },
      },
    ],
  });
});
