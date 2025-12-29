import React from 'react'
import { Handle, Position } from 'reactflow'

export default function BaseNode({
  title,
  inputs = [],     
  outputs = [],    
  width = 240,
  height = 140,
  accent = '#4f46e5',
  children,
}) {
  return (
    <div style={{
      width, height, background: '#fff', borderRadius: 10,
      border: '1px solid #e5e7eb', boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
      overflow: 'hidden', position: 'relative'
    }}>
      <div style={{
        height: 36, background: accent, color: 'white',
        display: 'flex', alignItems: 'center', padding: '0 10px',
        fontWeight: 600, fontSize: 13
      }}>
        {title}
      </div>

      <div style={{ padding: 10, fontSize: 13 }}>{children}</div>

      {inputs.map((h, i) => (
        <Handle key={h.id} type="target" id={h.id} position={Position.Left}
          style={{ top: h.top ?? 48 + i * 22 }} />
      ))}
      {outputs.map((h, i) => (
        <Handle key={h.id} type="source" id={h.id} position={Position.Right}
          style={{ top: h.top ?? 48 + i * 22 }} />
      ))}
    </div>
  )
}