import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const API_URL = "https://api.openaq.org/v1/measurements?country_id=DE";

const MeasurementsChart = () => {
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setMeasurements(response.data.results);
    });
  }, []);

  const options = {
    title: {
      text: "Environmental Measurements in German Cities",
    },
    xAxis: {
      categories: measurements.map((measurement) => measurement.city),
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    series: [
      {
        name: "Measurement",
        data: measurements.map((measurement) => measurement.value),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MeasurementsChart;
