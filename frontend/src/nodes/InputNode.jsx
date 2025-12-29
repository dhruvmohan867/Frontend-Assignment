import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function InputNode({ data }) {
  const outputs = [{ id: 'value' }]
  return (
    <BaseNode title="Input" outputs={outputs} accent="#22c55e">
      <input
        className="ui-input"
        value={data.value ?? ''}
        onChange={(e) => data.onChange?.(e.target.value)}
        placeholder="Value"
      />
    </BaseNode>
  )
}