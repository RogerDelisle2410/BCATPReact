import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { RouteComponentProps } from 'react-router';
import { BcatpData } from './FetchBcatp';
import 'reactjs-popup/dist/index.css';

interface FetchMapBcatpDataState {
    title: string;
    loading: boolean;
    bcatpData: BcatpData;
}

export class FetchMap extends React.Component<RouteComponentProps<{}>, FetchMapBcatpDataState> {
    tabId: number;
    tabName: string;
    latitude: number;
    longitude: number;

    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, bcatpData: new BcatpData };
        this.tabId = props.match.params.Id;
        this.tabName = global.tableName;

        if (this.tabId > 0) {
            fetch("api/AllData/Details/" + this.tabId)
                .then(response => response.json() as Promise<BcatpData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, bcatpData: data });
                    this.latitude = data.latitude;
                    this.longitude = data.longitude;
                });
        }

        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>{contents}</div>;
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetch" + this.tabName + "/" + this.tabName);
    }

    private renderCreateForm() {
        const apiKey = process.env.REACT_APP_GOOGLE_KEY;

        return (
            <form>
                <div className="mapbox">
                    <Wrapper apiKey={apiKey} render={this.renderStatus}>
                        <GoogleMapContainer
                            lat={this.state.bcatpData.latitude}
                            lng={this.state.bcatpData.longitude}
                        />
                    </Wrapper>
                </div>

                <div className="flexbox-container2">
                    <a className="imageIn2"
                        href={this.state.bcatpData.wiki}
                        target="_blank">
                        {this.state.bcatpData.name}
                    </a>

                    <button className="text-dark" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        );
    }

    private renderStatus(status: Status) {
        if (status === Status.LOADING) return <div>Loading map…</div>;
        if (status === Status.FAILURE) return <div>Failed to load map</div>;
        return null;
    }
}

function GoogleMapContainer({ lat, lng }) {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!ref.current) return;

        const map = new window.google.maps.Map(ref.current, {
            center: { lat, lng },
            zoom: 14,
            mapTypeId: "satellite",
            tilt: 0
        });

        new window.google.maps.Marker({
            position: { lat, lng },
            map
        });

    }, [lat, lng]);

    return <div ref={ref} style={{ height: "400px", width: "100%" }} />;
}
