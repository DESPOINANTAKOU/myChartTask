let moneyQuarterArray = [];
let moneyCompoundedArray = [];
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
    xAxis: {
      categories: function () {
        document.getElementById("range2").addEventListener("change", (e) => {
         console.log(month);
          let month = e.target.value;
          for (let i = 0; i <= 11; i++) {
            chart.xAxis[0].setCategories(month);
            console.log(month);
          }
        });
        // categories: [
        //   "3 Months",
        //   "6 Months",
        //   "9 Months",
        //   "12 Months",
        //   "15 Months",
        //   "18 Months",
        //   "21 Months",
        //   "24 Months",
        //   "27 Months",
        //   "30 Months",
        //   "33 Months",
        // ],
        // function () {
        //   let arr = [];
        //   console.log(arr);
        //   for (let i = 3; i <= document.getElementById("months").value; i=+3) {
        //     console.log(document.getElementById("months").value);
        //     arr.push(i);
        //     console.log(arr);
        //   }
        // },
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
          //   //   return [1, 10, 20, 440];
          // },
          data:function (){
            for (let i=0; i <=11; i++){
              let quarterValue = document.getElementById("orange-divs-input").value;
              return quarterValue;
            }
          }
        },
        {
          name: "COMPOUNDED",
          lineColor: "#b37749",
          color: "#b37749",
          data: function (){
            for (let i=0; i <=11; i++){
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
    },
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
  //calling the function that calculates the Total Quarter Payout
  totalQuarterPayout(newInputValue, months);
  //calling the function that calculates the Total Compounded Payout
  totalCompoundedPayout(newInputValue, months);
  console.log("chart1");
  CreateChart();
}

//function that takes the user input from the range input and gives the value to the span  "Tenure"
function changeRangeValue2(inputValue) {
  //giving the inputValue which is event.target.value from the UI at the other elements
  let newInputValue = formatMoney(inputValue);
  //giving the inputValue which is event.target.value from the UI at the other elements
  document.getElementById("range-value2").innerHTML = `
      ${newInputValue}
     Months`;
  document.getElementById("months").innerHTML = `
      ${newInputValue}  Months `;
  //taking the months value from the other range element
  let money = document.getElementById("range1").value;
  //calling the function that calculates the Total Quarter Payout
  totalQuarterPayout(money, Number(newInputValue));
  //calling the function that calculates the Total Compounded Payout
  totalCompoundedPayout(money, Number(newInputValue));
  console.log("chart2");
  CreateChart();
}

document.getElementById("range1").addEventListener("change", (e) => {
  changeRangeValue1(e.target.value);
});
document.getElementById("range2").addEventListener("change", (e) => {
  changeRangeValue2(e.target.value);
});
