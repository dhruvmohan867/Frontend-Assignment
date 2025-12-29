import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function DelayNode({ data }) {
  const inputs = [{ id: 'in' }]
  const outputs = [{ id: 'out' }]
  return (
    <BaseNode title="Delay" inputs={inputs} outputs={outputs} accent="#f59e0b">
      <input
        type="number"
        min={0}
        value={data.ms ?? 500}
        onChange={(e) => data.onChange?.(Number(e.target.value))}
        style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: 6, fontSize: 13 }}
      />
      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Delay (ms)</div>
    </BaseNode>
  )
}