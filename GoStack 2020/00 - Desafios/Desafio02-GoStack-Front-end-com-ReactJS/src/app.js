const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const { v4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositorieId(request, response, next){
  const {id} = request.params;
  if (!isUuid(id)){
      return response.status(400).json({error : 'Invalid repositorie ID'});
  }
  return next();
}


app.use('/repositories/:id',validateRepositorieId);


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs}  = request.body;
  const repositorie = {id:v4(),title,url,techs,likes:0};
  repositories.push(repositorie);
  console.log(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositorieIndex < 0){
      return response.status(400).json({error: "repositorie not found."});
  }
  const {likes} = repositories[repositorieIndex];
  const repositorie = {id,title,url,techs,likes};

  repositories[repositorieIndex] = repositorie

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    if (repositorieIndex < 0){
        return response.status(400).json({error: "repositorie not found."});
    }
    repositories.splice(repositorieIndex,1);
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositorieIndex < 0){
      return response.status(400).json({error: "repositorie not found."});
  }
  const repositorie = repositories[repositorieIndex];
  repositorie.likes++;
  repositories[repositorieIndex] = repositorie

  return response.json(repositorie);
});

module.exports = app;
