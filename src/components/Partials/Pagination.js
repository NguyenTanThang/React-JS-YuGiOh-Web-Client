import React, { Component } from 'react';

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

    render() {
        console.log(this.props.pageObject)
        const {pages, currentPage, totalPages} = this.props.pageObject;
        const {changeCurrentPage} = this.props;
        const {onChange, onGoTo} = this;
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

                        <li className="page-item">
                            <button className="page-link" onClick={() => {changeCurrentPage(currentPage - 1)}}>Previous</button>
                        </li>

                        {arrayOfPageLinks}

                        <li className="page-item">
                            <button className="page-link" onClick={() => {changeCurrentPage(currentPage + 1)}}>Next</button>
                        </li>

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
