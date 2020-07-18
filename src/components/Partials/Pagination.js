import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        console.log(this.props.pageObject)
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

                <form id="pagination-form">
                    <input type="number"/>
                </form>
            </div>
        )
    }
}

export default Pagination;
