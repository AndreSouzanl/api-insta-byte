import express from "express";
import routes from "./src/routes/postsRoutes.js";

// usando o express atraves da constante app
const app = express();
app.use(express.static("uploads"))
routes(app);

//inicializando o servidor local na porta 3000
app.listen(3000, () => {
  console.log("Servidor execultando...");
});
