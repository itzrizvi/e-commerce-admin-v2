import React, { useState } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import style from './product.module.css'
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';

const BlankPage = () => {
    const [activeTab, setActiveTab] = useState('General')
    const tabs = ["General", "Data", "Price", "Stock", "Images"]

    // const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const onChangeRte = value => {
        console.log(value.toString('html'))

        setDescription(value);
    }


    return (
        <>
            <PageHeader
                title="Add Product"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="default" type="primary">
                            <FeatherIcon icon="save" />
                            Add Product
                        </Button>
                    </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <ul className={style.tabs}>
                                {tabs.map(item => (
                                    <li
                                        key={item}
                                        className={activeTab == item ? style.activeTab : ''}
                                        onClick={() => setActiveTab(item)}
                                    >{item}</li>

                                ))}
                            </ul>

                            <form >

                                <div className={activeTab == 'General' ? style.activeContent : style.inactiveContent}>

                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Name</label>
                                        <input
                                            type="text"
                                            placeholder='Product Name'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Short Description</label>
                                        <input
                                            type="text"
                                            placeholder='Short Description'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Long Description</label>
                                        {/* workingRichTextEditor */}
                                        <RichTextEditor
                                            value={description}
                                            onChange={onChangeRte}
                                            placeholder='Long Description'
                                            className={style.rte}

                                            editorClassName={style.rteEditor}
                                            toolbarClassName={style.rteToolbar}
                                        />





                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">"Meta Title</label>
                                        <input type="text" placeholder='Product Meta title' />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Meta Description</label>
                                        <input type="text" placeholder='Product Meta Description' />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Meta Keywords</label>
                                        <input type="text" placeholder='Product Meta Keywords' />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Tags</label>
                                        <input type="text" placeholder='Product Tags' />
                                    </div>
                                </div>

                                <div className={activeTab == 'Data' ? style.activeContent : style.inactiveContent}>

                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Stock Quantity</label>
                                        <input type="text" placeholder='Product SKU'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Category</label>
                                        <input type="text" placeholder='Product Category'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Barcode</label>
                                        <input type="text" placeholder='Product Barcode'
                                        />
                                    </div>
                                </div>

                                <div className={activeTab == 'Price' ? style.activeContent : style.inactiveContent}>

                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Regular Price</label>
                                        <input type="text" placeholder='Product Regular Price'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Sale Price</label>
                                        <input type="text" placeholder='Product Sale Price'
                                        />
                                    </div>

                                    <div className={style.checkbox}>
                                        <label htmlFor="">Tax Include</label>

                                        <input type="checkbox" defaultChecked />
                                    </div>

                                    {/* todo */}

                                </div>

                                <div className={activeTab == 'Stock' ? style.activeContent : style.inactiveContent}>

                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Stock Quantity</label>
                                        <input type="text" placeholder='Product Stock Quantity'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Minimum Stock Quantity</label>
                                        <input type="text" placeholder='Product Minimum Stock Quantity'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Maximum Orders</label>
                                        <input type="text" placeholder='Product Maximum Orders'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Stock Status</label>
                                        <input type="text" placeholder='Product Stock Status'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Available From</label>
                                        <input type="text" placeholder='Product Available From'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Status</label>
                                        <div className={style.radioInput}>
                                            <input type="radio" name="product_stock_status" value="male" />
                                            <label for="">In-Stock</label>
                                            <span style={{ width: '5px' }} />
                                            <input type="radio" name="product_stock_status" value="female" id="" />
                                            <label for="">Not-In-Stock</label>
                                        </div>
                                    </div>
                                </div>

                            </form>


                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default BlankPage;
