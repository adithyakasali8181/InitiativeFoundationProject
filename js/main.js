function range (start, end, step) {
    if (!step) step = 1 // step size of zero makes no sense
    let arrayNum = [];
    // using ternary to decide stopping condition
    for (let i = start; step > 0 ? i <= end: i >= end; i += step ) {
      arrayNum.push(i);
    }
    return arrayNum;
};

function evaluate(xAxis, p, gr, pr) {
  let arr = [];
  for(let i = 0; i < xAxis.length; i++) {
    arr.push(p * Math.pow( (((1-(pr/2))*(1 + gr)) - (pr/2)), xAxis[i]));
  }
  return arr;
};
function calcNetGrant(xAxis, yAxis) {
  let arr = [];
  for(let i = 0; i < xAxis.length; i++) {
    arr.push(yAxis[i]*(paymentRate - feeRate));
  }
  return arr;
}
function calcCumulGrant(netGrant) {
  let arr = [];
  let sum = 0;
  for(let i = 0; i < netGrant.length; i++) {
    sum += netGrant[i];
    arr.push(sum);
  }
  return arr;
}
let myChart;
let tChart;
let principal = 10000;
let startTime = 1;
let endTime = 25;
let increment = 1;
let growthRate = .075;
let paymentRate = .05;
let feeRate = 0.01;
let xAxis = range(startTime, endTime, increment);
let yAxis = evaluate(xAxis, principal, growthRate, paymentRate);
let netGrant = calcNetGrant(xAxis, yAxis); // calculates (spending - fee) per year
let cumulGrant = calcCumulGrant(netGrant); // calculate cumulative grant amount per year
let clicked = false;
myChart = runGraph(yAxis);
tChart = runTGraph(cumulGrant);

function myFunction() {

    let newP = document.getElementById('principal').value;
    let newGr = document.getElementById('rate').value;
    if(newGr > 10 || newGr < 0) {
      alert("Pick interest rates between 0 and 10");
      newGr = 7.5;
    }
    newGr = newGr/100 ;
    yAxis = evaluate(xAxis, newP, newGr, paymentRate);
    netGrant = calcNetGrant(xAxis, yAxis);
    cumulGrant = calcCumulGrant(netGrant);

    myChart.destroy();
    tChart.destroy();
    myChart = runGraph(yAxis);
    tChart = runTGraph(cumulGrant);
    let table = document.getElementById('tab');
    if(clicked) {
      clear(table);
    }
    generateTable(table, xAxis, yAxis, netGrant, cumulGrant);
    clicked = true;

}

function clear(table) {
  for(let i = 0; i <= 5; i++){
    table.deleteRow(0);
  }
};
function generateTable(table, xAxis, yAxis, netGrant, cumulGrant) {
    for(let i = 24; i >= 4; i = i - 5) {
      let row = table.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      cell1.innerHTML = "<td>" + xAxis[i] + "</td>";
      cell2.innerHTML = "<td>" + "$" + Math.trunc(yAxis[i])+ "</td>";
      cell3.innerHTML = "<td>" + "$" + Math.trunc(netGrant[i])+ "</td>";
      cell4.innerHTML = "<td>" + "$" + Math.trunc(cumulGrant[i])+ "</td>";
    }
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = "<td>Years</td>";
    cell2.innerHTML = "<td>Donation</td>";
    cell3.innerHTML = "<td>Payment</td>";
    cell4.innerHTML = "<td>Total Payment</td>";
};

function runGraph(ydata) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Growth Of Donation',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data : ydata
            }]
        },

        // Configuration options go here
        options: {}
    });
    return chart; // return chart object
}
function runTGraph(ydata) {
    let ctx = document.getElementById('tChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Total Payments',
                backgroundColor: 'rgb(26, 188, 156)',
                borderColor: 'rgb(26, 188, 156)',
                data : ydata
            }]
        },

        // Configuration options go here
        options: {}
    });
    return chart; // return chart object
}
