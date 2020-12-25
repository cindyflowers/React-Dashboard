// import React from 'react';
// import image from './svg/NavIcon.svg';
// import { LinkContainer } from "react-router-bootstrap";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink
// } from 'reactstrap';

// //Modifications

// class GigaNav extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
//   render() {
//     return (
//       <div>
//         <Navbar expand="md">
//         <NavbarBrand href="/">
//         <img src={ image } id="logo" alt="GigaCloud"/></NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               <LinkContainer to="/"><NavItem>
//                 <NavLink href="/">Find Out More</NavLink>
//               </NavItem></LinkContainer>
//               <LinkContainer to="/Login" ><NavItem>
//                 <NavLink href="/login">Sign In</NavLink>
//               </NavItem></LinkContainer>
              
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//     ); 
//   }
// }

// export default GigaNav

import React from 'react';
import image from './svg/NavIcon.svg';
import { LinkContainer } from "react-router-bootstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

//Modifications

class GigaNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar expand="md">
        <NavbarBrand href="/">
        <img src={ image } id="logo" alt="GigaCloud"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <LinkContainer to="/"><NavItem>
                <NavLink href="/">Find Out More</NavLink>
              </NavItem></LinkContainer>
              <LinkContainer to="/Login" ><NavItem>
                <NavLink href="/login">Sign In</NavLink>
              </NavItem></LinkContainer>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    ); 
  }
}

export default GigaNav