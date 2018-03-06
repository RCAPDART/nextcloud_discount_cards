import React, {Component} from 'react';
import Card from '../card/card.jsx'
import PropTypes from 'prop-types';
import './cardPopup.less';

export class CardPopup extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
    }

    render () {
        function RenderCard(props){
            if(props.card != null){
                return  <Card key={props.card.id} data={props.card}/>
            }
            return <span/>;
        }

        return (
            <RenderCard card={this.props.card}/>
        );
    }
}