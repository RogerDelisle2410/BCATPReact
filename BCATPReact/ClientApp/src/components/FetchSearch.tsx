import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
///*  taskkill /f /im node.exe  */

interface FetchSearchDataState {
    bcatpList: BcatpData[];
    loading: boolean;
}

window.name = "";
export class FetchBcatp extends React.Component<RouteComponentProps<{}>, FetchSearchDataState> {

    static: true;
    tabNam: string;
    tabNam2: string;

    constructor(props) {
        super(props.match.params.tableName);

        window.name = props.match.params.tableName.split(':')[1];
        this.tabNam = props.match.params.tableName.split(':')[1];
        this.tabNam2 = this.tabNam.charAt(0).toUpperCase() + this.tabNam.slice(1);

        this.state = { bcatpList: [], loading: true };

        fetch("api/AllData/Index/" + this.tabNam)
            .then(response => response.json() as Promise<BcatpData[]>)
            .then(data => {
                this.setState({ bcatpList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    public render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBcatpTable(this.state.bcatpList);

        return <div>
            <h3>{this.tabNam2} Data</h3>
            <p>
                <Link to="/addbcatp">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an bcatp

    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete bcatp with Id: " + id))
            return;
        else {
            fetch("api/AllData/Delete/" + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        bcatpList: this.state.bcatpList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    private handleImage(id: number) {
        this.props.history.push("/" + window.name + "/image/" + id + " " + window.name);
    }

    private handleEdit(id: number) {
        this.props.history.push("/" + window.name + "/edit/" + id + " " + window.name);
    }

    private handleMap(id: number) {
        this.props.history.push("/" + window.name + "/map/" + id + " " + window.name);
    }

    private handleSearch(name: string) {
        this.props.history.push("/" + window.name + "/search/" + name + " " + window.name);
    }

    // Returns the HTML table to the render() method.  
    private renderBcatpTable(bcatpList: BcatpData[]) {

        if (window.name != 'tanks' && window.name != 'planes' && window.name != 'ships') {

            return (
                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <td>
                        <input></input>
                        <button className="action2" onClick={(id) => this.handleSearch('ss')}>Search</button>
                    </td>
                    <tbody>

                        {bcatpList.map(bca =>

                            <tr key={bca.id}>
                                <td style={{ width: '10px' }}></td>
                                <td style={{ width: '245px', fontWeight: 'bold' }}>
                                    <a href={bca.wiki} target="_blank"> {bca.name}
                                    </a>
                                </td>
                                <td>{bca.longitude}</td><td>{bca.latitude}</td><td>{bca.comment}</td>
                                <td className="action3">
                                    <button className="action2" onClick={(id) => this.handleEdit(bca.id)}>Edit</button>
                                    <button className="action2" onClick={(id) => this.handleDelete(bca.id)}>Del</button>
                                    <button className="action2" onClick={(id) => this.handleMap(bca.id)}>Map</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table >
            );

        } else {

            return (

                <table>

                    <tbody className='grid2x2'>

                        {bcatpList.map(bca =>
                            <tr key={bca.id}>
                                <td style={{ width: '10px' }}></td>
                                <td style={{ width: '145px', fontWeight: 'bold' }} >
                                    <a href={bca.wiki} target="_blank" > {bca.name}   </a>
                                </td>
                                <td style={{ width: '100px', alignContent: 'center' }}>
                                    <img alt="no image" src={bca.comment} width={100} height={70} onClick={(id) => this.handleImage(bca.id)} />

                                </td>
                                <td style={{ width: '100px' }} >
                                    <button className="action" onClick={(id) => this.handleEdit(bca.id)} >Edit</button>
                                    <button className="action" onClick={(id) => this.handleDelete(bca.id)} >Del</button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>);
        }
    }
}
/*className = "zoom"*/
export class BcatpData {
    id: number = 0;
    name: string = "";
    longitude: number;
    latitude: number;
    comment: string = "";
    wiki: string = "";
    type: number;
} 
