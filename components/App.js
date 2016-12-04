import React, { Component } from 'react'
import { render } from 'react-dom'
import 'react-fastclick'
import s from '../styles/main.sass'
import classnames from 'classnames'

import Swipeable from 'react-swipeable'
import Circle from './Circle'
import Good from './Good'

const maxTotal = 99999999

const goods = [
  {label: 'coffee', prices: [2.5, 0.8]},
  {label: 'tea', prices: [3, 0.9]},
  {label: 'pizza', prices: [11]},
  {label: 'makloob', prices: [2.5, 0.8, 3.5]},
  {label: 'coke', prices: [2.5, 0.8]},
  {label: 'coffee', prices: [2.5, 0.8]},
  {label: 'tea', prices: [2.5, 0.8]},
  {label: 'pizza', prices: [2.5, 0.8]},
  {label: 'makloob', prices: [2.5, 0.8]},
  {label: 'coke', prices: [2.5, 0.8]},
  {label: 'coffee', prices: [2.5, 0.8]},
  {label: 'tea', prices: [2.5, 0.8]},
  {label: 'pizza', prices: [2.5, 0.8]},
  {label: 'makloob', prices: [2.5, 0.8]},
  {label: 'coke', prices: [2.5, 0.8]},
]

class App extends Component {
  constructor() {
    super();

    this.state = {
      total: 100,
      consumed: 40,
      mainMenuOpen: false,
      goodsMenuOpen: false,
      pieActionsOpen: false,
      modalOpen: false,
      modalValue: 0,
      modalContext: '',
    }
  }

  purchase(price, label, clickedItem) {
    clickedItem.setState({
      goodOpen: false
    })
    this.setState({
      consumed: this.state.consumed + price,
      // goodsMenuOpen: false,
    })
  }

  toggleGoodsMenu = () => {
    this.setState({
      goodsMenuOpen: !this.state.goodsMenuOpen
    })
  }

  _goodsMenu() {
    return(
      <div>

      </div>
    )
  }

  changeModalValue = (e) => {
    this.setState({
      modalValue: parseFloat(e.target.value)
    })
  }

  togglePieActions = (e) => {
    this.setState({
      pieActionsOpen: !this.state.pieActionsOpen
    })
  }

  feed = () => {
    this.setState({
      modalOpen: true,
      modalContext: 'feed',
      pieActionsOpen: false,
    })
  }

  withdraw = () => {
    this.setState({
      modalOpen: true,
      modalContext: 'withdraw',
      pieActionsOpen: false,
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  submitModal = () => {
    let total = parseFloat(this.state.total);
    let consumed = parseFloat(this.state.consumed);
    let context = this.state.modalContext;
    let modalValue = parseFloat(this.state.modalValue)
    if(modalValue){
      if(context == 'feed'){
        if(total - consumed + modalValue > total){
          total = total - consumed + modalValue
          consumed = 0
        }
        else{
          consumed -= modalValue
        }
      }
      if(context == 'withdraw')
        consumed += modalValue

      this.setState({
        total: total,
        consumed: consumed,
        modalValue: 0,
        modalOpen: false,
      })
    } else {
      this.setState({
        modalValue: 0,
        modalOpen: false,
      })
    }
  }

  closeMainMenu = ()=>{
    this.setState({
      mainMenuOpen: false,
      goodsMenuOpen: false,
    })
  }
  openMainMenu = ()=>{
    this.setState({
      mainMenuOpen: true
    })
  }
  openGoodsMenu = () => {
    this.setState({
      goodsMenuOpen: this.state.modalOpen ? false : true
    })
  }

  closeGoodsMenu = () => {
    this.setState({
      goodsMenuOpen: false
    })
  }

  render(){
    return(
      <div class="root">
        <Swipeable class={classnames({
          "main-menu":true,
          "open": this.state.mainMenuOpen
        })}
          onSwipedLeft={this.closeMainMenu}
        >
          <div>Manage monthly budget</div>
          <div>Manage goods list</div>
        </Swipeable>
        <div class={classnames({
          "modal": true,
          "open": this.state.modalOpen,
          "withdraw": this.state.modalContext == "withdraw",
          "feed": this.state.modalContext == "feed",
        })}>
          <div class="top-half">
            <div class="total-text">
              Total
            </div>
            <div class="total-value">
              {this.state.total - this.state.consumed}
              <br/>
              {this.state.modalContext == 'feed' ? '+' : '-'}
            </div>
            <input type="number"
              class="modal-value"
              onChange={this.changeModalValue}
              value={this.state.modalValue}/>
            <a href="#" class="close"
              onClick={this.closeModal}>&times;</a>
            <a href="#" class="submit"
              onClick={this.submitModal}>{this.state.modalContext}</a>
          </div>
        </div>

        <Swipeable class={classnames({
          "goods-menu-overlay": true,
          "open": this.state.goodsMenuOpen
        })}
          onSwipedRight={this.closeGoodsMenu}
        ></Swipeable>
        <div class={classnames({
          "goods-menu": true,
          "open": this.state.goodsMenuOpen
        })}>
        {goods.map((item, index) => (
          <Good data={item} key={"good"+index}
            purchase={this.purchase}
            context={this}
          />
        ))}
        </div>

        <div class="container">
          <div class="balance">
            <Circle consumed={this.state.consumed}
              total={this.state.total}
              togglePieActions={this.togglePieActions}
              pieActionsOpen={this.state.pieActionsOpen}
              feed={this.feed}
              withdraw={this.withdraw}
              submit={this.submit}
            />
          </div>
          <div class="savings">
            <div class="sv-cnt">
              <div class="title">Savings</div>
              <div class="amount">30</div>
            </div>
          </div>
        </div>
        <button
          class={classnames({
            'round-button': true,
            'gloss': true,
            'open': this.state.goodsMenuOpen,
          })}
          onClick={this.toggleGoodsMenu}
        ><div class="label">+</div></button>
        <Swipeable class="right-swipeable"
          onSwipedLeft={this.openGoodsMenu}></Swipeable>
        <Swipeable class="left-swipeable"
          onSwipedRight={this.openMainMenu}></Swipeable>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
