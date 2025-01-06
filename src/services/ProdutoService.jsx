import api from "./Api";

const produtoService = {
  getProdutos: () => api.get("/produtos").then((res) => res.data),
  createProduto: (data) => api.post("/produtos", data),
  updateProduto: (data) => api.put(`/produtos/${data.id}`, data),
  deleteProduto: (id) => api.delete(`/produtos/${id}`),
};

export default produtoService;
