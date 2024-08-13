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

    // const dealData =  [
    //     {
    //     "id": 1,
    //     "title": "BigCompany deal",
    //     "creator_user_id": 21180837,
    //     "value": 5000,
    //     "person_id": 1,
    //     "org_id": 1,
    //     "stage_id": 1,
    //     "currency": "USD",
    //     "add_time": "2024-05-20T23:03:45Z",
    //     "update_time": "2024-05-21T02:32:08Z",
    //     "status": "won",
    //     "probability": null,
    //     "lost_reason": null,
    //     "visible_to": 3,
    //     "close_time": "2024-05-21T02:32:08Z",
    //     "pipeline_id": 1,
    //     "won_time": "2024-05-21T02:32:08Z",
    //     "lost_time": null,
    //     "stage_change_time": null,
    //     "local_won_date": "2024-05-20",
    //     "local_lost_date": null,
    //     "local_close_date": "2024-05-20",
    //     "expected_close_date": null,
    //     "custom_fields": null,
    //     "owner_id": 21180837,
    //     "label_ids": [],
    //     "is_deleted": false,
    //     "origin": "ManuallyCreated",
    //     "origin_id": null,
    //     "channel": null,
    //     "channel_id": null
    //     },
    //     {
    //     "id": 2,
    //     "title": "MediumCompany deal",
    //     "creator_user_id": 21180837,
    //     "value": 0,
    //     "person_id": 2,
    //     "org_id": 2,
    //     "stage_id": 1,
    //     "currency": "USD",
    //     "add_time": "2024-05-20T23:15:29Z",
    //     "update_time": "2024-05-20T23:15:38Z",
    //     "status": "won",
    //     "probability": null,
    //     "lost_reason": null,
    //     "visible_to": 3,
    //     "close_time": "2024-05-20T23:15:38Z",
    //     "pipeline_id": 1,
    //     "won_time": "2024-05-20T23:15:38Z",
    //     "lost_time": null,
    //     "stage_change_time": null,
    //     "local_won_date": "2024-05-20",
    //     "local_lost_date": null,
    //     "local_close_date": "2024-05-20",
    //     "expected_close_date": null,
    //     "custom_fields": null,
    //     "owner_id": 21180837,
    //     "label_ids": [],
    //     "is_deleted": false,
    //     "origin": "ManuallyCreated",
    //     "origin_id": null,
    //     "channel": null,
    //     "channel_id": null
    //     },
    //     {
    //     "id": 1,
    //     "title": "BigCompany deal",
    //     "creator_user_id": 21180837,
    //     "value": 0,
    //     "person_id": 1,
    //     "org_id": 1,
    //     "stage_id": 1,
    //     "currency": "USD",
    //     "add_time": "2024-05-20T23:03:45Z",
    //     "update_time": "2024-05-21T02:32:08Z",
    //     "status": "won",
    //     "probability": null,
    //     "lost_reason": null,
    //     "visible_to": 3,
    //     "close_time": "2024-05-21T02:32:08Z",
    //     "pipeline_id": 1,
    //     "won_time": "2024-05-21T02:32:08Z",
    //     "lost_time": null,
    //     "stage_change_time": null,
    //     "local_won_date": "2024-05-20",
    //     "local_lost_date": null,
    //     "local_close_date": "2024-05-20",
    //     "expected_close_date": null,
    //     "custom_fields": null,
    //     "owner_id": 21180837,
    //     "label_ids": [],
    //     "is_deleted": false,
    //     "origin": "ManuallyCreated",
    //     "origin_id": null,
    //     "channel": null,
    //     "channel_id": null
    //     },
    //     {
    //     "id": 2,
    //     "title": "MediumCompany deal",
    //     "creator_user_id": 21180837,
    //     "value": 0,
    //     "person_id": 2,
    //     "org_id": 2,
    //     "stage_id": 1,
    //     "currency": "USD",
    //     "add_time": "2024-05-20T23:15:29Z",
    //     "update_time": "2024-05-20T23:15:38Z",
    //     "status": "won",
    //     "probability": null,
    //     "lost_reason": null,
    //     "visible_to": 3,
    //     "close_time": "2024-05-20T23:15:38Z",
    //     "pipeline_id": 1,
    //     "won_time": "2024-05-20T23:15:38Z",
    //     "lost_time": null,
    //     "stage_change_time": null,
    //     "local_won_date": "2024-05-20",
    //     "local_lost_date": null,
    //     "local_close_date": "2024-05-20",
    //     "expected_close_date": null,
    //     "custom_fields": null,
    //     "owner_id": 21180837,
    //     "label_ids": [],
    //     "is_deleted": false,
    //     "origin": "ManuallyCreated",
    //     "origin_id": null,
    //     "channel": null,
    //     "channel_id": null
    //     }
    //     ];

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
            <Chart chartData={filteredDealData} chartType='Bar' chartTitle='Turnover' />
          </div>
        </div>
      );

}

export default Buisness;
