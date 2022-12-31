import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Checkbox, DatePicker, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { viewPermission } from '../../utility/utility';
import apolloClient, { productQuery, utilityQuery, productMutation } from '../../utility/apollo';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import config from '../../config/config';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { gql } from '@apollo/client';
import { toast } from 'react-toastify';
const { RangePicker } = DatePicker;

const Products = () => {
  viewPermission('product');
  const [products, setProducts] = useState({ data: [], isLoading: true });
  const [backupProducts, setBackupProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchButton, setSearchButton] = useState(false);
  const [isFilter, setIsFilter] = useState(true);
  const [categories, setCategories] = useState({ data: [], isLoading: true });
  const [attributes, setAttributes] = useState({ data: [], isLoading: true });
  const [availability, setAvailability] = useState({ data: [], isLoading: true });
  const [conditions, setConditions] = useState({ data: [], isLoading: true });
  const [filterDate, setFilterDate] = useState({
    availability: [],
    categories: [],
    condition: [],
    attributes: [],
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
  });

  // Load Product List
  useEffect(() => {
    // return
    apolloClient
      .query({
        query: productQuery.GET_PRODUCT_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
        fetchPolicy: 'cache-first',
      })
      .then(res => {
        const data = res?.data?.getProductList;

        if (!data?.status) return;
        setBackupProducts(data?.data);
      })
      .catch(err => {
        setProducts(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setProducts(s => ({ ...s, isLoading: false }));
      });

    // Load filter data
    // 1.load category
    apolloClient
      .query({
        query: productQuery.GET_ALL_CATEGORIES,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllCategories;
        if (!data.status) return;
        // setCategories(data.categories)

        if (!data.categories.length) return;
        let arrData = [];

        data.categories.forEach(item => {
          const parent = item.cat_name;

          arrData.push({ cat_name: parent, id: item.id });
          if (item.subcategories) {
            item.subcategories.forEach(subCat => {
              const sub = subCat.cat_name;
              arrData.push({ cat_name: `${parent} > ${sub}`, id: subCat.id });
              if (subCat.subsubcategories) {
                subCat.subsubcategories.forEach(subSubCat => {
                  const subSub = subSubCat.cat_name;
                  arrData.push({ cat_name: `${parent} > ${sub} > ${subSub}`, id: subSubCat.id });
                });
              }
            });
          }
        });
        setCategories({ data: arrData, isLoading: false });
      })
      .catch(err => {});

    // 2.load Arrributes
    apolloClient
      .query({
        query: gql`
          query getAllAttributes {
            getAllAttributes {
              message
              status
              tenant_id
              data {
                id
                attribute_name
              }
            }
          }
        `,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllAttributes;
        if (!data.status) return;
        setAttributes({ data: data.data, isLoading: false });
      });

    // 3.load Availability
    apolloClient
      .query({
        query: utilityQuery.GET_ALL_AVAILABILITY,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllProductAvailabilityStatus;
        if (!data.status) return;
        setAvailability({ data: data.data, isLoading: false });
      });

    // 4.load Conditions
    apolloClient
      .query({
        query: utilityQuery.GET_ALL_CONDITIONS,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllProductCondition;
        if (!data.status) return;
        setConditions({ data: data.data, isLoading: false });
      });
    // Loader Of after 2 sec
    setTimeout(() => {
      setProducts(s => ({ ...s, isLoading: false }));
    }, 5000);
  }, []);

  const handleStatusChange = (record, checked) => {
    apolloClient
      .mutate({
        mutation: productMutation.UPDATE_PRODUCT,
        variables: { data: { prod_id: record.id, prod_status: checked } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateProduct;
        if (!data.status) return toast.error(data.message);
        toast.success(`${record.prod_sku} status updated.`);
      })
      .catch(err => {
        return toast.error('Something Went wrong !!');
      });
  };
  const handleIsSaleStatusChange = (record, checked) => {
    apolloClient
      .mutate({
        mutation: productMutation.UPDATE_PRODUCT,
        variables: { data: { prod_id: record.id, is_sale: checked } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateProduct;
        if (!data.status) return toast.error(data.message);
        toast.success(`${record.prod_sku} status updated.`);
      })
      .catch(err => {
        return toast.error('Something Went wrong !!');
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      // width: "70%",
      ellipsis: true,
      sorter: (a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Logo',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: (text, record) => (
        <LazyLoadImage
          effect="blur"
          width="40"
          src={renderImage(record.id, record.prod_thumbnail, 'product/image/thumbnail', '128x128')}
          onError={errorImageSrc}
          alt={record.id}
        />
      ),
    },

    {
      title: 'Product Name',
      dataIndex: 'prod_name',
      key: 'prod_name',
      ellipsis: true,
      sorter: (a, b) => (a.prod_name.toUpperCase() > b.prod_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Product SKU',
      dataIndex: 'prod_sku',
      key: 'prod_sku',
      ellipsis: true,
      sorter: (a, b) => (a.prod_sku.toUpperCase() > b.prod_sku.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Part NO',
      dataIndex: 'prod_partnum',
      key: 'prod_partnum',
      ellipsis: true,
      sorter: (a, b) => (a.prod_partnum.toUpperCase() > b.prod_partnum.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Regular Price',
      dataIndex: 'prod_regular_price',
      key: 'prod_regular_price',
      ellipsis: true,
      align: 'center',
      sorter: (a, b) => (a.prod_regular_price > b.prod_regular_price ? 1 : -1),
    },
    {
      title: 'Sales Price',
      dataIndex: 'prod_sale_price',
      key: 'prod_sale_price',
      ellipsis: true,
      align: 'center',
      sorter: (a, b) => (a.prod_sale_price > b.prod_sale_price ? 1 : -1),
    },

    {
      title: 'Status',
      dataIndex: 'prod_status',
      key: 'prod_status',
      width: 80,
      align: 'middle',
      sorter: (a, b) => (a.prod_status === b.prod_status ? 0 : a.prod_status ? -1 : 1),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.prod_status === value,
      render: (value, record) => (
        <Switch defaultChecked={value} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
    },
    {
      title: 'On Sale',
      dataIndex: 'is_sale',
      key: 'is_sale',
      align: 'center',
      width: 90,
      sorter: (a, b) => (a.is_sale === b.is_sale ? 0 : a.is_sale ? -1 : 1),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.is_sale === value,
      render: (value, record) => (
        <Switch
          defaultChecked={value}
          title="Is Sale"
          onChange={checked => handleIsSaleStatusChange(record, checked)}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 140,
      align: 'center',
      render: (text, record) => (
        <>
          <Link to={`/admin/products/view?id=${record.id}`}>
            <FontAwesome name="eye" style={{ margin: '.5em 1em', color: 'rgb(46, 204, 113)' }} />
          </Link>
          <Link to={`/admin/products/edit?id=${record.id}`}>
            {/* <Button size="default" type="white" title='Edit'> */}
            <FontAwesome name="edit" style={{ margin: '.5em 1em', color: '#5F63F2' }} />
            {/* </Button> */}
          </Link>
        </>
      ),
      key: 'last_name',
    },
  ];

  // All filter
  useEffect(() => {
    if (products.isLoading) return;
    let filteredData = backupProducts;
    if (searchText) {
      filteredData = filteredData.filter(prod =>
        (prod?.prod_name + prod?.prod_sku).toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    if (filterDate.startDate) {
      const startDate = new Date(filterDate.startDate).valueOf();
      const endDate = new Date(filterDate.endDate).valueOf();
      filteredData = filteredData.filter(prod => {
        const creeatedAt = parseInt(prod.createdAt);
        const c1 = creeatedAt >= startDate;
        const c2 = creeatedAt <= endDate;
        return c1 && c2;
      });
    }

    if (filterDate.attributes.length) {
      filteredData = filteredData.filter(prod => {
        return filterDate.attributes.find(element => {
          const attrArray = prod.prod_attributes.map(attr => attr.attribute_data.id);
          return attrArray.includes(element);
        });
      });
    }

    if (filterDate.categories.length) {
      filteredData = filteredData.filter(prod => filterDate.categories.includes(prod.category.id));
    }
    if (filterDate.availability.length) {
      filteredData = filteredData.filter(prod => filterDate.availability.includes(prod.prod_outofstock_status));
    }
    if (filterDate.condition.length) {
      filteredData = filteredData.filter(prod => filterDate.condition.includes(prod.prod_condition));
    }
    if (filterDate.minPrice) {
      filteredData = filteredData.filter(prod => prod.prod_regular_price >= parseFloat(filterDate.minPrice));
    }
    if (filterDate.maxPrice) {
      filteredData = filteredData.filter(prod => prod.prod_regular_price <= parseFloat(filterDate.maxPrice));
    }

    setFilteredProducts(filteredData);
  }, [searchButton]);

  return (
    <>
      <PageHeader
        title="Products"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="white" onClick={() => setIsFilter(state => !state)}>
              <FeatherIcon icon="filter" />
              Filter
            </Button>
            <Link to="/admin/products/add">
              <Button size="small" title="Add Product" type="primary">
                <FeatherIcon icon="file-plus" />
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {products.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Row gutter={25}>
                    <Col span={18}>
                      <Input
                        placeholder="Search Products..."
                        prefix={<SearchOutlined />}
                        onChange={e => {
                          const value = e.target.value;
                          setSearchText(value);
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Button size="large" type="primary" onClick={() => setSearchButton(!searchButton)}>
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <br />

                  {isFilter && (
                    <div style={{ marginBottom: '2.5em' }}>
                      <Row gutter={16}>
                        <Col span={8}>
                          Availability: <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder="Select status"
                            size="middle"
                            mode="multiple"
                            onChange={val => {
                              setFilterDate(s => ({ ...s, availability: val }));
                            }}
                            options={availability.data.map(item => ({
                              label: item.name,
                              value: item.name,
                            }))}
                          />
                        </Col>
                        <Col span={8}>
                          Category: <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder={categories.isLoading ? 'Loading..' : 'Select category'}
                            size="middle"
                            mode="multiple"
                            optionFilterProp="label"
                            onChange={val => {
                              setFilterDate(s => ({ ...s, categories: val }));
                            }}
                            options={categories.data.map(item => ({
                              label: item.cat_name,
                              value: item.id,
                            }))}
                          />
                        </Col>

                        <Col span={8}>
                          Date: <br />
                          <RangePicker
                            style={{ height: '40px', width: '100%' }}
                            size="small"
                            onChange={val => {
                              setFilterDate(s => {
                                return {
                                  ...s,
                                  startDate: val ? val[0]?._d : null,
                                  endDate: val ? val[1]?._d : null,
                                };
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row gutter={16} style={{ marginTop: '.5em' }}>
                        <Col span={8}>
                          Condition: <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder="Select Condition"
                            size="middle"
                            mode="multiple"
                            onChange={value => setFilterDate(s => ({ ...s, condition: value }))}
                            options={conditions.data.map(item => ({
                              label: item.name,
                              value: item.name,
                            }))}
                          />
                        </Col>
                        <Col span={8}>
                          Attributes: <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder={attributes.isLoading ? 'Loading..' : 'Select Attribute'}
                            size="middle"
                            mode="multiple"
                            onChange={value => setFilterDate(s => ({ ...s, attributes: value }))}
                            options={attributes.data.map(item => ({
                              label: item.attribute_name,
                              value: item.id,
                            }))}
                          />
                        </Col>

                        <Col span={8}>
                          Price: <br />
                          <Input.Group compact size="default">
                            <Input
                              type="number"
                              placeholder="Min"
                              style={{ width: '50%' }}
                              onBlur={e => {
                                setFilterDate(s => ({ ...s, minPrice: e?.target?.value }));
                              }}
                            />
                            <Input
                              type="number"
                              placeholder="Max"
                              style={{ width: '50%' }}
                              onBlur={e => {
                                setFilterDate(s => ({ ...s, maxPrice: e?.target?.value }));
                              }}
                            />
                          </Input.Group>
                        </Col>
                      </Row>
                    </div>
                  )}

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'id'}
                      size="small"
                      // dataSource={searchText ? filteredProducts : products.data}
                      dataSource={filteredProducts}
                      rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      pagination={{
                        defaultPageSize: config.PRODUCTS_PER_PAGE,
                        // total: searchText ? filteredProducts.length : products.data.length,
                        total: filteredProducts.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                    />
                  </span>
                </>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Products;
