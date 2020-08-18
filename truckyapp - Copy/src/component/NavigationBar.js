import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                <img src="https://img.icons8.com/officel/16/000000/rv-campground.png" width="25" height="25" alt="brand"/> Trucky                
                </Link>
                <Nav className="mr-auto">                    
                    <Link to="addVehicle" className="nav-link">Add Vehicle</Link>
                    <Link to="addVehicleType" className="nav-link">Add Vehicle Type</Link>
                    <Link to="manageVehicle" className="nav-link">Manage Vehicle</Link>
                    <Link to="addDriver" className="nav-link">Add Driver</Link>
                    <Link to="manageDriver" className="nav-link">Manage Driver</Link>
                </Nav>
            </Navbar>


        );

    }

}

export default NavigationBar;