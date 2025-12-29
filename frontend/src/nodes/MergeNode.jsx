import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function MergeNode() {
  const inputs = [{ id: 'i1' }, { id: 'i2' }, { id: 'i3' }]
  const outputs = [{ id: 'out' }]
  return (
    <BaseNode title="Merge" inputs={inputs} outputs={outputs} accent="#16a34a">
      <div style={{ color: '#475569' }}>Concatenate inputs</div>
    </BaseNode>
  )
}