import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import Editor from "react-simple-code-editor";
import Split from "react-split";
import { Line, Chart } from "react-chartjs-2";
import json5 from "json5";

import {
  LineNumber,
  LineNumberContainer,
  InputContainer,
  TitleContainer,
} from "./style";
import "./style.css";

interface ILine {
  type: string;
  timestamp: Date;
  begin?: Date;
  end?: Date;
  select?: string[];
  group?: string[];
  [otherOptions: string]: any;
}

interface IPlot {
  labels: string[];
  datasets: IData[];
}

interface IData {
  label: string;
  data: string[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
}

export default function App() {
  const [state, setState] = useState({ width: 200, height: 200 });
  const [input, setInput] = useState("");
  const [plotData, setPlotData] = useState<any>({ labels: [], datasets: [] });

  const generateChart = () => {
    /* 
      Split input string by linebreak and
      parseing each value to object format
     */
    const inputLines = input.split("\n").map((line) => json5.parse(line));

    let select: string[] = [];
    let group: string[] = [];

    /* 
      Iteration over each value 
      to determine the correct course
      of action
    */

    inputLines.map((line) => {
      if (line.type === "start") {
        /* 
          Lines of type "start" should just set
          the initial parameters 
        */
        select = line.select!;
        group = line.group!;
      } else if (line.type === "span") {
        /* 
          Lines of type "span" setting the 
          labels on the chart
        */
        plotData.labels.push(String(line.begin));
        plotData.labels.push(String(line.end));
      } else if (line.type === "data") {
        /* 
          Lines of type "data" creating new
          line on the chart or updating existing ones
          for each value of "select"
        */
        select.map((selectValue) => {
          let label =
            group.reduce((prev, cur) => line[prev] + " " + line[cur]) +
            " " +
            selectValue;

          setPlotData((plotData: any) => {
            console.log(label);
            console.log(
              plotData.datasets.length > 0 &&
                plotData.datasets.filter((data: any) => data.label === label)
            );
            if (
              plotData.datasets.filter((data: any) => data.label === label)
                .length !== 0
            ) {
              return {
                labels: plotData.labels,
                datasets: plotData.datasets.map((data: any) => {
                  if (data.label === label) {
                    data.data.push(line[selectValue]);
                    return data;
                  } else {
                    return data;
                  }
                }),
              };
            } else {
              const rgb = `rgb(${Math.random() * 100}, ${
                Math.random() * 100
              }, ${Math.random() * 100})`;
              const data = {
                label,
                data: [line[selectValue]],
                fill: false,
                backgroundColor: rgb,
                borderColor: rgb,
              } as IData;

              return {
                labels: plotData.labels,
                datasets: [...plotData.datasets, data],
              };
            }
          });
        });
      } else if (line.type === "stop") {
        /* 
          Lines of type "stop" breaking the
          reading of new lines
        */
      }
    });
  };

  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <TitleContainer>
        <Typography variant={"h4"}>Lucas' Challenge</Typography>
      </TitleContainer>

      <Split direction="vertical" style={{ height: "calc(100vh - 4rem)" }}>
        <InputContainer>
          <LineNumberContainer>
            {input.split("\n").map((e, i) => {
              return <LineNumber>{i}</LineNumber>;
            })}
          </LineNumberContainer>
          <Editor
            value={input}
            onValueChange={(code) => setInput(code)}
            highlight={(code) => highlight(code, languages.js, "javascript")}
            padding={10}
            style={{
              fontFamily:
                '"Source Code Pro", "Source Sans Pro","Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </InputContainer>
        <Line style={{ height: "50%" }} data={plotData} />
      </Split>
      <Button onClick={generateChart}>GENERATE CHART</Button>
    </div>
  );
}
