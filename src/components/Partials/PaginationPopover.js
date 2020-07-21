/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class PaginationPopover extends Component {

    state = {
        popoverOpen: false
    }

  toggle = () => {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      })
  }

  displayPageArray = () => {
      const {pageArray, changeCurrentPage} = this.props;
      const {toggle} = this;
          
        return pageArray.map(pageItem => {
            return <button key={pageItem} className="popover-page-button" onClick={() => {
                changeCurrentPage(pageItem)
                toggle()
            }}>{pageItem}</button>
        })
    }

  render(){
      const {toggle, displayPageArray} = this;
      const {popoverOpen} = this.state;
      const {title, id, pageArray} = this.props;

  return (
    <div>
      <Button id={id} type="button">
        ...
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target={id} toggle={toggle}>
        <PopoverHeader>{title}</PopoverHeader>
        <PopoverBody>
            {pageArray.length === 0 ? <p>No Page</p> : displayPageArray()}
        </PopoverBody>
      </Popover>
    </div>
  );
}
}

export default PaginationPopover;