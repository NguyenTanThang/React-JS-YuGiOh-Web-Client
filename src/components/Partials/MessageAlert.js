import React, { Component } from 'react';
import {clearError} from "../../actions/errorActions";
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

class MessageAlert extends Component {
    toggle = () => {
        this.props.clearError();
    }

    render() {
        const {
            className,
            message,
            success,
            isVisible
          } = this.props;
        const modal = isVisible;
        const {toggle} = this;
        
        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Message</ModalHeader>
                    <ModalBody>
                        <Alert color={success ? "success" : "danger"}>
                            {message}
                        </Alert>
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
