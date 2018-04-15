import React, {Component} from 'react'
var RadarChart = require('react-chartjs').Radar

class MyComponent extends Component {
  shouldComponentUpdate (nextProps) {
    const { date } = this.props
    return nextProps.data !== date
  }

  render () {
    return (
      <RadarChart data={{
        labels: ['joy', 'anger', 'disgust', 'sadness', 'fear'],
        datasets: [
          {
            label: 'Yesterday',
            fillColor: 'rgba(136, 135, 255,0.2)',
            strokeColor: 'rgba(136, 135, 255,1)',
            pointColor: 'rgba(136, 135, 255,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(136, 135, 255,1)',
            data: [0.47, 0.14, 0.13, 0.5, 0.09]
          },
          {
            label: 'Today',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [0.59, 0.10, 0.04, 0.12, 0.08]
          }
        ]
      }}
      height={600}
      width={700}
      redraw/>
    )
  }
}

export default MyComponent
