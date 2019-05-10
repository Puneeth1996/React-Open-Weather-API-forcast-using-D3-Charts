import React from "react";
import Form from "./components/form";
import Titles from "./components/titles";
import Chart from "./components/chartsdemo/index";
const Api_Key = "0a51f52a80e1d36043b1d3605497af41";

export default class App extends React.Component {

  state = {
    dataForcastArr: [],
    newData2: [],
    city: '',
    country: '',
    error: ''
  }
  // Below is the example for working with open weather map api call
  // api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
  //getWeather is a method we'll use to make the api call
  getWeather = async (e) => {
    // console.log("Inside getWeather method");
    let val = [];
    let valArr = [];
    let newData2 = [];
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${Api_Key}`);
      const response = await api_call.json();
      // console.log(response.list.slice(0, 7))
      this.setState({
        dataForcastArr: response.list.slice(0, 7),
        city,
        country,
        error: ""
      })

      this.state.dataForcastArr.forEach(el => {
        let val = { x: el.dt_txt, y: el.main.temp };
        valArr.push(val);
      });
      newData2 = [{
        label: 'Wide Eye',
        values: valArr
      }];

      console.log(newData2);
      this.setState({
        newData2
      })
    } else {
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  {this.state.error ? (<b>{this.state.error}</b>) : <Chart data={this.state.newData2} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
