import React, { MouseEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

type variant = "success" | "error" | "warning";

export interface DialogBoxPropsI {
    show: boolean;
    heading: string;
    variant: variant;
    body: string;
    onHide?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DialogBox: React.FC<DialogBoxPropsI> = (props) => {

    const { show, heading, variant, body, onHide } = props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={`${variant}-dialog-box`}>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>{body}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button className={`${variant}-dialog-box dialog-box-button`} onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default DialogBox;
  