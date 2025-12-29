import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function InputNode({ data }) {
  const outputs = [{ id: 'value' }]
  return (
    <BaseNode title="Input" outputs={outputs} accent="#22c55e">
      <input
        value={data.value ?? ''}
        onChange={(e) => data.onChange?.(e.target.value)}
        placeholder="Value"
        style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: 6, fontSize: 13 }}
      />
    </BaseNode>
  )
}