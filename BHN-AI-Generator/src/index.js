import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { uploadDirect } from '@uploadcare/upload-client'
import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Row, Col, Input,
    Card, CardBody, CardTitle, CardImg, CardGroup
} from 'reactstrap';
import base64s from './base64';

const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    // eslint-disable-next-line id-length
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

const AIWidgetModal = ({ modalStatus, setModalStatus }) => {

    const toggleModal = () => { setModalStatus(!modalStatus) };
    const likedAnImage = id => async () => {
        console.log(id);
        const file = dataURLtoFile(`data:text/plain;base64,${base64s[id]}`, `aiImageFile${id}.txt`);
        const result = await uploadDirect(
            file, {
                publicKey: window.UPLOADCARE_PUBLIC_KEY,
                store: 'auto'
            }
        );
        console.log(result);
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={modalStatus}
                toggle={toggleModal}
                contentClassName='generative-ai-image-modal modal-loader'
                centered
            >
                <ModalHeader toggle={toggleModal}>What kind of image you want ?</ModalHeader>
                <ModalBody>

                    <Form className='generative-ai-image-search-form'>
                        <Row className='input-search-row'>
                            <Col sm='12'>
                                <Input
                                    id="search-box"
                                    name="serach"
                                    placeholder="Flower"
                                    type="text"
                                    className='input-search-box'
                                />
                                <span className='input-search-button'>
                                    <svg width="40px" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.33789 7C5.06694 4.01099 8.29866 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C8.29866 22 5.06694 19.989 3.33789 17M12 16L16 12M16 12L12 8M16 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>                                </span>
                            </Col>
                        </Row>

                    </Form>
                    <h5 className="pick-one-image-text">Please pick one image from those listed below.</h5>
                    <CardGroup>
                        <Card className="card-image-wrapper" onClick={likedAnImage(0)}>
                            <CardImg
                                alt="Card image cap"
                                src={`data:image/png;base64, ${base64s[0]}`}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Like It ?
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <Card className="card-image-wrapper" onClick={likedAnImage(1)}>
                            <CardImg
                                alt="Card image cap"
                                src={`data:image/png;base64, ${base64s[1]}`}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Like It ?
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </CardGroup>
                    <CardGroup>
                        <Card className="card-image-wrapper" onClick={likedAnImage(2)}>
                            <CardImg
                                alt="Card image cap"
                                src={`data:image/png;base64, ${base64s[2]}`}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Like It ?
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <Card className="card-image-wrapper" onClick={likedAnImage(3)}>
                            <CardImg
                                alt="Card image cap"
                                src={`data:image/png;base64, ${base64s[3]}`}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    Like It ?
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </CardGroup>

                </ModalBody>
            </Modal>
        </React.Fragment >
    );
}

export default AIWidgetModal;