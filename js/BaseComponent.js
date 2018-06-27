import { Component } from 'react';

export class BaseComponent extends Component {
    eventListenerEnabled = false;
    lastResize = 0;
    delay = 50;

    onResize() {
        if (this.lastClick >= (Date.now() -this. delay))
            return;
        this.lastClick = Date.now();

        const width = window.innerWidth;
        if(this.state.width === width) return;
        this.setState({
            width: width
        });
    }

    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
        this.onResize();
    }

    componentWillMount () {
        if(!this.eventListenerEnabled) {
            window.addEventListener('resize', this.onResize);
            this.eventListenerEnabled = true;
        }
    }

    componentWillUnmount() {
        if(this.eventListenerEnabled)
            window.removeEventListener('resize', this.onResize);
    }
}