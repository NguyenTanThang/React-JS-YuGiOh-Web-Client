import React, { Component } from 'react';
import PaginationPopover from "./PaginationPopover";

class Pagination extends Component {

    state = {
        gotoPage: 1
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onGoTo = (e) => {
        e.preventDefault();
        const {changeCurrentPage} = this.props;
        const {gotoPage} = this.state;
        changeCurrentPage(parseInt(gotoPage));
    }

    displayFirstPagi = () => {
        const {currentPage, totalPages} = this.props.pageObject;
        const {changeCurrentPage} = this.props;

        if (currentPage - 1 >= 2 && totalPages > 6){
            let pageArray = [];
            let diff = currentPage - 1;
            
            for (let index = 2; index < diff; index++) {
                pageArray.push(index);         
            }

            return (
                <>
                    <li className="page-item">
                        <button className="page-link" onClick={() => {changeCurrentPage(1)}}>1</button>
                    </li>

                    <li className="page-item disabled">
                        <PaginationPopover id="FirstPagi" title="Pages" pageArray={pageArray} changeCurrentPage={changeCurrentPage}/>
                    </li>
                </>
            )
        } else {
            return (<></>)
        }
    }

    displayLastPagi = () => {
        const {currentPage, totalPages} = this.props.pageObject;
        const {changeCurrentPage} = this.props;

        let pageArray = [];
        let diff = totalPages - currentPage;
            
        for (let index = currentPage + 2; index < totalPages; index++) {
            pageArray.push(index);         
        }

        if (totalPages - currentPage >= 2 && totalPages > 6){
            return (
                <>
                    <li className="page-item disabled">
                        <PaginationPopover id="LastPagi" title="Pages" pageArray={pageArray} changeCurrentPage={changeCurrentPage}/>
                    </li>

                    <li className="page-item">
                        <button className="page-link" onClick={() => {changeCurrentPage(totalPages)}}>{totalPages}</button>
                    </li>
                </>
            )
        } else {
            return (<></>)
        }
    }

    render() {
        console.log(this.props.pageObject)
        const {pages, currentPage, totalPages} = this.props.pageObject;
        const {changeCurrentPage} = this.props;
        const {onChange, onGoTo, displayFirstPagi, displayLastPagi} = this;
        const {gotoPage} = this.state;

        const arrayOfPageLinks = pages.map((page) => {
            if (page === currentPage){
                return <li className="page-item active" key={page}>
                <button className="page-link" onClick={() => {
                    changeCurrentPage(page)
                }}>{page}</button>
            </li>
            }
            return <li className="page-item"  key={page}>
                <button className="page-link" onClick={() => {
                    changeCurrentPage(page)
                }}>{page}</button>
            </li>
        })

        return (
            <div>
                <nav aria-label="Page Navigation" >
                    <ul className="pagination justify-content-center">

                        {displayFirstPagi()}

                        {arrayOfPageLinks}

                        {displayLastPagi()}

                    </ul>
                </nav>

                <form id="pagination-form" onSubmit={onGoTo} method="POST">
                    <label htmlFor="gotoPage">Go To</label>
                    <input name="gotoPage" id="gotoPage" type="number" min={1} max={totalPages} onChange={onChange} value={gotoPage}/>
                    <button type="submit" className="btn">Go</button>
                </form>
            </div>
        )
    }
}

export default Pagination;
