import React, {Component} from 'react';
import {Container} from "../../../baseComponents/container/container";
import PropTypes from "prop-types";
import './fullDialog.less';


export class FullDialog extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        footer: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        title: PropTypes.string,
        opened: PropTypes.bool,
        titleBackground: PropTypes.string,
        titleTextColor: PropTypes.string,
        width: PropTypes.number
    };

    constructor(props) {
        super(props);
    }

    GetTitleStyles(){
        return {
            backgroundColor: this.props.titleBackground ? this.props.titleBackground : 'white',
            color: this.props.titleTextColor ? this.props.titleTextColor : 'black'
        };
    }
    GetWindowStyles(){
        let width = 80;
        let marginLeft = 10;
        if(this.props.width){
            width = this.props.width;
            marginLeft = (100 - width) / 2;
        }
        return {
            width: width + '%',
            marginLeft: marginLeft + '%'
        };
    }

    render() {
        function RenderDialog(props) {
            if(props.opened){
                return <Container className='fullDialog'>
                    <Container className={'back'}>
                        <Container className={'dialogWindow'} style={props.windowStyle}>
                            <Container className='dialogContent'>
                                <Container className='title' style={props.titleStyle}>
                                    <h3 style={props.titleStyle}>{props.title}</h3>
                                </Container>
                                <Container className='content'>
                                    {props.children}
                                </Container>
                                <Container className='footer'>
                                    {props.footer}
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            }
            else{
                return <span className='dialogWindowClosed'/>;
            }
        }
        return (
            <RenderDialog
                title={this.props.title}
                opened={this.props.opened}
                footer={this.props.footer}
                titleStyle={this.GetTitleStyles()}
                windowStyle={this.GetWindowStyles()}
            >
                {this.props.children}
            </RenderDialog>
        )
    }
}