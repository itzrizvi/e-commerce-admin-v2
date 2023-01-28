import { Typography } from 'antd';
import React from 'react';
import config from '../../config/config';
import summary from './Summary.module.css';

export default function Summary({
  subtotal_amount = null,
  shipping_cost = null,
  tax_amount = null,
  discount_amount = null,
  total_amount,
}) {
  return (
    <div>
      <div className={summary.total}>
        {subtotal_amount && (
          <Typography.Paragraph>
            <Typography.Text strong>Sub Total</Typography.Text>
            {`${config.CURRENCY_SYMBOL} ${subtotal_amount}`}
          </Typography.Paragraph>
        )}

        {shipping_cost && (
          <Typography.Paragraph>
            <Typography.Text strong>Shipping Cost</Typography.Text>
            {`${config.CURRENCY_SYMBOL} ${shipping_cost}`}
          </Typography.Paragraph>
        )}

        {tax_amount && (
          <Typography.Paragraph>
            <Typography.Text strong>Tax</Typography.Text>
            {`${config.CURRENCY_SYMBOL} ${tax_amount}`}
          </Typography.Paragraph>
        )}

        {discount_amount && (
          <Typography.Paragraph>
            <Typography.Text strong>Discount</Typography.Text>
            {`${config.CURRENCY_SYMBOL} ${discount_amount}`}
          </Typography.Paragraph>
        )}

        {total_amount && (
          <Typography.Paragraph>
            <Typography.Text strong>Total</Typography.Text>
            <Typography.Text strong>{`${config.CURRENCY_SYMBOL} ${total_amount}`}</Typography.Text>
          </Typography.Paragraph>
        )}
      </div>
    </div>
  );
}
