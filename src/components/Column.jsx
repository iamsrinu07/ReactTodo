import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import Task from './Task'
import { useBoard } from '../context/BoardContext'


function ColumnInner({ column }) {
const { board } = useBoard()
const tasks = column.taskIds.map((tid) => board.tasks[tid])


return (
<div className="column">
<div className="column-title">{column.title}</div>
<Droppable droppableId={column.id} type="TASK">
{(provided, snapshot) => (
<div
ref={provided.innerRef}
{...provided.droppableProps}
className="task-list"
style={{ background: snapshot.isDraggingOver ? '#e6f7ff' : 'transparent' }}
>
{tasks.map((t, i) => (
<Task key={t.id} task={t} index={i} />
))}
{provided.placeholder}
</div>
)}
</Droppable>
</div>
)
}


export default React.memo(ColumnInner)