import React, { useEffect, useState } from "react";
import { Input, Select, Table, Button, message } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomButton from "../../components/Buttons/CustomButton";
import ProdutosModal from "../../components/Modals/ProdutosModals";
import ProdutoService from "../../services/ProdutoService";
import "./Produtos.css";

const { Option } = Select;

const Produtos = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [produtos, setProdutos] = useState([]);

  // Função para buscar produtos
  const fetchProdutos = async () => {
    try {
      const response = await ProdutoService.getProdutos();
      console.log("Produtos:", response);
      setProdutos(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      message.error("Erro ao buscar produtos.");
    }
  };

  // Função para adicionar produto
  const handleAddProduto = async (produto) => {
    try {
      await ProdutoService.createProduto(produto);
      message.success("Produto adicionado com sucesso!");
      fetchProdutos();
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      message.error("Erro ao adicionar produto.");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Configuração das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      responsive: ["xs", "sm", "md", "lg"], // Sempre visível
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      responsive: ["sm", "md", "lg"], // Oculto em telas pequenas
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      responsive: ["md", "lg"], // Visível a partir de telas médias
    },
    {
      title: "Preço por Unidade",
      dataIndex: "preco",
      key: "preco",
      responsive: ["sm", "md", "lg"], // Oculto em telas muito pequenas
      render: (value) => `R$ ${parseFloat(value).toFixed(2)}`,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      responsive: ["sm", "md", "lg"], // Oculto em telas muito pequenas
    },
    {
      title: "Ações",
      key: "acoes",
      responsive: ["xs", "sm", "md", "lg"], // Sempre visível
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <CustomButton
            bgColor={"#FFF"}
            color={"#065426"}
            hoverColor={"#065426"}
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record.id)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            onClick={() => handleDelete(record.id)}
            style={{ color: "red" }}
          />
        </div>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log("Editar produto com ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      await ProdutoService.deleteProduto(id);
      message.success("Produto excluído com sucesso!");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      message.error("Erro ao excluir produto.");
    }
  };

  return (
    <div className="produtos">
      <div className="containerButtons">
        <div className="searchControl">
          <Input
            placeholder="Buscar produto"
            prefix={<IoSearchOutline />}
            style={{ width: 200, marginRight: 16 }}
          />
          <Select
            placeholder="Categoria"
            style={{ width: 150, marginRight: 16 }}
          >
            <Option value="suplementos">Suplementos</Option>
            <Option value="vitaminas">Vitaminas</Option>
            <Option value="outros">Outros</Option>
          </Select>
          <Select placeholder="Status" style={{ width: 150, marginRight: 16 }}>
            <Option value="ativo">Ativo</Option>
            <Option value="inativo">Inativo</Option>
          </Select>
        </div>
        <div>
          <CustomButton onClick={() => setModalVisible(true)}>
            Adicionar Produto
          </CustomButton>
        </div>
      </div>

      <Table
        dataSource={produtos}
        columns={columns}
        rowKey="id"
        bordered
        style={{ marginTop: "24px" }}
        scroll={{ x: 800 }}
      />

      <ProdutosModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={handleAddProduto}
      />
    </div>
  );
};

export default Produtos;
