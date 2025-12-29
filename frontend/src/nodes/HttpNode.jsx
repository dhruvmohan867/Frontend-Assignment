import React from 'react'
import BaseNode from './BaseNode.jsx'

export default function HttpNode({ data }) {
  const outputs = [{ id: 'response' }]
  return (
    <BaseNode title="HTTP" outputs={outputs} accent="#0ea5e9">
      <div style={{ display: 'flex', gap: 6 }}>
        <select
          className="ui-input"
          value={data.method ?? 'GET'}
          onChange={(e) => data.onChange?.({ ...data, method: e.target.value })}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          className="ui-input"
          placeholder="https://api.example.com"
          value={data.url ?? ''}
          onChange={(e) => data.onChange?.({ ...data, url: e.target.value })}
          style={{ flex: 1 }}
        />
      </div>
    </BaseNode>
  )
}