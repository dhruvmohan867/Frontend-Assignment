import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function DelayNode({ data }) {
  const inputs = [{ id: 'in' }]
  const outputs = [{ id: 'out' }]
  return (
    <BaseNode title="Delay" inputs={inputs} outputs={outputs} accent="#f59e0b">
      <input
        className="ui-input"
        type="number"
        min={0}
        value={data.ms ?? 500}
        onChange={(e) => data.onChange?.(Number(e.target.value))}
      />
      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Delay (ms)</div>
    </BaseNode>
  )
}