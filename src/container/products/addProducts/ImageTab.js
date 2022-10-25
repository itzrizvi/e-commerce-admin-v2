import { Form, Upload } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { InboxOutlined } from '@ant-design/icons'

const ImageTab = ({ featuresImage, setFeaturesImage, gallaryImages, setGallaryImages }) => {
    // const [featuresImage, setFeaturesImage] = useState({})
    // const [gallaryImages, setGallaryImages] = useState([])

    const handleBeforeUpload = file => {
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) return toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) return toast.error('Image must smaller than 2MB!');

        if (isJpg && isLt2M) {
            setFeaturesImage({ file, thumbnail: URL.createObjectURL(file) })
        }
        return false;
    }

    const handleBeforeUploadGellary = (file) => {
        const isJpg = file.type === 'image/jpeg';
        // if (!isJpg) return toast.error('You can only upload JPG file!')
        setGallaryImages(state => [...state, { file, url: URL.createObjectURL(file), uid: file.uid }])

        return false
    }

    return (
        <>
            <Form.Item
                label="Features Image"
            >
                {/* <Input placeholder='Enter price' prefix="US$  " type='number' /> */}
                <Upload
                    multiple
                    listType="picture-card"
                    beforeUpload={handleBeforeUpload}
                    onPreview={() => console.log()}
                    onRemove={() => setFeaturesImage({})}
                    fileList={!featuresImage.file ? [] : [{ file: featuresImage.file, url: featuresImage.thumbnail }]}
                >
                    {!featuresImage.file && "+ Upload"}
                </Upload>

            </Form.Item>
            <Form.Item
                // name="Price"
                label="Gallery Image"
            >
                <Dragger
                    multiple
                    listType='picture-card'
                    beforeUpload={handleBeforeUploadGellary}
                    fileList={gallaryImages}
                    onRemove={(file) => {
                        setGallaryImages(state => {
                            const remaining = state.filter(item => item.uid !== file.uid)
                            return remaining
                        })
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>

            </Form.Item>
        </>
    );
};

export default ImageTab;