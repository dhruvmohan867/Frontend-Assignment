import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function ToggleNode({ data }) {
  const outputs = [{ id: 'value' }]
  return (
    <BaseNode title="Toggle" outputs={outputs} accent="#ef4444">
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="checkbox" checked={!!data.on} onChange={(e) => data.onChange?.(e.target.checked)} />
        <span>{data.on ? 'On' : 'Off'}</span>
      </label>
    </BaseNode>
  )
}