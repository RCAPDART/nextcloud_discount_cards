import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './accordion.less';
import {CommonService} from '../../../services/commonService';
import {Container} from "../../../baseComponents/container/container";

export class Accordion extends Component {
    static propTypes = {
        children: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        style: PropTypes.object,
        checked: PropTypes.bool
    };

    constructor(props) {
        super(props);
        const commonService = new CommonService();
        this.id = commonService.GetGuid();
    }

    GetChecked() {
        if (this.props.checked == null)
            return false;

        return this.props.checked;
    }

    render() {
        return (
            <Container className='accordion'
                       style={this.props.style}>
                <input className='accordionInput'
                       id={this.id} type='checkbox' name='tabs'
                       defaultChecked={this.GetChecked()}/>
                <label htmlFor={this.id}>{this.props.title}</label>
                <Container className='tab-container'>
                    {this.props.children}
                </Container>
            </Container>
        );
    }
}