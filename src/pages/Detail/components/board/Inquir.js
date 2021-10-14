import { Component } from 'react';

class Inquir extends Component {
  render() {
    const { isOpenInquirBox } = this.props;
    return (
      <>
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
        <div className={isOpenInquirBox ? 'displayContent' : 'contentHide'}>
          <div className='commentStyle qnaContentStyle'>(질문 내용)</div>
          <div className='commentStyle qnaContentStyle'>(둘리 답변)</div>
        </div>
      </>
    );
  }
}

export default Inquir;
