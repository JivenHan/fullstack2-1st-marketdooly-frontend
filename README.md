# Market Dooly 소개
- 소셜커머스 'Market Curly'을 모티브로 한 프로젝트입니다.

## 🗓 기간
2021.10.1 ~ 2021.10.15 (15일)

## ✍ 기술
Frontend: React, React-router, Sass
Backend: Node.js, Express, MySQL, Prisma, JWT, Bcrypt

## ✔ 담당 업무
- 한지훈: 제품 상세 페이지(frontend), 장바구니(backend)

## 🎥 구현 화면
![MarketCurly](https://user-images.githubusercontent.com/87740944/147937219-a5f7733c-89b3-4945-b16b-0152d07b27d8.png)

![detail2](https://user-images.githubusercontent.com/87740944/147937301-074002c1-cf65-4dfe-a346-18c4c77ca915.gif)

![detail3](https://user-images.githubusercontent.com/87740944/147937360-4f217c2a-a063-4936-ac54-a27eb3ec541c.gif)

## 📑 기능 상세
<제품 상세 페이지>
- 상품 수량 조절 -> 상품 가격 및 적립금 변경
- 장바구니 담기 API
- IntersectionObserver로 상단 장바구니 버튼이 화면에서 벗어날 시 하단에 장바구니 담기 모달창 팝업
- 4개의 스크롤 이동 버튼

<장바구니>
- JWT를 middleware에서 bcrypt로 디코딩, 사용자 id를 참조하여 장바구니 데이터 전송
- 상품 수량 변동 및 삭제 API
