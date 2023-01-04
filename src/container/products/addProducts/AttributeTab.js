import { Button, Input, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import apolloClient, { attributeQuery } from '../../../utility/apollo';
import Cookies from 'js-cookie';
const { Option } = Select;

const AttributeTab = ({ attributesTableData, setAttributesTableData }) => {

    const [file, setFile] = useState({});
    const addNewRow = () => {
        const newData = {
            id: new Date().getTime(),
            attr_group_id: "",
            attribute_id: '',
            attribute_type: '',
            attribute_value: ''
        }
        setAttributesTableData(prevState => [...prevState, newData])
    }
    const removeRow = (id) => {
        setAttributesTableData(prevState => {
            return prevState.filter((value) => value.id !== id)
        })
    }

    const [attributeGroups, setAttributeGroups] = useState({ data: [], isLoading: true })
    const [selectedGroup, setSelectedGroup] = useState({})
    const handleAttrGroupSelect = (val, item, index) => {
        setSelectedGroup(item)

        setAttributesTableData(arr => {
            let data = arr[index];
            const copy = [...arr];
            copy[index] = { ...data, attr_group_id: val }
            return copy;
        })
    }
    const handleAttributeSelect = (val, item, index) => {
        setAttributesTableData(arr => {
            let data = arr[index];
            const copy = [...arr];
            copy[index] = { ...data, attribute_id: val }
            return copy;
        })
    }

    // load ATTRIBUTE GROUPS
    useEffect(() => {
        // return
        apolloClient.query({
            query: attributeQuery.GET_ALL_ATTR_GROUPS_FOR_ADD_PROD,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllAttrGroups

            if (!data?.status) return
            setAttributeGroups(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setAttributeGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAttributeGroups(s => ({ ...s, isLoading: false }))
        })

    }, []);

    // List For Table Column
    const column = [
        {
            title: 'Attribute Group',
            dataIndex: 'attr_group_id',
            key: 'attr_group_id',
            width: 200,
            render: (val, record, index) => <Select
                style={{ width: "100%" }}
                placeholder={attributeGroups.isLoading ? 'Loading...' : "Select Group..."}
                defaultValue={val}
                options={attributeGroups.data.map(item => ({
                    label: item.attr_group_name,
                    value: item.id,
                    attributes: item.attributes
                }))}
                onSelect={(val, item) => handleAttrGroupSelect(val, item, index)}
            />
        },
        {
            title: 'Attribute',
            dataIndex: 'attribute_id',
            key: 'attribute_id',
            width: 200,
            render: (val, record, index) => <Select
                style={{ width: "100%" }}
                defaultValue={val}
                placeholder={attributeGroups.isLoading ? 'Loading...'
                    : "Select Attribute..."
                }
                options={attributeGroups?.data.filter(item => item.id === record.attr_group_id)[0]?.attributes?.map(item => ({
                    label: item.attribute_name,
                    value: item.id,
                }))}
                onSelect={(val, item) => handleAttributeSelect(val, item, index)}
            />
        },
        {
            title: 'Value Type',
            dataIndex: 'value',
            width: 80,
            key: 'value',
            render: (text, record, index) => <Select
                style={{ width: '10em', marginRight: "1em" }}
                placeholder="Select type"
                defaultValue={record.attribute_type}
                onChange={value => {
                    setAttributesTableData(arr => {
                        let data = arr[index];
                        const copy = [...arr];
                        copy[index] = { ...data, attribute_type: value }
                        return copy;
                    })
                }}
            >
                <Option value="text" >Text</Option>
                <Option value="link" >Link</Option>
                <Option value="file" >File</Option>
                <Option value="none" >None</Option>
            </Select>
        },
        {
            title: 'Attribute Value',
            dataIndex: 'attribute_value',
            width: 150,
            key: 'attribute_value',
            render: (text, record, index) => {
                if (record.attribute_type === "text") {
                    return < Input
                        placeholder="Enter text"
                        size="large"
                        onBlur={value => {
                            setAttributesTableData(arr => {
                                let data = arr[index];
                                const copy = [...arr];
                                copy[index] = { ...data, attribute_value: value.target.value }
                                return copy;
                            })
                        }}
                        defaultValue={record.attribute_value}
                    />
                } else if (record.attribute_type === "link") {
                    return < Input
                        placeholder="Enter Link"
                        size="large"
                        onBlur={value => {
                            setAttributesTableData(arr => {
                                let data = arr[index];
                                const copy = [...arr];
                                copy[index] = { ...data, attribute_value: value.target.value }
                                return copy;
                            })
                        }}
                        defaultValue={record.attribute_value}
                    />
                } else if (record.attribute_type === "file") {

                    return (
                        <Upload
                            multiple={false}
                            onChange={e => {
                                setFile(e.file)
                                setAttributesTableData(state => {
                                    let data = state[index];
                                    const copy = [...state];
                                    copy[index] = { ...data, attribute_value: e.file.originFileObj }
                                    return copy;
                                })
                            }}
                            onRemove={() => setFile({})}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <p style={{ fontSize: 12, marginTop: 10 }}>{record.attribute_value.name ? `${record.attribute_value.name}` : `${record.attribute_value}`}</p>

                        </Upload>)
                }

            }

        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 90,
            align: "right",
            render: (text, record) => <Button size="" title="Remove" type="danger"
                onClick={() => removeRow(record.id)}
            ><FeatherIcon icon="minus" size={15} /></Button>
        },
    ];

    return (

        <>
            <Table
                columns={column}
                dataSource={attributesTableData}
                pagination={false}
                rowKey="attribute_value"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px', marginRight: '1em' }}>
                <Button title="Add Attribute" htmlType="button" type="primary" onClick={addNewRow}>
                    <FeatherIcon icon="plus" size={15} />
                </Button>
            </div>
        </>
    );
};

export default AttributeTab;