import React from 'react';
import Highlights from '../Highlights/Highlights';
import Modal from 'react-responsive-modal';

export default function HighlightsModal(props) {
  console.log("props", props)
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
       <h1>Hello</h1>
      {props.highlightsVids.map((highlight, index) => (
   
      <Highlights 
      key={index}
      highlight={highlight}
      />))}
    </Modal>
  );
}
