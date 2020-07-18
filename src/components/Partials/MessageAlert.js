import React, { Component } from 'react';
import {clearError} from "../../actions/errorActions";
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

class MessageAlert extends Component {
    toggle = () => {
        this.props.clearError();
    }

    reload = () => {
        window.location.reload();
    }

    render() {
        const {
            className,
            message,
            success,
            isVisible,
            isReload
          } = this.props;
        const modal = isVisible;
        const {toggle, reload} = this;
        
        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Message</ModalHeader>
                    <ModalBody>
                        <Alert color={success ? "success" : "danger"}>
                            {message}
                        </Alert>
                        {isReload === true ? <button onClick={reload} className="btn btn-info btn-block">Reload Now</button> : ""}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isVisible: state.errorReducer.isVisible,
        message: state.errorReducer.message,
        success: state.errorReducer.success,
        isReload: state.errorReducer.isReload
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => {
            dispatch(clearError())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageAlert);
