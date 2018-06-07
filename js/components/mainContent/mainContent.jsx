// import axios from 'axios';

import Clear from 'material-ui/svg-icons/content/clear';
import Chip from 'material-ui/Chip';
import Drawer from 'material-ui/Drawer';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import React, {Component} from 'react';

import {CardsService} from '../../services/cardsService.js';
import {Container} from "../../baseComponents/container/container";
import {Cards} from '../cards/cards.jsx';

import './mainContent.less';
import {TagsService} from "../../services/tagsService";
import {Loader} from "../common/loader/loader";

export class MainContent extends Component {
    constructor(props) {
        super(props);
        this.tagsService = new TagsService();
        this.cardsService = new CardsService();
        this.cards = this.cardsService.GetCards();
    }

    componentDidMount() {
        const tags = this.tagsService.GetTags();
        this.setState({tags});
        // axios.get('cards/test')
        //    .then(function (response) {
        //        window.console.log(response);
        //    })
        //    .catch(function (error) {
        //        window.console.log(error);
        //    });
    }

    state = {
        open: false,
        tags: [],
        selectedTags: [],
        loading: false
    };

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    GetUnusedTags() {
        return this.state.tags;
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
        }
    }

    DeselectTag(title) {
        const foundTag = TagsService.GetTagByTitle(this.state.selectedTags, title);
        const selectedTags = this.state.selectedTags;
        selectedTags.splice(foundTag, 1);
        this.setState({selectedTags, loading: true});
    }

    render() {
        const selectedTags = this.GetSelectedTags();
        const unusedTags = this.GetUnusedTags();
        const deselectTagCallback = this.DeselectTag.bind(this);
        const selectTagCallback = this.SelectTag.bind(this);

        function RenderFilter() {
            if (selectedTags.length === 0) return <span/>;

            return <Container className='filteredTags'>
                <h2>Filter</h2>
                {selectedTags.map((tag) =>
                        <Chip
                            className='selectedTag'
                            key={tag.id}
                            onRequestDelete={() => deselectTagCallback(tag.title)}
                            style={{margin:3}}
                        >{tag.title}</Chip>
                    , this)}
            </Container>
        }

        function RenderUnusedTags() {
            return <Container className='allTags'>
                <h2>Tags</h2>
                {unusedTags.map((tag) =>
                        <Chip
                            className='unselectedTag'
                            key={tag.id}
                            onClick={() => selectTagCallback(tag.title)}
                            style={{margin:3}}
                        >{tag.title}</Chip>
                    , this)}
            </Container>
        }

        return (
            <Container>
                <Cards data={this.cards}/>
                <Drawer open={this.state.open}>
                    <Container className='drawerHead'>
                        <IconButton className='closeDrawer' onClick={this.handleToggle.bind(this)}>
                            <Clear/>
                        </IconButton>
                    </Container>
                    <RenderFilter/>
                    <RenderUnusedTags/>
                </Drawer>
                <IconButton className='filterToggle' onClick={this.handleToggle.bind(this)}>
                    <FilterList/>
                </IconButton>
                <Loader loading={this.state.loading}/>
            </Container>
        );
    }
}