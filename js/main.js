let myChart; // Value of Donation over time chart
let tChart; // Value of Cumulative payments over time chart
let table; // Table with key values over time
let principal = 10000; // default principal amount
let startTime = 1; // start year
let endTime = 25; // end year
let increment = 1; // increment
let growthRate = (Math.floor(Math.random()*(12 + 20)) - 20)/100 ; // default growth rate
let paymentRate = .05; // default payment rate
let feeRate = 0.01; // default admin fee rate
let xAxis = range(startTime, endTime, increment); // construct the x axis
createChartsTables(xAxis, principal, growthRate); // create charts and tables with default values
var pin = document.getElementById("principal"); // principal input element variable
// the element is not null, listen for input to add commas
if(pin) {
  pin.addEventListener("input", function(event){
    let textInt = parseInt(pin.value);
    let num = pin.value.replace(/,/gi, "").split("").reverse().join("");
    let num2 = removeRougeChar(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));
    pin.value = num2;
  })
}
/*
  myFunction execute when user submits prinicipal and growth rate
*/
function myFunction() {
    let newP = pin.value.replace(/,/g, "");
    let newGr = document.getElementById('rate').value;
    // if growth rate input is null
    if(newGr == "") {
      newGr = 7.5;
    }
    if(isNaN(parseInt(newP))) {
      alert("pick a integer amount");
      newP = principal;
    }
    // if prinicipal input is null
    if(newP == "") {
      newP = principal;
    }
    if(newGr > 10 || newGr < 0) {
      alert("Pick interest rates between 0 and 10");
      newGr = 7.5;
    }
    newGr = newGr/100 ;
    myChart.destroy();
    tChart.destroy();
    clear(table);
    createChartsTables(xAxis, newP, newGr);
}
/*
  return a vector from start to end with increment of step
*/
function range(start, end, step) {
    if (!step) step = 1 // step size of zero makes no sense
    let arrayNum = [];
    // using ternary to decide stopping condition
    for (let i = start; step > 0 ? i <= end: i >= end; i += step ) {
      arrayNum.push(i);
    }
    return arrayNum;
};
/*
  calculate the growth of donation over time and return it.
*/
function evaluate(xAxis, p, gr, pr) {
  let arr = [];
  for(let i = 0; i < xAxis.length; i++) {
    arr.push(p * Math.pow( (((1-(pr/2))*(1 + gr)) - (pr/2)), xAxis[i]));
  }
  return arr;
};
/*
  calculate the growth of donation over time and return it.
*/
function calcNetGrant(xAxis, yAxis) {
  let arr = [];
  for(let i = 0; i < xAxis.length; i++) {
    arr.push(yAxis[i]*(paymentRate - feeRate));
  }
  return arr;
}
/*
  calculate the cumulative payment for each year and return it.
*/
function calcCumulGrant(netGrant) {
  let arr = [];
  let sum = 0;
  for(let i = 0; i < netGrant.length; i++) {
    sum += netGrant[i];
    arr.push(sum);
  }
  return arr;
}
/*
  create charts and a table given x axis, new prinicipal, and new growth rate
  shows user the growth of investments after 25 years
*/
function createChartsTables(xAxis, principal, growthRate ) {
  let yAxis = evaluate(xAxis, principal, growthRate, paymentRate);
  let netGrant = calcNetGrant(xAxis, yAxis); // calculates (spending - fee) per year
  let cumulGrant = calcCumulGrant(netGrant); // calculate cumulative grant amount per year
  myChart = runGraph(yAxis, 'myChart', 'Growth Of Donation', 'rgb(255, 99, 132)');
  tChart = runGraph(cumulGrant, 'tChart', 'Total Payments', 'rgb(26, 188, 156)');
  table = document.getElementById('tab');
  generateTable(table, xAxis, yAxis, netGrant, cumulGrant);
  const fvalue = Math.trunc(yAxis[xAxis.length - 1]);
  document.getElementById('text').innerHTML = "Your donation of $" + parseInt(principal).toLocaleString() + " could be worth " + "$".bold() + fvalue.toLocaleString().bold() + " after 25 years.";
}
/*
  delete the old table
*/
function clear(table) {
  for(let i = 0; i <= 5; i++){
    table.deleteRow(0);
  }
};
/*
  generate new table based on the new info
*/
function generateTable(table, xAxis, yAxis, netGrant, cumulGrant) {
    for(let i = 24; i >= 4; i = i - 5) {
      let row = table.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = "<td>" + xAxis[i] + "</td>";
      cell2.innerHTML = "<td>" + "$" + Math.trunc(yAxis[i]).toLocaleString()+ "</td>";
      // cell3.innerHTML = "<td>" + "$" + Math.trunc(feeRate*yAxis[i]).toLocaleString() + "</td>";
      cell4.innerHTML = "<td>" + "$" + Math.trunc(netGrant[i]).toLocaleString()+ "</td>";
      cell5.innerHTML = "<td>" + "$" + Math.trunc(cumulGrant[i]).toLocaleString()+ "</td>";
    }
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = "<td>Years</td>";
    cell2.innerHTML = "<td>Donation</td>";
    // cell3.innerHTML = "<td>Admin Fees</td>";
    cell4.innerHTML = "<td>Payment</td>";
    cell5.innerHTML = "<td>Total Payment</td>";
};
/*
  return a chart with given the chart element id, label, and color
*/
function runGraph(ydata, chartName, label, color) {
    let ctx = document.getElementById(chartName).getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: xAxis,
            datasets: [{
                label: label,
                backgroundColor: color,
                borderColor: color,
                data : ydata
            }]
        },

        // Configuration options go here
        options: {
          scales: {
            yAxes: [{
              ticks: {
                userCallback: function(value, index, values) {
                    return value.toLocaleString();
                }
              }
            }]
          }
        }
    });
    return chart; // return chart object
}
/*
  remove rouge comma if number is shortened
*/
function removeRougeChar(convertString){
    if(convertString.substring(0,1) == ","){
        return convertString.substring(1, convertString.length)
    }
    return convertString;
}
