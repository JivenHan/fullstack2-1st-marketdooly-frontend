import React, { Component } from 'react';

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
      <div class='boardAlign'>
        <div class='board'>
          <form className='tableTitle'>
            <div class='titleAlign'>
              <ul class='titleList qnaBoardAlign'>
                <h2 class='title'>PRODUCT Q&A</h2>
                <li class='listStyle'>
                  상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과
                  다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
                </li>
                <li class='listStyle'>
                  배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                  내&nbsp;
                  <a href='/' class='inquir'>
                    1:1 문의
                  </a>
                  에 남겨주세요.
                </li>
              </ul>
            </div>
            <div className='table'>
              <div class='titleStyle'>
                <table class='style'>
                  <th class='reviewTitle'>제목</th>
                  <th class='writer'>작성자</th>
                  <th class='writeDate'>작성일</th>
                  <th class='viewNumber'>답변상태</th>
                </table>
                <table class='style'>
                  <tr onClick={this.props.isValidQnaBox}>
                    <td class='reviewTitle'>(문의제목)</td>
                    <td class='writer'>(문의 작성자)</td>
                    <td class='tdDateTime'>(Datetime)</td>
                    <td class='viewNumber'>(문의 답변상태)</td>
                  </tr>
                </table>
                <table className='commentBox'>
                  <div class={qnaBox ? 'displayContent' : 'contentHide'}>
                    <div class='style qnaContentStyle'>(질문 내용)</div>
                    <div class='style qnaContentStyle'>(둘리 답변)</div>
                  </div>
                </table>
              </div>
            </div>
          </form>
          <div className='button'>
            <div class='align'>
              <button
                class='style'
                onClick={this.props.isValidInputInquirPopup}
              >
                문의하기
              </button>
            </div>
          </div>
          <div className='commentPage'>
            <div class='align pageButn'>
              <span class='firstPageButn align'>〈〈</span>
              <span class='style align'>〈</span>
              <span class='style align'>1</span>
              <span class='style align'>〉</span>
              <span class='style align'>〉〉</span>
            </div>
          </div>
          <form className='inputCommentModal'>
            <div class={qnaCommentModal ? '' : 'contentHide'}>
              <div class='align'>
                <div class='popUp'>
                  <div class='title'>상품 문의하기</div>
                  <div class='productNav'>
                    <span class='productImg' img='/'>
                      (상품 사진)
                    </span>
                    (카테고리, 상품명)
                  </div>
                  <div class='commentTitle'>
                    <span>제목</span>
                    <textarea
                      class='commentTitleInput'
                      type='text'
                      placeholder='문의하실 내용의 제목을 입력해주세요'
                    />
                  </div>
                  <div class='commentContent'>
                    <span>내용</span>
                    <textarea
                      class='commentContentInput'
                      type='text'
                      placeholder='문의하실 상품의 내용을 입력해주세요'
                    />
                  </div>
                  <div class='modalButnAlign'>
                    <button class='modalButn'>작성완료</button>
                    <button class='modalButn'>닫기</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default InquirBoard;
