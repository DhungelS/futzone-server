import React, { Component } from 'react';
import RRModal from 'react-responsive-modal';

import ReviewModal from './ReviewModal';

class Modal extends Component {
  _handleClose = () => {
    this.props.handleClose();
  };

  _renderModal = () => {
    switch (this.props.modalType) {
      case 'REVIEW':
        return <ReviewModal {...this.props.params} />;

      default:
        return null;
    }
  };

  render() {
    return (
      <RRModal
        classNames={{
          overlay: 'custom-overlay',
          modal: 'custom-modal',
        }}
        open={this.props.isOpen}
        onClose={this._handleClose}
        little
      >
        {this._renderModal()}
      </RRModal>
    );
  }
}

export default Modal;
