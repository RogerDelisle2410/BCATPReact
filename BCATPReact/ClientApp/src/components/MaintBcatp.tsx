import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MaintData } from './FetchBcatp';
///*  taskkill /f /im node.exe  */
import { Container, Navbar, NavItem } from 'reactstrap';

interface MaintBcatpDataState {
    title: string;
    loading: boolean;
    maintData: MaintData;
}

export class MaintBcatp extends React.Component<RouteComponentProps<{}>, MaintBcatpDataState> {
    tabId: number;
    tabName: string;

    constructor(props) {
        super(props);
        this.state = { title: "Edit", loading: true, maintData: new MaintData };
        this.tabId = 99;
        this.tabName = global.tableName;

        //Get the wiki data link
        fetch("api/MaintData/Details/" + this.tabName)
            .then(response => response.json() as Promise<MaintData>)
            .then(data => {
                this.setState({ maintData: data, loading: false, title: "Edit" });
            });

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
        if (this.state.maintData[0].id) {
            fetch("api/AllData/Edit", {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetch" + this.tabName + "/" + this.tabName + "");
                })
            global.itemWiki = this.state.maintData[0].wiki;
        }
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetch" + this.tabName + "/" + this.tabName + "");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form className="center2" onSubmit={this.handleSave} >
                <table className="center2">
                    <label>
                        <input className="form-control" type="hidden" name="Id" value={this.state.maintData[0].id} />
                    </label>
                    <label className="labelAdd">Name:&nbsp;&nbsp;
                        <input className="form-control input2" type="text" name="name" defaultValue={this.state.maintData[0].name} required />
                    </label>

                    <label className="labelAdd">Wiki Link:&nbsp;&nbsp;
                        <input className="form-control input2" type="text" name="Wiki" defaultValue={this.state.maintData[0].wiki} />
                    </label>
                    <label>
                        <input className="form-control" type="hidden" name="Type" defaultValue={this.state.maintData[0].type} readOnly />
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
                                    <button type="submit" disabled>Save</button>
                                </NavItem>
                                <NavItem>
                                    <button onClick={this.handleCancel}>Cancel</button>
                                </NavItem>
                            </ul>
                        </Container>
                    </Navbar>
                </table>
            </form>
        )
    }
}
