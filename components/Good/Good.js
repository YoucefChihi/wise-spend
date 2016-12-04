import React, { Component } from 'react';
import classnames from 'classnames';

export default class Good extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goodOpen: false,
    }
  }

  goodClick = () =>{
    this.setState({
      goodOpen: !this.state.goodOpen
    })
  }

  purchase(price) {
    console.log(price)
  }

  render(){
    return(
      <div class={classnames({
        "good": true,
        "open": this.state.goodOpen
      })}
      >
        <div class="label"
          onClick={this.goodClick}
        >
          {this.props.data.label}
        </div>
        <div class="prices">
          {this.props.data.prices.map((price, index) => (
            <a href="#" class="price" key={"price"+index}
              onClick={this.props.purchase.bind(
                this.props.context,
                price,
                this.props.data.label,
                this
              )}
            >{price}</a>
          ))}
        </div>
      </div>
    )
  }
}
