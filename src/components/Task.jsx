import React, { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { useBoard } from '../context/BoardContext'


function TaskInner({ task, index }) {
const { editTask, board, moveTaskToColumn } = useBoard()
const [editing, setEditing] = useState(false)
const [title, setTitle] = useState(task.title)
const [statusChanging, setStatusChanging] = useState(false)


useEffect(() => setTitle(task.title), [task.title])


const save = () => {
const trimmed = title.trim()
if (!trimmed) {
setTitle(task.title)
setEditing(false)
return
}
if (trimmed !== task.title) {
editTask(task.id, { title: trimmed }).catch(() => {})
}
setEditing(false)
}


const onStatusChange = async (e) => {
const dstColumnId = e.target.value
setStatusChanging(true)
try {
await moveTaskToColumn(task.id, dstColumnId)
} catch (err) {
console.error('Move failed', err)
} finally {
setStatusChanging(false)
}
}


return (
<Draggable draggableId={task.id} index={index}>
{(provided, snapshot) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
className={`task ${editing ? 'editing' : ''}`}
style={{ opacity: snapshot.isDragging ? 0.95 : 1 }}
>
<div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
<div style={{ flex: 1 }}>
{editing ? (
<input
autoFocus
value={title}
onChange={(e) => setTitle(e.target.value)}
onBlur={save}
onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setTitle(task.title); setEditing(false);} }}
/>
) : (
<h4 onDoubleClick={() => setEditing(true)} style={{ margin: 0 }}>{task.title}</h4>
)}
<p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280' }}>{task.description}</p>
</div>


<div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
<select value={Object.keys(board.columns).find(cid => board.columns[cid].taskIds.includes(task.id))} onChange={onStatusChange} disabled={statusChanging}>
{board.columnOrder.map(cid => (
<option key={cid} value={cid}>{board.columns[cid].title}</option>
))}
</select>
<div style={{ fontSize: 11, color: '#9ca3af' }}>{task.id}</div>
</div>
</div>
</div>
)}
</Draggable>
)
}


export default React.memo(TaskInner)