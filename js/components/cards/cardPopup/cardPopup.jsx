import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './cardPopup.less';
import {Accordion} from "../../common/accordion/accordion";

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
                return <div className='cardPopup'>
                    <Accordion title={'Image'} backColor={props.card.color} checked={true}>
                        <div className='data'>
                            <img src={props.card.img}/>
                        </div>
                    </Accordion>
                    <Accordion title={'Data'} backColor={props.card.color} checked={false}>
                        <div className='data'>
                            <h2>{props.card.title}</h2>
                        </div>
                    </Accordion>
                </div>
            }
            return <span/>;
        }

        return (
            <RenderCard card={this.props.card}/>
        );
    }
}