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
  ButtonContainer,
} from "./style";
import "./style.css";

interface IData {
  label: string;
  data: string[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
}

export default function App() {
  const [input, setInput] = useState("");
  const [plotData, setPlotData] = useState<any>({ labels: [], datasets: [] });

  const generateChart = () => {
    if (input.length === 0) return;
    /* 
      Split input string by linebreak and
      parseing each value to object format
    */
    const inputLines = input
      .trim()
      .split("\n")
      .map((line) => json5.parse(line));

    let select: string[] = [];
    let group: string[] = [];
    let shouldBlockOperation = false;

    /* 
      Iteration over each value 
      to determine the correct course
      of action
    */

    inputLines.map((line) => {
      if (line.type === "start") {
        /* 
          Lines of type "start" should just set
          the initial parameters and set the flag
          to false
        */
        select = line.select!;
        group = line.group!;
        shouldBlockOperation = false;
      } else if (line.type === "span") {
        /* 
          Lines of type "span" setting the 
          labels on the chart
        */
        if (shouldBlockOperation) return;
        plotData.labels.push("00:00");
        plotData.labels.push(String(line.end - line.begin));
      } else if (line.type === "data") {
        /* 
          Lines of type "data" creating new
          line on the chart or updating existing ones
          for each value of "select"
        */
        if (shouldBlockOperation) return;
        select.map((selectValue) => {
          /* 
            Concatenating the current "select" value with
            all of the "group" values for the label
            attribute
          */
          let label =
            group.reduce((prev, cur) => line[prev] + " " + line[cur]) +
            " " +
            selectValue.replaceAll("_", " ");

          label = label
            .toLowerCase()
            .split(" ")
            .map(function (word) {
              return word[0].toUpperCase() + word.substr(1);
            })
            .join(" ");

          setPlotData((plotData: any) => {
            if (
              plotData.datasets.filter((data: any) => data.label === label)
                .length !== 0
            ) {
              /* 
                If the current label is already
                in the plotData object, update 
                the object with that label
              */
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
              /* 
                If the current label is not
                in the plotData object, create
                a new value to be pushed into it
              */
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
        shouldBlockOperation = true;
      }
    });
  };

  return (
    <div>
      <TitleContainer>
        <Typography variant={"h5"} fontWeight={"bold"}>
          Lucas Peixoto's Challenge
        </Typography>
      </TitleContainer>

      <Split direction="vertical" style={{ height: "calc(94vh - 4rem)" }}>
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
              fontFamily: '"Source Code Pro", "Source Sans Pro", "sans-serif"',
              fontSize: 15,
              backgroundColor: "#2e3440",
              color: "white",
              width: "100%",
              height: "100%",
            }}
          />
        </InputContainer>
        <Line data={plotData} height={100} />
      </Split>
      <ButtonContainer>
        <Button variant={"contained"} color={"primary"} onClick={generateChart}>
          GENERATE CHART
        </Button>
      </ButtonContainer>
    </div>
  );
}
