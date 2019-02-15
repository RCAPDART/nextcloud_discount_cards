import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Chip from 'material-ui/Chip';
import FormData from 'form-data';
import Dropzone from 'react-dropzone'
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Accordion } from '../../../../common/accordion/accordion';
import { Barcode } from '../../../../common/barcode/barcode';
import { BarcodeTypes } from '../../../../common/barcodeTypes';
import { CardsService } from '../../../../../services/cardsService';
import { CommonService } from '../../../../../services/commonService';
import { Container } from '../../../../../baseComponents/container/container';
import { Loader } from '../../../../common/loader/loader';
import { StyleService } from './StyleService';
import { SwatchesPicker } from 'react-color';

import './cardEditor.less';

export class CardEditor extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    callBack: PropTypes.func.isRequired
  };

  state = {
    editableCard: this.props.card,
    backColor: this.props.card.color,
    textColor: this.props.card.textColor,
    acceptedUploads: [],
    rejectedUploads: [],
    loading: false,
    newTagName: ''
  };

  constructor (props) {
    super(props);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeNewTagName = this.handleChangeNewTagName.bind(this);
    this.handleAddNewTag = this.handleAddNewTag.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeCodeType = this.handleChangeCodeType.bind(this);
  }

  // Handlers
  handleChangeTitle (event) {
    const editableCard = this.state.editableCard;
    editableCard.title = event.target.value;
    this.setState({ editableCard });
  }

  handleChangeCode (event) {
    const editableCard = this.state.editableCard;
    editableCard.code = event.target.value;
    this.setState({ editableCard });
  }

  handleChangeCodeType (event) {
    const editableCard = this.state.editableCard;
    editableCard.codeType = event.target.value;
    this.setState({ editableCard });
  }

  handleChangeLink (event) {
    const editableCard = this.state.editableCard;
    editableCard.url = event.target.value;
    this.setState({ editableCard });
  }

  handleChangeNewTagName (event) {
    this.setState({ newTagName: event.target.value });
  }

  handleChangeColor (color) {
    const editableCard = this.state.editableCard;
    editableCard.color = color.hex;
    editableCard.textColor = CommonService.GetTextColor(this.state.editableCard.color);
    this.setState({ backColor: editableCard.color, textColor: editableCard.textColor });
    this.setState({ editableCard });
  }

  handleChangeImage (acceptedUploads, rejectedUploads) {
    if (acceptedUploads.length < 1) return;
    const editableCard = this.state.editableCard;
    editableCard.image = CommonService.CloneObject(acceptedUploads[0].preview);
    this.setState({ acceptedUploads, rejectedUploads, editableCard, loading: true });

    const data = new FormData();
    data.append('image', acceptedUploads[0]);
    data.append('title', this.state.editableCard.title);
    CardsService.UploadImage(data).then(response => {
      editableCard.image = response.data;
      this.setState({ loading: false, editableCard });
    })
  }

  handleAddNewTag () {
    let newTagName = this.state.newTagName;
    if (newTagName.length === 0) {
      return;
    }
    let editableCard = this.state.editableCard;
    const indexOf = (editableCard.tags.map((tag) => tag).indexOf(newTagName));

    if (indexOf !== -1) {
      return;
    }

    editableCard.tags.push(newTagName);
    this.setState({ editableCard, newTagName: '' });
  }

  handleDeleteTag (title) {
    const editableCard = this.state.editableCard;
    const tagToDelete = editableCard.tags.map((tag) => tag).indexOf(title);
    editableCard.tags.splice(tagToDelete, 1);
    this.setState({ editableCard });
  }

  applyChanges () {
    this.props.callBack(this.state.editableCard);
    this.setState({ acceptedUploads: [], rejectedUploads: [] });
  }

  render () {
    const { editableCard, acceptedUploads, backColor, textColor, loading, newTagName } = this.state;

    const imagePreviewStyles = StyleService.GetImagePreview(acceptedUploads, editableCard);
    const containerStyles = StyleService.GetContainerStyle(backColor, textColor);
    const chipStyles = StyleService.GetChipStyles();

    const handleChangeImage = this.handleChangeImage;
    const handleChangeTitle = this.handleChangeTitle;
    const handleChangeNewTagName = this.handleChangeNewTagName;
    const handleAddNewTag = this.handleAddNewTag;
    const handleChangeCode = this.handleChangeCode;
    const handleChangeCodeType = this.handleChangeCodeType;
    const handleChangeLink = this.handleChangeLink;
    const handleChangeColor = this.handleChangeColor;
    const handleDeleteTag = this.handleDeleteTag;
    const applyChanges = this.applyChanges;

    return (
      <Container className='cardEditor'>
        <Accordion style={containerStyles}
          title={'Title'} checked={true}>
          <input type='text'
            value={editableCard.title}
            onChange={handleChangeTitle} />
        </Accordion>

        <Accordion style={containerStyles}
          title='Image'>
          <Dropzone
            className='dragZoneImage'
            accept='image/jpeg, image/png'
            onDrop={(acceptedUploads, rejectedUploads) => {
              handleChangeImage(acceptedUploads, rejectedUploads)
            }}
          >
            <div className='image' style={imagePreviewStyles} />
          </Dropzone>
        </Accordion>

        <Accordion style={containerStyles}
          title='Tags'>
          <Container className='tags'>
            <Container className='chipTags'>
              {editableCard.tags.map((item) =>
                <Chip className='chipTag'
                  key={item}
                  onRequestDelete={() => handleDeleteTag(item)}
                  style={chipStyles}>
                  {item}
                </Chip>
                , this)}
            </Container>
            <Container className='newTag'>
              <input type='text'
                value={newTagName}
                onChange={handleChangeNewTagName} />
              <IconButton className='addNewTagButton'
                onClick={handleAddNewTag}>
                <AddCircleOutline
                  color={textColor} />
              </IconButton>
            </Container>
          </Container>
        </Accordion>

        <Accordion style={containerStyles}
          title='BarCode'>
          <input type='text'
            value={editableCard.code}
            onChange={handleChangeCode} />
          <Barcode
            code={editableCard.code}
            textColor={textColor}
            id='editableBarcode'
            codeType={editableCard.codeType}/>
          <select value={editableCard.codeType}
            className='codeTypeSelector'
            style={containerStyles}
            onChange={handleChangeCodeType} >
            {BarcodeTypes.map(option => (
              <option key={option}
                value={option}
                style={containerStyles}>
                {option}
              </option>
            ))}
          </select>
        </Accordion>

        <Accordion style={containerStyles}
          title='Link'>
          <a href={editableCard.url}>
            <h2 style={{ color: textColor }}>
              {'Link to ' + editableCard.title}
            </h2>
          </a>
          <input type='text'
            value={editableCard.url}
            onChange={handleChangeLink} />
        </Accordion>

        <Accordion style={containerStyles}
          title='Color'>
          <SwatchesPicker onChange={handleChangeColor} />
        </Accordion>

        <Container style={{ background: backColor }}
          className='confirmButton'
          onClick={applyChanges}>
          <span style={{ color: textColor }}>
              Save changes
          </span>
          <IconButton className='editButton'>
            <ModeEdit color={textColor} />
          </IconButton>
        </Container>
        <Loader loading={loading} />
      </Container>
    );
  }
}
