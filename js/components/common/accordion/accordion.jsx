import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './accordion.less';
import {CommonService} from '../../../services/commonService';
import {Container} from "../../../baseComponents/container/container";

export class Accordion extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        backColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
        checked: PropTypes.bool
    }

    constructor(props) {
        super(props);
        const commonService = new CommonService();
        this.style = {
            background: this.props.backColor,
            color: this.props.textColor
        }
        this.id = commonService.GetGuid();
    }

    GetChecked() {
        if (this.props.checked == null)
            return 'false';

        return this.props.checked ? true : false;
    }

    render() {
        return (
            <Container className='accordion'>
                <input style={this.style} id={this.id} type='checkbox' name='tabs' defaultChecked={this.GetChecked()}/>
                <label style={this.style} htmlFor={this.id}>{this.props.title}</label>
                <Container style={this.style} className='tab-container'>
                    {this.props.children}
                </Container>
            </Container>
        );
    }
}