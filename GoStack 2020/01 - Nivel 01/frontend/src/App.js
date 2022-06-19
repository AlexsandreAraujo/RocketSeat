import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import './App.css';
import api from "./services/Api";

function App() {
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, [])

    async function handleAddProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        const response = await
        api.post('projects',{
            title: `Novo Projeto ${Date.now()}`,
            owner: "Alexsandre Araujo"
        });

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    );
}

export default App;

/**
 * Tres conceitos mais importantes do React
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 * 
 * useState retorna um array com 2 posições
 * 
 * 1. Variável com o seu valor inicial
 * 2. Função para atualizarmos esse valor
 * 
 * Evitar push pois altera o valor original (imutabilidade)
 * projects.push(`Novo Projeto ${Date.now()}`);
 * 
 * import backgroundImage from './assets/image1.jpg';
 */