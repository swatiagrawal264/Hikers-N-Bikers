import { FormControl, Input, InputLabel, Button, Typography, Switch } from '@material-ui/core';
import { Component } from 'react';
import { get_Max_Path, get_Min_Path, get_Lat_And_Long } from '../../Functions/LocationServices1'
import './Front_End.css'

export default class Front_End extends Component {
    constructor(props) {
        super(props);
        this.state = {
          componentIsLoading: false,
          from: props.from ? props.from : '',
          to: props.to ? props.to : '',
          accuracy: 10,
          elevation: 0,
          distance: 0,
          toggle: false,
          year: new Date().getFullYear(),
          path: [],
          isError: false
        }
        this.findPath = this.findPath.bind(this);
    }

    /**
     * Called when user clicks on the search button. 
     * Validates input and if it's in the necessary format fetches the path with minimum or maximum elevation gain based on the given input and within given offset
     * Updates the UI with the elevation gain and distance received from the service call
     * @returns 
     */
    async findPath() {
        this.setState(() => {
            return {isError: false};
        });
        
        if(this.state.from==='' || this.state.to==='') {
            this.setState(() => {
                return {isError: true};
            });
            return;
        }
        
        const start = await get_Lat_And_Long(this.state.from);
        const end = await get_Lat_And_Long(this.state.to);
        this.props.onInitial(start,end);
        if(this.state.toggle) {
            const path = await get_Max_Path(this.state.from, this.state.to, this.state.accuracy);

            if(path && path.data) {
                
                console.log("Path with Max elevation gain received successfully using service file")
                if(path.data.path) {
                    this.setState(() => {
                        return {path: path.data.path};
                    });
                    this.props.onPath(path.data.path);
                }
                if(path.data.elevationGain) {
                    this.setState(() => {
                        return {elevation: path.data.elevationGain};
                    });
                }
                if(path.data.distance) {
                    this.setState(() => {
                        return {distance: path.data.distance};
                    });
                }
            }
            
        } else {
            const path = await get_Min_Path(this.state.from, this.state.to, this.state.accuracy);
            
            if(path && path.data) {
                console.log("Path with Min elevation gain received successfully using service file")
                if(path.data.path) {
                    this.setState(() => {
                        return {path: path.data.path};
                    });
                    this.props.onPath(path.data.path);
                }
                if(path.data.elevationGain) {
                    this.setState(() => {
                        return {elevation: path.data.elevationGain};
                    });
                }
                if(path.data.distance) {
                    this.setState(() => {
                        return {distance: path.data.distance};
                    });
                }
            }
        }
    }
    
    /**
     * Renders the input form to the user to enter starting and ending addresses, offset percentage and whether they want maximum or minimum elevation
     * @returns 
     */
    render() {
        return (
            <div className='input-form'>
                <div className='logo'>
                    <img src="Logo2.png" alt="Logo" />
                </div>
                <div className='form-title'style={{ textAlign: 'Centre' }} >Elevation Navigation System</div>
                <FormControl fullWidth className='form-field'>
                    <InputLabel className='input-label'>Source</InputLabel>
                    <Input
                    multiline
                    value={this.state.from}
                    aria-describedby="starting-address"
                    onChange={(e) => this.setState({ from: e.target.value })}
                    className="input-value"
                    inputProps={{ "data-testid": "from" }}
                    />
                </FormControl>
                <FormControl fullWidth className='form-field'>
                    <InputLabel className='input-label'>Destination</InputLabel>
                    <Input
                    multiline
                    value={this.state.to}
                    aria-describedby="ending-address"
                    onChange={(e) => this.setState({ to: e.target.value })}
                    className="input-value"
                    inputProps={{ "data-testid": "to" }}
                    />
                </FormControl>
                <FormControl fullWidth className='form-field'>
                    <InputLabel className='input-label'>Elevation Preferance(in %) </InputLabel>
                    <Input
                    type="number"
                    value={this.state.accuracy}
                    aria-describedby='elevation-preference'
                    onChange={(e) => this.setState({ accuracy: e.target.value })}
                    className="input-value"
                    inputProps={{ "data-testid": "elevation-preference" }}
                    />
                </FormControl>
                <Typography className='input-label'>{this.state.toggle ? 'Maximize Elevation' : 'Minimize Elevation'}</Typography>
                <Switch
                    className='toggle-switch'
                    onChange={(e) => this.setState({ toggle: e.target.checked })}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                ></Switch>

                
                <br />
                <br />
                {this.state.isError && (<div className='error'>
                    Please enter valid input
                </div>)}
                <Button
                onClick={() => {this.findPath()}}
                variant="contained"
                color="primary"
                aria-label="Fetch data for source and destination address"
                className='form-field search-button'>
                    COMPUTE PATH
                </Button>
                <div className='output' data-testid="elevation">
                    Elevation Gain: {this.state.elevation.toFixed(1)} metres
                </div>
                <div className='output' data-testid="distance">
                    Distance: {this.state.distance.toFixed(1)} metres
                </div>
                <div className='copyright'>
                    Hikers N Bikers &copy; {this.state.year}
                </div>
            </div>
        );
    }
}
