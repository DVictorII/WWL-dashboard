import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BubbleController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  // ChartType
} from "chart.js";
import { Line } from "react-chartjs-2";

import {
  
  piezoRawData,
} from "../../utils/sectionChartData";
import { useMediaQuery } from "react-responsive";
import {monitoringMapStatusInfo} from "../../utils/monitoringMapStatusInfo"

const piezoLine = {
  id: "piezoLine",
  beforeDatasetsDraw(chart, args, options) {
    const piezometersData = options.piezometersData;
    const XValues = options.XValues;
    const YTopValues = options.YTopValues;

    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
      scales: { x, y },
    } = chart;


    let piezometer;
    for (let i = 0; i <= piezometersData.length - 1; i++) {
        piezometer = piezometersData[i];
        // console.log(piezometer)
      if(piezometer[3] !== 0){


  
        ctx.save();

  
        ctx.strokeStyle = piezometer[0] === "VW-CD3-03" ? "#008000" : "#333";
        

       
        // ctx.strokeRect(
        //   x.getPixelForValue( XValues.findIndex((p)=>p === piezometer[2]) ),
        //   y.getPixelForValue(piezometer[4]) ,
        //   0,
        //   y.getPixelForValue(piezometer[3]) - y.getPixelForValue(piezometer[4])
        // );

        ctx.strokeRect(
          x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) )  ,
          
          y.getPixelForValue(piezometer[4]) ,
          0 ,
          y.getPixelForValue(piezometer[3]) - y.getPixelForValue(piezometer[4])
        );
  
        ctx.restore();
      }
    }
  },
  // beforeDraw(chart, args, options) {
  //   const piezometersData = options.piezometersData;
  //   const XValues = options.XValues;
  //   const YTopValues = options.YTopValues;

  //   const {
  //     ctx,
  //     chartArea: { top, right, bottom, left, width, height },
  //     scales: { x, y },
  //   } = chart;

  //   console.log("XVALUES",XValues)

  //   let piezometer;
  //   for (let i = 0; i <= piezometersData.length - 1; i++) {
  //       piezometer = piezometersData[i];
  //     if(piezometer[3] !== 0){

  
  //       ctx.save();

  
  //       ctx.strokeStyle = piezometer[0] === "VW-CD3-01" ? "#008000" : "#333";
        

       
  //       // ctx.strokeRect(
  //       //   x.getPixelForValue( XValues.findIndex((p)=>p === piezometer[2]) ),
  //       //   y.getPixelForValue(piezometer[4]) ,
  //       //   0,
  //       //   y.getPixelForValue(piezometer[3]) - y.getPixelForValue(piezometer[4])
  //       // );

  //       ctx.strokeRect(
  //         x.getPixelForValue( XValues.findIndex((p)=>p === piezometer[2]) ),
  //         y.getPixelForValue(piezometer[4]) ,
  //         0,
  //         y.getPixelForValue(piezometer[3]) - y.getPixelForValue(piezometer[4])
  //       );
  
  //       ctx.restore();
  //     }
  //   }
  // },
};

ChartJS.register(
  CategoryScale,
  BubbleController,
  
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  piezoLine
);


function SectionChart({chartCoordinates, chartPiezometers}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  console.log("COORDINATES", chartCoordinates)
  console.log("PIEZOMETERS", chartPiezometers)

  

  const XChainage = chartCoordinates.map((arr) => arr[0]);
const Y1GroundLvl = chartCoordinates.map((arr) => arr[1]);
const Y2SurveyLvl = chartCoordinates.map((arr) => arr[2]);
const Y3WaterLvl = chartCoordinates.map((arr) => arr[3]);


  const labels = XChainage;

  const data = {
  labels ,
  
  datasets: [
    {
      label: "Ground lvl (RLm)",
      data: Y1GroundLvl,
      borderColor: "rgb(123,136,49)",
      backgroundColor: "rgba(123,136,49, 0.5)",
      pointRadius: 0,
      pointHitRadius: 0,
      order:1,
    },
    {
      label: "2022 Survey lvl (RLm)",
      data: Y2SurveyLvl,
      borderColor: "rgb(135, 101, 56)",
      backgroundColor: "rgba(135, 101, 56, 0.5)",
      pointRadius: 0,
      pointHitRadius: 0,
      order:1,
    },

    {
      label: "Water lvl (m)",
      data: Y3WaterLvl,
      borderColor: "rgb(37,109,123)",
      fill: true,
      backgroundColor: "rgba(37,109,123, 0.2)",
      pointRadius: 0,
      pointHitRadius: 0,
      order:1,
    },

    ...chartPiezometers.filter((piezoData)=>piezoData[3] !== 0).map((piezoData,i) => {
      const name = piezoData[0];
      const XPosition = piezoData[2];
      
      const YPosition = piezoData[3];
      const YIntersection = piezoData[4];


       return {
        label: "none",
        
        backgroundColor:  monitoringMapStatusInfo[piezoData[1]].normalColor  ,
        borderColor:  monitoringMapStatusInfo[piezoData[1]].darkColor,
        // hoverRadius:100,
        hoverBorderWidth: i === 0 ? 3 : 2,
        borderWidth: i === 0 ? 3 : 2,
        radius: i === 0 ? 14 : 7,
        type: "bubble" ,
        
        data: [
          {
            y: YPosition,
            x: XPosition,
            name
          },
        ],
      };
    }),
  ],
};

  const options = {
    responsive: true,
    
    animation:{
      duration:0
    },
    maintainAspectRatio: false,
    plugins: {
      
      legend: {
      //   position: "top" ,
      //   labels: {
      //     filter: item => item.text !== 'none',
        
      // },
      display:false
      },
      title: {
        display: false,
        text: "Section test",
      },
      tooltip: {
        callbacks: {
          title: (ctx) => {
            return ;
          },

          label: (ctx) => {
            // console.log(ctx)
            return ` ${ctx.raw.name}`
          }
        },
      },
      piezoLine: {
        piezometersData: chartPiezometers,
        XValues: labels,
        YTopValues: Y2SurveyLvl
      },
    },

    scales: {
      x: {
        
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
          },
          // maxTicksLimit: 20
          stepSize: 50
        },

        grid: {
          display: true,
          order:1,
          // drawTicks: true,
          color: "#f1f1f1"
        }
        
      },
      y: {
        
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
          },
          
        },

        grid: {
          display: true,
          order:1,
          
          // drawTicks: true,
          color: "#f1f1f1"
        }
      },

      
    },
  };

  return <Line options={options} data={data} />;
}

export default SectionChart;
