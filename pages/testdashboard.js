import { useState } from "react";
import BarChart from '../components/BarChart';
import Chart from '../components/Chart';




function TestDashboardPage () {

    const dealData = [
        {
            id: 1,
            wonDate: "2024-05-20",
            value: 80000,
        },
        {
            id: 2,
            wonDate: "2024-07-20",
            value: 80000,
        },
        {
            id: 3,
            wonDate: "2024-08-01",
            value: 55000,
        },
        {
            id: 4,
            wonDate: "2024-08-05",
            value: 72000,
        },
        {
            id: 5,
            wonDate: "2024-08-10",
            value: 69000,
        },
        {
            id: 6,
            wonDate: "2024-08-15",
            value: 85000,
        },
        {
            id: 7,
            wonDate: "2024-08-20",
            value: 78000,
        },
        {
            id: 8,
            wonDate: "2024-08-25",
            value: 60000,
        },
        {
            id: 9,
            wonDate: "2024-08-30",
            value: 90000,
        },
    ];

    const startDate = new Date("2024-05-20");
    const endDate = new Date("2024-08-30");
    
    const filteredDealData = dealData.filter(deal => {
        const date = new Date(deal.wonDate);
        return date >= startDate && date <= endDate;
    });
    
    console.log(filteredDealData);
    
    console.log(filteredDealData);


    const [dealsData, setDealsData] = useState({
        labels: filteredDealData.map((data) => data.wonDate),
        datasets: [
          {
            label: "Turnover",
            data: filteredDealData.map((data) => data.value),
            backgroundColor: [
              "#2D8647",
            //   "#ecf0f1",
            //   "#50AF95",
            //   "#f3ba2f",
            //   "#2a71d0",
            ],
            borderColor: "grey",
            borderWidth: 2,
          },
        ],
      });
    
      
    
      return (
        <div className="App">
          <div style={{ width: 700 }}>
            <Chart chartData={dealsData} chartType ='Pie' />
          </div>
        </div>
      );
}

export default TestDashboardPage;