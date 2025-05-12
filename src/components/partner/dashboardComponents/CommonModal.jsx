import React from "react";
import { Modal } from "antd";

const CommonModal = ({ open, onCancel, onOk, title, children, footer }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      footer={footer}
      centered
      width={600}
      className="font-quicksand"
      mask={true}
      maskClosable={true}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
