import api from "./Api";

const produtoService = {
  getProdutos: () => api.get("/produtos").then((res) => res.data),
  createProduto: (data) => api.post("/produtos", data),
};

export default produtoService;
