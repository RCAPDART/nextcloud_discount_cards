import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from "../../../../baseComponents/container/container";
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

export class CardEditor extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        callBack: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    state = {
        card: this.props.card
    };

    handleChangeTitle(event) {
        const card = this.getCardState();
        card.title = event.target.value;
        this.updateCardState(card)
    }

    getCardState(){
        return this.state.card;
    }

    updateCardState(card){
        this.setState({card: card});
    }

    applyChanges(){
        this.props.callBack(this.getCardState());
    }

    render() {
        return (
            <Container>
                <form>
                    <input type='text' value={this.state.card.title} onChange={this.handleChangeTitle.bind(this)}/>
                    <input type='text' defaultValue={this.state.card.code}/>
                    <input type='text' defaultValue={this.state.card.link}/>
                    <input type='text' defaultValue={this.state.card.color}/>
                    <input type='text' defaultValue={this.state.card.img}/>
                    <IconButton className='editButton' onClick = {this.applyChanges.bind(this)}>
                        <span>Save changes</span>
                        <ModeEdit color={this.state.card.color}/>
                    </IconButton>
                </form>
            </Container>
        );
    }
}