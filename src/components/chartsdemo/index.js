import React from "react";
import { LineChart, Brush, BarChart } from 'react-d3-components';

import * as d3 from 'd3';

export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data2: [{
        label: 'Wide Eye',
        values: [{ x: 'SomethingA', y: 10 }]
      }],
      newData: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      //Perform some operation
      this.setState({ newData: nextProps.newData2 });
      console.log('recieved new props')
      console.log(this.state.data2);
    }
  }

  render() {
    let dataAct = this.state.newData ? this.state.newData : this.state.data2;
    return (
      <BarChart
        data={dataAct}
        width={600}
        height={500}
        margin={{ top: 100, bottom: 100, left: 50, right: 10 }} />
    );
  }
}
