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
var ctx = document.getElementById('myChart').getContext('2d');
let principal = 10000;
let startTime = 5;
let endTime = 50;
let increment = 5;
let rate = .05;
let xAxis = range(startTime, endTime, increment);
let yAxis = evaluate(xAxis, principal, rate);


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: xAxis,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            // data: [0, 10, 5, 2, 20, 30, 45]
            data : yAxis
        }]
    },

    // Configuration options go here
    options: {}
});
