import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './container.less';

export class Container extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    className: PropTypes.string,
    style: PropTypes.any,
    onClick: PropTypes.func
  };

  style = null;

  render () {
    return (
      <div className={this.props.className} style={this.props.style} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
