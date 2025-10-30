import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'


export default function CreateTask({ onClose }) {
const { board, createTask } = useBoard()
const [title, setTitle] = useState('')
const [column, setColumn] = useState(board ? board.columnOrder[0] : 'col-1')
const [loading, setLoading] = useState(false)


const submit = async (e) => {
e.preventDefault()
if (!title.trim()) return
setLoading(true)
try {
await createTask(column, title.trim())
setTitle('')
onClose()
} catch (err) {
console.error('Create failed', err)
} finally {
setLoading(false)
}
}
return (
<div style={{ position: 'absolute', right: 24, top: 64, zIndex: 40, background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}>
<form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
<input autoFocus placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2" />
<select value={column} onChange={(e) => setColumn(e.target.value)} className="p-2">
{board && board.columnOrder.map((cid) => (
<option key={cid} value={cid}>{board.columns[cid].title}</option>
))}
</select>
<div style={{ display: 'flex', gap: 8 }}>
<button className="add-task-btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
<button type="button" onClick={onClose} style={{ padding: '10px 12px', borderRadius: 6 }}>Cancel</button>
</div>
</form>
</div>
)
}