import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";

const MeasurementsChartA = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.openaq.org/v1/measurements?country_id=DE"
      );
      setData(response.data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const seriesData = {};
      data.forEach((measurement) => {
        if (!seriesData[measurement.city]) {
          seriesData[measurement.city] = [];
        }
        seriesData[measurement.city].push({
          x: new Date(measurement.date.local),
          y: measurement.value,
          name: measurement.city,
          unit: measurement.unit
        });
      });

      const series = Object.keys(seriesData).map((city) => ({
        name: city,
        data: seriesData[city]
      }));
      console.log(series, "series");

      Highcharts.chart("chart-container", {
        chart: {
          type: "line"
        },
        title: {
          text: "Environmental Measurements Across German Cities"
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: "Measurement Value"
          }
        },
        tooltip: {
          formatter: function () {
            return `City: ${this.point.name}<br/>Value: ${this.y} ${
              this.point.unit
            }<br/>Date: ${Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x)}`;
          }
        },
        series: series
      });
    }
  }, [data]);

  return <div id="chart-container"></div>;
};

// export default Example;

export default MeasurementsChartA;
