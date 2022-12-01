import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import Heading from '../../components/heading/heading';
import { ProductDetailsWrapper } from '../ecommerce/Style';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { productQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { data } from 'browserslist';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { errorImageSrc, renderImage } from '../../utility/images';

const prodDeatails = () => {
  const { search } = useLocation();
  const params = queryString.parse(search);
  const [productId, setProductId] = useState(params.id);
  const [product, setProduct] = useState({ data: {}, isLoading: true });

  useEffect(() => {
    setProduct({ data: {}, isLoading: true });
    apolloClient
      .query({
        query: productQuery.GET_SINGLE_PRODUCT,
        variables: { query: { prod_id: parseInt(productId) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleProduct;
        if (!data.status) return toast.error('Try reload..!');
        setProduct({ data: data.data, isLoading: false });
      });
  }, [productId]);

  if (product.isLoading) {
    return (
      <div className="spin">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Starter"
        // buttons={[
        //     <div key="1" className="page-header-actions">
        //         <CalendarButtonPageHeader />
        //         <ExportButtonPageHeader />
        //         <ShareButtonPageHeader />
        //         <Button size="small" type="primary">
        //             <FeatherIcon icon="plus" size={14} />
        //             Add New
        //         </Button>
        //     </div>,
        // ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <ProductDetailsWrapper>
                <Row gutter={30}>
                  <Col xs={24} lg={10}>
                    <div className="product-details-box__left pdbl">
                      <figure>
                        <LazyLoadImage
                          effect="blur"
                          width="100%"
                          src={renderImage(product.data.prod_id, product.data.prod_thumbnail, 'product/image/thumbnail', '400x400')}
                          onError={errorImageSrc}
                          alt={product.data.prod_name}
                        />
                      </figure>
                    </div>
                  </Col>
                  <Col xs={24} lg={14}>
                    <div className="product-details-box__right pdbr">
                      <Heading className="pdbr__title" as="h2">
                        {product.data.prod_name}
                      </Heading>
                      {/* <Rate allowHalf defaultValue={rate} disabled />
                                        <span className="pdbr__rating">{rate}</span>
                                        <span className="pdbr__review-count"> 778 Reviews</span> */}
                      <p>
                        <span className="pdbr__brand-text">Brand :</span>
                        <span className="pdbr__brand-name">{product.data?.brand?.brand_name}</span>
                      </p>
                      <Heading className="pdbr__new-price" as="h3">
                        <span className="pdbr__currency">$</span>
                        <span className="pdbr__price">
                          {product.data.prod_sale_price || product.data.prod_regular_price}
                        </span>
                      </Heading>
                      {/* {oldPrice && ( */}
                      {120 && (
                        <Heading className="pdbr__old-price" as="h6">
                          <del>${product.data.prod_regular_price}</del>
                          {/* <span className="pdbr__offer-price">30% Off</span> */}
                        </Heading>
                      )}
                      <p className="pdbr__desc">{product?.data?.prod_short_desc}</p>
                      <div className="pdbr__current-status">
                        <p>
                          <span className="current-status-title">Available:</span>
                          <span className="stock-status in-stock">{product?.data?.prod_outofstock_status}</span>
                        </p>
                        <p>
                          <span className="current-status-title"> Condition: </span>
                          <span className="shipping-cost"></span>
                        </p>
                      </div>

                      <ul className="pdbr__list">
                        <li>
                          <span>Category:</span>
                          <span>{product?.data?.category?.cat_name}</span>
                        </li>
                      </ul>
                      <ul className="pdbr__list">
                        <li>
                          <span>Tags:</span>
                          <span>{product?.data?.prod_tags}</span>
                        </li>
                      </ul>
                      {product?.data?.part_of_products?.length ? (
                        <>
                          <span>Parts of Product:</span>
                          <ol>
                            {product?.data?.part_of_products.map(prod => (
                              <li key={prod.prod_id} onClick={() => setProductId(prod?.part_product?.prod_id)}>
                                <a>{prod?.part_product?.prod_name}</a>
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </Col>
                </Row>
                <h3>Long Description: </h3>
                <p>{product.data.prod_long_desc}</p>
              </ProductDetailsWrapper>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default prodDeatails;
