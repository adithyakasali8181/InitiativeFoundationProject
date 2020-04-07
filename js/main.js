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
    console.log("" + ((1-(pr/2))*(1 + gr)) - (pr/2));
  }
  return arr;
};
let myChart;
let principal = 10000;
let startTime = 5;
let endTime = 25;
let increment = 5;
let growthRate = .075;
let paymentRate = .05;
let xAxis = range(startTime, endTime, increment);
let yAxis = evaluate(xAxis, principal, growthRate, paymentRate);
let clicked = false;
myChart = runGraph(yAxis);

function myFunction() {

    let newP = document.getElementById('principal').value;
    let newGr = document.getElementById('rate').value;
    if(newGr > 10 || newGr < 0) {
      alert("Pick interest rates between 0 and 10");
      newGr = 7.5;
    }
    newGr = newGr/100 ;
    yAxis = evaluate(xAxis, newP, newGr, paymentRate);

    myChart.destroy();
    myChart = runGraph(yAxis);
    let table = document.getElementById('tab');
    if(clicked) {
      clear(table);
    }
    generateTable(table, xAxis, yAxis);
    clicked = true;

}

function clear(table) {
  for(let i = 0; i <= xAxis.length; i++){
    table.deleteRow(0);
  }
};
function generateTable(table, xAxis, yAxis) {
    for(let i = xAxis.length - 1; i >= 0; i--) {
      let row = table.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      cell1.innerHTML = "<td>" + xAxis[i] + "</td>";
      cell2.innerHTML = "<td>" + "$" + Math.trunc(yAxis[i])+ "</td>";
      cell3.innerHTML = "<td>" + "$" + Math.trunc(yAxis[i]*paymentRate)+ "</td>";
    }
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = "<td>Years</td>";
    cell2.innerHTML = "<td>Donation</td>";
    cell3.innerHTML = "<td>Payment</td>";
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
