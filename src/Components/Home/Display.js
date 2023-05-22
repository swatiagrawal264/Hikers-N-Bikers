import { Component } from 'react';
import './Display.css';
import Front_End from '../Front-End/Front_End';
import MapView from '../MapView/MapView';

export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
          path: [],
          coordinates: {}
        }
        this.onPath = this.onPath.bind(this);
        this.onInitial = this.onInitial.bind(this);
    }

    /**
     * Helps send path data from User Input component to Map View component
     * @param {*} path - set of coordinates of path 
     */
    onPath(path) {
        console.log("Path received in Home Component from Front End component")
        this.setState(() => {
            return {path: path};
        });
    }

    /**
     * Helps send address data from User Input component to Map View component
     * @param {*} start - starting address as latitude and longitude
     * @param {*} end - ending address as latidue and longitude
     */
    onInitial(start,end) {
        console.log("Initial coordinates received in Home Component from Front End component")
        this.setState(() => {
            let coordinates = {
                start: start,
                end: end
            };
            return {coordinates: coordinates};
        });
    }

    /**
     * Renders UserInput and MapView components to the user
     * @returns 
     */
    render() {
        return (
            <div>
                <div className='left-div'>
                    <Front_End onPath={this.onPath} onInitial={this.onInitial} data-testid="user-input"></Front_End>
                </div>
                <div className='right-div'>
                    <MapView path={this.state.path} coordinates={this.state.coordinates} data-testid="map-view"></MapView>
                </div>
            </div>
        );
    }
}
