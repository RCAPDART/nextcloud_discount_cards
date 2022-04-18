import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Container } from '../../../../baseComponents/container/container';

import './orderItem.scss';

export class OrderItem extends Component {
  static propTypes = {
    orderKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onOrderChangeCallback: PropTypes.func.isRequired,
    getItemClassState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  onOrderChange() {
    this.props.onOrderChangeCallback(this.props.orderKey);
  }

  getOrderingClass() {
    return this.props.getItemClassState(this.props.orderKey);
  }

  render() {
    const { title } = this.props;
    const orderClass = this.getOrderingClass();
    const { onOrderChange } = this;

    return (
      <Container className="orderLink" onClick={onOrderChange}>
        <span className="name unselectable">{title}</span>
        <span className={'sort-indicator unselectable ' + orderClass} />
      </Container>
    );
  }
}
