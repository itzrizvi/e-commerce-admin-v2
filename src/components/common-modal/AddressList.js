import { Badge, Button, Card, Col, Modal, Row } from 'antd';
import React from 'react';
import { strCamelCase } from '../../utility/stringModify';
import { ellipsis } from '../../utility/utility';

export default function AddressList({
  addresses,
  type,
  addressListModalOpen,
  setAddressListModalOpen,
  handler,
  selectHandler,
}) {
  return (
    <Modal
      title={`${strCamelCase(type)} Addresses`}
      style={{ top: 20 }}
      width={600}
      open={addressListModalOpen}
      className="globalAddressModal"
      footer={null}
      onCancel={() => setAddressListModalOpen(false)}
    >
      <Row gutter={25}>
        <Col span={24}>
          <Button
            size="small"
            style={{ float: 'right', zIndex: 1000, marginTop: -15, marginBottom: 10 }}
            title={`Add ${type} address`}
            htmlType="button"
            type="primary"
            onClick={() => handler(null, type)}
          >
            Add new address
          </Button>
        </Col>
        {addresses?.map(item => (
          <Col key={item.id} xs={24}>
            <Button
              size="small"
              style={{ position: 'absolute', right: 14, zIndex: 1000 }}
              title={`Edit ${strCamelCase(type)} Address`}
              htmlType="button"
              type="info"
              onClick={() => handler(item.id, type)}
            >
              Edit
            </Button>
            <Button
              size="small"
              style={{ position: 'absolute', right: 14, zIndex: 1000, top: 45 }}
              title="Edit Billing Address"
              htmlType="button"
              type="info"
              onClick={() => selectHandler(type, item.id)}
            >
              Select
            </Button>

            <Card style={{ marginBottom: 10 }} className="global-address-list-card">
              <p>{item.address1 && ellipsis(item.address1, 35)}</p>
              {item.address2 && <p>{item.address2 && ellipsis(item.address2, 35)}</p>}
              <p>
                {item.city}, {item.state} - {item.zip_code}
              </p>
              <p>{item?.countryCode?.name}</p>
              {addresses.filter(item => item.isDefault)[0]?.id === item.id && (
                <Badge count="Default billing address" color="#ddd" style={{ color: '#000' }} />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
}
