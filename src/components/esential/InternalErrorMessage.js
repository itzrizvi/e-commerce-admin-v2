import { Modal } from 'antd'

export default function InternalErrorMessage() {
  return (
    Modal.error({
        title: 'Internal Error',
        content: configMessage.INTERNAL_ERROR_MESSAGE,
      })
  )
}
