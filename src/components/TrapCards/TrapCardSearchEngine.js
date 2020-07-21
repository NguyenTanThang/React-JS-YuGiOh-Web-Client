import React, { Component } from 'react';
import {
    getTrapCategories
} from "../../fetchers/categoryFetchers";
import {Form, Input, Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

class TrapCardSearchEngine extends Component {
  
    state = {
        modal: false,
        searched_name: "",
        categoryList: [],
        categoryID: "",
        description: "",
        aphabeticalOrder: "A - Z"
    }

    /*
    async componentDidMount(){
        this.props.getAllCards();
        const categoryList = await getAllCategories();
        this.setState({
            categoryList
        })
    }
    */

   async componentDidMount() {
    //this.props.getAllSpellCards();
    const categoryList = await getTrapCategories();
    localStorage.setItem("trapCategories", JSON.stringify(categoryList))
    this.setState({
        categoryList
    })
}

  toggle = () => {

    const {isSearchObjectEmpty} = this.props;

    if (isSearchObjectEmpty()){
        this.setState({
            categoryID: "",
            searched_name: "",
            description: "",
        })
    }

      this.setState({
        modal: !this.state.modal
      })
  }

  onChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

    onSubmit = (e) => {
        e.preventDefault();
        const {searched_name, categoryID, description} = this.state;
        this.props.onSearch({searched_name, categoryID, description})
        this.setState({
            modal: false
        })
    }

    onReset = (e) => {
        e.preventDefault();
        this.props.onSearch({})
        this.setState({
            searched_name: "",
            categoryID: "",
            description: ""
        })
    }

    displayCategoryOptions = () => {
        let categoryList = this.state.categoryList;
    
        return categoryList.map(categoryItem => {
            return (
                <option key={categoryItem._id} value={categoryItem._id}>
                    {categoryItem.name}
                </option>
            )
        })
      }

      
    displayAphabeticalOrder = () => {
        const sortCriteria = ["A - Z", "Z - A", "By Category (Trap)"]
        
        return (
            <>
                <option value={""} key={""} disabled>--Sort--</option>
                {sortCriteria.map(sortItem => {
                    return <option value={sortItem} key={sortItem}>{sortItem}</option>
                })}
            </>
        )
    }

render(){
    const {
        className,
        setAlphabeticalOrder
      } = this.props;
      const {toggle, onChange, onSubmit, onReset, displayCategoryOptions, displayAphabeticalOrder} = this;
      const {modal, searched_name, description, categoryID, aphabeticalOrder} = this.state;

      return (
        <div>
            <div className="d-flex align-items-center search-engine-box flex-wrap">
                <Button color="dark" onClick={toggle}>Search Trap Cards</Button>
                <FormGroup>
                    <select defaultValue={aphabeticalOrder} id="aphabeticalOrder" name="aphabeticalOrder" required value={aphabeticalOrder} onChange={(e) => {
                        onChange(e)
                        setAlphabeticalOrder(e.target.value)
                    }} className="custom-select">
                        {displayAphabeticalOrder()}
                    </select>
                </FormGroup>
            </div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Search Trap Cards</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>
    
              <FormGroup>
              <Label htmlFor="searched_name">Searched Name:</Label>
              <Input id="searched_name" name="searched_name" placeholder="Name" value={searched_name} onChange={onChange}/>
          </FormGroup>

          <FormGroup>
                    <Label htmlFor="categoryID">Category:</Label>
                    <select defaultValue={categoryID} id="categoryID" name="categoryID" value={categoryID} onChange={onChange} className="custom-select">
                        <option value={""} disabled>--Category--</option>
                        {displayCategoryOptions()}
                    </select>
                </FormGroup>

          <FormGroup>
              <Label htmlFor="description">Card Text:</Label>
              <textarea id="description" name="description" placeholder="Card Text" value={description} onChange={onChange} className="form-control" rows="5"></textarea>
          </FormGroup>

                <FormGroup>
                    <Button type="submit" color="dark" block>Search</Button>
                    <Button type="reset" color="info" onClick={onReset} block>Reset</Button>
                </FormGroup>
              
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}
}

export default TrapCardSearchEngine