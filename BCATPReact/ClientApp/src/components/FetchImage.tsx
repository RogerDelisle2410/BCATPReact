import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BcatpData } from './FetchBcatp';
import './global.js';

interface ImageBcatpDataState {
    title: string;
    loading: boolean;
    bcatpData: BcatpData;
}

export class FetchImage extends React.Component<RouteComponentProps<{}>, ImageBcatpDataState> {
    tabId: number;
    comment: string;
    searchName: string;
    tabName: string;
    imageName: string;
    imageWiki: string;

    constructor(props) {
        super(props.match.params.tableName, props.match.params.searchValue);

        this.state = { title: "", loading: true, bcatpData: new BcatpData };
        this.tabId = props.match.params.Id;
        this.tabName = global.tableName;
        this.searchName = global.searchValue;
        this.imageName = global.itemName;
        this.imageWiki = global.itemWiki;

        if (this.tabId > 0) {
            fetch("api/AllData/Details/" + this.tabId)
                .then(response => response.json() as Promise<BcatpData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, bcatpData: data });
                    this.comment = data.comment;
                });
        }
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            {contents}
        </div>;
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetch" + this.tabName + "/" + this.tabName + "");
    }

    private renderCreateForm() {
        return (
            <div>
                <div className="flexbox-container2">
                    <a className="imageIn2" href={this.imageWiki} target="_blank"> {this.imageName} </a>                   
                    <button className="text-dark" onClick={this.handleCancel}>Cancel</button>
                </div>
                <img className="imageIn" src={this.state.bcatpData.comment} alt="no image" /> 
            </div>
        );
    }
}