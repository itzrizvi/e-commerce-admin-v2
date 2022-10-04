import React, { useState } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import style from './product.module.css'
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

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

                        {/* <CalendarButtonPageHeader />
                    <ExportButtonPageHeader />
                    <ShareButtonPageHeader />
                    <Button size="small" type="primary">
                        <FeatherIcon icon="plus" size={14} />
                        Add New
                    </Button> */}
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
                                        <label htmlFor="">Product Name</label>
                                        <input
                                            type="text"
                                            placeholder='Product Name'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Description</label>
                                        <RichTextEditor
                                            value={description}
                                            onChange={onChangeRte}
                                            placeholder='Product Description'
                                            className={style.rte}

                                            editorClassName={style.rteEditor}
                                            toolbarClassName={style.rteToolbar}
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">"Product Meta Title</label>
                                        <input type="text" placeholder='Product Meta title' />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Meta Description</label>
                                        <input type="text" placeholder='Product Meta Description' />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Meta Keywords</label>
                                        <input type="text" placeholder='Product Meta Keywords' />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Tags</label>
                                        <input type="text" placeholder='Product Tags' />
                                    </div>
                                </div>

                                <div className={activeTab == 'Data' ? style.activeContent : style.inactiveContent}>

                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Stock Quantity</label>
                                        <input type="text" placeholder='Product SKU'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Category</label>
                                        <input type="text" placeholder='Product Category'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Barcode</label>
                                        <input type="text" placeholder='Product Barcode'
                                        />
                                    </div>
                                </div>

                                <div className={activeTab == 'Price' ? style.activeContent : style.inactiveContent}>

                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Regular Price</label>
                                        <input type="text" placeholder='Product Regular Price'
                                        />
                                    </div>
                                    <div className={style.inputGrpup}>
                                        <label htmlFor="">Product Sale Price</label>
                                        <input type="text" placeholder='Product Sale Price'
                                        />
                                    </div>

                                    <div className={style.checkbox}>
                                        <label htmlFor="">Tax Include</label>

                                        <input type="checkbox" />
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
                                        <input type="text" placeholder='Product Status'
                                        />
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
