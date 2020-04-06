function range (start, end, step) {
    if (!step) step = 1 // step size of zero makes no sense
    let arrayNum = [];
    // using ternary to decide stopping condition
    for (let i = start; step > 0 ? i <= end: i >= end; i += step ) {
      arrayNum.push(i);
    }
    return arrayNum;
};

function evaluate(xAxis, p, r) {
  let arr = [];
  for(let i = 0; i < xAxis.length; i++) {
    arr.push(p* Math.pow(1 + r, xAxis[i]));
  }
  return arr;
};
let myChart;
let principal = 10000;
let startTime = 5;
let endTime = 50;
let increment = 5;
let rate = .05;
let xAxis = range(startTime, endTime, increment);
let yAxis = evaluate(xAxis, principal, rate);
let clicked = false;
myChart = runGraph(yAxis);

function myFunction() {

    let newP = document.getElementById('principal').value;
    yAxis = evaluate(xAxis, newP, rate);


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
  for(let i = 0; i < xAxis.length + 1; i++){
    table.deleteRow(0);
  }
};
function generateTable(table, xAxis, yAxis) {
    for(let i = xAxis.length - 1; i >= 0; i--) {
      let row = table.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = "<td>" + xAxis[i] + "</td>";
      cell2.innerHTML = "<td>" + "$" +Math.trunc(yAxis[i])+ "</td>";
    }
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = "<td>Years</td>";
    cell2.innerHTML = "<td>Donation</td>";
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
