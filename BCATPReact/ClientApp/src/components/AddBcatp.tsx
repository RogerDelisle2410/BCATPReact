import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BcatpData } from './FetchBcatp';
import './global.js';
///*  taskkill /f /im node.exe  */
import { Container, Navbar, NavItem } from 'reactstrap';

interface AddBcatpDataState {
    title: string;
    loading: boolean;
    bcatpData: BcatpData;
}

export class AddBcatp extends React.Component<RouteComponentProps<{ tableName?: string; Id?: string }>, AddBcatpDataState> {
    tabId: number;
    tabName: string;

    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, bcatpData: new BcatpData };
        // read id and tableName from route params when available, fallback to global
        this.tabId = parseInt((props.match.params as any).Id || '0', 10) || 0;
        this.tabName = (props.match.params as any).tableName || global.tableName || '';
        // ensure global is set so other components (map/image/maint) can read the current table
        global.tableName = this.tabName;

        // This will set state for Edit bcatp  
        if (this.tabId > 0) {
            fetch("api/AllData/Details/" + this.tabId)
                .then(response => response.json() as Promise<BcatpData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, bcatpData: data });
                });
        }

        // This will set state for Add bcatp  
        else {
            this.state = { title: "Create", loading: false, bcatpData: new BcatpData };
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h3>{this.state.title + "  " + this.tabName}</h3>

            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit bcatp.  
        if (this.state.bcatpData.id) {
            fetch("api/AllData/Edit", {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetch" + this.tabName + "/" + this.tabName + "");
                })
        }

        // POST request for Add bcatp.  
        else {
            fetch("api/AllData/Create/" + this.tabName + "", {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetch" + this.tabName + "/" + this.tabName + "");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetch" + this.tabName + "/" + this.tabName + "");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {

        if (this.tabName != 'tanks' && this.tabName != 'planes' && this.tabName != 'ships') {

            return (

                <form className="center2" onSubmit={this.handleSave} >
                    <table className="center2">
                        <label>
                            <input className="form-control" type="hidden" name="Id" value={this.state.bcatpData.id} />
                        </label>
                        <label className="labelAdd">Name:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="name" defaultValue={this.state.bcatpData.name} required />
                        </label>
                        <label className="labelAdd">Longitude:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="Longitude" defaultValue={this.state.bcatpData.longitude} required />
                        </label>
                        <label className="labelAdd">Latitude:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="Latitude" defaultValue={this.state.bcatpData.latitude} required />
                        </label>
                        <label className="labelAdd">Comment:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="Comment" defaultValue={this.state.bcatpData.comment} />
                        </label>
                        <label className="labelAdd">Wiki Link:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="Wiki" defaultValue={this.state.bcatpData.wiki} />
                        </label>
                        <label>
                            <input className="form-control" type="hidden" name="Type" defaultValue={this.state.bcatpData.type} readOnly />
                        </label>
                        <Navbar className="navbar-expand-sm" light>
                            <Container className=" justify-content-center  ">
                                <ul className="navbar-nav flex-grow">

                                    <NavItem>
                                        <button type="submit" disabled>Save</button>
                                    </NavItem>

                                    <NavItem>
                                        <button type="button" onClick={this.handleCancel}>Cancel</button>
                                    </NavItem>

                                </ul>
                            </Container>
                        </Navbar>
                    </table>
                </form>
            )
        }
        else
        {
            return (
                <form className="center2" onSubmit={this.handleSave} >
                    <table className="center2">
                        <label>
                            <input className="form-control" type="hidden" name="Id" value={this.state.bcatpData.id} />
                        </label>
                        <label className="labelAdd">Name:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="name" defaultValue={this.state.bcatpData.name} required />
                        </label>
                        <label className="labelAdd">Image Link:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="Comment" defaultValue={this.state.bcatpData.comment} />
                        </label>
                        <label className="labelAdd">Wiki Link:&nbsp;&nbsp;
                            <input className="form-control input2" type="text" name="Wiki" defaultValue={this.state.bcatpData.wiki} />
                        </label>
                        <label>
                            <input className="form-control" type="hidden" name="Type" defaultValue={this.state.bcatpData.type} readOnly />
                        </label>
                        <label>
                            <input className="form-control" type="hidden" name="Longitude" defaultValue="0" />
                        </label>

                        <label>
                            <input className="form-control" type="hidden" name="Latitude" defaultValue="0" />
                        </label>

                        <Navbar className="navbar-expand-sm" light>
                            <Container className=" justify-content-center  ">
                                <ul className="navbar-nav flex-grow">

                                    <NavItem>
                                        <button type="submit" disabled >Save</button>
                                    </NavItem>

                                    <NavItem>
                                        <button type="button" onClick={this.handleCancel}>Cancel</button>
                                    </NavItem>

                                </ul>
                            </Container>
                        </Navbar>
                    </table>
                </form >
            )
        }
    }
}