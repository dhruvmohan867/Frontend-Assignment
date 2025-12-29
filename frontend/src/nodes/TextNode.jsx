import React from 'react'
import BaseNode from './BaseNode.jsx'

function extractVars(text) {
  const re = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g
  const set = new Set()
  let m; while ((m = re.exec(text))) set.add(m[1])
  return Array.from(set)
}

export default function TextNode({ data }) {
  const value = data.value ?? ''
  const vars = extractVars(value)
  const lines = value.split('\n')
  const longest = Math.max(...lines.map(l => l.length), 20)
  const width = Math.min(520, 200 + longest * 7)
  const height = Math.min(420, 110 + lines.length * 24)

  const inputs = vars.map((v, i) => ({ id: `var-${v}`, top: 48 + i * 22 }))
  const outputs = [{ id: 'out', top: 48 }]

  return (
    <BaseNode title="Text" inputs={inputs} outputs={outputs} width={width} height={height} accent="#0ea5e9">
      <textarea
        className="ui-input"
        value={value}
        onChange={(e) => data.onChange?.(e.target.value)}
        placeholder="Type... use {{variable}} to add inputs"
        style={{ height: height - 70, resize: 'none' }}
      />
    </BaseNode>
  )
}