import React, { Component } from 'react';
import './Board.scss';

class InquirBoard extends Component {
  constructor() {
    super();
    this.state = {
      qnaBox: false,
      qnaCommentModal: false,
      displayContent: false,
    };
  }

  isValidQnaBox = () => {
    const { qnaBox } = this.state;
    this.setState({
      qnaBox: !qnaBox,
    });
  };

  isValidInputInquirPopup = () => {
    const { qnaCommentModal } = this.state;
    this.setState({
      qnaCommentModal: !qnaCommentModal,
    });
  };

  render() {
    const { qnaBox, qnaCommentModal } = this.props;
    return (
      <div className='Board'>
        <div className='boardAlign'>
          <div className='board'>
            <div className='titleAlign'>
              <ul className='titleList qnaBoardAlign'>
                <h2 className='title'>PRODUCT Q&A</h2>
                <li className='listStyle'>
                  상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과
                  다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
                </li>
                <li className='listStyle'>
                  배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                  내&nbsp;
                  <a href='/' className='inquir'>
                    1:1 문의
                  </a>
                  에 남겨주세요.
                </li>
              </ul>
            </div>
            <div className='titleStyle'>
              <table className='style'>
                <tbody>
                  <tr>
                    <th className='reviewTitle'>제목</th>
                    <th className='writer'>작성자</th>
                    <th className='writeDate'>작성일</th>
                    <th className='viewNumber'>답변상태</th>
                  </tr>
                </tbody>
              </table>
              <table className='style'>
                <tbody>
                  <tr onClick={this.props.isValidQnaBox}>
                    <td className='reviewTitle'>(문의제목)</td>
                    <td className='writer'>(문의 작성자)</td>
                    <td className='tdDateTime'>(Datetime)</td>
                    <td className='viewNumber'>(문의 답변상태)</td>
                  </tr>
                </tbody>
              </table>
              <div className={qnaBox ? 'displayContent' : 'contentHide'}>
                <div className='commentStyle qnaContentStyle'>(질문 내용)</div>
                <div className='commentStyle qnaContentStyle'>(둘리 답변)</div>
              </div>
            </div>
            <div className='buttonAlign'>
              <button
                className='buttonStyle'
                onClick={this.props.isValidInputInquirPopup}
              >
                문의하기
              </button>
            </div>
            <div className='commentAlign commentPageButn'>
              <span className='firstPageButn commentAlign'>〈〈</span>
              <span className='commentStyle commentAlign'>〈</span>
              <span className='commentStyle commentAlign'>1</span>
              <span className='commentStyle commentAlign'>〉</span>
              <span className='commentStyle commentAlign'>〉〉</span>
            </div>
            <form className={qnaCommentModal ? '' : 'contentHide'}>
              <div className='modlaAlign'>
                <div className='modalPopUp'>
                  <div className='modalTitle'>상품 문의하기</div>
                  <div className='modalProductNav'>
                    <span className='modalProductImg' img='/'>
                      (상품 사진)
                    </span>
                    (카테고리, 상품명)
                  </div>
                  <div className='commentTitle'>
                    <span>제목</span>
                    <textarea
                      className='commentTitleInput'
                      type='text'
                      placeholder='문의하실 내용의 제목을 입력해주세요'
                    />
                  </div>
                  <div className='commentContent'>
                    <span>내용</span>
                    <textarea
                      className='commentContentInput'
                      type='text'
                      placeholder='문의하실 상품의 내용을 입력해주세요'
                    />
                  </div>
                  <div className='modalButnAlign'>
                    <button className='modalButn'>작성완료</button>
                    <button className='modalButn'>닫기</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InquirBoard;
