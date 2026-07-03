import React, { Component } from 'react';
import logo from './img/CanadianArmedForces.png';
import './NavMenu.css';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="container1"> 
                <div className="one">                   
                    <ul>
                        <br /><br />
                        <h4>Build with:</h4>
                        <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                        <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                        <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                        <li>Azure MSSQL DB</li>
                        <li>Google agm-map</li>
                        <li>Azure DevOps CD/CI</li>
                        <li>VS2019</li>
                        <br /><br /> <br /><br /> <br /><br /> <br /><br />
                        <td className='email'>JRD.Consulting@hotmail.com (2022)</td>
                    </ul>
                </div>
                <br /><br />
                <div className="two">
                    <img src={logo} alt="No image"  />
                </div>
                {/*<div>*/}
                {/*    <br /><br />*/}
                {/*    <td style={{ fontWeight: 'bold', float: 'left' }}>JRD.Consulting@hotmail.com (2022)</td></div>*/}
            </div> 
           
        );
    }
}