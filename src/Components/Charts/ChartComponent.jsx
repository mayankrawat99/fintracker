import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from 'chart.js';
import './style.css';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);
ChartJS.defaults.font.family = 'Poppins';
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Sort function based on months

const ChartComponent = ({ expenses,sortTransaction }) => {
//formula for monthy totals used for line chart...
function calculateMonthlyTotals(transactions) {
  return transactions.reduce((acc,values)=>{

    let dateString = values.date;

    // Check and reformat date based on its format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      // Convert DD/MM/YYYY to YYYY-MM-DD
      dateString = dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
    } else if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) {
      // Convert YYYY/MM/DD to YYYY-MM-DD (if needed)
      dateString = dateString.replace(/\//g, "-");
    }

    const date = new Date(dateString);
    const month =`${months[date.getMonth() ]} ${date.getFullYear()}`
    if(!acc[month]){
      acc[month] =  values.amount;
    }
    else{
      acc[month] += values.amount
    }    
    return acc;
  },{})
}
const incomeData = calculateMonthlyTotals(sortTransaction.filter((transaction)=>{
  if( transaction.type=='Income'){
    return transaction
  }
}));
const expenseData = calculateMonthlyTotals(sortTransaction.filter((transaction)=>{
  if( transaction.type=='Expense'){
    return transaction
  }
}));
 //for the  expenses pie chart data2...
  const spendingData =sortTransaction.filter((transaction)=>{
    if( transaction.type=='Expense'){
      return {tag:transaction.tag,amount:transaction.amount}
    }
  }).reduce((acc,value)=> {
    if(!acc[value.tag]){
      acc[value.tag] =  0
     }
          acc[value.tag] += value.amount
    return acc;
  },{} )
  
  const spendingTags = Object.keys(spendingData)
  const spendingAmounts = Object.values(spendingData)
  const allMonths = Array.from(new Set([...Object.keys(incomeData), ...Object.keys(expenseData)])).sort((a, b) => new Date(a) - new Date(b));

  // Create datasets with zeros for missing values
  const incomeDataPoints = allMonths.map(month => incomeData[month] || 0);
  const expenseDataPoints = allMonths.map(month => expenseData[month] || 0);
  const data = {

 labels :allMonths,

    datasets: [
      {
        label: 'Expenses',
        data: [...expenseDataPoints],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(167, 35, 35, 0.7)',
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)', // Hover effect for background color
        hoverBorderColor: 'rgba(167, 35, 35, 1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
      {
        label: 'Income',
        data: [...incomeDataPoints],
        backgroundColor: 'rgba(80, 185, 48, 0.2)',
        borderColor: 'rgba(80, 185, 48, 0.9)',
        hoverBackgroundColor: 'rgba(80, 185, 48, 0.5)',
        hoverBorderColor: 'rgba(80, 185, 48, 1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const options = {
        responsive: true,
maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: { size: 14, family: 'Poppins', weight: '500' },
          color: 'grey',
          usePointStyle: true,
        },
        onHover: (event) => {
          event.native.target.style.cursor = 'pointer';
        },
        onLeave: (event) => {
          event.native.target.style.cursor = 'default';
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    interaction: { mode: 'nearest', intersect: true },
    scales: {
      x: {
        
        grid: { display: false }, ticks: { padding: 16,maxTicksLimit: 6, } },
      y: {
        border: { dash: [12, 6], color: 'transparent' },
        ticks: { padding: 16, font: { family: 'Poppins', size: 12 } },
      },
    },
  };

  const data2 = {
    labels: [...spendingTags],
    datasets: [
      {
        label: 'Expenses by Category',
        data: [...spendingAmounts],
        backgroundColor: [
          'rgba(255, 77, 99, 0.8)', // Darker red
          '#437ef5', // Darker blue
          'rgba(255, 165, 0, 0.8)',  // Darker yellow
          'rgba(60, 150, 150, 0.8)', // Darker teal
          'rgba(120, 70, 200, 0.8)', // Darker purple
          'rgba(255, 130, 30, 0.8)', // Darker orange
          'rgba(100, 160, 30, 0.8)', // Darker green
          'rgba(180, 50, 130, 0.8)'  // Darker pink
        ],
        hoverBackgroundColor: [
          'rgba(255, 77, 99, 1)',   
          '#2870ff',   
          'rgba(255, 165, 0, 1)',   
          'rgba(60, 150, 150, 1)',   
          'rgba(120, 70, 200, 1)',  
          'rgba(255, 130, 30, 1)',   
          'rgba(100, 160, 30, 1)',   
          'rgba(180, 50, 130, 1)'   
        ]
,        
        borderWidth: 0,
      },
    ],
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, family: 'Poppins', weight: '500' },
          color: 'grey',
          usePointStyle: true,
        },
        onHover: (event) => {
          event.native.target.style.cursor = 'pointer';
        },
        onLeave: (event) => {
          event.native.target.style.cursor = 'default';
        },
      },
    },
    elements: {
      arc: {
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
    cutout: '60%',
  };

  return (
    <div className='parent'>
      <div className='graph'>
        <h2 style={{ margin: '0 0 15px 18px', color: '#2a2a2a', fontWeight: '600', textAlign:'start', width:'100%'}}>Financial Statistic</h2>
        <Line data={data} options={options} />
      </div>
      <div className='pie'>
        <h2 style={{ margin: '4px 0px 25px 18px', color: '#2a2a2a', fontWeight: '600' }}>All Expenses</h2>
        <div className="total">
          <p style={{textAlign:'center'}}>Total</p>
          <span style={{textAlign:'center'}} className='spanofpie'>₹{expenses}</span>
        </div>
        <Doughnut data={data2} options={options2} />
      </div>
    </div>
  );
};

export default ChartComponent;
