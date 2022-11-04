import { Form, Upload } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { InboxOutlined } from '@ant-design/icons'
import { apolloUploadClient, productMutation } from '../../../utility/apollo';
import Cookies from 'js-cookie';

const ImageTab = ({ featuresImage, setFeaturesImage, gallaryImages, setGallaryImages, singleProdId, setIsLoading }) => {


    const handleBeforeUpload = file => {
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) return toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) return toast.error('Image must smaller than 2MB!');

        if (isJpg && isLt2M) {
            setFeaturesImage({ file, thumbnail: URL.createObjectURL(file) })


            // update thumbnail img
            if (singleProdId) {
                setIsLoading(true)
                apolloUploadClient.mutate({
                    mutation: productMutation.UPDATE_THUMBNAIL,
                    variables: {
                        data: {
                            prod_id: singleProdId,
                            prod_thumbnail: file
                        }
                    },
                    context: {
                        headers: {
                            TENANTID: process.env.REACT_APP_TENANTID,
                            Authorization: Cookies.get('psp_t')
                        }
                    }
                }).then(res => {
                    const data = res?.data?.updateThumbnail
                    if (!data.status) return toast.error(data.message);
                    toast.success(data.message);
                }).catch(err => {
                    console.log("update thumbnail err:\n", err)
                    return toast.error('Something Went wrong !!')
                }).finally(() => {
                    // setIsLoading(false)
                })
            }
        }
        return false;
    }

    const handleBeforeUploadGellary = (file) => {
        console.log("file type:\n", file.type);
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) return toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) return toast.error('Image must smaller than 2MB!');
        setGallaryImages(state => [...state, { file, url: URL.createObjectURL(file), uid: file.uid }])

        // update galary img
        if (singleProdId) {
            setIsLoading(true)
            apolloUploadClient.mutate({
                mutation: productMutation.UPLOAD_GALLERY_IMAGE,
                variables: {
                    data: {
                        prod_id: singleProdId,
                        gallery_img: file
                    }
                },
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                }
            }).then(res => {
                const data = res?.data?.uploadGalleryImage
                if (!data.status) return toast.error(data.message);
                toast.success(data.message);
            }).catch(err => {
                console.log("update gal img err:\n", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                // setIsLoading(false)
            })
        }

        return false
    }

    return (
        <>
            <Form.Item
                label="Features Image"
            >
                <Upload
                    multiple
                    listType="picture-card"
                    beforeUpload={handleBeforeUpload}
                    onPreview={() => console.log()}
                    onRemove={() => setFeaturesImage({})}
                    fileList={!featuresImage.thumbnail ? [] : [{ file: featuresImage.file, url: featuresImage.thumbnail }]}
                >
                    {!featuresImage.thumbnail && "+ Upload"}
                </Upload>

            </Form.Item>
            <Form.Item
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

                        // delete galary img
                        if (singleProdId) {
                            setIsLoading(true)
                            apolloUploadClient.mutate({
                                mutation: productMutation.DELETE_GALLERY_IMAGE,
                                variables: {
                                    data: {
                                        prod_id: singleProdId,
                                        prod_gallery_id: file.prod_gallery_uuid
                                    }
                                },
                                context: {
                                    headers: {
                                        TENANTID: process.env.REACT_APP_TENANTID,
                                        Authorization: Cookies.get('psp_t')
                                    }
                                }
                            }).then(res => {
                                const data = res?.data?.deleteGalleryImage
                                if (!data.status) return toast.error(data.message);
                                toast.success(data.message);
                            }).catch(err => {
                                console.log("del gal img err:\n", err)
                                return toast.error('Something Went wrong !!')
                            }).finally(() => {
                                // setIsLoading(false)
                            })
                        }
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