import {Component} from 'react';

export class BaseComponent extends Component {
    onResize() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.onResize();
    }
    componentWillMount () {
        window.addEventListener('resize', () => this.onResize());
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
}