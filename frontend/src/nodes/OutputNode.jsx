import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function OutputNode({ data }) {
  const inputs = [{ id: 'in' }]
  return (
    <BaseNode title="Output" inputs={inputs} accent="#f97316">
      <div style={{ color: '#475569' }}>{String(data.value ?? 'Result shows here')}</div>
    </BaseNode>
  )
}