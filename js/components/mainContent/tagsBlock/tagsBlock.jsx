import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Container } from '../../../baseComponents/container/container';

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

    function RenderTag (props) {
      if (isDelete) {
        return <Chip
          className='selectedTag'
          onRequestDelete={() => deselectTagCallback(props.tag.title)}
          style={{ margin: 3 }}
        >{props.tag.title}</Chip>
      }
      return <Chip
        className='unselectedTag'
        onClick={() => onClickCallback(props.tag.title)}
        style={{ margin: 3 }}
      >{props.tag.title}</Chip>
    }

    return (
      <Container className={className}>
        <h2>{title}</h2>
        {tags.map((tag) =>
          <RenderTag key={tag.id} tag={tag} />
          , this)}
      </Container>
    )
  }
}
