import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Tag extends Component {
  static propTypes = {
    tag: PropTypes.object.isRequired,
    isDelete: PropTypes.bool.isRequired,
    deselectTagCallback: PropTypes.func,
    onClickCallback: PropTypes.func,
  };

  render() {
    const { tag, isDelete, deselectTagCallback, onClickCallback } = this.props;

    function RenderSelectedTag() {
      return (
        <Chip
          className="selectedTag"
          onRequestDelete={() => deselectTagCallback(tag.title)}
          style={{ margin: 3 }}>{tag.title}</Chip>
      );
    }
    function RenderUnSelectedTag() {
      return (
        <Chip
          className="unselectedTag"
          onClick={() => onClickCallback(tag.title)}
          style={{ margin: 3 }}>{tag.title}</Chip>
      );
    }

    return isDelete === true ? (
      <RenderSelectedTag/>
    ) : (
      <RenderUnSelectedTag/>
    );
  }
}
