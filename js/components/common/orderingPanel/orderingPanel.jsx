import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Container } from '../../../baseComponents/container/container';
import { OrderItem } from './orderItem/orderItem.jsx';

import './orderingPanel.less';

export class OrderingPanel extends Component {
  static propTypes = {
    orderKey: PropTypes.string.isRequired,
    ascending: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    orderKeys: PropTypes.array.isRequired
  };

  state = {
    orderKey: this.props.orderKey,
    ascending: this.props.ascending
  };

  constructor (props) {
    super(props);
    this.callback = this.props.callback;
    this.orderAscIconClass = 'icon-triangle-n';
    this.orderDescIconClass = 'icon-triangle-s';
    this.orderKeys = this.props.orderKeys;
    this.getOrderingClass = this.getOrderingClass.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  componentDidMount () {
    this.orderKeys.map((orderKey) => {
      if (orderKey.defaultValue !== null) this.onOrderChange(orderKey.key, orderKey.default);
    });
  }

  onOrderChange (orderKey) {
    let ascending = this.state.ascending;
    if (orderKey === this.state.orderKey) {
      ascending = !ascending;
    } else {
      ascending = true;
    }
    this.setState({
      ascending: ascending,
      orderKey: orderKey
    });
    this.props.callback(orderKey, ascending);
  }

  getOrderingClass (orderKey) {
    let orderClass = '';
    if (orderKey === this.state.orderKey) {
      if (this.state.ascending) {
        orderClass = this.orderAscIconClass;
      } else {
        orderClass = this.orderDescIconClass;
      }
    }

    return orderClass;
  }

  render () {
    const orderKeys = this.orderKeys;
    const onOrderChange = this.onOrderChange;
    const getOrderingClass = this.getOrderingClass;

    return (
      <Container className='orderingPanel'>
        {
          orderKeys.map((orderKey) =>
            <OrderItem
              key={orderKey.id}
              title={orderKey.title}
              orderKey={orderKey.key}
              onOrderChangeCallback={(orderKey) => onOrderChange(orderKey)}
              getItemClassState={(orderKey) => getOrderingClass(orderKey)}
            />
          )
        }
      </Container>
    );
  }
}
