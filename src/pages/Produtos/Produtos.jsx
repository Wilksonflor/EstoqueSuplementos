import React, { useEffect, useState } from "react";
import { Input, Select, Table, Button, message, Modal } from "antd";
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
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [editingProduto, setEditingProduto] = useState(null);

  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroBusca, setFiltroBusca] = useState("");

  const fetchProdutos = async () => {
    try {
      const response = await ProdutoService.getProdutos();
      console.log("Produtos:", response);
      setProdutos(response);
      setFilteredProdutos(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      message.error("Erro ao buscar produtos.");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  useEffect(() => {
    const produtosFiltrados = produtos.filter((produto) => {
      const matchCategoria =
        filtroCategoria === "todos" || produto.categoria?.toLowerCase() === filtroCategoria.toLowerCase();
      const matchStatus =
        filtroStatus === "todos" ||
        (filtroStatus === "ativo" && produto.ativo) ||
        (filtroStatus === "inativo" && !produto.ativo);
      const matchBusca =
        filtroBusca === "" ||
        produto.nome.toLowerCase().includes(filtroBusca.toLowerCase()) ||
        produto.id.toLowerCase().includes(filtroBusca.toLowerCase());

      return matchCategoria && matchStatus && matchBusca;
    });

    setFilteredProdutos(produtosFiltrados);
  }, [filtroCategoria, filtroStatus, filtroBusca, produtos]);

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

  const handleEditProduto = async (produto) => {
    try {
      await ProdutoService.updateProduto(produto);
      message.success("Produto atualizado com sucesso!");
      fetchProdutos();
      setModalVisible(false);
      setEditingProduto(null);
    } catch (error) {
      message.error("Erro ao editar produto.");
    }
  };

  const handleEdit = (id) => {
    const produto = produtos.find((p) => p.id === id);
    if (produto) {
      setEditingProduto(produto);
      setModalVisible(true);
    } else {
      message.error("Produto não encontrado.");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirmação",
      content: "Você tem certeza que deseja excluir este produto?",
      okText: "Sim",
      cancelText: "Não",
      onOk: async () => {
        try {
          await ProdutoService.deleteProduto(id);
          message.success("Produto excluído com sucesso!");
          fetchProdutos();
        } catch (error) {
          console.error("Erro ao excluir produto:", error);
          message.error("Erro ao excluir produto.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      responsive: ["md", "lg"],
    },
    {
      title: "Preço por Unidade",
      dataIndex: "preco",
      key: "preco",
      responsive: ["sm", "md", "lg"],
      render: (value) => `R$ ${parseFloat(value).toFixed(2)}`,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Ações",
      key: "acoes",
      responsive: ["xs", "sm", "md", "lg"],
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

  return (
    <div className="produtos">
      <div className="containerButtons">
        <div className="searchControl">
          <Input
            placeholder="Buscar produto por nome ou código"
            prefix={<IoSearchOutline />}
            style={{ width: 200, marginRight: 16 }}
            onChange={(e) => setFiltroBusca(e.target.value)}
          />
          <Select
            placeholder="Selecione a categoria"
            style={{ width: 150, marginRight: 16 }}
            onChange={(value) => setFiltroCategoria(value || "todos")}
            value={filtroCategoria}
          >
            <Option value="todos">Selecione a categoria</Option>
            <Option value="suplementos">Suplementos</Option>
            <Option value="vitaminas">Vitaminas</Option>
            <Option value="outros">Outros</Option>
          </Select>
          <Select
            placeholder="Todos"
            style={{ width: 150, marginRight: 16 }}
            onChange={(value) => setFiltroStatus(value || "todos")}
            value={filtroStatus}
          >
            <Option value="todos">Todos</Option>
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
        dataSource={filteredProdutos}
        columns={columns}
        rowKey="id"
        bordered
        style={{ marginTop: "24px" }}
        scroll={{ x: 800 }}
      />

      <ProdutosModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduto(null);
        }}
        onCreate={handleAddProduto}
        onEdit={handleEditProduto}
        produto={editingProduto}
      />
    </div>
  );
};

export default Produtos;
