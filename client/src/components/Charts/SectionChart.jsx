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


import { useMediaQuery } from "react-responsive";
import {monitoringMapStatusInfo} from "../../utils/monitoringMapStatusInfo"
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

export const piezoLine = {
  id: "piezoLine",
  beforeDatasetsDraw(chart, args, options) {
    if( options.display){

      const piezometersData = options.piezometersData;
      const piezoInformation = options.piezoInformation;
  
      // console.log("DATA",piezoInformation[0].id)
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
  
          const piezoInfo = piezoInformation.find((p)=>p.id === piezometer[0])
  
          const readingIsPositive =   piezometer[4] - piezometer[3] >= 0
  
          if (piezoInfo.status === 1) {
             
            if(piezometer[3] !== 0){
  
              
      
      
        
              ctx.save();
      
        
              // ctx.strokeStyle = i === 0 ? "#7B8831" : "#333";
              ctx.strokeStyle = monitoringMapStatusInfo[piezoInfo.status].normalColor;
              ctx.lineWidth = 2;
  
            
              if (!readingIsPositive){
  
                ctx.setLineDash([1,3])
              }
  
  
              
      
             
              // ctx.strokeRect(
              //   x.getPixelForValue( XValues.findIndex((p)=>p === piezometer[2]) ),
              //   y.getPixelForValue(piezometer[4]) ,
              //   0,
              //   y.getPixelForValue(piezometer[3]) - y.getPixelForValue(piezometer[4])
              // );
      
              ctx.strokeRect(
                x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) )  ,
                
                y.getPixelForValue(piezometer[3]) ,
                0 ,
                readingIsPositive ? y.getPixelForValue(piezometer[4]) - y.getPixelForValue(piezometer[3]) : 15
                
              );
        
              ctx.restore();
  
              ctx.save();
              ctx.beginPath();
              if (readingIsPositive){
  
                ctx.moveTo(x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) ) - 4 ,y.getPixelForValue(piezometer[4]))
                ctx.lineTo(x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) ) + 4, y.getPixelForValue(piezometer[4]))
                ctx.lineTo(x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) ), y.getPixelForValue(piezometer[4]) + 6)
              } else{
                ctx.moveTo(x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) ) - 4 ,y.getPixelForValue(piezometer[3])+15)
                ctx.lineTo(x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) ) + 4, y.getPixelForValue(piezometer[3])+15)
                ctx.lineTo(x.getPixelForValue( XValues.findIndex((x)=>x === piezometer[2]) ), y.getPixelForValue(piezometer[3]) + 21)
              }
              ctx.fillStyle = '#1c394a';
              ctx.fill()
  
              
            }
          }
  
      }
    }
  },
  
};

// const readingsShapes = {
//   id: 'readingsShapes',
//   afterDraw(chart, args, options) {
//     const {ctx} = chart;
    
//     ctx.save();
//     ctx.beginPath();
//     ctx.moveTo(364,90)
//     ctx.lineTo(330,177)
//     ctx.lineTo(398,177)
//     ctx.fillStyle = 'black';
//     ctx.fill()
//   }
// }

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
  piezoLine,
  // readingsShapes
);


function SectionChart({chartCoordinates, chartPiezometers}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  
  
  const XChainage = chartCoordinates.map((arr) => arr[0]);
  const Y1GroundLvl = chartCoordinates.map((arr) => arr[1]);
  const Y2SurveyLvl = chartCoordinates.map((arr) => arr[2]);



  const labels = XChainage;



  const data = {
  labels ,

  
  datasets: [
    {
      label: "Original ground (RLm)",
      data: Y1GroundLvl,
      borderColor: "rgb(123,136,49)",
      backgroundColor: "rgba(123,136,49, 0.3)",
      pointRadius: 0,
      pointHitRadius: 0,
      order:1,
      fill: true,
      
      
    },
    {
      label: "Tailing surface (RLm)",
      data: Y2SurveyLvl,
      borderColor: "rgb(135, 101, 56)",
      backgroundColor: "rgba(135, 101, 56, 0.5)",
      pointRadius: 0,
      pointHitRadius: 0,
      order:1,
    },


    ...chartPiezometers.filter((piezoData)=>piezoData[3] !== 0).map((piezoData,i) => {
      const name = piezoData[0];

      const status = piezoData[1];
      const XPosition = piezoData[2];
      
      const YPosition = piezoData[3];
      const YIntersection = piezoData[4];

      const readingIsPositive =   YIntersection - YPosition >= 0


       return {
        label: "none",
        
        backgroundColor: readingIsPositive ?  monitoringMapStatusInfo[piezoData[1]].normalColor : status != 1 ? monitoringMapStatusInfo[piezoData[1]].normalColor : monitoringMapStatusInfo[piezoData[1]].lightColor  ,
        borderColor:  monitoringMapStatusInfo[piezoData[1]].darkColor,
        hoverRadius: i === 0 ? 3 : 2,
        hoverBorderWidth: i === 0 ? 2 : readingIsPositive ? 1 : 2,
        borderWidth: i === 0 ? 2 : readingIsPositive ? 1 : 2,
        radius: i === 0 ? 6 : 4,
        type: "bubble" ,
        
        
        data: [
          {
            y: YPosition,
            x: XPosition,
            name,
            reading: YIntersection ,
            status
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

            return ` ${ctx.raw.name} ${ctx.raw.status == 1 ? `${ctx.raw.reading - ctx.raw.y >= 0 ? `( ${ (ctx.raw.reading ).toFixed(2)} RLm )` : "( Negative reading )"}` : ""}` 
          }
        },
      },
      piezoLine: {
        display: true,
        piezometersData: chartPiezometers,
        piezoInformation: piezometersData,
        XValues: labels,
        YTopValues: Y2SurveyLvl
      },
      // readingsShapes
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

  return <Line options={options} data={data} className=""/>;
}

export default SectionChart;
