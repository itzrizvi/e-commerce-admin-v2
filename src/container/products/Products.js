import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, DatePicker, Select, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { RetweetOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { viewPermission } from '../../utility/utility';
import apolloClient, { productQuery, utilityQuery, productMutation, authQuery } from '../../utility/apollo';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import config from '../../config/config';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { gql } from '@apollo/client';
import moment from 'moment';
import Moment from 'react-moment';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
const { RangePicker } = DatePicker;

let checkPoint = false;
const permissions_json = Cookies.get('permissions') ?? '[]';
const permissions = JSON.parse(permissions_json);
let permissionCheckForAllCondition = false;
// Check Permission
permissions.forEach(permission => {
  if (permission.permission_name === 'product-all') {
    if (permission.read_access === true && permission.edit_access === true) {
      permissionCheckForAllCondition = true;
    }
  }
});

const Products = () => {
  viewPermission('product');
  const [products, setProducts] = useState({ data: [], isLoading: false });
  const [searchButton, setSearchButton] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [categories, setCategories] = useState({ data: [], isLoading: true });
  const [attributes, setAttributes] = useState({ data: [], isLoading: true });
  const [availability, setAvailability] = useState({ data: [], isLoading: true });
  const [conditions, setConditions] = useState({ data: [], isLoading: true });
  const [dateRange, setChangeDateRange] = useState(null);
  const [updatedDateRange, setChangeUpdatedDateRange] = useState(null);
  const [searchDisable, setSearchDisable] = useState(true);
  const [representative, setRepresentative] = useState({ data: [], loading: true, error: '' });
  const [viewallfilter, setViewAllFilter] = useState(false);
  const [filterDate, setFilterDate] = useState({
    availability: [],
    categories: [],
    condition: [],
    attributes: [],
    productrep: [],
    startDate: '',
    endDate: '',
    updatedStartDate: '',
    updatedEndDate: '',
    minPrice: '',
    maxPrice: '',
    searchQuery: '',
  });

  // Load Product List
  useEffect(() => {
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
        if (!data?.status) return InternalErrorMessage();
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
        if (!data?.status) return InternalErrorMessage();
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
        if (!data?.status) return InternalErrorMessage();
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
        if (!data?.status) return InternalErrorMessage();
        setConditions({ data: data.data, isLoading: false });
      });
  }, []);

  const searchProductAdmin = () => {
    setProducts(s => ({ ...s, isLoading: true }));
    // return
    apolloClient
      .query({
        query: productQuery.GET_PRODUCT_LIST,
        variables: {
          query: {
            searchQuery: filterDate.searchQuery ?? '',
            availability: filterDate.availability.length ? filterDate.availability : null,
            attribute: filterDate.attributes.length ? filterDate.attributes : null,
            category: filterDate.categories.length ? filterDate.categories : null,
            condition: filterDate.condition.length ? filterDate.condition : null,
            productRep: filterDate.productrep.length ? filterDate.productrep : null,
            productEntryStartDate: filterDate.startDate ?? '',
            productEntryEndDate: filterDate.endDate ?? '',
            updatedStartDate: filterDate.updatedStartDate ?? '',
            updatedEndDate: filterDate.updatedEndDate ?? '',
            minPrice: parseFloat(filterDate.minPrice) ?? null,
            maxPrice: parseFloat(filterDate.maxPrice) ?? null,
          },
        },
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

        if (!data?.status) return InternalErrorMessage();
        setProducts(data);
      })
      .finally(() => {
        setProducts(s => ({ ...s, isLoading: false }));
        setSearchButton(!searchButton);
      });
  };

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
        if (!data?.status) return InternalErrorMessage();
        message.success(`${record.prod_sku} status updated.`);
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
        if (!data?.status) return InternalErrorMessage();
        message.success(`${record.prod_sku} status updated.`);
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
      width: 150,
      key: 'prod_sku',
      ellipsis: true,
      sorter: (a, b) => (a.prod_sku.toUpperCase() > b.prod_sku.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Part NO',
      dataIndex: 'prod_partnum',
      width: 150,
      key: 'prod_partnum',
      ellipsis: true,
      sorter: (a, b) => (a.prod_partnum.toUpperCase() > b.prod_partnum.toUpperCase() ? 1 : -1),
    },
    // {
    //   title: 'Regular Price',
    //   dataIndex: 'prod_regular_price',
    //   key: 'prod_regular_price',
    //   ellipsis: true,
    //   align: 'center',
    //   sorter: (a, b) => (a.prod_regular_price > b.prod_regular_price ? 1 : -1),
    // },
    // {
    //   title: 'Sales Price',
    //   dataIndex: 'prod_sale_price',
    //   key: 'prod_sale_price',
    //   ellipsis: true,
    //   align: 'center',
    //   sorter: (a, b) => (a.prod_sale_price > b.prod_sale_price ? 1 : -1),
    // },
    {
      title: 'Status',
      dataIndex: 'prod_status',
      key: 'prod_status',
      width: 110,
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
      width: 110,
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
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      align: 'center',
      sorter: (a, b) => (a.createdAt === b.createdAt ? 0 : a.createdAt ? -1 : 1),
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Date Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
      align: 'center',
      sorter: (a, b) => (a.updatedAt === b.updatedAt ? 0 : a.updatedAt ? -1 : 1),
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 120,
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

  const onDateRangeChange = dateRange => {
    if (dateRange) {
      setFilterDate(s => ({ ...s, startDate: dateRange[0]._d ?? '', endDate: dateRange[1]._d ?? '' }));
      setChangeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
    } else {
      setChangeDateRange(null);
    }
  };

  const onDateUpdatedRangeChange = updatedDateRange => {
    if (updatedDateRange) {
      setFilterDate(s => ({
        ...s,
        updatedStartDate: updatedDateRange[0]._d ?? '',
        updatedEndDate: updatedDateRange[1]._d ?? '',
      }));
      setChangeUpdatedDateRange(returnMomentDateRange(updatedDateRange[0], updatedDateRange[1]));
    } else {
      setChangeUpdatedDateRange(null);
    }
  };

  const returnMomentDateRange = (start, finish) => {
    return [moment(start, 'YYYY-MM-DD'), moment(finish, 'YYYY-MM-DD')];
  };

  useEffect(() => {
    if (checkPoint) {
      if (
        filterDate.availability.length > 0 ||
        filterDate.categories.length > 0 ||
        filterDate.condition.length > 0 ||
        filterDate.attributes.length > 0 ||
        filterDate.searchQuery !== '' ||
        filterDate.endDate !== '' ||
        filterDate.startDate !== '' ||
        filterDate.updatedStartDate !== '' ||
        filterDate.updatedStartDate !== '' ||
        filterDate.minPrice !== '' ||
        filterDate.maxPrice !== '' ||
        filterDate.productrep.length > 0
      ) {
        setSearchDisable(false);
      } else {
        setSearchDisable(true);
      }
    }
    checkPoint = true;

    //////////////////////////////////
    apolloClient
      .query({
        query: authQuery.GET_ALL_STAFF,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllStaff;
        setRepresentative(data);
      })
      .finally(() => {
        setRepresentative(s => ({ ...s, loading: false }));
      });

    if (permissionCheckForAllCondition) {
      setViewAllFilter(true);
    }
    permissionCheckForAllCondition = false;
  }, [filterDate]);

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
            <Button
              size="small"
              type="white"
              onClick={() => {
                setChangeDateRange(null);
                setChangeUpdatedDateRange(null);
                setSearchDisable(true);
                setFilterDate({
                  availability: [],
                  categories: [],
                  condition: [],
                  attributes: [],
                  productrep: [],
                  startDate: '',
                  endDate: '',
                  minPrice: '',
                  maxPrice: '',
                  searchQuery: '',
                  updatedEndDate: '',
                  updatedStartDate: '',
                });
              }}
            >
              <RetweetOutlined />
              Reset Filter
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
                    <Col span={15}>
                      <Input
                        placeholder="Search Products..."
                        prefix={<SearchOutlined />}
                        value={filterDate?.searchQuery}
                        onChange={e => {
                          e.persist();
                          const value = e.target.value;
                          setFilterDate(s => ({ ...s, searchQuery: value }));
                        }}
                      />
                    </Col>
                    <Col span={9}>
                      <Button size="large" disabled={searchDisable} type="primary" onClick={searchProductAdmin}>
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
                            value={filterDate?.availability}
                            onDeselect={val =>
                              setFilterDate(prev => ({
                                ...prev,
                                availability: prev.availability.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterDate(s => ({
                                ...s,
                                availability: filterDate.availability.concat(parseInt(val)),
                              }));
                            }}
                            options={availability.data.map(item => ({
                              label: item.name,
                              value: item.id,
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
                            value={filterDate?.categories}
                            onDeselect={val =>
                              setFilterDate(prev => ({
                                ...prev,
                                categories: prev.categories.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterDate(s => ({ ...s, categories: filterDate.categories.concat(parseInt(val)) }));
                            }}
                            options={categories.data.map(item => ({
                              label: item.cat_name,
                              value: item.id,
                            }))}
                          />
                        </Col>

                        <Col span={8}>
                          Date Added: <br />
                          <RangePicker
                            style={{ height: '40px', width: '100%' }}
                            size="small"
                            allowClear={true}
                            picker="date"
                            value={dateRange !== '' ? dateRange : ''}
                            onChange={onDateRangeChange}
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
                            value={filterDate?.condition}
                            onDeselect={val =>
                              setFilterDate(prev => ({
                                ...prev,
                                condition: prev.condition.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterDate(s => ({ ...s, condition: filterDate.condition.concat(parseInt(val)) }));
                            }}
                            options={conditions.data.map(item => ({
                              label: item.name,
                              value: item.id,
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
                            value={filterDate?.attributes}
                            onDeselect={val =>
                              setFilterDate(prev => ({
                                ...prev,
                                attributes: prev.attributes.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterDate(s => ({ ...s, attributes: filterDate.attributes.concat(parseInt(val)) }));
                            }}
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
                              style={{ width: '50%', height: '40px' }}
                              value={filterDate?.minPrice ?? ''}
                              onChange={e => {
                                e.persist();
                                setFilterDate(s => ({ ...s, minPrice: e?.target?.value }));
                              }}
                            />
                            <Input
                              type="number"
                              placeholder="Max"
                              style={{ width: '50%', height: '40px' }}
                              value={filterDate?.maxPrice ?? ''}
                              onChange={e => {
                                e.persist();
                                setFilterDate(s => ({ ...s, maxPrice: e?.target?.value }));
                              }}
                            />
                          </Input.Group>
                        </Col>
                      </Row>
                      {viewallfilter && (
                        <Row gutter={16} style={{ marginTop: '.5em' }}>
                          <Col span={8}>
                            Product Rep: <br />
                            <Select
                              style={{ width: '100%' }}
                              size="middle"
                              mode="multiple"
                              value={filterDate?.productrep}
                              onDeselect={val =>
                                setFilterDate(prev => ({
                                  ...prev,
                                  productrep: prev.productrep.filter(item => item !== val),
                                }))
                              }
                              placeholder={representative.loading ? 'Loading...' : 'Select a Product Representative'}
                              options={representative?.data?.map(item => ({
                                label: item.first_name + ' ' + item.last_name,
                                value: item.id,
                              }))}
                              onSelect={val => {
                                setFilterDate(s => ({ ...s, productrep: filterDate.productrep.concat(parseInt(val)) }));
                              }}
                            />
                          </Col>
                          <Col span={8}>
                            Date Updated: <br />
                            <RangePicker
                              style={{ height: '40px', width: '100%' }}
                              size="small"
                              allowClear={true}
                              picker="date"
                              value={updatedDateRange !== '' ? updatedDateRange : ''}
                              onChange={onDateUpdatedRangeChange}
                            />
                          </Col>

                          <Col span={8}>
                            Quantity: <br />
                            <Input.Group compact size="default">
                              <Input
                                type="number"
                                placeholder="Min Amount"
                                style={{ width: '50%', height: '40px' }}
                                // value={filterDate?.minPrice ?? ''}
                                // onChange={e => {
                                //   e.persist()
                                //   setFilterDate(s => ({ ...s, minPrice: e?.target?.value }));
                                // }}
                              />
                              <Input
                                type="number"
                                placeholder="Max Amount"
                                style={{ width: '50%', height: '40px' }}
                                // value={filterDate?.maxPrice ?? ''}
                                // onChange={e => {
                                //   e.persist()
                                //   setFilterDate(s => ({ ...s, maxPrice: e?.target?.value }));
                                // }}
                              />
                            </Input.Group>
                          </Col>
                        </Row>
                      )}
                    </div>
                  )}

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={viewallfilter ? columns : columns.filter(col => col.dataIndex !== 'updatedAt')}
                      rowKey={'id'}
                      size="small"
                      dataSource={products.data ? products.data : []}
                      rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      pagination={{
                        defaultPageSize: config.PRODUCTS_PER_PAGE,
                        total: products.data ? products.data.length : 0,
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
