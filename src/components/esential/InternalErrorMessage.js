import { Modal } from 'antd'
import configMessage from '../../config/config_message'

export default function InternalErrorMessage() {
  return (
    Modal.error({
        title: 'Internal Error',
        content: configMessage.INTERNAL_ERROR_MESSAGE,
      })
  )
}
