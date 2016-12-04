import React, { Component } from 'react';
import { render } from 'react-dom';
import s from '../styles/main.sass';
import 'react-fastclick';
import Swipeable from 'react-swipeable'

const CONTEXT = {
  BUDGET: 'BUDGET',
  BALANCE: 'BALANCE',
  DAY: 'DAY',
}

const KEYS = {
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
  FOUR: 'FOUR',
  FIVE: 'FIVE',
  SIX: 'SIX',
  SEVEN: 'SEVEN',
  EIGHT: 'EIGHT',
  NINE: 'NINE',
  ZERO: 'ZERO',
  BS: 'BS',
  PM: 'PM',
  OK: 'OK',
  CLEAR: 'CLEAR',
  CANCEL: 'CANCEL',
}

const KEYBOARD = [
  [
    {
      key: KEYS.ONE,
      classname: "btn",
      html: "1"
    },
    {
      key: KEYS.TWO,
      classname: "btn",
      html: "2"
    },
    {
      key: KEYS.THREE,
      classname: "btn",
      html: "3"
    },
    {
      key: KEYS.BS,
      classname: "btn ctrl",
      html: "&larr;"
    },
  ],
  [
    {
      key: KEYS.FOUR,
      classname: "btn",
      html: "4"
    },
    {
      key: KEYS.FIVE,
      classname: "btn",
      html: "5"
    },
    {
      key: KEYS.SIX,
      classname: "btn",
      html: "6"
    },
    {
      key: KEYS.OK,
      classname: "btn blank",
      html: "ok"
    },
  ],
  [
    {
      key: KEYS.SEVEN,
      classname: "btn",
      html: "7"
    },
    {
      key: KEYS.EIGHT,
      classname: "btn",
      html: "8"
    },
    {
      key: KEYS.NINE,
      classname: "btn",
      html: "9"
    },
    {
      key: 'BLANK',
      classname: "btn blank",
      html: ""
    },
  ],
  [
    {
      key: KEYS.PM,
      classname: "btn ctrl",
      html: "&plusmn;"
    },
    {
      key: KEYS.ZERO,
      classname: "btn",
      html: "0"
    },
    {
      key: KEYS.CLEAR,
      classname: "btn ctrl",
      html: "C"
    },
    {
      key: KEYS.CANCEL,
      classname: "btn primary",
      html: "&#8659;"
    },
  ],
]

let getBudgetFromLocal = function() {
  let budget = localStorage.getItem('budget');
  budget = budget ? parseInt(budget) : 0;
  return budget;
}

let getBalanceFromLocal = function() {
  let balance = localStorage.getItem('balance');
  balance = balance ? parseInt(balance) : 0;
  return balance;
}

let getDaysFromLocal = function() {
  let days = [];
  for (var i = 0; i < 7; i++) {
    let day = localStorage.getItem("day"+i);
    days[i] = day ? parseInt(day) : 0;
  }
  return days;
}

let indexToDay = function(index){
  let day = '';
  switch(index){
    case 0: day = 'Sunday'; break;
    case 1: day = 'Monday'; break;
    case 2: day = 'Tuesday'; break;
    case 3: day = 'Wednesday'; break;
    case 4: day = 'Thursday'; break;
    case 5: day = 'Friday'; break;
    case 6: day = 'Saturday'; break;
    default: 'invalid'
  }
  return day;
}

let indexToDayLetter = function(index){
  let day = '';
  switch(index){
    case 0: day = 'Sun'; break;
    case 1: day = 'Mon'; break;
    case 2: day = 'Tue'; break;
    case 3: day = 'Wed'; break;
    case 4: day = 'Thu'; break;
    case 5: day = 'Fri'; break;
    case 6: day = 'Sat'; break;
    default: 'invalid'
  }
  return day;
}

let tightPlaceAmount = function(amount) {
  return parseFloat(amount)/1000;
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      context: CONTEXT.BUDGET,
      budget: 0,
      balance: 0,
      days: [0, 0, 0, 0, 0, 0, 0],
      highlightedDay: 0,
      editOverlayVisible: false,
      editOverlayTitle: 'Sunday',
      selectedDay: 0,
      goodsMenuVisible: false,
      insiderVisible: false,
      number: '0',
      translate: -100
    }
  }

  componentDidMount() {
    this.setState({
      budget: getBudgetFromLocal(),
      balance: getBalanceFromLocal(),
      days: getDaysFromLocal(),
      highlightedDay: new Date().getDay()
    }, ()=>{
      setInterval(()=>{
        let today = new Date().getDay()
        let updatedDays = getDaysFromLocal()
        let sum = 0;
        for (var i = 0; i < today; i++) {
          sum += updatedDays[i];
          updatedDays[i] = 0;
          localStorage.setItem('day'+i, 0)
        }

        localStorage.setItem('balance', parseInt(this.state.balance) + sum)
        this.setState({
          days: updatedDays,
          balance: getBalanceFromLocal()
        })
      }, 500)
    })

  }

  keypress(key, e){
    let self = this;
    let number = this.state.number;
    let maxDigits = 5;
    let condition = number.length < maxDigits && parseInt(number) >= 0 ||
      number.length < (maxDigits + 1) && parseInt(number) < 0
    let pressONE = function() {
      if(condition)
        number = parseInt(number) == 0 ? '1' : number+'1'
    }
    let pressTWO = function() {
      if(condition)
        number = parseInt(number) == 0 ? '2' : number+'2'
    }
    let pressTHREE = function() {
      if(condition)
        number = parseInt(number) == 0 ? '3' : number+'3'
    }
    let pressFOUR = function() {
      if(condition)
        number = parseInt(number) == 0 ? '4' : number+'4'
    }
    let pressFIVE = function() {
      if(condition)
        number = parseInt(number) == 0 ? '5' : number+'5'
    }
    let pressSIX = function() {
      if(condition)
        number = parseInt(number) == 0 ? '6' : number+'6'
    }
    let pressSEVEN = function() {
      if(condition)
        number = parseInt(number) == 0 ? '7' : number+'7'
    }
    let pressEIGHT = function() {
      if(condition)
        number = parseInt(number) == 0 ? '8' : number+'8'
    }
    let pressNINE = function() {
      if(condition)
        number = parseInt(number) == 0 ? '9' : number+'9'
    }
    let pressZERO = function() {
      if(condition)
        number = parseInt(number) == 0 ? '0' : number+'0'
    }
    let pressBS = function() {
      number = parseInt(number) < 10 ? '0'
      : number.substring(0, number.length - 1);
    }
    let pressCANCEL = function() {
      self.setState({editOverlayVisible: false})
    }
    let pressCLEAR = function() {
      number = '0'
    }
    let pressPM = function() {
      number = parseInt(number) * (-1)
    }
    switch (key) {
      case KEYS.ONE: pressONE(); break;
      case KEYS.TWO: pressTWO(); break;
      case KEYS.THREE: pressTHREE(); break;
      case KEYS.FOUR: pressFOUR(); break;
      case KEYS.FIVE: pressFIVE(); break;
      case KEYS.SIX: pressSIX(); break;
      case KEYS.SEVEN: pressSEVEN(); break;
      case KEYS.EIGHT: pressEIGHT(); break;
      case KEYS.NINE: pressNINE(); break;
      case KEYS.ZERO: pressZERO(); break;
      case KEYS.BS: pressBS(); break;
      case KEYS.OK: pressOK(); break;
      case KEYS.CANCEL: pressCANCEL(); break;
      case KEYS.CLEAR: pressCLEAR(); break;
      case KEYS.PM: pressPM(); break;
      default: console.log('default keypress')

    }

    number = parseInt(number)%100000+''
    if(this.state.context == CONTEXT.BUDGET){
      this.setState({
        budget: number,
        number: number
      })
      localStorage.setItem('budget', number)
    }else if(this.state.context == CONTEXT.BALANCE){
      this.setState({
        balance: number,
        number: number
      })
      localStorage.setItem('balance', number)
    }else if(this.state.context == CONTEXT.DAY){
      let days = this.state.days;
      days[this.state.selectedDay] = number
      this.setState({
        days: days,
        number: number
      })
      localStorage.setItem('day'+this.state.selectedDay, number)
    }
  }

  changeDay(index){
    this.setState({
      context: CONTEXT.DAY,
      editOverlayVisible: true,
      editOverlayTitle: indexToDay(index),
      number: this.state.days[index],
      selectedDay: index
    })
  }

  changeBudget = () => {
    this.setState({
      context: CONTEXT.BUDGET,
      editOverlayVisible: true,
      number: this.state.budget,
    })
  }

  changeBalance = () => {
    this.setState({
      context: CONTEXT.BALANCE,
      editOverlayVisible: true,
      number: this.state.balance,
    })
  }

  openGoodsMenu = () => {
    this.setState({
      goodsMenuVisible: true,
    })
  }

  closeGoodsMenu = () => {
    this.setState({
      goodsMenuVisible: this.state.insiderVisible,
    })
  }

  openInsider = () => {
    this.setState({
      insiderVisible: true,
    })
  }

  closeInsider = () => {
    this.setState({
      insiderVisible: false,
    })
  }

  render(){
    let daysClass = '';
    if(this.state.editOverlayVisible &&
      this.state.context != CONTEXT.DAY)
      daysClass = 'days out'
    else if(this.state.editOverlayVisible &&
      this.state.context == CONTEXT.DAY)
      daysClass = 'days in'
    else
      daysClass = 'days'

    let budgetClass = '';
    if(this.state.editOverlayVisible &&
      this.state.context != CONTEXT.BUDGET)
      budgetClass = 'budget out'
    else if(this.state.editOverlayVisible &&
      this.state.context == CONTEXT.BUDGET)
      budgetClass = 'budget in'
    else
      budgetClass = 'budget'

    let balanceClass = '';
    if(this.state.editOverlayVisible &&
      this.state.context != CONTEXT.BALANCE)
      balanceClass = 'balance out'
    else if(this.state.editOverlayVisible &&
      this.state.context == CONTEXT.BALANCE)
      balanceClass = 'balance in'
    else
      balanceClass = 'balance'

    let goodsMenuClass = ''
    if (this.state.goodsMenuVisible)
      goodsMenuClass = 'goods-menu in'
    else
      goodsMenuClass = 'goods-menu'

    let insiderClass = this.state.insiderVisible ? 'insider in' : 'insider'
    return(
      <Swipeable class="root"
        onSwipedRight={this.openGoodsMenu}
        onSwipedLeft={this.closeGoodsMenu}
      >
        <div class={goodsMenuClass}>
          <Swipeable class="cnt"
            onSwipedRight={this.openInsider}
            onSwipedLeft={this.closeInsider}
          >
            <div class={insiderClass}></div>
          </Swipeable>
        </div>
        <div class="container">
          <div class={budgetClass} onClick={this.changeBudget}>
            <button class={this.state.editOverlayVisible ? "feed out"
            : "feed"}>&#8609;</button>
            <div class="title">Budget</div>
            <div class="amount">{this.state.budget}</div>
          </div>
          <div class={daysClass}>
            <div class="edited-day">
              <div class="title">{this.state.editOverlayTitle}</div>
              <div class="amount">{this.state.number}</div>
            </div>
            {this.state.days.map((item, index)=>{
              let classname = "day";
              if(this.state.highlightedDay == index)
                classname = "day highlighted"
              if(this.state.highlightedDay > index)
                classname = "day disabled"
              if(this.state.selectedDay == index &&
                this.state.editOverlayVisible)
                classname += " selected"
              return <div
                class={classname}
                key={'day'+index}>
                <div class="title" onClick={this.changeDay.bind(this, index)}>
                  {indexToDayLetter(index)}
                </div>
                <div class="amount" onClick={this.changeDay.bind(this, index)}>
                  {tightPlaceAmount(item)}
                </div>
                <div class="arrow">&#10148;</div>
              </div>
            })}
          </div>
          <div class={balanceClass} onClick={this.changeBalance}>
            <div class="title">Balance</div>
            <div class="amount">{this.state.balance}</div>
          </div>
        </div>
        <div class={this.state.editOverlayVisible ? "edit-overlay in"
        : "edit-overlay"}>
          <div class="cnt">
            <div class="keyboard">
              {KEYBOARD.map((row, index) => (
                <div class="row" key={"row"+index}>
                  {row.map((key, index)=>(
                    <div class={key.classname}
                      key={"key"+index}
                      dangerouslySetInnerHTML={{__html: key.html}}
                      onClick={this.keypress.bind(this, key.key)}>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Swipeable>
    )
  }
}

render(<App/>, document.getElementById('app'));
