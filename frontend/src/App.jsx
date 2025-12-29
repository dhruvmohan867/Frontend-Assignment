import React, { useCallback, useMemo, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import submit from './submit.js'

import TextNode from './nodes/TextNode.jsx'
import InputNode from './nodes/InputNode.jsx'
import OutputNode from './nodes/OutputNode.jsx'
import LLMNode from './nodes/LLMNode.jsx'
import MathNode from './nodes/MathNode.jsx'
import DelayNode from './nodes/DelayNode.jsx'
import MergeNode from './nodes/MergeNode.jsx'
import ToggleNode from './nodes/ToggleNode.jsx'
import HttpNode from './nodes/HttpNode.jsx'

export default function App() {
  // Start with 2 nodes, 0 edges
  const initialNodes = useMemo(() => ([
    { id: 'in1',  type: 'inputNode', position: { x: 100, y: 140 }, data: { value: 'John' } },
    { id: 'txt1', type: 'textNode',  position: { x: 360, y: 140 }, data: { value: 'Hello {{name}}' } },
  ]), [])
  const initialEdges = useMemo(() => ([]), [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [submitting, setSubmitting] = useState(false)

  // Generic data.onChange for ALL nodes (merges object or sets value)
  React.useEffect(() => {
    setNodes(nds =>
      nds.map(n => ({
        ...n,
        data: {
          ...n.data,
          onChange: (v) =>
            setNodes(all =>
              all.map(x =>
                x.id === n.id
                  ? { ...x, data: typeof v === 'object' ? { ...x.data, ...v } : { ...x.data, value: v } }
                  : x
              )
            ),
        },
      }))
    )
  }, [setNodes])

  const nodeTypes = useMemo(() => ({
    textNode: TextNode,
    inputNode: InputNode,
    outputNode: OutputNode,
    llmNode: LLMNode,
    mathNode: MathNode,
    delayNode: DelayNode,
    mergeNode: MergeNode,
    toggleNode: ToggleNode,
    httpNode: HttpNode,
  }), [])

  const onConnect = useCallback((params) => setEdges(eds => addEdge(params, eds)), [setEdges])

  // Helpers to add nodes on the page
  const seq = useRef(2)
  const nextId = (prefix) => `${prefix}${++seq.current}`
  const nextPos = () => {
    const i = nodes.length
    return { x: 120 + (i % 5) * 220, y: 80 + Math.floor(i / 5) * 160 }
  }
  const addNode = (type, data = {}) => {
    const id = nextId(type[0] ?? 'n')
    setNodes(nds => nds.concat({ id, type, position: nextPos(), data }))
    return id
  }
  const connectLastTwo = () => {
    if (nodes.length < 2) return
    const a = nodes[nodes.length - 2]
    const b = nodes[nodes.length - 1]
    setEdges(eds => addEdge({ id: `e-${Date.now()}`, source: a.id, target: b.id }, eds))
  }
  const resetTwo = () => {
    setEdges([])
    setNodes([
      { id: 'in1',  type: 'inputNode', position: { x: 100, y: 140 }, data: { value: 'John' } },
      { id: 'txt1', type: 'textNode',  position: { x: 360, y: 140 }, data: { value: 'Hello {{name}}' } },
    ])
    seq.current = 2
  }

  const onSubmit = async () => {
    try {
      setSubmitting(true)
      const res = await submit(nodes, edges)
      alert(`Nodes: ${res.num_nodes}\nEdges: ${res.num_edges}\nIs DAG: ${res.is_dag ? 'Yes' : 'No'}`)
    } catch (e) {
      alert(`Submit failed: ${e.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', gap: 8 }}>
        <button className="btn" onClick={() => addNode('inputNode', { value: '' })}>Add Input</button>
        <button className="btn" onClick={() => addNode('textNode', { value: 'New {{var}}' })}>Add Text</button>
        <button className="btn" onClick={() => addNode('outputNode', {})}>Add Output</button>
        <button className="btn" onClick={connectLastTwo}>Connect last two</button>
        <button className="btn" onClick={resetTwo}>Reset (2 nodes)</button>
        <button className="btn" onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}   // drag from a right handle to a left handle to add edges
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}