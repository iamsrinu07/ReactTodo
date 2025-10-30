import React from 'react'
import BoardProvider from './context/BoardContext'
import Header from './components/Header'
import MainBoard from './components/MainBoard'


export default function App() {
return (
<BoardProvider>
<div className="min-h-screen bg-gray-100">
<Header />
<MainBoard />
</div>
</BoardProvider>
)
}