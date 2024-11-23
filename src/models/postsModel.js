import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

//conecta ao banco de dados utilizando a string de conexao com variavel de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
//funcao que busca todos os posts no banco de dados
export async function getTodosPosts() {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}
export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}
export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

