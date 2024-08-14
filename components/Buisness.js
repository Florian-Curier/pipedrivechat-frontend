import styles from '../styles/Buisness.module.css'
import { useState, useEffect } from "react";
import Chart from '../components/Chart';

function Buisness() {


    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const pipedriveCompanyId = 13476443;
    const pipedriveUserId = 21669270;
    // const pipedriveCompanyId = user.pipedrive_company_id;
    // const pipedriveUserId = user.pipedrive_user_id;
    const [dealData, setDealData] = useState([]);

    const startDate = new Date("2024-06-01");
    const endDate = new Date("2024-08-30");
    const timeUnit = 'week';

        useEffect(() => {

            const fetchDealsData = async () => {

              const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/dashboard/turnover/${pipedriveCompanyId}/${pipedriveUserId}/${startDate}/${endDate}/${timeUnit}`);
              const routeDealsData = await response.json();
        //   console.log(routeDealsData.deals)
              setDealData([...routeDealsData.deals]);

            }
          
            fetchDealsData()

              .catch(console.error);;
          }, [])

        //   console.log(dealData)


    
    let  filteredDealData = dealData.map((data) => {
      data.time = data.won_time
      return data
    })


    const dealsData = {
        labels: filteredDealData.map((data) => data.time = data.won_time),
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
      };

      console.log(dealsData)
    
      
    
      return (
        <div className="App">
          <div style={{ width: 700 }}>
            <Chart send={true} chartData={filteredDealData} chartType='Bar' chartTitle='Turnover' />
          </div>
        </div>
      );

}

export default Buisness;
