import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import produtoService from "../../services/produtoService";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    produtoService.getProdutos().then(setProdutos);
  }, []);

  return (
    <div className="produtos">
      <h1>Gerenciamento de Produtos</h1>
      <Button type="primary">Adicionar Produto</Button>
      <Table
        dataSource={produtos}
        columns={[
          { title: "Nome", dataIndex: "nome", key: "nome" },
          { title: "Preço", dataIndex: "preco", key: "preco" },
          { title: "Quantidade", dataIndex: "quantidade", key: "quantidade" },
        ]}
      />
    </div>
  );
};

export default Produtos;
