import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function LLMNode({ data }) {
  const inputs = [{ id: 'system' }, { id: 'prompt' }]
  const outputs = [{ id: 'completion' }]
  return (
    <BaseNode title="LLM" inputs={inputs} outputs={outputs} accent="#8b5cf6">
      <textarea
        className="ui-input"
        value={data.prompt ?? ''}
        onChange={(e) => data.onChange?.({ prompt: e.target.value })}
        placeholder="Enter prompt..."
        style={{ height: 60, resize: 'none' }}
      />
    </BaseNode>
  )
}