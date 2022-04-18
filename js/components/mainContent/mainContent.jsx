import Clear from 'material-ui/svg-icons/content/clear';
import Drawer from 'material-ui/Drawer';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import React, { Component } from 'react';

import { CardsService } from '../../services/cardsService.js';
import { Container } from '../../baseComponents/container/container';
import { Cards } from '../cards/cards.jsx';
import { Loader } from '../common/loader/loader';
import { TagsBlock } from './tagsBlock/tagsBlock';
import { TagsService } from '../../services/tagsService';

import './mainContent.scss';

export class MainContent extends Component {
  state = {
    open: false,
    tags: [],
    selectedTags: [],
    cards: [],
    loading: true,
  };

  constructor(props) {
    super(props);
    this.DeselectTagCallback = this.DeselectTagCallback.bind(this);
    this.SelectTagCallback = this.SelectTagCallback.bind(this);
    this.RefreshDataCallback = this.RefreshDataCallback.bind(this);
    this.HandleToggleCallback = this.HandleToggleCallback.bind(this);
  }

  componentDidMount() {
    this.LoadDataFromApi([]);
  }

  LoadDataFromApi(filterTags) {
    let filter = '';
    if (filterTags.length > 0) {
      filter = filterTags
        .map(function (tag) {
          return tag.title;
        })
        .join(',');
    }

    CardsService.GetCardsFromApi(filter).then(result => {
      this.setState({
        tags: result.data.data.tags,
        cards: CardsService.ProcessCards(result.data.data.cards),
        loading: false,
      });
    });
  }

  GetSelectedTags() {
    return this.state.selectedTags;
  }

  GetUnusedTags() {
    return this.state.tags.filter(
      tag =>
        this.state.selectedTags.filter(
          selectedTag => selectedTag.title === tag.title
        ).length === 0
    );
  }

  HandleToggleCallback() {
    this.setState({ open: !this.state.open });
  }

  RefreshDataCallback() {
    this.LoadDataFromApi(this.state.selectedTags);
  }

  SelectTagCallback(title) {
    const foundTag = TagsService.GetTagByTitle(this.state.tags, title);
    if (!TagsService.TagsContainsByTitle(this.state.selectedTags, title)) {
      const { selectedTags } = this.state;
      selectedTags.push(foundTag);
      this.setState({ selectedTags, loading: true });
      this.LoadDataFromApi(selectedTags);
    }
  }

  DeselectTagCallback(title) {
    const foundTag = TagsService.GetTagByTitle(this.state.selectedTags, title);
    const { selectedTags } = this.state;
    selectedTags.splice(foundTag, 1);
    this.setState({ selectedTags, loading: true });
    this.LoadDataFromApi(selectedTags);
  }

  render() {
    const { loading, open } = this.state;
    const selectedTags = this.GetSelectedTags();
    const unusedTags = this.GetUnusedTags();

    const { DeselectTagCallback } = this;
    const { SelectTagCallback } = this;
    const { RefreshDataCallback } = this;
    const { HandleToggleCallback } = this;

    return (
      <Container>
        <Cards cards={this.state.cards} refreshDataCallback={RefreshDataCallback} />
        <Drawer open={open}>
          <Container className="drawerHead">
            <IconButton className="closeDrawer" onClick={HandleToggleCallback}>
              <Clear />
            </IconButton>
          </Container>
          <TagsBlock
            tags={selectedTags}
            title="Filter"
            isDelete
            deselectTagCallback={DeselectTagCallback}
            className="filteredTags"/>
          <TagsBlock
            tags={unusedTags}
            title="Tags"
            isDelete={false}
            onClickCallback={SelectTagCallback}
            className="allTags"/>
        </Drawer>
        <IconButton className="filterToggle" onClick={HandleToggleCallback}>
          <FilterList />
        </IconButton>
        <Loader loading={loading} />
      </Container>
    );
  }
}
