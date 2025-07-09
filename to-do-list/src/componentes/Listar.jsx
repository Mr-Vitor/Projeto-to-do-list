import './Listar.css'
import { useState } from 'react'

export default function Listar() {
    /*Criação de variaveis useState para monitorar a lista de tarefas, prioridade e filtro*/
    const [tarefa, setTarefa] = useState('')
    const [prioridade, setPrioridade] = useState('Baixo')
    const [filtro, setFiltro] = useState('todas')
    const [lista, setLista] = useState([])

    /*Lista de cores e prioridades usadas*/
    const cores = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC75F', '#B967FF', '#FF9671']

    const prioridades = ['Baixo', 'Médio', 'Alto', 'Urgente']

    /*Função que toma conta da criação das tarefas*/
    const handleSubmit = (e) => {
        //Previne o sistema de atualizar ao enviar uma tarefa
        e.preventDefault()
        if (!tarefa) return

        //Cria um objeto com dados de uma tarefa
        const novaTarefa = {
            id: Math.floor(Math.random() * 10000),
            texto: tarefa,
            prioridade: prioridade,
            status: false,
            corIndex: 0,
            mostrarCores: false
        }

        //Adiciona uma nova tarefa à lista, "clonando" a anterior
        setLista([...lista, novaTarefa])

        //Reseta os campos de input e prioridade ao adicionar uma tarefa
        setTarefa('')
        setPrioridade('Baixo')
    }

    //Função que muda o status de cada tarefa (concluída/não concluída) baseado no ID da tarefa
    const handleToggle = (id) => {
        //Mapeia os objetos e muda os necessários
        setLista(lista.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ))
    }

    //Função que reseta a lista, esvaziando-a
    const handleClear = () => {
        setLista([])
    }

    //Filtro para prioridades
    const listaFiltrada = lista.filter(item => {
        return filtro === 'todas' || item.prioridade === filtro
    })

    //Função que altera a prioridade de uma função baseado no seu ID
    const handleChangePrioridade = (id, novaPrioridade) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, prioridade: novaPrioridade } : item
        ));
    }

    //Função que exibe o menu de seleção de cor
    const toggleMostrarCores = (id) => {
        setLista(lista.map(item =>
            item.id === id
                ? { ...item, mostrarCores: !item.mostrarCores }
                : { ...item, mostrarCores: false } // fecha os menus de outras tarefas
        ))
    }

    //Define a cor do botão pelo índice da lista de cores
    const handleSelecionarCor = (id, indexCor) => {
        setLista(lista.map(item =>
            item.id === id
                ? { ...item, corIndex: indexCor, mostrarCores: false }
                : item
        ))
    }

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <form onSubmit={handleSubmit}>
            {/* Campo de input para o nome da tarefa */}
                <label>
                    <input
                        type="text"
                        onChange={(e) => setTarefa(e.target.value)}
                        value={tarefa}
                        placeholder="Descrição da tarefa"
                    />
                </label>

                {/*Campo para selecionar a prioridade da tarefa*/}
                <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                    {prioridades.map(p => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                    ))}
                </select>

                <input type="submit" value="Adicionar" />
            </form>

            <div style={{ marginTop: '10px' }}>

                {/*Campo de filtro por prioridade*/}
                <label>Filtrar por prioridade: </label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="todas">Todas</option>
                    {prioridades.map(p => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                    ))}
                </select>
            </div>
            
            {/*Botão para resetar a lista de tarefas*/}
            <button className="reset" onClick={handleClear}>Reset</button>

            <ul>
                {/*Lista de tarefas com ou sem filtro*/}
                {listaFiltrada.map((item) =>
                    <li key={item.id} className={item.status ? 'concluida' : ''}>
                        <div className='text'>
                            {/*Titulo e prioridade*/}
                            <span>
                                <strong>{item.texto}</strong>
                            </span>
                            <span>
                                {/*Campo que altera a prioridade de uma tarefa já criada*/}
                                <select
                                    value={item.prioridade}
                                    onChange={(e) => handleChangePrioridade(item.id, e.target.value)}
                                >
                                    {prioridades.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </span>
                        </div>

                        {/* Botão que mostra o menu de cores */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                                onClick={() => toggleMostrarCores(item.id)}
                                style={{
                                    backgroundColor: cores[item.corIndex],
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    marginRight: '8px',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cor
                            </button>
                            {/*Menu de cores*/}
                            {item.mostrarCores && (
                                <div style={{
                                    position: 'absolute',
                                    display: 'flex',
                                    gap: '5px',
                                    backgroundColor: '#f0f0f0',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    top: '40px',
                                    zIndex: 1
                                }}>
                                    {cores.map((cor, index) => (
                                        <div
                                            key={cor}
                                            onClick={() => handleSelecionarCor(item.id, index)}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: cor,
                                                cursor: 'pointer',
                                                border: item.corIndex === index ? '2px solid #000' : '1px solid #ccc'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {/*Botão de concluir tarefa*/}
                        <button onClick={() => handleToggle(item.id)}>
                            {item.status ? 'Desmarcar' : 'Concluir'}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}
