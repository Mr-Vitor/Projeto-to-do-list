import './Listar.css'
import { useState } from 'react'

export default function Listar() {
    const [tarefa, setTarefa] = useState('')
    const [prioridade, setPrioridade] = useState('Baixo')
    const [filtro, setFiltro] = useState('todas')
    const [lista, setLista] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!tarefa) return

        const novaTarefa = {
            id: Math.floor(Math.random() * 10000),
            texto: tarefa,
            prioridade: prioridade,
            status: false
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
    };


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

            <button onClick={handleClear}>Reset</button>

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
                       
                        <button onClick={() => handleToggle(item.id)}>
                            {item.status ? 'Desmarcar' : 'Concluir'}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}
