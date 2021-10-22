import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OfferCard from './OfferCard';
import { API_ENDPOINT } from '../../../api';
import './SpecialPrice.scss';

export default class specialPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isHoverOnImg: false,
      API: `${API_ENDPOINT}`,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () => {
    fetch(`${this.state.API}/${this.props.endPoint}`)
      .then(res => res.json())
      .then(datas =>
        this.setState({
          data: datas.slice(3),
        })
      );
  };

  render() {
    return (
      <section className={`Section specialOffer`}>
        <div className='titGoods'>
          <h3 className='tit'>
            <span className='titTitle'>
              <Link to='/'>
                {this.state.data.length ? this.state.data[0].header : null}
              </Link>
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
