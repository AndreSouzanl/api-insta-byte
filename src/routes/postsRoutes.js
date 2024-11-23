// Importa o framework Express para criar um servidor web Node.js
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções do controlador de posts para interagir com o banco de dados e manipular posts
import { listaPosts, postarNovoPost, uploadImagem, atualizaNovoPost } from "../controllers/postscontroller.js";
import cors from "cors";

const corsOptions = {
  ogirin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer usando diskStorage
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo para os arquivos carregados (mantém o nome original aqui)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer usando a configuração de armazenamento
const upload = multer({ storage });

// Define uma função para lidar com as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor interprete dados JSON em requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Define uma rota GET para buscar todos os posts
  app.get("/posts", listaPosts);

  // Define uma rota POST para criar um novo post
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para lidar com o upload de imagens
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizaNovoPost)
};
// Exporta a função de rotas para ser usada no arquivo principal da aplicação
export default routes;