import * as React from "react";
import { RouteComponentProps } from "react-router";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import editpng from "./img/pencil.png";
import deletepng from "./img/trash.png";
import mappng from "./img/map.png";
interface FetchBcatpDataState {
    bcatpList: BcatpData[];
    maintList: MaintData[];
    loading: boolean;
    searchValue: string;
    wikiLink: string;
    currentPage: number;
    pageSize: number;

    // NEW FIELDS FOR MODAL SUPPORT
    showModal: boolean;
    modalType: string;       // "map" | "image"
    modalData: BcatpData | null;
}

//interface FetchBcatpDataState {
//    bcatpList: BcatpData[];
//    maintList: MaintData[];
//    loading: boolean;
//    searchValue: string;
//    wikiLink: string;
//    currentPage: number;
//    pageSize: number;
//}

export class FetchBcatp extends React.Component<
    RouteComponentProps<{ tableName: string }>,
    FetchBcatpDataState
> {
    tabName: string;
    tabNam2: string;

    constructor(props) {
        super(props);

        this.tabName = props.match.params.tableName;
        this.tabNam2 = this.tabName.charAt(0).toUpperCase() + this.tabName.slice(1);

        this.state = {
            bcatpList: [],
            maintList: [],
            loading: true,
            searchValue: "",
            wikiLink: "",
            currentPage: 1,
            pageSize: 10,

            showModal: false,
            modalType: "",      // "map" or "image"
            modalData: null
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.deleteSearch = this.deleteSearch.bind(this);
    }

    componentDidMount() {
        this.loadMaint();
        this.loadData("");
    }

    loadMaint() {
        fetch("api/MaintData/Details/" + this.tabName)
            .then(res => res.json())
            .then((data: MaintData[]) => {
                this.setState({
                    maintList: data,
                    wikiLink: data[0]?.wiki || ""
                });
            });
    }

    loadData(search: string) {
        const url =
            search && search.trim() !== ""
                ? `api/AllData2/Index/${this.tabName}/${search}`
                : `api/AllData/Index/${this.tabName}`;

        fetch(url)
            .then(res => res.json())
            .then((data: BcatpData[]) => {
                this.setState({ bcatpList: data, loading: false, currentPage: 1 });
            });
    }

    changePage(page: number) {
        const totalPages = Math.max(1, Math.ceil(this.state.bcatpList.length / this.state.pageSize));
        const newPage = Math.max(1, Math.min(page, totalPages));
        this.setState({ currentPage: newPage });
    }

    prevPage(totalPages: number) {
        if (this.state.currentPage > 1) this.setState({ currentPage: this.state.currentPage - 1 });
    }

    nextPage(totalPages: number) {
        if (this.state.currentPage < totalPages) this.setState({ currentPage: this.state.currentPage + 1 });
    }

    handlePageSizeChange(e) {
        const val = e.target.value;
        let newSize: number;
        if (val === "all") newSize = 999999;
        else newSize = parseInt(val, 10) || 10;

        this.setState({ pageSize: newSize, currentPage: 1 });
    }

    renderPagination() {
        const { currentPage, pageSize, bcatpList } = this.state;
        const totalPages = Math.max(1, Math.ceil(bcatpList.length / pageSize));

        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "3px",   // SUPER tight spacing
                    margin: "8px 0"
                }}
            >
                <button
                    className="button1"
                    onClick={() => this.prevPage(totalPages)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                <span style={{ minWidth: "90px", textAlign: "center" }}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="button1"
                    onClick={() => this.nextPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        );
    }


    handleSearch(event) {
        const value = event.target.value;
        this.setState({ searchValue: value });
        this.loadData(value);
    }

    deleteSearch() {
        this.setState({ searchValue: "" });
        this.loadData("");
    }

    handleDelete(id: number, name: string) {
        if (!window.confirm(`Delete ${this.tabNam2} item: ${id} ${name}?`)) return;

        fetch("api/AllData/Delete/" + id, { method: "delete" }).then(() => {
            this.setState({
                bcatpList: this.state.bcatpList.filter(rec => rec.id !== id)
            });
        });
    }

    handleEdit(id: number) {
        this.props.history.push(`/${this.tabName}/edit/${id}`);
    }

    handleMap(id: number) {
        const rec = this.state.bcatpList.find(x => x.id === id);
        this.setState({
            showModal: true,
            modalType: "map",
            modalData: rec
        });
    }

    handleImage(id: number, name: string, wiki: string) {
        const rec = this.state.bcatpList.find(x => x.id === id);
        this.setState({
            showModal: true,
            modalType: "image",
            modalData: rec
        });
    }

    handleCreateNew() {
        this.props.history.push(`/${this.tabName}/add`);
    }

    handleMaint() {
        this.props.history.push(`/${this.tabName}/maint`);
    }

    renderHeader() {
        const { currentPage, pageSize, bcatpList } = this.state;
        const totalPages = Math.max(1, Math.ceil(bcatpList.length / pageSize));

        return (
            <div
                className="topHeader"
                style={{
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px"
                }}
            >
                {/* LEFT: Search + Show */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            className="input1"
                            placeholder="Search"
                            value={this.state.searchValue}
                            onChange={this.handleSearch}
                        />

                        <button
                            className="button1"
                            onClick={this.deleteSearch}
                            style={{ width: "20px", marginLeft: "5px" }}
                        >
                            X
                        </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "5px" }}>Show</span>
                        <select
                            value={pageSize}
                            onChange={(e) => this.handlePageSizeChange(e)}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                </div>

                {/* CENTER: Pagination */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0px",     // no spacing at all
                        justifyContent: "center",
                        flexGrow: 1
                    }}
                >
                    <button
                        className="button1"
                        onClick={() => this.prevPage(totalPages)}
                        disabled={currentPage === 1}
                        style={{ padding: "1px 2px" }}   // << tighten button padding
                    >
                        Prev
                    </button>

                    <span style={{ minWidth: "30px", textAlign: "center" }}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="button1"
                        onClick={() => this.nextPage(totalPages)}
                        disabled={currentPage === totalPages}
                        style={{ padding: "1px 2px" }}   // << tighten button padding
                    >
                        Next
                    </button>
                </div>

                {/* RIGHT: Wiki + Create + Maint */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h3>
                        <a
                            style={{ width: "210px", fontWeight: "bold" }}
                            href={this.state.wikiLink}
                            target="_blank"
                        >
                            {this.tabNam2}
                        </a>
                    </h3>

                    <button className="button2" onClick={() => this.handleCreateNew()}>
                        Create
                    </button>

                    <button className="button2" onClick={() => this.handleMaint()}>
                        Maint
                    </button>
                </div>
            </div>
        );
    }



    renderTableStandard(list: BcatpData[]) {
        return (
            <>
                {this.renderHeader()}

                <div style={{ width: "100%", borderBottom: "1px solid #ccc", margin: "4px 0" }}></div>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "40px" }}></th>
                            <th style={{ width: "200px" }}>Name</th>
                            <th style={{ width: "140px" }}>Longitude</th>
                            <th style={{ width: "160px" }}>Latitude</th>
                            <th style={{ width: "350px" }}>Comment</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>

                <SimpleBar style={{ maxHeight: 400 }}>
                    <table className="table">
                        <tbody>
                            {(() => {
                                const { currentPage, pageSize } = this.state;
                                const start = (currentPage - 1) * pageSize;
                                const end = start + pageSize;
                                return list.slice(start, end).map(bca => (
                                    <tr key={bca.id}>
                                        <td></td>

                                        <td style={{ width: "200px", fontWeight: "bold" }}>
                                            {bca.wiki ? (
                                                <a href={bca.wiki} target="_blank">
                                                    {bca.name}
                                                </a>
                                            ) : (
                                                bca.name
                                            )}
                                        </td>

                                        <td>{bca.longitude}</td>
                                        <td>{bca.latitude}</td>
                                        <td>{bca.comment}</td>

                                        <td>
                                            <button className="action2" onClick={() => this.handleEdit(bca.id)} disabled>
                                                <img height="20" width="20" src={editpng} />
                                            </button>

                                            <button
                                                className="action2"
                                                onClick={() => this.handleDelete(bca.id, bca.name)} disabled
                                            >
                                                <img height="20" width="20" src={deletepng} />
                                            </button>

                                            <button className="action2" onClick={() => this.handleMap(bca.id)}>
                                                <img height="20" width="20" src={mappng} />
                                            </button>
                                        </td>
                                    </tr>
                                ));
                            })()}
                        </tbody>
                    </table>
                </SimpleBar>
            </>
        );
    }

    renderTableImage(list: BcatpData[]) {
        return (
            <>
                {this.renderHeader()}


                <SimpleBar style={{ maxHeight: 700 }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "20px",
                            padding: "10px"
                        }}
                    >
                        {(() => {
                            const { currentPage, pageSize } = this.state;
                            const start = (currentPage - 1) * pageSize;
                            const end = start + pageSize;
                            return list.slice(start, end).map(bca => (
                                <div
                                    key={bca.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        background: "#f8f8f8"
                                    }}
                                >
                                    <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                                        {bca.wiki ? (
                                            <a href={bca.wiki} target="_blank">
                                                {bca.name}
                                            </a>
                                        ) : (
                                            bca.name
                                        )}
                                    </div>

                                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                                        <img
                                            alt="no image"
                                            src={bca.comment}
                                            width={120}
                                            height={80}
                                            style={{ cursor: "pointer", borderRadius: "4px" }}
                                            onClick={() =>
                                                this.handleImage(bca.id, bca.name, bca.wiki)
                                            }
                                        />
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                                        <button
                                            className="action"
                                            onClick={() => this.handleEdit(bca.id)}
                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} disabled >
                                            <img height="20" width="20" src={editpng} />
                                        </button>
                                        <button
                                            className="action"
                                            onClick={() => this.handleDelete(bca.id, bca.name)}
                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} disabled >
                                            <img height="20" width="20" src={deletepng} />
                                        </button>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </SimpleBar>

                <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                    JRD.Consulting@hotmail.com (2022)
                </div>
            </>
        );
    }

    renderModal() {
        const { showModal, modalType, modalData } = this.state;
        if (!showModal || !modalData) return null;

        let content = null;

        if (modalType === "map") {
            content = (
                <div>
                    <h2>{modalData.name} — Map</h2>
                    <iframe
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${modalData.latitude},${modalData.longitude}&t=k&z=15&output=embed`}

                    ></iframe>
                </div>
            );
        }

        if (modalType === "image") {
            content = (
                <div>
                    <h2>{modalData.name} — Image</h2>
                    <img
                        src={modalData.comment}
                        alt={modalData.name}
                        style={{ maxWidth: "100%", maxHeight: "80vh" }}
                    />
                </div>
            );
        }

        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}
            >
                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        overflow: "auto"
                    }}
                >
                    <button
                        onClick={() => this.setState({ showModal: false })}
                        style={{
                            float: "right",
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer"
                        }}
                    >
                        Close
                    </button>

                    {content}
                </div>
            </div>
        );
    }
    render() {
        if (this.state.loading) return <p><em>Loading...</em></p>;

        const modal = this.renderModal();   // <‑‑ ADD THIS LINE

        const isImageMode =
            this.tabName === "tanks" || this.tabName === "planes" || this.tabName === "ships";

        return (
            <>
                {modal}   {/* <‑‑ AND ADD THIS RIGHT HERE */}

                {isImageMode
                    ? this.renderTableImage(this.state.bcatpList)
                    : this.renderTableStandard(this.state.bcatpList)}
            </>
        );
    }

    //render() {
    //    if (this.state.loading) return <p><em>Loading...</em></p>;
    //    const modal = this.renderModal();

    //    const isImageMode =
    //        this.tabName === "tanks" || this.tabName === "planes" || this.tabName === "ships";

    //    return isImageMode
    //        ? this.renderTableImage(this.state.bcatpList)
    //        : this.renderTableStandard(this.state.bcatpList);
    //}
}

export class BcatpData {
    id: number = 0;
    name: string = "";
    longitude: number;
    latitude: number;
    comment: string = "";
    wiki: string = "";
    type: number;
}

export class MaintData {
    id: number = 0;
    name: string = "";
    longitude: number;
    latitude: number;
    comment: string = "";
    wiki: string = "";
    type: number;
} 



//import * as React from "react";
//import { RouteComponentProps } from "react-router";
//import SimpleBar from "simplebar-react";
//import "simplebar-react/dist/simplebar.min.css";

//import editpng from "./img/pencil.png";
//import deletepng from "./img/trash.png";
//import mappng from "./img/map.png";

//interface FetchBcatpDataState {
//    bcatpList: BcatpData[];
//    maintList: MaintData[];
//    loading: boolean;
//    searchValue: string;
//    wikiLink: string;
//    currentPage: number;
//    pageSize: number;
//}

//export class FetchBcatp extends React.Component<
//    RouteComponentProps<{ tableName: string }>,
//    FetchBcatpDataState
//> {
//    tabName: string;
//    tabNam2: string;

//    constructor(props) {
//        super(props);

//        this.tabName = props.match.params.tableName;
//        this.tabNam2 = this.tabName.charAt(0).toUpperCase() + this.tabName.slice(1);

//        this.state = {
//            bcatpList: [],
//            maintList: [],
//            loading: true,
//            searchValue: "",
//            wikiLink: "",
//            currentPage: 1,
//            pageSize: 10
//        };

//        this.handleDelete = this.handleDelete.bind(this);
//        this.handleEdit = this.handleEdit.bind(this);
//        this.handleMap = this.handleMap.bind(this);
//        this.handleImage = this.handleImage.bind(this);
//        this.handleSearch = this.handleSearch.bind(this);
//        this.deleteSearch = this.deleteSearch.bind(this);
//    }

//    componentDidMount() {
//        this.loadMaint();
//        this.loadData("");
//    }

//    loadMaint() {
//        fetch("api/MaintData/Details/" + this.tabName)
//            .then(res => res.json())
//            .then((data: MaintData[]) => {
//                this.setState({
//                    maintList: data,
//                    wikiLink: data[0]?.wiki || ""
//                });
//            });
//    }

//    loadData(search: string) {
//        const url =
//            search && search.trim() !== ""
//                ? `api/AllData2/Index/${this.tabName}/${search}`
//                : `api/AllData/Index/${this.tabName}`;

//        fetch(url)
//            .then(res => res.json())
//            .then((data: BcatpData[]) => {
//                this.setState({ bcatpList: data, loading: false, currentPage: 1 });
//            });
//    }

//    changePage(page: number) {
//        const totalPages = Math.max(1, Math.ceil(this.state.bcatpList.length / this.state.pageSize));
//        const newPage = Math.max(1, Math.min(page, totalPages));
//        this.setState({ currentPage: newPage });
//    }

//    prevPage(totalPages: number) {
//        if (this.state.currentPage > 1) this.setState({ currentPage: this.state.currentPage - 1 });
//    }

//    nextPage(totalPages: number) {
//        if (this.state.currentPage < totalPages) this.setState({ currentPage: this.state.currentPage + 1 });
//    }

//    handlePageSizeChange(e) {
//        const val = e.target.value;
//        let newSize: number;
//        if (val === "all") newSize = 999999;
//        else newSize = parseInt(val, 10) || 10;

//        this.setState({ pageSize: newSize, currentPage: 1 });
//    }

//    renderPagination() {
//        const { currentPage, pageSize, bcatpList } = this.state;
//        const totalPages = Math.max(1, Math.ceil(bcatpList.length / pageSize));

//        return (
//            <div
//                style={{
//                    width: "100%",
//                    display: "flex",
//                    justifyContent: "center",
//                    alignItems: "center",
//                    gap: "3px",   // SUPER tight spacing
//                    margin: "8px 0"
//                }}
//            >
//                <button
//                    className="button1"
//                    onClick={() => this.prevPage(totalPages)}
//                    disabled={currentPage === 1}
//                >
//                    Prev
//                </button>

//                <span style={{ minWidth: "90px", textAlign: "center" }}>
//                    Page {currentPage} of {totalPages}
//                </span>

//                <button
//                    className="button1"
//                    onClick={() => this.nextPage(totalPages)}
//                    disabled={currentPage === totalPages}
//                >
//                    Next
//                </button>
//            </div>
//        );
//    }


//    handleSearch(event) {
//        const value = event.target.value;
//        this.setState({ searchValue: value });
//        this.loadData(value);
//    }

//    deleteSearch() {
//        this.setState({ searchValue: "" });
//        this.loadData("");
//    }

//    handleDelete(id: number, name: string) {
//        if (!window.confirm(`Delete ${this.tabNam2} item: ${id} ${name}?`)) return;

//        fetch("api/AllData/Delete/" + id, { method: "delete" }).then(() => {
//            this.setState({
//                bcatpList: this.state.bcatpList.filter(rec => rec.id !== id)
//            });
//        });
//    }

//    handleEdit(id: number) {
//        this.props.history.push(`/${this.tabName}/edit/${id}`);
//    }

//    handleMap(id: number) {
//        this.props.history.push(`/${this.tabName}/map/${id}`);
//    }

//    handleImage(id: number, name: string, wiki: string) {
//        this.props.history.push(`/${this.tabName}/image/${id}`);
//    }

//    handleCreateNew() {
//        this.props.history.push(`/${this.tabName}/add`);
//    }

//    handleMaint() {
//        this.props.history.push(`/${this.tabName}/maint`);
//    } 

//    renderHeader() {
//        const { currentPage, pageSize, bcatpList } = this.state;
//        const totalPages = Math.max(1, Math.ceil(bcatpList.length / pageSize));

//        return (
//            <div
//                className="topHeader"
//                style={{
//                    height: "40px",
//                    display: "flex",
//                    alignItems: "center",
//                    justifyContent: "space-between",
//                    padding: "0 10px"
//                }}
//            >
//                {/* LEFT: Search + Show */}
//                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                    <div style={{ display: "flex", alignItems: "center" }}>
//                        <input
//                            className="input1"
//                            placeholder="Search"
//                            value={this.state.searchValue}
//                            onChange={this.handleSearch}
//                        />

//                        <button
//                            className="button1"
//                            onClick={this.deleteSearch}
//                            style={{ width: "20px", marginLeft: "5px" }}
//                        >
//                            X
//                        </button>
//                    </div>

//                    <div style={{ display: "flex", alignItems: "center" }}>
//                        <span style={{ marginRight: "5px" }}>Show</span>
//                        <select
//                            value={pageSize}
//                            onChange={(e) => this.handlePageSizeChange(e)}
//                        >
//                            <option value={5}>5</option>
//                            <option value={10}>10</option>
//                            <option value={20}>20</option>
//                            <option value="all">All</option>
//                        </select>
//                    </div>
//                </div>

//                {/* CENTER: Pagination */}
//                <div
//                    style={{
//                        display: "flex",
//                        alignItems: "center",
//                        gap: "0px",     // no spacing at all
//                        justifyContent: "center",
//                        flexGrow: 1
//                    }}
//                >
//                    <button
//                        className="button1"
//                        onClick={() => this.prevPage(totalPages)}
//                        disabled={currentPage === 1}
//                        style={{ padding: "1px 2px" }}   // << tighten button padding
//                    >
//                        Prev
//                    </button>

//                    <span style={{ minWidth: "30px", textAlign: "center" }}>
//                        Page {currentPage} of {totalPages}
//                    </span>

//                    <button
//                        className="button1"
//                        onClick={() => this.nextPage(totalPages)}
//                        disabled={currentPage === totalPages}
//                        style={{ padding: "1px 2px" }}   // << tighten button padding
//                    >
//                        Next
//                    </button>
//                </div> 

//                {/* RIGHT: Wiki + Create + Maint */}
//                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                    <h3>
//                        <a
//                            style={{ width: "210px", fontWeight: "bold" }}
//                            href={this.state.wikiLink}
//                            target="_blank"
//                        >
//                            {this.tabNam2}
//                        </a>
//                    </h3>

//                    <button className="button2" onClick={() => this.handleCreateNew()}>
//                        Create
//                    </button>

//                    <button className="button2" onClick={() => this.handleMaint()}>
//                        Maint
//                    </button>
//                </div>
//            </div>
//        );
//    }



//    renderTableStandard(list: BcatpData[]) {
//        return (
//            <>
//                {this.renderHeader()}
              
//                <div style={{ width: "100%", borderBottom: "1px solid #ccc", margin: "4px 0" }}></div>
//                <table>
//                    <thead>
//                        <tr>
//                            <th style={{ width: "40px" }}></th>
//                            <th style={{ width: "200px" }}>Name</th>
//                            <th style={{ width: "140px" }}>Longitude</th>
//                            <th style={{ width: "160px" }}>Latitude</th>
//                            <th style={{ width: "350px" }}>Comment</th>
//                            <th></th>
//                        </tr>
//                    </thead>
//                </table>

//                <SimpleBar style={{ maxHeight: 400 }}>
//                    <table className="table">
//                        <tbody>
//                            {(() => {
//                                const { currentPage, pageSize } = this.state;
//                                const start = (currentPage - 1) * pageSize;
//                                const end = start + pageSize;
//                                return list.slice(start, end).map(bca => (
//                                    <tr key={bca.id}>
//                                        <td></td>

//                                        <td style={{ width: "200px", fontWeight: "bold" }}>
//                                            {bca.wiki ? (
//                                                <a href={bca.wiki} target="_blank">
//                                                    {bca.name}
//                                                </a>
//                                            ) : (
//                                                bca.name
//                                            )}
//                                        </td>

//                                        <td>{bca.longitude}</td>
//                                        <td>{bca.latitude}</td>
//                                        <td>{bca.comment}</td>

//                                        <td>
//                                            <button className="action2" onClick={() => this.handleEdit(bca.id)} disabled>
//                                                <img height="20" width="20" src={editpng} />
//                                            </button>

//                                            <button
//                                                className="action2"
//                                                onClick={() => this.handleDelete(bca.id, bca.name)} disabled
//                                            >
//                                                <img height="20" width="20" src={deletepng} />
//                                            </button>

//                                            <button className="action2" onClick={() => this.handleMap(bca.id)}>
//                                                <img height="20" width="20" src={mappng} />
//                                            </button>
//                                        </td>
//                                    </tr>
//                                ));
//                            })()}
//                        </tbody>
//                    </table>
//                </SimpleBar>
//            </>
//        );
//    }

//    renderTableImage(list: BcatpData[]) {
//        return (
//            <>
//                {this.renderHeader()}
           

//                <SimpleBar style={{ maxHeight: 700 }}>
//                    <div
//                        style={{
//                            display: "grid",
//                            gridTemplateColumns: "repeat(5, 1fr)",
//                            gap: "20px",
//                            padding: "10px"
//                        }}
//                    >
//                        {(() => {
//                            const { currentPage, pageSize } = this.state;
//                            const start = (currentPage - 1) * pageSize;
//                            const end = start + pageSize;
//                            return list.slice(start, end).map(bca => (
//                                <div
//                                    key={bca.id}
//                                    style={{
//                                        border: "1px solid #ccc",
//                                        padding: "10px",
//                                        borderRadius: "6px",
//                                        background: "#f8f8f8"
//                                    }}
//                                >
//                                    <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
//                                        {bca.wiki ? (
//                                            <a href={bca.wiki} target="_blank">
//                                                {bca.name}
//                                            </a>
//                                        ) : (
//                                            bca.name
//                                        )}
//                                    </div>

//                                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
//                                        <img
//                                            alt="no image"
//                                            src={bca.comment}
//                                            width={120}
//                                            height={80}
//                                            style={{ cursor: "pointer", borderRadius: "4px" }}
//                                            onClick={() =>
//                                                this.handleImage(bca.id, bca.name, bca.wiki)
//                                            }
//                                        />
//                                    </div>

//                                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
//                                        <button
//                                            className="action"
//                                            onClick={() => this.handleEdit(bca.id)}
//                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} disabled >
//                                            <img height="20" width="20" src={editpng} />
//                                        </button>
//                                        <button
//                                            className="action"
//                                            onClick={() => this.handleDelete(bca.id, bca.name)}
//                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} disabled >
//                                            <img height="20" width="20" src={deletepng} />
//                                        </button>
//                                    </div>
//                                </div>
//                            ));
//                        })()}
//                    </div>
//                </SimpleBar>

//                <div style={{ fontWeight: "bold", marginTop: "10px" }}>
//                    JRD.Consulting@hotmail.com (2022)
//                </div>
//            </>
//        );
//    }

//    render() {
//        if (this.state.loading) return <p><em>Loading...</em></p>;

//        const isImageMode =
//            this.tabName === "tanks" || this.tabName === "planes" || this.tabName === "ships";

//        return isImageMode
//            ? this.renderTableImage(this.state.bcatpList)
//            : this.renderTableStandard(this.state.bcatpList);
//    }
//}

//export class BcatpData {
//    id: number = 0;
//    name: string = "";
//    longitude: number;
//    latitude: number;
//    comment: string = "";
//    wiki: string = "";
//    type: number;
//}

//export class MaintData {
//    id: number = 0;
//    name: string = "";
//    longitude: number;
//    latitude: number;
//    comment: string = "";
//    wiki: string = "";
//    type: number;
//} 