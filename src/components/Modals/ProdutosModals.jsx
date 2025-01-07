import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  message,
  Checkbox,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProdutosModal = ({ visible, onCancel, onCreate, onEdit, produto }) => {
  const [form] = Form.useForm();

  // Preencher o formulário ao abrir para edição
  useEffect(() => {
    if (produto) {
      form.setFieldsValue({
        ...produto,
        precoUnitario: produto.preco,
        ativo: produto.ativo !== undefined ? produto.ativo : true,
      });
    } else {
      form.resetFields();
    }
  }, [produto, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        preco: values.precoUnitario,
      };
      delete formattedValues.precoUnitario;

      if (produto) {
        await onEdit({ ...formattedValues, id: produto.id });
      } else {
        await onCreate(formattedValues);
      }

      form.resetFields();
    } catch (error) {
      message.error("Erro ao tentar salvar o produto.");
    }
  };

  return (
    <Modal
      title={produto ? "Editar Produto" : "Adicionar Produto"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      style={{
        padding: "16px",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
      width={window.innerWidth > 768 ? 600 : "90%"}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Nome do Produto"
              name="nome"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o nome do produto!",
                },
              ]}
            >
              <Input placeholder="Ex.: Whey Protein" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Preço Unitário"
              name="precoUnitario"
              rules={[
                { required: true, message: "Por favor, insira o preço!" },
              ]}
            >
              <Input
                prefix={<DollarOutlined />}
                type="number"
                placeholder="Ex.: 50.00"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Quantidade"
              name="quantidade"
              rules={[
                { required: true, message: "Por favor, insira a quantidade!" },
              ]}
            >
              <Input type="number" placeholder="Ex.: 10" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Categoria"
              name="categoria"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione a categoria!",
                },
              ]}
            >
              <Select placeholder="Selecione uma categoria">
                <Option value="Suplementos">Suplementos</Option>
                <Option value="Vitaminas">Vitaminas</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item
              label="Descrição"
              name="descricao"
              rules={[
                { required: true, message: "Por favor, insira uma descrição!" },
              ]}
            >
              <Input.TextArea
                placeholder="Descreva o produto (máx. 200 caracteres)"
                maxLength={200}
                rows={3}
              />
            </Form.Item>
          </Col>
        </Row>
        {produto && (
          <Row>
            <Col xs={24}>
              <Form.Item name="ativo" valuePropName="checked">
                <Checkbox>ativo</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row justify="end" gutter={16}>
          <Col>
            <Button onClick={onCancel}>Cancelar</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleSubmit}>
              {produto ? "Atualizar" : "Salvar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProdutosModal;
