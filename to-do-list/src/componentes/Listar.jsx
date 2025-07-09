import './Listar.css'
import { useState } from 'react'

export default function Listar() {
    const [tarefa, setTarefa] = useState('')
    const [prioridade, setPrioridade] = useState('Baixo')
    const [filtro, setFiltro] = useState('todas')
    const [lista, setLista] = useState([])

    const cores = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC75F', '#B967FF', '#FF9671']

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!tarefa) return

        const novaTarefa = {
            id: Math.floor(Math.random() * 10000),
            texto: tarefa,
            prioridade: prioridade,
            status: false,
            corIndex: 0,
            mostrarCores: false
        }

        setLista([...lista, novaTarefa])
        setTarefa('')
        setPrioridade('Baixo')
    }

    const handleToggle = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ))
    }

    const handleClear = () => {
        setLista([])
    }

    const prioridades = ['Baixo', 'Médio', 'Alto', 'Urgente']

    const listaFiltrada = lista.filter(item => {
        return filtro === 'todas' || item.prioridade === filtro
    })

    const handleChangePrioridade = (id, novaPrioridade) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, prioridade: novaPrioridade } : item
        ));
    }

    const toggleMostrarCores = (id) => {
        setLista(lista.map(item =>
            item.id === id
                ? { ...item, mostrarCores: !item.mostrarCores }
                : { ...item, mostrarCores: false } // fecha os menus de outras tarefas
        ))
    }

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
                <label>
                    <input
                        type="text"
                        onChange={(e) => setTarefa(e.target.value)}
                        value={tarefa}
                        placeholder="Descrição da tarefa"
                    />
                </label>

                <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                    {prioridades.map(p => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                    ))}
                </select>

                <input type="submit" value="Adicionar" />
            </form>

            <div style={{ marginTop: '10px' }}>
                <label>Filtrar por prioridade: </label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="todas">Todas</option>
                    {prioridades.map(p => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                    ))}
                </select>
            </div>

            <button className="reset" onClick={handleClear}>Reset</button>

            <ul>
                {listaFiltrada.map((item) =>
                    <li key={item.id} className={item.status ? 'concluida' : ''}>
                        <div className='text'>
                            <span>
                                <strong>{item.texto}</strong>
                            </span>
                            <span>
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

                        <button onClick={() => handleToggle(item.id)}>
                            {item.status ? 'Desmarcar' : 'Concluir'}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}
