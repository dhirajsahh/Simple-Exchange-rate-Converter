import { Card, Form, Select } from "antd";
import { Input } from "antd";
import { useEffect, useState } from "react";
import "./crypto.css";
import React from "react";

function MoneyConverter() {
  const [list, setList] = useState([]);
  const [exchangerates, setExchangeRates] = useState([]);
  const [convertedmoney, setConvertedMoney] = useState([]);
  const [firstrates, setFirstrates] = useState();
  const [secondrates, setSecondrates] = useState();
  const [inputValue, setInputValue] = useState(0);
  const [firstSelector, setfirstSelector] = useState("USD");
  const [secondSelector, setsecondSelector] = useState("NPR");

  const apiurl = "https://open.er-api.com/v6/latest/USD";

  async function fetchdata() {
    const response = await fetch(apiurl);
    const jsonData = await response.json();
    setList(jsonData.rates);
  }
  console.log(inputValue);
  const data = Object.entries(list);

  const tempArray = data.map((item) => {
    return {
      value: item[0],
      label: item[0],
      exchangerates: item[1],
    };
  });

  // console.log(tempArray);
  useEffect(() => {
    fetchdata();
    if (tempArray.length === 0) return;
    const firstunit = tempArray.find((item) => {
      return item.value === firstSelector;
    }).exchangerates;

    const secondunit = tempArray.find((item) => {
      return item.value === secondSelector;
    }).exchangerates;
    setFirstrates(firstunit);
    setSecondrates(secondunit);
    console.log(firstrates, secondrates);
  }, [inputValue, firstSelector, secondSelector]);

  return (
    <div>
      {/* {console.log(firstSelector, secondSelector)} */}
      <Card title={"MONEY CONVERTER"}>
        <Form.Item>
          <div className="inputcontainer">
            <Input
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
          <div className="form-inner">
            <Select
              onSelect={(event) => {
                setfirstSelector(event);
              }}
              style={{ width: 120 }}
              defaultValue="USD"
              options={tempArray}
            ></Select>
            <Select
              style={{ width: 120 }}
              onSelect={(event) => {
                setsecondSelector(event);
              }}
              defaultValue="NPR"
              options={tempArray}
            ></Select>
          </div>
        </Form.Item>
        <Form.Item>
          <p>
            <button
              onClick={() => {
                const money = (inputValue * secondrates) / firstrates;
                setConvertedMoney(money);
              }}
            >
              Convert
            </button>
          </p>
          <p>
            {" "}
            {inputValue} {firstSelector}={convertedmoney}
            {secondSelector}{" "}
          </p>
        </Form.Item>
      </Card>
    </div>
  );
}

export default MoneyConverter;
