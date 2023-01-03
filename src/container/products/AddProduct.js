import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Form, Input, Switch, Select, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import RichTextEditor from 'react-rte';
const { TextArea } = Input;
import style from './products.module.css';
import AttributeTab from './addProducts/AttributeTab';
import DiscountTab from './addProducts/DiscountTab';
import ImageTab from './addProducts/ImageTab';
import apolloClient from '../../apollo';
import { brandQuery } from '../../apollo/brand';
import Cookies from 'js-cookie';
import { apolloUploadClient, authQuery, productMutation, productQuery, utilityQuery } from '../../utility/apollo';
import PartsOfProductTab from './addProducts/PartsOfProductTab';
import { viewPermission } from '../../utility/utility';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import queryString from 'query-string';
const { Option } = Select;

const AddProduct = () => {
  viewPermission('product');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [selectedConditionID, setSelectedConditionID] = useState(null);
  const [selectedProductRepID, setSelectedProductRepID] = useState(null);
  const [selectedProdCategory, setSelectedProdCategory] = useState(null);
  const [selectedavailabilitystatusID, setSelectedAvailabilityStatusID] = useState(null);
  const [extendedWarrantyEnable, setExtendedWarrantyEnable] = useState(false);

  // update prod
  const { search } = useLocation();
  const params = queryString.parse(search);
  const [singleProduct, setSingleProduct] = useState({ data: {}, isLoading: true });

  useEffect(() => {
    // Load single product
    if (!params.id) return;
    apolloClient
      .query({
        query: productQuery.GET_SINGLE_PRODUCT,
        variables: { query: { prod_id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
        fetchPolicy: "network-only"
      })
      .then(res => {
        const data = res?.data?.getSingleProduct;
        if (!data.status) return toast.error('Try reload..!');
        setSingleProduct({ data: data?.data, isLoading: false });
        setLongDescription(RichTextEditor.createValueFromString(data?.data?.prod_long_desc, 'html'));
        setProd_long_desc(data?.data?.prod_long_desc);
        setDiscount(s => {
          const n = data?.data?.discount_type?.map(item => ({
            id: new Date().getTime(),
            customer_group_id: item.id,
            discount_quantity: item.discount_quantity,
            discount_priority: item.discount_priority,
            discount_price: item.discount_price,
            discount_startdate: item.discount_startdate,
            discount_enddate: item.discount_enddate,
          }));
          return n;
        });

        setAttributesTableData(s => {
          // console.log(data?.data?.prod_attributes);
          const n = data?.data?.prod_attributes?.map(item => ({
            id: item.id,
            attr_group_id: item.attribute_data?.attribute_group?.id,
            attribute_id: item?.attribute_data?.id,
            attribute_name: item?.attribute_data?.attribute_name,
            attribute_type: item.attribute_type,
            attribute_value: item.attribute_value,
          }));
          return n;
        });
        setSelectedPartsOfProducts(s => {
          // console.log(data?.data?.part_of_products);
          const n = data?.data?.part_of_products?.map(item => ({
            label: item.part_product.prod_name,
            value: item.part_product.id,
            uid: item.part_product.id,
            key: item.part_product.id,
            name: item.part_product.prod_name,
            sku: item.part_product.prod_sku,
            quantity: item.prod_quantity,
          }));
          // console.log(n)
          return n;
        });
        setFeaturesImage(state => {
          const thumbnail = `https://api.primeserverparts.com/images/product/image/thumbnail/${data?.data?.id}/128x128_${data?.data?.id}.jpg`;
          return { file: '', thumbnail };
        });
        setGallaryImages(
          data?.data.gallery.map(img => ({
            file: '',
            url: `https://api.primeserverparts.com/images/product/image/gallery/${data?.data?.id}/128x128_${img.prod_image}`,
            prod_gallery_uuid: img.id,
          })),
        );

        form.setFieldValue({
          prod_name: data?.data.prod_name,
          prod_short_desc: data?.data.prod_short_desc,
          prod_meta_title: data?.data.prod_meta_title,
          prod_meta_desc: data?.data.prod_meta_desc,
          prod_meta_keywords: data?.data.prod_meta_keywords,
          prod_tags: data?.data.prod_tags,
          prod_partnum: data?.data.prod_partnum,
          prod_sku: data?.data.prod_sku,
          is_sale: data?.data.is_sale,
          brand_id: data?.data?.brand?.id,
          prod_category: data?.data?.category?.id,
          dimension_class: data?.data?.dimensions?.dimension_class || 'Inch',
          prod_weight: data?.data?.prod_weight || '',
          prod_weight_class: data?.data?.prod_weight_class || 'Pound',
          prod_outofstock_status: data?.data?.productavailablitystatus?.id,
          prod_regular_price: data?.data?.prod_regular_price || '',
          prod_sale_price: data?.data?.prod_sale_price || '',
          cost: data?.data?.cost || '',
          prod_condition: data?.data?.productCondition?.id || '',
          product_rep: data?.data?.representative?.id || '',
          extended_warranty: data?.data?.extended_warranty,
          extended_warranty_value: data?.data?.extended_warranty_value || 0,
          location: data?.data?.location || '',
          hs_code: data?.data?.hs_code || '',
          product_rank: data?.data?.product_rank || '',
          mfg_build_part_number: data?.data?.mfg_build_part_number || '',
        })
        setSelectedProdCategory(data?.data?.category?.id)
        setExtendedWarrantyEnable(data?.data?.extended_warranty_value)
        setSelectedAvailabilityStatusID(data?.data?.productavailablitystatus?.id)
        setSelectedConditionID(data?.data?.productCondition?.id)
        setSelectedProductRepID(data?.data?.representative?.id)
      })
      .catch(err => {
        console.log('error on loading porduct,\n', err);
      });




  }, []);

  // ================= 1.for General tab START =================
  const [longDescription, setLongDescription] = useState(RichTextEditor.createEmptyValue());
  const [prod_long_desc, setProd_long_desc] = useState('');
  const onChangeRte = value => {
    setProd_long_desc(value.toString('html'));
    setLongDescription(value);
  };
  const [prod_status, setProd_status] = useState(true);
  const [isTaxable, setIsTaxable] = useState(true);
  // ================= 1.for General tab END =================

  // ================= 3.for links tab START =================
  const [brand, setBrand] = useState({ data: [], loading: true, error: '' });
  const [productcondition, setProductCondition] = useState({ data: [], loading: true, error: '' });
  const [representative, setRepresentative] = useState({ data: [], loading: true, error: '' });
  const [availabilitystatus, setAvailabilityStatus] = useState({ data: [], loading: true, error: '' });
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const onManufactureSelect = (val, item) => {
    setCategories([]);
    setSelectedProdCategory('')
    if (!item?.categories?.length) return;
    let arrData = [];
    // Loop & organize categories
    !item?.categories?.forEach(item => {
      const parent = item.cat_name;

      arrData.push({ cat_name: parent, id: item.id, cat_status: item.cat_status });
      if (item.subcategories) {
        item.subcategories.forEach(subCat => {
          const sub = subCat.cat_name;
          arrData.push({ cat_name: `${parent} > ${sub}`, id: subCat.id, cat_status: subCat.cat_status });
          if (subCat.subsubcategories) {
            subCat.subsubcategories.forEach(subSubCat => {
              const subSub = subSubCat.cat_name;
              arrData.push({
                cat_name: `${parent} > ${sub} > ${subSub}`,
                id: subSubCat.id,
                cat_status: subSubCat.cat_status,
              });
            });
          }
        });
      }
    });
    setCategories(arrData);
  };
  // get all brands with category
  useEffect(() => {
    // Load Manufacture/brand
    if (params.id && singleProduct.isLoading) return;

    apolloClient
      .query({
        query: brandQuery.GET_ALL_BRAND_WITH_CATEGORY,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllBrands;
        setBrand(s => ({ ...s, data: data?.data, error: '' }));
        // set initial value - category for selected brand/manufacture
        if (params.id) {
          const uid = singleProduct?.data.brand?.id;
          const selectedBrand = data?.data.find(brand => brand.id === uid);
          // Loop & organize categories
          let arrData = [];
          selectedBrand?.categories?.forEach(item => {
            const parent = item.cat_name;

            arrData.push({ cat_name: parent, id: item.id, cat_status: item.cat_status });
            if (item.subcategories) {
              item.subcategories.forEach(subCat => {
                const sub = subCat.cat_name;
                arrData.push({ cat_name: `${parent} > ${sub}`, id: subCat.id, cat_status: subCat.cat_status });
                if (subCat.subsubcategories) {
                  subCat.subsubcategories.forEach(subSubCat => {
                    const subSub = subSubCat.cat_name;
                    arrData.push({
                      cat_name: `${parent} > ${sub} > ${subSub}`,
                      id: subSubCat.id,
                      cat_status: subSubCat.cat_status,
                    });
                  });
                }
              });
            }
          });
          setCategories(arrData);
        }
      })
      .catch(err => {
        setBrand(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setBrand(s => ({ ...s, loading: false }));
      });

    //////////////////////////////////
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
        setProductCondition(data)
      })
      .catch(err => {
        setProductCondition(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setProductCondition(s => ({ ...s, loading: false }));
      });

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
        setRepresentative(data)
      })
      .catch(err => {
        setRepresentative(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setRepresentative(s => ({ ...s, loading: false }));
      });

    //////////////////////////////////
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
        setAvailabilityStatus(data)
      })
      .catch(err => {
        setAvailabilityStatus(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setAvailabilityStatus(s => ({ ...s, loading: false }));
      });

  }, [singleProduct]);

  // ================= 3.for links tab END =================

  // ================= 4.for Specification tab START =================
  const [dimensions, setDimensions] = useState({});
  // ================= 4.for Specification tab END =================

  // ================= 6.for Attribute tab START =================
  const initalData = [
    {
      id: new Date().getTime(),
      attr_group_id: '',
      attribute_id: '',
      attribute_type: '',
      attribute_value: '',
    },
  ];
  const [attributesTableData, setAttributesTableData] = useState(initalData);
  // ================= 6.for Attribute tab END =================

  // ================= 8.for Discount tab START =================
  const disInitialValue = [
    {
      id: new Date().getTime(),
      customer_group_id: '',
      discount_quantity: '',
      discount_priority: '',
      discount_price: '',
      discount_startdate: '',
      discount_enddate: '',
    },
  ];
  const [discount, setDiscount] = useState(disInitialValue);
  // ================= 8.for Discount tab END =================

  // ================= 9.for Parts Of Product tab START =================
  const [products, setProducts] = useState({ data: [], isLoading: true });
  const [selectedPartsOfProducts, setSelectedPartsOfProducts] = useState([]);
  const [partOfProductQuantities, setPartOfProductQuantities] = useState({});
  // load ATTRIBUTE GROUPS
  useEffect(() => {
    // return
    apolloClient
      .query({
        query: productQuery.GET_PRODUCT_LIST_FOR_ADD_MINIMAL,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getProductList;
        if (!data?.status) return;
        setProducts(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setProducts(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setProducts(s => ({ ...s, isLoading: false }));
      });
  }, []);
  // ================= 9.for Parts Of Product tab END =================

  // ================= 10.for Image tab START =================
  const [featuresImage, setFeaturesImage] = useState({});
  const [gallaryImages, setGallaryImages] = useState([]);
  // ================= 10.for Image tab END =================

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    // console.log(values)
    const { dimension_class, prod_regular_price, extended_warranty_value, prod_sale_price, cost, prod_weight, prod_weight_class, ...rest } = values;
    let isAttribute = true;
    let isAttrCorrect = true;
    console.log(attributesTableData)
    const product_attributes = attributesTableData.map(item => {
      // TODO: show warning for missing value
      const { id, ...attributes } = item;
      if (attributes.attribute_type === 'none') {
        attributes.attribute_value = 'none';
      }
      // for empty attribute
      if (!attributes.attr_group_id && !attributes.attribute_type && !attributes.attribute_value) {
        isAttribute = false;
      }
      // for incorrect inputs
      if (!attributes.attr_group_id || !attributes.attribute_type || !attributes.attribute_value) {
        isAttrCorrect = false;
      }
      return { ...attributes };
    });
    if (!isAttrCorrect && isAttribute) return toast.warning('Please fill all Attribute field correctly');

    let isDiscount = true;
    let idDiscountCorrect = true;
    const discount_type = discount.map(item => {
      const {
        id,
        customer_group_id,
        discount_quantity,
        discount_priority,
        discount_price,
        discount_startdate,
        discount_enddate,
      } = item;
      // for empty attribute
      if (
        !customer_group_id &&
        !discount_quantity &&
        !discount_priority &&
        !discount_price &&
        !discount_startdate &&
        !discount_enddate
      ) {
        isDiscount = false;
      }
      // for incorrect inputs
      if (
        !customer_group_id ||
        !discount_quantity ||
        !discount_priority ||
        !discount_price ||
        !discount_startdate ||
        !discount_enddate
      ) {
        idDiscountCorrect = false;
      }
      return {
        customer_group_id,
        discount_quantity,
        discount_priority,
        discount_price,
        discount_startdate,
        discount_enddate,
      };
    });
    if (!idDiscountCorrect && isDiscount) return toast.warning('Please fill all Discount field correctly');

    const related_product = relatedProducts.map(item => item.uid);
    const partof_product = selectedPartsOfProducts.map(item => {
      const data = {
        prod_id: item.uid,
        prod_quantity: partOfProductQuantities[item.uid] ? parseInt(partOfProductQuantities[item.uid]) : 1,
      };
      return data;
    });

    const data = {
      ...rest,
      prod_long_desc,
      related_product,
      prod_status,
      // is_sale,
      partof_product,
      taxable: isTaxable,
      prod_condition: selectedConditionID,
      product_rep: selectedProductRepID,
      prod_outofstock_status: selectedavailabilitystatusID
      // prod_thumbnail,
      // prod_gallery,
    };

    if (prod_regular_price) {
      data.prod_regular_price = parseFloat(prod_regular_price);
    }
    if (cost) {
      data.cost = parseFloat(cost);
    }
    if (extended_warranty_value) {
      data.extended_warranty_value = parseFloat(extended_warranty_value);
    }
    if (prod_sale_price) {
      data.prod_sale_price = parseFloat(prod_sale_price);
    }
    if (isAttribute) {
      data.product_attributes = product_attributes;
    }
    if (isDiscount) {
      data.discount_type = discount_type;
    }
    if (prod_weight) {
      data.prod_weight = prod_weight;
      data.prod_weight_class = prod_weight_class;
    }
    const { height, length, width } = dimensions;
    if (height || length || width) {
      let dimensions = { dimension_class };
      if (height) {
        dimensions.height = height;
      }
      if (length) {
        dimensions.length = length;
      }
      if (width) {
        dimensions.width = width;
      }
      data.dimensions = dimensions;
    }

    // All Validation Start
    if (!data.prod_long_desc) return toast.warning('Please enter a long description');
    if (!data.prod_short_desc) return toast.warning('Please enter a long description');
    if (!data.prod_sku) return toast.warning('Please enter Product SKU');
    if (!data.prod_partnum) return toast.warning('Please enter Part No');
    if (!data.brand_id) return toast.warning('Please select a Manufacture');
    if (!data.prod_category) return toast.warning('Please select a Category');
    if (!data.product_rep) return toast.warning('Please select a Product Representative');
    if (!data.prod_outofstock_status && !params.id) return toast.warning('Please select an Availability Status');
    if (!data.prod_regular_price) return toast.warning('Please enter Regular Price');
    // All Validation End

    setIsLoading(true);
    if (!params.id) {
      data.prod_thumbnail = featuresImage.file;
      data.prod_gallery = gallaryImages.map(item => item.file);
      // Validataion for add only
      if (!prod_thumbnail) {
        return toast.warning('Please select a Feature image');
      }

      apolloUploadClient
        .mutate({
          mutation: productMutation.ADD_PRODUCT,
          variables: { data },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
          refetchQueries: [
            {
              query: productQuery.GET_PRODUCT_LIST,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
              fetchPolicy: 'network-only'
            },
            ['getProductList'],
          ],
        })
        .then(res => {
          const data = res?.data?.addProduct;
          if (!data.status) return toast.error(data.message);
          setTimeout(() => {
            history.push('/admin/products/list');
          }, 1000);
          toast.success(data.message);
        })
        .catch(err => {
          console.log('add Prod err:\n', err);
          return toast.error('Something Went wrong !!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // update prod
    else {
      data.prod_id = parseInt(params.id);

      apolloUploadClient
        .mutate({
          mutation: productMutation.UPDATE_PRODUCT,
          variables: { data },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
          refetchQueries: [
            {
              query: productQuery.GET_PRODUCT_LIST,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
              fetchPolicy: 'network-only'
            },
            ['getProductList'],
          ],
        })
        .then(res => {
          const data = res?.data?.updateProduct;
          if (!data.status) return toast.error(data.message);
          setTimeout(() => {
            history.push('/admin/products/list');
          }, 1000);
          toast.success(data.message);
        })
        .catch(err => {
          console.log('add Prod err:\n', err);
          return toast.error('Something Went wrong !!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <PageHeader
        title={
          params.id
            ? `Manage Product | Edit Product ${singleProduct.isLoading ? '' : `(${singleProduct.data.prod_name})`}`
            : 'Add Product'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless={true}>
              {params.id && singleProduct.isLoading ? (
                <div div="true" className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addRole"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => {
                    console.log('form error info:\n', errorInfo);
                    toast.warning('Please fill all required data in all tab');
                  }}
                  labelCol={{ span: 4 }}
                  initialValues={
                    params.id ? {
                      prod_name: singleProduct.data.prod_name,
                      prod_short_desc: singleProduct.data.prod_short_desc,
                      prod_meta_title: singleProduct.data.prod_meta_title,
                      prod_meta_desc: singleProduct.data.prod_meta_desc,
                      prod_meta_keywords: singleProduct.data.prod_meta_keywords,
                      prod_tags: singleProduct.data.prod_tags,
                      prod_partnum: singleProduct.data.prod_partnum,
                      prod_sku: singleProduct.data.prod_sku,
                      is_sale: singleProduct.data.is_sale,
                      brand_id: singleProduct.data?.brand?.id,
                      prod_condition: singleProduct.data?.productCondition?.id || '',
                      product_rep: singleProduct.data?.representative?.id || '',
                      prod_outofstock_status: singleProduct?.data?.productavailablitystatus?.id,
                      prod_category: singleProduct.data?.category?.id,
                      dimension_class: singleProduct.data?.dimensions?.dimension_class || '',
                      prod_weight: singleProduct.data?.prod_weight || '',
                      prod_weight_class: singleProduct.data?.prod_weight_class || '',
                      prod_regular_price: singleProduct.data?.prod_regular_price || 0,
                      prod_sale_price: singleProduct.data?.prod_sale_price || 0,
                      cost: singleProduct.data?.cost || 0,
                      extended_warranty: singleProduct.data?.extended_warranty || false,
                      extended_warranty_value: singleProduct.data?.extended_warranty_value || 0,
                      location: singleProduct.data?.location || '',
                      hs_code: singleProduct.data?.hs_code || '',
                      product_rank: singleProduct.data?.product_rank || '',
                      mfg_build_part_number: singleProduct.data?.mfg_build_part_number || '',
                    } : {
                      dimension_class: 'Inch',
                      prod_weight_class: 'Pound',
                      prod_outofstock_status: 'In Stock',
                    }
                  }
                >
                  <Tabs>
                    <Tabs.TabPane tab="General" key="general">

                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            name="prod_partnum"
                            rules={[{ required: true, message: 'Part NO' }]}
                            label="Part Number"
                          >
                            <Row>
                              <Col span={6}>
                                <Input defaultValue={singleProduct?.data?.prod_partnum} placeholder="Part No" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="mfg_build_part_number"
                            label="MFG Build Part Number"
                          >
                            <Row>
                              <Col span={6}>
                                <Input defaultValue={singleProduct?.data?.mfg_build_part_number} placeholder="MFG Build Part Number" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="prod_sku" label="SKU">
                            <Row>
                              <Col span={6}>
                                <Input defaultValue={singleProduct?.data?.prod_sku} placeholder=" Product SKU" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="prod_name"
                            rules={[{ required: true, message: 'Please enter Product Name' }]}
                            label="Title"
                          >
                            <Input placeholder="Product Name" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="prod_short_desc"
                            rules={[{ required: true, message: 'Please enter n' }]}
                            label="Short Description"
                          >
                            <TextArea rows={3} placeholder=" Short Description" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Long Description">
                            <RichTextEditor
                              value={longDescription}
                              onChange={onChangeRte}
                              placeholder="Long Description"
                              className={style.rte}
                              editorClassName={style.rteEditor}
                              toolbarClassName={style.rteToolbar}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="prod_meta_title"
                            rules={[{ required: true, message: 'Please enter Meta Title' }]}
                            label="Meta Title"
                          >
                            <Input placeholder=" Meta Title" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="prod_meta_desc"
                            rules={[{ required: true, message: 'Please enter Meta Description' }]}
                            label="Meta Description"
                          >
                            <Input placeholder=" Meta Description" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="prod_meta_keywords"
                            rules={[{ required: true, message: 'Please enter Meta Keywords' }]}
                            label="Meta Keywords"
                          >
                            <Input placeholder="Comma separated Meta Keywords" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="prod_tags"
                            rules={[{ required: true, message: 'Please enter Tags' }]}
                            label="Tags"
                          >
                            <Input placeholder="Comma separated Tags" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="prod_status" label="Status">
                            <Switch
                              defaultChecked={singleProduct.data.prod_status}
                              defaultValue={singleProduct.data.prod_status}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Data" key="Data">
                      <Row gutter={25}>
                        <Col span={12}>
                          <Row gutter={25}>
                            <Col span={24}>
                              <Form.Item
                                labelCol={{ style: { width: "40%" } }}
                                name="prod_condition"
                                rules={[{ required: true, message: 'Product Condition Is Required' }]}
                                label="Product Condition"
                              >
                                <Row>
                                  <Col span={12}>
                                    <Select
                                      defaultValue={singleProduct?.data?.productCondition?.name}
                                      placeholder={productcondition.loading ? 'Loading...' : 'Select Condition'}
                                      options={productcondition?.data?.map(item => ({
                                        label: item.name,
                                        value: item.id,
                                      }))}
                                      onSelect={(val) => setSelectedConditionID(val)}
                                    />
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={25}>
                            <Col span={24}>
                              <Form.Item
                                labelCol={{ style: { width: "40%" } }}
                                name="location"
                                label="Location"
                              >
                                <Row>
                                  <Col span={16}>
                                    <Input defaultValue={singleProduct?.data?.location} placeholder=" Product Location" />
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={25}>
                            <Col span={24}>
                              <Form.Item
                                labelCol={{ style: { width: "40%" } }}
                                name="hs_code"
                                label="HS Code"
                              >
                                <Row>
                                  <Col span={12}>
                                    <Input defaultValue={singleProduct?.data?.hs_code} placeholder=" HS Code" />
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={25}>
                            <Col span={24}>
                              <Form.Item
                                labelCol={{ style: { width: "40%" } }}
                                name="product_rank"
                                label="Product Rank"
                              >
                                <Row>
                                  <Col span={12}>
                                    <Input defaultValue={singleProduct?.data?.product_rank} placeholder=" Product Rank" />
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={25}>
                            <Col span={24}>
                              <Form.Item
                                labelCol={{ style: { width: "40%" } }}
                                name="product_rep"
                                label="Product Representative"
                              >
                                <Row>
                                  <Col span={12}>
                                    <Select
                                      defaultValue={`${singleProduct?.data?.representative?.first_name} ${singleProduct?.data?.representative?.last_name}`}
                                      placeholder={representative.loading ? 'Loading...' : 'Select a Product Representative'}
                                      options={representative?.data?.map(item => ({
                                        label: item.first_name + ' ' + item.last_name,
                                        value: item.id,
                                      }))}
                                      onSelect={(val) => setSelectedProductRepID(val)}
                                    />

                                    <ul>
                                      {singleProduct?.data?.representative?.roles.map((item) =>
                                        <li key={item.id}>{item.role}</li>
                                      )}
                                    </ul>

                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={12}>
                          <Form.Item labelCol={{ style: { width: "40%" } }} name="extended_warranty" label="Extended Warranty">
                            <Switch defaultChecked={singleProduct.data.extended_warranty} onChange={(val) => setExtendedWarrantyEnable(val)} defaultValue={singleProduct.data.extended_warranty} />
                          </Form.Item>
                          {extendedWarrantyEnable && (
                            <Row gutter={25}>
                              <Col span={24}>
                                <Form.Item labelCol={{ style: { width: "40%" } }} rules={[{ required: true, message: 'Extended Warranty Value' }]} name="extended_warranty_value" label="Extended Warranty Value">
                                  <Row>
                                    <Col span={8}>
                                      <Input placeholder="Extended Warranty Value" defaultValue={singleProduct?.data?.extended_warranty_value} type="number" />
                                    </Col>
                                  </Row>

                                </Form.Item>
                              </Col>
                            </Row>
                          )}
                          <Form.Item labelCol={{ style: { width: "40%" } }} name="is_sale" label="On Sale">
                            <Switch defaultChecked={singleProduct.data.is_sale} defaultValue={singleProduct.data.is_sale} />
                          </Form.Item>
                          <Form.Item labelCol={{ style: { width: "40%" } }} name="is_featured" label="Featured">
                            <Switch defaultChecked={singleProduct.data.is_featured} defaultValue={singleProduct.data.is_featured} />
                          </Form.Item>
                          <Form.Item labelCol={{ style: { width: "40%" } }} name="is_serial" label="Has Serial">
                            <Switch defaultChecked={singleProduct.data.is_serial} defaultValue={singleProduct.data.is_serial} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Links" key="Links">

                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            name="brand_id"
                            rules={[{ required: true, message: 'Please Select a Manufacture' }]}
                            label="Manufacturer"
                          >
                            <Row >
                              <Col span={7}>
                                <Select
                                  defaultValue={singleProduct?.data?.brand?.brand_name}
                                  placeholder={brand.loading ? 'Loading...' : 'Select Manufacture'}
                                  options={brand?.data?.map(item => ({
                                    label: item.brand_name,
                                    value: item.id,
                                    categories: item.categories,
                                  }))}
                                  onSelect={onManufactureSelect}
                                />
                              </Col>
                            </Row>

                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            name="prod_category"
                            initialValue={selectedProdCategory}
                            rules={[{ required: true, message: 'Please Select a Category' }]}
                            label="Categories"
                          >
                            <Row>
                              <Col span={7}>
                                <Select
                                  defaultValue={singleProduct?.data?.category?.cat_name}
                                  placeholder={
                                    brand.loading
                                      ? 'Loading...'
                                      : categories.length
                                        ? 'Select Category'
                                        : 'Select manifacture first'
                                  }
                                  options={categories.map(item => ({
                                    label: item.cat_name,
                                    value: item.id,
                                    key: item.id,
                                  }))}
                                // mode="multiple"
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            label="Related Product"
                            rules={[{ required: true, message: 'Please enter Product Name' }]}
                          >
                            <Row>
                              <Col span={7}>
                                <Select
                                  placeholder={products.isLoading ? 'Loading...' : 'select Related Products'}
                                  mode="multiple"
                                  optionFilterProp="label"
                                  defaultValue={
                                    params.id ? singleProduct?.data?.related_products?.map(item => item?.related_prod?.id) : []
                                  }
                                  options={products?.data?.map(item => ({
                                    label: item.prod_name,
                                    value: item.id,
                                    uid: item.id,
                                  }))}
                                  onChange={(newVal, items) => {
                                    setRelatedProducts(items);
                                  }}
                                ></Select>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Specifications" key="Specifications">
                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            label={
                              <p>
                                Dimensions <br /> (L x W x H)
                              </p>
                            }
                          >
                            <Input.Group compact>
                              <Input
                                type="number"
                                style={{ width: '20%' }}
                                placeholder="Length"
                                onBlur={e => setDimensions(state => ({ ...state, length: parseFloat(e.target.value) }))}
                                defaultValue={
                                  !params.id
                                    ? ''
                                    : singleProduct?.data?.dimensions?.length
                                      ? singleProduct?.data?.dimensions?.length
                                      : ''
                                }
                              />
                              <Input
                                type="number"
                                style={{ width: '20%' }}
                                placeholder="Width"
                                onBlur={e => setDimensions(state => ({ ...state, width: parseFloat(e.target.value) }))}
                                defaultValue={
                                  !params.id
                                    ? ''
                                    : singleProduct?.data?.dimensions?.length
                                      ? singleProduct?.data?.dimensions?.width
                                      : ''
                                }
                              />
                              <Input
                                type="number"
                                style={{ width: '20%' }}
                                placeholder="Height"
                                onBlur={e => setDimensions(state => ({ ...state, height: parseFloat(e.target.value) }))}
                                defaultValue={
                                  !params.id
                                    ? ''
                                    : singleProduct?.data?.dimensions?.length
                                      ? singleProduct?.data?.dimensions?.height
                                      : ''
                                }
                              />
                            </Input.Group>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            name="dimension_class"
                            label={
                              <p>
                                Dimensions <br />
                                Class{' '}
                              </p>
                            }
                          >
                            <Row>
                              <Col span={7}>
                                <Select style={{ height: '3.5em' }} placeholder="Dimension Class">
                                  <Option key={1} value="Centimeter">
                                    Centimeter
                                  </Option>
                                  <Option key={2} value="Millimeter">
                                    Millimeter
                                  </Option>
                                  <Option key={3} value="Inch">
                                    Inch
                                  </Option>
                                </Select>
                              </Col>
                            </Row>

                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item name="prod_weight" label="Weight">
                        <Row>
                          <Col span={7}>
                            <Input type="number" placeholder="Weight" />
                          </Col>
                        </Row>
                      </Form.Item>
                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item name="prod_weight_class" label="Weight Class">
                            <Row>
                              <Col span={7}>
                                <Select placeholder="Weight Class">
                                  <Option key={1} value="Kilogram">
                                    Kilogram
                                  </Option>
                                  <Option key={1} value="Gram">
                                    Gram
                                  </Option>
                                  <Option key={2} value="Pound">
                                    Pound
                                  </Option>
                                  <Option key={3} value="Ounce">
                                    Ounce
                                  </Option>
                                </Select>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Stock" key="Stock">
                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            name="prod_outofstock_status"
                            rules={[{ required: true, message: 'Please Select Availability Status' }]}
                            label="Availability"
                          >
                            <Row>
                              <Col span={6}>
                                <Select
                                  defaultValue={singleProduct?.data?.productavailablitystatus?.name}
                                  placeholder={availabilitystatus.loading ? 'Loading...' : 'Select a Status'}
                                  options={availabilitystatus?.data?.map(item => ({
                                    label: item.name,
                                    value: item.id
                                  }))}
                                  onSelect={(val) => setSelectedAvailabilityStatusID(val)}
                                />
                              </Col>
                            </Row>

                          </Form.Item>
                        </Col>
                      </Row>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Attribute" key="Attribute">
                      <AttributeTab {...{ attributesTableData, setAttributesTableData }} />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Price" key="Price">
                      <Row gutter={25}>
                        <Col span={24}>
                          <Form.Item
                            name="prod_regular_price"
                            rules={[{ required: true, message: 'MSRP' }]}
                            label="MSRP"
                          >
                            <Row>
                              <Col span={6}>
                                <Input placeholder="MSRP" defaultValue={singleProduct.data.prod_regular_price} prefix="US$  " type="number" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="prod_sale_price" label="Sales Price">
                            <Row>
                              <Col span={6}>
                                <Input prefix="US$  " type="number" defaultValue={singleProduct.data.prod_sale_price} placeholder="Sales Price" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="cost" label="Cost">
                            <Row>
                              <Col span={6}>
                                <Input prefix="US$  " type="number" defaultValue={singleProduct.data.cost} placeholder="Product Cost" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item label="Taxable">
                        <Switch checked={isTaxable} onChange={checked => setIsTaxable(checked)} />
                      </Form.Item>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Discount" key="Discount">
                      <DiscountTab {...{ discount, setDiscount }} />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Build Of Product" key="PartsOf">
                      <PartsOfProductTab
                        {...{
                          products,
                          setProducts,
                          selectedPartsOfProducts,
                          setSelectedPartsOfProducts,
                          partOfProductQuantities,
                          setPartOfProductQuantities,
                        }}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Images" key="Images">
                      <ImageTab
                        {...{
                          featuresImage,
                          setFeaturesImage,
                          gallaryImages,
                          setGallaryImages,
                          singleProdUid: singleProduct?.data?.id,
                          setIsLoading,
                        }}
                      />
                    </Tabs.TabPane>
                  </Tabs>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/products/list">
                        <Button
                          // className="btn-cancel"
                          type="white"
                          size="large"
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Form.Item>
                  </div>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddProduct;
