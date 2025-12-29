import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'reactflow/dist/style.css'

createRoot(document.getElementById('app')).render(<App />)