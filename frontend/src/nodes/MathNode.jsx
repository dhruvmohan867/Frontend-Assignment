import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function MathNode({ data }) {
  const inputs = [{ id: 'a' }, { id: 'b' }]
  const outputs = [{ id: 'result' }]
  return (
    <BaseNode title="Math" inputs={inputs} outputs={outputs} accent="#06b6d4">
      <select
        value={data.op ?? 'add'}
        onChange={(e) => data.onChange?.(e.target.value)}
        style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: 6, fontSize: 13 }}
      >
        <option value="add">Add (a+b)</option>
        <option value="sub">Subtract (a-b)</option>
        <option value="mul">Multiply (a*b)</option>
        <option value="div">Divide (a/b)</option>
      </select>
    </BaseNode>
  )
}