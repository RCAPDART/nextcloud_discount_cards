import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CommonService } from '../../../services/commonService';
import { Container } from '../../../baseComponents/container/container';

import './accordion.scss';

export class Accordion extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    checked: PropTypes.bool,
  };

  state = {
    expanded: this.props.checked != null ? this.props.checked : false,
  };

  constructor(props) {
    super(props);
    this.id = CommonService.GetGuid();
  }

  render() {
    const { title, style, children } = this.props;
    const { expanded } = this.state;
    const { id } = this;

    return (
      <Container className="accordion" style={style}>
        <input
          className="accordionInput"
          id={id}
          type="checkbox"
          name="tabs"
          defaultChecked={expanded}/>
        <label htmlFor={id}>{title}</label>
        <Container className="tab-container">{children}</Container>
      </Container>
    );
  }
}
