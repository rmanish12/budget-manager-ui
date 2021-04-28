import React from "react";
import { Modal } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

interface LoaderProps {
    show: boolean;
}

const Loader: React.FC<LoaderProps> = (props): JSX.Element => {
  return (
    <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show="true"
    >
      <Modal.Body>
        <div style={{textAlign: "center"}}>
          <CircularProgress />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Loader;
