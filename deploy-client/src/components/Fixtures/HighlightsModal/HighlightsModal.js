import React from 'react';
import Highlights from '../Highlights/Highlights';
import Modal from 'react-responsive-modal';

export default function HighlightsModal(props) {
  return (
    <Modal
      classNames={{
        overlay: 'custom-overlay',
        modal: 'custom-modal'
      }}
      open={props.openHighlightsModal}
      onClose={props.onCloseHighlightsModal}
      little
    >
      {props.highlightsVids.map((highlight, index) => (
   
      <Highlights 
      key={index}
      highlight={highlight}
      />))}
    </Modal>
  );
}
