import React, { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
} from 'reactflow'
import submit from './submit.js'

function extractVars(text) {
  const re = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g
  const set = new Set()
  let m
  while ((m = re.exec(text))) set.add(m[1])
  return Array.from(set)
}

function TextNode({ data }) {
  const value = data.value || ''
  const vars = extractVars(value)
  const lines = value.split('\n')
  const longest = Math.max(...lines.map(l => l.length), 20)
  const width = Math.min(500, 180 + longest * 7)   // auto-resize width
  const height = Math.min(400, 100 + lines.length * 24) // auto-resize height

  return (
    <div style={{ padding: 8, border: '1px solid #ccc', borderRadius: 8, background: '#fff', width, height }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Text</div>
      {vars.map((v, i) => (
        <Handle key={v} type="target" id={`var-${v}`} position={Position.Left} style={{ top: 20 + i * 22 }} />
      ))}
      <Handle type="source" position={Position.Right} id="out" />
      <textarea
        value={value}
        onChange={(e) => data.onChange(e.target.value)}
        placeholder="Type here... use {{variable}} to add handles"
        style={{ width: '100%', height: height - 40, resize: 'none', outline: 'none', border: '1px solid #ddd', borderRadius: 6, padding: 8 }}
      />
    </div>
  )
}

export default function App() {
  const initialNodes = useMemo(() => ([
    { id: 't1', type: 'textNode', position: { x: 150, y: 120 }, data: { value: 'Hello {{input}}' } },
    { id: 't2', type: 'textNode', position: { x: 500, y: 200 }, data: { value: 'World {{x}}' } }
  ]), [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const nodeTypes = useMemo(() => ({ textNode: TextNode }), [])

  // inject per-node change handler
  React.useEffect(() => {
    setNodes(nds =>
      nds.map(n => n.type === 'textNode'
        ? { ...n, data: { ...n.data, onChange: (v) => setNodes(all => all.map(x => x.id === n.id ? { ...x, data: { ...x.data, value: v } } : x)) } }
        : n
      )
    )
  }, [setNodes])

  const onConnect = useCallback((params) => setEdges(eds => addEdge(params, eds)), [setEdges])

  const onSubmit = async () => {
    try {
      const res = await submit(nodes, edges)
      alert(`Nodes: ${res.num_nodes}\nEdges: ${res.num_edges}\nIs DAG: ${res.is_dag ? 'Yes' : 'No'}`)
    } catch (e) {
      alert(`Submit failed: ${e.message}`)
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', gap: 8 }}>
        <button onClick={onSubmit} style={{ padding: '8px 12px' }}>Submit</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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