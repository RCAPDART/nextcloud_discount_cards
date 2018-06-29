import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { CardStatic } from './cardStatic/cardStatic';
import { CardEditor } from './cardEditor/cardEditor';

export class CardPopupContent extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    edit: PropTypes.bool.isRequired,
    editCallback: PropTypes.func.isRequired,
    modalWidth: PropTypes.number.isRequired
  };

  render () {
    const { card, edit, editCallback, modalWidth } = this.props;

    return (
      card != null ? (
        <Fragment> {
          edit === false ? (
            <CardStatic card={card}
              modalWidth={modalWidth} />
          ) : (
            <CardEditor card={card} callBack={editCallback} />
          )
        }
        </Fragment>)
        : null
    )
  }
}
