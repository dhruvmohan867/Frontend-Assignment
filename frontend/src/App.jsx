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
  const initialNodes = useMemo(() => ([
    { id: 't1', type: 'textNode', position: { x: 150, y: 120 }, data: { value: 'Hello {{input}}' } },
    { id: 't2', type: 'textNode', position: { x: 500, y: 200 }, data: { value: 'World {{x}}' } }
  ]), [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

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