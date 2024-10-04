import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

    const[data, setData] = useState([["Date","Prices"]])


    // XX----OLD CODE WITH ERROR----XX

    // useEffect (() => {
    //     let dataCopy = useState[["Date","Prices"]];
    //     if (historicalData.prices) {
    //         historicalData.prices.map((item)=>{
    //             dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
    //         })
    //         setData(dataCopy);
    //     }
    // },[historicalData])




    useEffect (() => {
        if (historicalData.prices) {
            let dataCopy = [...data]; // Create a new array based on the current data state
            historicalData.prices.map((item)=>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            setData(dataCopy); // Update the state with the modified array
        }
    },[historicalData])

  return (
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
  )
}

export default LineChart
