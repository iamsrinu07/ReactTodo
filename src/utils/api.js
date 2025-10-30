const simulate = (res) =>
new Promise((resolve, reject) => {
const delay = 600 + Math.random() * 1200
setTimeout(() => {
if (Math.random() < 0.2) reject(new Error('Simulated network failure'))
else resolve(res)
}, delay)
})


const initialBoard = {
columns: {
'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
'col-3': { id: 'col-3', title: 'Done', taskIds: [] },
},
columnOrder: ['col-1', 'col-2', 'col-3'],
tasks: {
'task-1': { id: 'task-1', title: 'Design hero', description: 'Mobile first' },
'task-2': { id: 'task-2', title: 'Setup analytics', description: 'GA4 + events' },
'task-3': { id: 'task-3', title: 'API stubs', description: 'Create endpoints' },
},
}
export const fetchBoard = async () => {
return simulate(JSON.parse(JSON.stringify(initialBoard)))
}


export const applyPatch = async (patch) => {
// In a real backend you'd apply the patch; here we just simulate network
return simulate({ ok: true, patch })
}