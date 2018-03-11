import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './accordion.less';
import {CommonService} from '../../../services/commonService';

export class Accordion extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        backColor: PropTypes.string.isRequired,
        checked: PropTypes.bool
    }

    constructor(props) {
        super(props);
        const commonService = new CommonService();
        this.style = {
            background: this.props.backColor,
            color: commonService.InvertColor(this.props.backColor)
        }
        this.id = commonService.GetGuid();
    }

    GetChecked(){
        if (this.props.checked == null)
            return 'false';

        return this.props.checked ? 'true' : 'false';
    }

    render () {
        return (
            <div className='accordion'>
                <input style={this.style} id = {this.id} type='checkbox' name='tabs' checked={this.GetChecked}/>
                <label style={this.style} htmlFor = {this.id}>{this.props.title}</label>
                <div style={this.style} className='tab-container'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}