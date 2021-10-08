import React, { Component } from 'react';
import './DetailScrollBtn.scss';

export default class DetailScrollBtn extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isClicked: Array(4).fill(false),
  //   };
  // }

  // handleClickBtn = idx => {
  //   this.props.clickToScrollMove();
  //   const { isClicked } = this.state;
  //   this.setState({
  //     isClicked: isClicked.map((element, index) => {
  //       return index === idx ? (element = true) : (element = false);
  //     }),
  //   });
  // };

  render() {
    const { btnId, btnName, isClicked, handleBtnClick } = this.props;

    return (
      <button
        id={btnId}
        className={'scrollBtn ' + (isClicked ? 'clicked' : '')}
        type='button'
        onClick={() => handleBtnClick(btnId)}
      >
        {btnName}
      </button>
    );

    // const { isClicked } = this.state;
    // const scrollBtns = ['상품설명', '상세정보', '후기', '문의'];
    // const scrollBtnsList = scrollBtns.map((btns, index) => (
    //   <button
    //     id={[index]}
    //     className={'scrollBtn ' + (isClicked[index] ? 'clicked' : '')}
    //     type='button'
    //     onClick={() => this.handleClickBtn(index)}
    //   >
    //     {btns}
    //   </button>
    // ));

    // return <div className='scrollBtns'>{scrollBtnsList}</div>;
  }
}
