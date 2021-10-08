import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OfferCard from './OfferCard';
import './SpecialPrice.scss';

export default class specialPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isHoverOnImg: false,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () => {
    fetch(`http://localhost:3000/${this.props.dataLink}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          data,
        })
      );
  };

  render() {
    return (
      <section className={`Section ${this.props.sectionName}`}>
        <div className='titGoods'>
          <h3 className='tit'>
            <span className='titTitle'>
              <Link to='/'>{this.props.title}</Link>
            </span>
          </h3>
        </div>
        <ul>
          {this.state.data.map(data => {
            return <OfferCard key={data.id} data={data} />;
          })}
        </ul>
      </section>
    );
  }
}
