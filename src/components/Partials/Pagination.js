import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        const {pages, currentPage} = this.props.pageObject;
        const {changeCurrentPage} = this.props;

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
        )
    }
}

export default Pagination;
