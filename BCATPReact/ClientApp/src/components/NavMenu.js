import React, { Component } from 'react';
import { Container, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import flag1 from './img/canadaflag.png';
import flag2 from './img/CanadianForcesEnsign.png';
export class NavMenu extends Component {

    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (

            <>
                <Navbar className="navbar-expand-lg topHeader" style={{ height: '100px' }} >
                    <Container className=" justify-content-center col-lg-12 navbar-nav flex-grow" >                         
                        <div className="col-lg-3" >
                            <img className='img-responsive img1' src={flag1} alt="flag1 image" />
                        </div>
                        <div className=' col-lg-6 aDiv'  >
                            <a href='https://en.wikipedia.org/wiki/History_of_the_Canadian_Army' target="_blank"      >
                                <h2>Canadian Military Bases and Armaments</h2>
                            </a>                           
                        </div>                    

                        <div className="col-lg-3" >
                            <img className='img-responsive img2' src={flag2} alt="flag2 image" />
                        </div>
                    </Container>
                </Navbar>
                <header className="   topHeader">
                    <Navbar className="navbar-expand-sm   " light>
                        <Container className=" justify-content-center">
                            <ul className="navbar-nav flex-grow">
                                <button style={{ textAlign: 'center' }}>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                    </NavItem>
                                </button>&nbsp;&nbsp;
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchbcatp/bcatp">Bcatp</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetcharmy/army">Army</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchnavy/navy">Navy</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchairforce/airforce">Airforce</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchpinetree/pinetree">Pinetree</NavLink>
                                    </NavItem>
                                </button>                                
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchmidcanada/midcanada">MidCDN</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchdewline/dewline">Dewline</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchdefunct/defunct">Defunct</NavLink>
                                    </NavItem>
                                </button>
                            </ul>&nbsp;&nbsp;
                    {/*    </Container>*/}
                    {/*</Navbar>*/}

                    {/*<Navbar className="navbar-expand-sm" light>*/}
                    {/*    <Container className=" justify-content-center  ">*/}
                            <ul className="navbar-nav flex-grow">
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchtanks/tanks">Tanks</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchplanes/planes">Planes</NavLink>
                                    </NavItem>
                                </button>
                                <button>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetchships/ships">Ships</NavLink>
                                    </NavItem>
                                </button>
                            </ul>
                        </Container>
                    </Navbar>
                </header>                
            </>
        );
    }
}
