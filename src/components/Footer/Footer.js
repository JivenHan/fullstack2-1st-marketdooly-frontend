import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='footerWrapper'>
          <div className='upperSection'>
            <div className='customerServices'>
              <h2>고객행복센터</h2>
              <ul className='csList'>
                <li>
                  <dl>
                    <dt>
                      <div className='csLink'>
                        <Link to='/'>
                          <span className='callCenter'>1234-5678</span>
                        </Link>
                      </div>
                    </dt>
                    <dd>
                      <h3>365고객센터</h3>
                      <p className='csDesc'>오전 7시 - 오후 7시</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <div className='csLink'>
                        <Link to='/'>
                          <span className='csTitle'>카카오톡 문의</span>
                        </Link>
                      </div>
                    </dt>
                    <dd>
                      <h3>365고객센터</h3>
                      <p className='csDesc'>오전 7시 - 오후 7시</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <div className='csLink'>
                        <Link to='/'>
                          <span className='csTitle'>1:1 문의</span>
                        </Link>
                      </div>
                    </dt>
                    <dd>
                      <h3>24시간 접수 가능</h3>
                      <p className='csDesc'>
                        고객센터 운영시간에 순차적으로 답변해드리겠습니다.
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <div className='csLink'>
                        <Link to='/'>
                          <span className='csTitle'>대량주문 문의</span>
                        </Link>
                      </div>
                    </dt>
                    <dd className='callout'>
                      <p className='csDesc'>
                        비회원의 경우 메일로 문의 바랍니다.
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
            <div className='companyInfo'>
              <ul className='companyLinks'>
                <li>
                  <Link to='/'>둘리소개</Link>
                </li>
                <li>
                  <Link to='/'>둘리소개영상</Link>
                </li>
                <li>
                  <Link to='/'>인재채용</Link>
                </li>
                <li>
                  <Link to='/'>이용약관</Link>
                </li>
                <li>
                  <Link to='/'>개인정보처리방침</Link>
                </li>
                <li>
                  <Link to='/'>이용안내</Link>
                </li>
              </ul>
              <div className='companyCredits'>
                <p>
                  법인명 (상호) : 주식회사 둘리 <span className='bar'>I</span>{' '}
                  사업자등록번호 : 617-33-28406{' '}
                  <a href='https://hometax.go.kr'>사업자정보 확인</a>
                  <br />
                  통신판매업 : 제 2016-부산수영-02932호{' '}
                  <span className='bar'>I</span> 개인정보보호책임자 : 이코딩
                  <br />
                  주소 : 서울특별시 종로구 종로타워, 33층(종각역){' '}
                  <span className='bar'>I</span> 대표이사 : 이코딩
                  <br />
                  입점문의 : <Link to='/'>입점문의하기</Link>{' '}
                  <span className='bar'>I</span> 제휴문의 :{' '}
                  <a href='mailto:business@dooly.com'>business@dooly.com</a>
                  <br />
                  채용문의 :{' '}
                  <a href='mailto:recruit@dooly.com'>recruit@dooly.com</a>
                  <br />
                  팩스 : 070 - 2299 - 1234 <span className='bar'>I</span> 이메일
                  : <a href='mailto:help@dooly.com'>help@dooly.com</a>
                  <br />
                  대량주문 문의 :{' '}
                  <a href='mailto:kurlygift@dooly.com'>kurlygift@dooly.com</a>
                </p>
              </div>
              <p className='copyright'>© DOOLY CORP. ALL RIGHTS RESERVED</p>
              <ul className='snsLinks'>
                <li>
                  <a href='/'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_instagram.png'
                      alt='인스타그램 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='/'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_fb.png'
                      alt='페이스북 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='/'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_blog.png'
                      alt='네이버 블로그 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='/'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_naverpost.png'
                      alt='네이버 매거진 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='/'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_youtube.png'
                      alt='유튜브 바로가기'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='lowerSection'>
            <div className='cerifications'></div>
          </div>
        </div>
      </footer>
    );
  }
}
