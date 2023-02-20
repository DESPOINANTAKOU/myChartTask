//function that creates the chart
document.addEventListener("DOMContentLoaded", function () {
  const chart = Highcharts.chart("container", {
    chart: {
      backgroundColor: "#232734",
      type: "area",
      width: 800,
    },
    xAxis: {
      categories: [
        "0 Months",
        "15 Months",
        "18 Months",
        "24 Months",
        "30 Months",
        "36 Months",
        "48 Months",
      ],
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
      series: {
        pointStart: 0,
      },
    },

    series: [
      {
        name: "QUARTER",
        lineColor: "#b37749",
        color: "#b37749",
        data: [0, 10, 20, 30, 40, 50, 60],
      },
      {
        name: "COMPOUNDED",
        lineColor: "#b37749",
        color: "#b37749",
        data: [0, 20, 40, 60, 80, 100, 120],
      },
    ],
  });
});

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

    return (
      negativeSign +
      (j ? i.substring(0, j) + thousands : "") +
      i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      // (decimalCount
      //   ? decimal +
      //     Math.abs(amount - i)
      //       .toFixed(decimalCount)
      //       .slice(2)
      //   : "")
      (decimalCount ? "" : "")
    );
  } catch (e) {
    console.log(e);
  }
}

//function that takes the user input from the range input and gives the value to the span "Your Investment"
function changeRangeValue1(inputValue) {
  //giving the inputValue which is event.target.value from the UI at the other elements
  document.getElementById("range-value1").innerHTML = formatMoney(inputValue);
  document.getElementById("moneyAmount").innerHTML = `${formatMoney(
    inputValue
  )} USD `;
  //take the value as a variable so that we can give it to the totalQuarterPayout() and totalCompoundedPayout() functions!
  let returnValue1 = formatMoney(inputValue);
  // console.log(returnValue1);
  //taking the months value from the other range element
  let months = document.getElementById("range2").value;
  //calling the function that calculates the Total Quarter Payout
  totalQuarterPayout(returnValue1, months);
  //calling the function that calculates the Total Compounded Payout
  totalCompoundedPayout(returnValue1, months);
}

//function that takes the user input from the range input and gives the value to the span  "Tenure"
function changeRangeValue2(inputValue) {
  //giving the inputValue which is event.target.value from the UI at the other elements
  document.getElementById("range-value2").innerHTML = `
    ${inputValue}
   Months`;
  document.getElementById("months").innerHTML = `
    ${inputValue}  Months `;
  //take the value as a variable so that we can give it to the totalQuarterPayout() and totalCompoundedPayout() functions!
  let returnValue2 = formatMoney(inputValue);
function totalQuarterPayout(moneyAmount, monthAmount) {
  const factor = 0.0175;
  console.log(moneyAmount);
  console.log(monthAmount);
  const months = monthAmount / 3;
  if (months === 3) {
    let money = moneyAmount.replace("", "");
    let value = formatMoney(money * 0.175);
    console.log(value);
    console.log("DESPOINA");
    let newValue = value.replace(",", "");
    let finalValue = parseInt(newValue, 10);
    console.log(finalValue);
    return finalValue;
  } else if (monthAmount >= 3) {
    let value = formatMoney(moneyAmount * (months * factor));
    console.log("NTAKOU");
    let newValue = value.replace(",", "");
    let finalValue = parseInt(newValue, 10);
    console.log(finalValue);
    return finalValue;
  }
  let returnValue = Math.trunc(finalValue);
  console.log(returnValue);
  document.getElementById("orange-divs-input").innerHTML = returnValue;
}

function totalCompoundedPayout(moneyAmount, monthAmount) {
  // let value = formatMoney(moneyAmount * ((monthAmount / 3) * 0, 0175));
  // let finalValue = Math.trunc(value);
  // document.getElementById("white-divs-input").innerHTML = finalValue;
}
