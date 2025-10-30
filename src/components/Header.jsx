import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import CreateTask from './CreateTask'


const Header = () => {
const { pendingCount } = useBoard()
const [openCreate, setOpenCreate] = useState(false)


return (
<header className="header">
<div>Collaborative Task Board</div>
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
<button onClick={() => setOpenCreate((s) => !s)} className="add-task-btn">+ New Task</button>
{pendingCount > 0 ? (
<div className="syncing">Syncing… ({pendingCount})</div>
) : (
<div style={{ color: '#16a34a' }}>All synced</div>
)}
</div>
{openCreate && <CreateTask onClose={() => setOpenCreate(false)} />}
</header>
)
}


export default React.memo(Header)