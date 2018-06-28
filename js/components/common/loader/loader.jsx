import CircularProgress from 'material-ui/CircularProgress';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Container} from '../../../baseComponents/container/container';

import './loader.less';

export class Loader extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };
  render () {
    const { loading } = this.props;

    return (
      loading === true ? (
        <Container className='loaderBackground'>
          <Container className='loaderContainer'>
            <CircularProgress size={80} thickness={5} />
          </Container>
        </Container>
      ) : (
        null
      )
    )
  }
}
