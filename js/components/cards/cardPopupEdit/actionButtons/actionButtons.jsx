import Clear from 'material-ui/svg-icons/content/clear';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Undo from 'material-ui/svg-icons/content/undo';

import { Container } from '../../../../baseComponents/container/container';

export class ActionButtons extends Component {
  static propTypes = {
    cardId: PropTypes.number.isRequired,
    edit: PropTypes.bool.isRequired,
    textColor: PropTypes.string.isRequired,
    deleteCard: PropTypes.func.isRequired,
    discardChanges: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  };

  render () {
    const { cardId, edit, textColor, deleteCard, discardChanges, toggleEdit, closeModal } = this.props;

    function DrawDeleteButton () {
      if (cardId === 0) return <span />;
      return <IconButton className='editButton' onClick={() => deleteCard()}>
        <DeleteForever color={textColor} />
      </IconButton>;
    }

    function DrawEditButtons () {
      if (cardId === 0) return <span />;
      if (edit) {
        return <IconButton className='editButton' onClick={() => discardChanges()}>
          <Undo color={textColor} />
        </IconButton>
      }
      return <IconButton className='editButton' onClick={() => toggleEdit()}>
        <ModeEdit color={textColor} />
      </IconButton>
    }

    return (
      <Container className='buttons'>
        <DrawDeleteButton />
        <DrawEditButtons />
        <IconButton className='editButton' onClick={() => closeModal()}>
          <Clear color={textColor} />
        </IconButton>
      </Container>
    );
  }
}
