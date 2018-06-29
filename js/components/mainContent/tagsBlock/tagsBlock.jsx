import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Container } from '../../../baseComponents/container/container';
import { Tag } from './tag';

export class TagsBlock extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    isDelete: PropTypes.bool.isRequired,
    deselectTagCallback: PropTypes.func,
    onClickCallback: PropTypes.func,
    className: PropTypes.string
  };

  render () {
    const { className, title, tags, isDelete, deselectTagCallback, onClickCallback } = this.props;

    return (
      <Container className={className}>
        <h2>{title}</h2>
        {tags.map((tag) =>
          <Tag
            key={tag.id}
            tag={tag}
            isDelete={isDelete}
            deselectTagCallback={deselectTagCallback}
            onClickCallback={onClickCallback} />
          , this)}
      </Container>
    )
  }
}
