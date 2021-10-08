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
                          <span className='callCenter'>1644-1107</span>
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
                  <Link>컬리소개</Link>
                </li>
                <li>
                  <Link>컬리소개영상</Link>
                </li>
                <li>
                  <Link>인재채용</Link>
                </li>
                <li>
                  <Link>이용약관</Link>
                </li>
                <li>
                  <Link>개인정보처리방침</Link>
                </li>
                <li>
                  <Link>이용안내</Link>
                </li>
              </ul>
              <div className='companyCredits'>
                <p>
                  법인명 (상호) : 주식회사 컬리 <span className='bar'>I</span>{' '}
                  사업자등록번호 : 261-81-23567{' '}
                  <a href='https://hometax.go.kr'>사업자정보 확인</a>
                  <br />
                  통신판매업 : 제 2018-서울강남-01646호{' '}
                  <span className='bar'>I</span> 개인정보보호책임자 : 이원준
                  <br />
                  주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동){' '}
                  <span className='bar'>I</span> 대표이사 : 김슬아
                  <br />
                  입점문의 : <Link to='/'>입점문의하기</Link>{' '}
                  <span className='bar'>I</span> 제휴문의 :{' '}
                  <a href='mailto:business@kurlycorp.com'>
                    business@kurlycorp.com
                  </a>
                  <br />
                  채용문의 :{' '}
                  <a href='mailto:recruit@kurlycorp.com'>
                    recruit@kurlycorp.com
                  </a>
                  <br />
                  팩스:070 - 7500 - 6098 <span className='bar'>I</span> 이메일 :{' '}
                  <a href='mailto:help@kurlycorp.com'>help@kurlycorp.com</a>
                  <br />
                  대량주문 문의 :{' '}
                  <a href='mailto:kurlygift@kurlycorp.com'>
                    kurlygift@kurlycorp.com
                  </a>
                </p>
              </div>
              <p className='copyright'>© KURLY CORP. ALL RIGHTS RESERVED</p>
              <ul className='snsLinks'>
                <li>
                  <a href='#'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_instagram.png'
                      alt='인스타그램 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_fb.png'
                      alt='페이스북 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_blog.png'
                      alt='네이버 블로그 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <img
                      src='https://res.kurly.com/pc/ico/1810/ico_naverpost.png'
                      alt='네이버 매거진 바로가기'
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
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
