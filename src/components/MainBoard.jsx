import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { useBoard } from '../context/BoardContext'
import Column from './Column'


export default function MainBoard() {
const { board, moveTask } = useBoard()


const onDragEnd = (result) => {
const { source, destination } = result
if (!destination) return
if (source.droppableId === destination.droppableId && source.index === destination.index) return
moveTask(source, destination).catch(() => {})
}


if (!board) return <div className="p-6">Loading board...</div>


return (
<div className="board">
<DragDropContext onDragEnd={onDragEnd}>
{board.columnOrder.map((colId) => (
<Column key={colId} column={board.columns[colId]} />
))}
</DragDropContext>
</div>
)
}