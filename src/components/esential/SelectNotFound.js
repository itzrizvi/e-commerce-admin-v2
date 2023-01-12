import { Alert } from 'antd'
import React from 'react'

export default function SelectNotFound({value}) {
  return (
    <div>
        <Alert type="error" message={value} banner style={{textAlign: 'center'}} showIcon={false} />
    </div>
  )
}
