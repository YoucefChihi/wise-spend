import React, { Component } from 'react';
import 'react-fastclick';
import classnames from 'classnames'

export default class Circle extends Component {

  constructor(props) {
    super(props);
  }

  circleStyle() {
    let deg1 = 0;
    let deg2 = 0;
    let rightVisible = true;
    let consumed = this.props.consumed;
    let total = this.props.total;
    let ratio = consumed/total;

    if(ratio < 0.5){
      rightVisible = true;
      deg1 = 360*ratio;
      deg2 = 0;
    } else{
      rightVisible = false
      deg2 = 360*(ratio - 0.5)
    }

    let style = {
      right: {
        transform: `rotate(${deg1}deg)`,
        display: rightVisible ? 'initial' : 'none'
      },
      left: {
        transform: `rotate(${deg2}deg)`,
        display: total - consumed >= 0 ? 'initial' : 'none'
      }
    }

    return style;
  }

  currentStyle() {
    let style = {};
    let size = 3;
    let left = this.props.total - this.props.consumed;
    if(left > 99999){
      size = 2.5
    }

    if (left > 999999) {
      size = 2.2
    }

    if (left > 9999999) {
      size = 2
    }

    style = {
      fontSize: size+'em'
    }

    return style;
  }

  render(){
    let ratio = 0.003155339805825243;
    return(
      <div class="pie-container"
        style={{
          transform: `scale(${screen.width*ratio})`
        }}
      >
        <a href="#" class="over-pie"
          onClick={this.props.togglePieActions}>
          <div class="current" style={this.currentStyle()}>
            {this.props.total - this.props.consumed}
          </div>
          <div class="out-of">out of</div>
          <div class="total">{this.props.total}</div>
        </a>
        <div class={classnames({
          "pie-actions": true,
          "open": this.props.pieActionsOpen
        })}>
          <a href="#" class="withdraw"
            onClick={this.props.withdraw}
          >
            <div class="label">withdraw</div>
          </a>
          <a href="#" class="feed"
            onClick={this.props.feed}
          >
            <div class="label">feed</div>
          </a>
        </div>
        <div class="pie">
          <div class="right">
            <div class="fill" style={this.circleStyle().right}></div>
          </div>
          <div class="left">
            <div class="fill" style={this.circleStyle().left}></div>
          </div>
        </div>
      </div>
    )
  }
}
