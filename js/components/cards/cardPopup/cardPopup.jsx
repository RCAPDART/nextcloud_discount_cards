import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './cardPopup.less';
import {Accordion} from "../../common/accordion/accordion";
import {Barcode} from "../../common/barcode/barcode";
import {CommonService} from "../../../services/commonService";

export class CardPopup extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired
    }

    id = '';

    constructor(props) {
        super(props);
        const commonService = new CommonService();
        this.id = commonService.GetGuid();
    }

    render() {
        function RenderCard(props) {
            if (props.card != null) {
                return <div className='cardPopup'>
                    <div className='data'>
                        <img src={props.card.img}/>
                    </div>
                    <div className='barcodeData'>
                        <Barcode code={props.card.code} id={props.id}/>
                    </div>
                    <Accordion title={'Other'} backColor={props.card.color} textColor={props.card.textColor}
                               checked={false}>
                        <div className='data'>
                            <h2>{props.card.title}</h2>
                        </div>
                    </Accordion>
                </div>
            }
            return <span/>;
        }

        return (
            <RenderCard card={this.props.card} id={this.id}/>
        );
    }
}