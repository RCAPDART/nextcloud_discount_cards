import Clear from 'material-ui/svg-icons/content/clear';
import Drawer from 'material-ui/Drawer';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import React, {Component} from 'react';

import { CardsService } from '../../services/cardsService.js';
import { Container } from "../../baseComponents/container/container";
import { Cards } from '../cards/cards.jsx';
import { Loader } from "../common/loader/loader";
import { TagsService } from "../../services/tagsService";

import './mainContent.less';
import {TagsBlock} from "../tagsBlock/tagsBlock";

export class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.LoadDataFromApi([]);
    }

    state = {
        open: false,
        tags: [],
        selectedTags: [],
        cards: [],
        loading: true
    };

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    LoadDataFromApi(filterTags) {
        let filter = '';
        if (filterTags.length > 0){
            filter = filterTags.map(function(tag){
                return tag.title;
            }).join(",");
        }
        CardsService.GetCardsFromApi(filter).then(result => {
            this.setState({
                tags: result.data.data.tags,
                cards: CardsService.ProcessCards(result.data.data.cards),
                loading: false});
        });
    }

    RefreshData() {
        this.LoadDataFromApi(this.state.selectedTags);
    }

    GetUnusedTags() {
        return this.state.tags.filter(
            tag => this.state.selectedTags.filter(selectedTag => selectedTag.title === tag.title).length === 0
        );
    }

    GetSelectedTags() {
        return this.state.selectedTags;
    }

    SelectTag(title) {
        const foundTag = TagsService.GetTagByTitle(this.state.tags, title);
        if (!TagsService.TagsContainsByTitle(this.state.selectedTags, title)) {
            const selectedTags = this.state.selectedTags;
            selectedTags.push(foundTag);
            this.setState({selectedTags, loading: true});
            this.LoadDataFromApi(selectedTags);
        }
    }

    DeselectTag(title) {
        const foundTag = TagsService.GetTagByTitle(this.state.selectedTags, title);
        const selectedTags = this.state.selectedTags;
        selectedTags.splice(foundTag, 1);
        this.setState({selectedTags, loading: true});
        this.LoadDataFromApi(selectedTags);
    }

    render() {
        const selectedTags = this.GetSelectedTags();
        const unusedTags = this.GetUnusedTags();
        const deselectTagCallback = this.DeselectTag.bind(this);
        const selectTagCallback = this.SelectTag.bind(this);
        const refreshDataCallback = this.RefreshData.bind(this);

        return (
            <Container>
                <Cards data={this.state.cards}
                       refreshDataCallback={refreshDataCallback}/>
                <Drawer open={this.state.open}>
                    <Container className='drawerHead'>
                        <IconButton className='closeDrawer' onClick={this.handleToggle.bind(this)}>
                            <Clear/>
                        </IconButton>
                    </Container>
                    <TagsBlock tags={selectedTags}
                               isDelete={true}
                               deselectTagCallback={deselectTagCallback}
                               className='filteredTags'/>
                    <TagsBlock tags={unusedTags}
                               isDelete={false}
                               onClickCallback={selectTagCallback}
                               className='allTags'/>
                </Drawer>
                <IconButton className='filterToggle' onClick={this.handleToggle.bind(this)}>
                    <FilterList/>
                </IconButton>
                <Loader loading={this.state.loading}/>
            </Container>
        );
    }
}