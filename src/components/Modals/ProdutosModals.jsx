import React, { useState } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";

const ProdutosModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Cadastrar Produto"
      okText="Cadastrar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome do Produto"
          rules={[
            { required: true, message: "Por favor insira o nome do produto!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Preço"
          rules={[
            { required: true, message: "Por favor insira o preço do produto!" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\R\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item name="description" label="Descrição">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ProdutosModals = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Novo Produto
      </Button>
      <ProdutosModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ProdutosModals;
