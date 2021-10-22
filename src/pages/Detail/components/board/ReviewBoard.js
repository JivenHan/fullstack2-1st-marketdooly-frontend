import React, { Component } from 'react';
import Review from './Review';
import { API_ENDPOINT } from '../../../../api';
import './Board.scss';

class ReviewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.productId,
      reviewCommentModal: false,
      totalReviewCount: 0,
      pageNumArray: [],
      reviewData: [],
      newReviewTitle: '',
      newReviewText: '',
    };
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const { productId } = this.state;
    const url = `${API_ENDPOINT}/products/${productId}/reviews/count?productId=${productId}`;
    fetch(url, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const pageNum = parseInt(data.totalCount / 10 + 1);
        this.setState(
          {
            totalReviewCount: data.totalCount,
            pageNumArray: new Array(pageNum).fill(0),
          },
          this.getReviesByPageId(0)
        );
      })
      .catch(console.log);
  }

  getReviesByPageId = idx => {
    const { productId } = this.state;
    const offset = idx * 10;
    const limit = 10;
    const url = `${API_ENDPOINT}/products/${productId}/reviews/?productId=${productId}&offset=${offset}&limit=${limit}`;
    fetch(url, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewData: data || [],
        });
      })
      .catch(console.log);
  };

  isValidInputReviewPopup = () => {
    const { reviewCommentModal } = this.state;
    this.setState({
      reviewCommentModal: !reviewCommentModal,
    });
  };

  closeCommentModal = () => {
    this.setState({
      reviewCommentModal: false,
    });
  };

  clickReviewHandler = _id => {
    const newArr = this.state.reviewData.map(review => {
      if (review.id === _id) {
        review.isOpenReviewBox = !review.isOpenReviewBox;
        return review;
      } else {
        review.isOpenReviewBox = false;
        return review;
      }
    });

    this.setState({ reviewData: newArr });
  };

  addReview = () => {
    const { productId, newReviewTitle, newReviewText } = this.state;
    const url = `${API_ENDPOINT}/products/${productId}/reviews`;
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        title: newReviewTitle,
        text: newReviewText,
      }),
    })
      .then(res => {
        if (res.status === 201) {
          alert('후기 작성이 완료되었습니다');
          this.closeCommentModal();
          this.getReviesByPageId(0);
        } else if (res.status === 401) {
          alert('후기 작성 권한이 없습니다');
        } else {
          alert('후기 작성 과정에서 오류가 발생하였습니다');
        }
      })
      .catch(console.log);
  };

  render() {
    const { inputHandler, getReviesByPageId, addReview, closeCommentModal } =
      this;
    const { reviewRef } = this.props;
    const { reviewCommentModal, pageNumArray, reviewData } = this.state;

    return (
      <div className='Board' ref={reviewRef}>
        <div className='boardAlign'>
          <div className='board'>
            <div className='titleAlign'>
              <ul className='titleList'>
                <h2 className='title'>PRODUCT REVIEW</h2>
                <li className='listStyle'>
                  상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과
                  다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
                </li>
                <li className='listStyle'>
                  배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                  내&nbsp;
                  <a href='/' className='_1_1inquir'>
                    1:1 문의
                  </a>
                  에 남겨주세요.
                </li>
              </ul>
              <select className='selectBox'>
                <option value='1'>최근등록순</option>
                <option value='2'>좋아요많은순</option>
                <option value='3'>조회많은순</option>
              </select>
            </div>
            <div className='titleStyle'>
              <table className='style'>
                <tbody>
                  <tr>
                    <th className='num'>번호</th>
                    <th className='reviewTitle'>제목</th>
                    <th className='userClass'></th>
                    <th className='writer'>작성자</th>
                    <th className='writeDate'>작성일</th>
                    <th className='selectNumber'>도움</th>
                    <th className='viewNumber'>조회</th>
                  </tr>
                </tbody>
              </table>
              {reviewData.map(data => {
                return (
                  <Review
                    key={data.id}
                    {...data}
                    clickReviewHandler={this.clickReviewHandler}
                  />
                );
              })}
            </div>
            <div className='buttonAlign'>
              <button
                className='buttonStyle'
                onClick={this.isValidInputReviewPopup}
              >
                후기작성
              </button>
            </div>
            <div className='commentAlign commentPageButn'>
              <span className='firstPageButn commentAlign'>〈〈</span>
              <span className='comment commentAlign'>〈</span>
              {pageNumArray.map((el, idx) => {
                return (
                  <span
                    key={idx}
                    className='comment commentAlign'
                    onClick={() => getReviesByPageId(idx)}
                  >
                    {idx + 1}
                  </span>
                );
              })}
              <span className='comment commentAlign'>〉</span>
              <span className='comment commentAlign'>〉〉</span>
            </div>
            {reviewCommentModal && (
              <div className='modalAlign'>
                <div className='modalPopUp'>
                  <div className='modalTitle'>상품 후기작성</div>
                  {/* <div className='modalProductNav'></div> */}
                  <div className='commentTitle'>
                    <span>제목</span>
                    <textarea
                      className='commentTitleInput'
                      type='text'
                      name='newReviewTitle'
                      placeholder='작성하실 후기의 제목을 입력해주세요'
                      onChange={inputHandler}
                    />
                  </div>
                  <div className='commentContent'>
                    <span>내용</span>
                    <textarea
                      className='commentContentInput'
                      type='text'
                      name='newReviewText'
                      placeholder='제품의 상세후기를 작성 해주세요'
                      onChange={inputHandler}
                    />
                  </div>
                  <div className='modalButnAlign'>
                    <button className='modalButn' onClick={addReview}>
                      작성완료
                    </button>
                    <button className='modalButn' onClick={closeCommentModal}>
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewBoard;
