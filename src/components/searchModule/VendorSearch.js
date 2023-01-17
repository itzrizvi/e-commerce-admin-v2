import { Modal } from 'antd'
import React from 'react'

export default function VendorSearch({vendorSearchModalOpen, setVendorSearchModalOpen}) {
  return (
    <div>
      <Modal
        title="Vendor Search"
        style={{ top: 20 }}
        width={1200}
        open={vendorSearchModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => {
          setVendorSearchModalOpen(false)
        }}
      >
        content
      </Modal>
    </div>
  )
}
