import 'bootstrap/dist/css/bootstrap.min.css';
// import { uploadDirect } from '@uploadcare/upload-client'
import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Row, Col, Input,
    Card, CardBody, CardTitle, CardImg, CardGroup
} from 'reactstrap';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { v4 as uuidv4 } from 'uuid';

import base64s from './exampleBase64';

function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
}

const AIWidgetModal = ({ modalStatus, setModalStatus, urlCallback, howToUseGif }) => {

    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const toggleModal = () => { setModalStatus(!modalStatus) };
    const likedAnImage = id => async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('UPLOADCARE_PUB_KEY', window.UPLOADCARE_PUBLIC_KEY);

        const ImageURL = `data:image/jpg;base64,${base64s[id]}`;
        const fileToUpload = DataURIToBlob(ImageURL);

        const file_name = `AI_generated_${uuidv4()}.png`;
        bodyFormData.append(file_name, fileToUpload, file_name);

        const options = {
            method: 'POST',
            body: bodyFormData
        }

        try {
            const response = await fetch("https://upload.uploadcare.com/base/", options);
            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            // Extract value from the JSON object
            // Assuming there is only one key-value pair in the response
            const [_, fileId] = Object.entries(result)[0];
            const url = `https://ucarecdn.com/${fileId}/`;
            console.log(url);
            urlCallback(url);
            toggleModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const generateImageSearchHandler = (ev) => {
        if (retryCount != 3) {
            const imageSearchInput = document.getElementById("search-box");
            console.log('searchValue : ', imageSearchInput.value);

            setTimeout(() => {
                setIsLoadingImage(false);
            }, 3000);

            setRetryCount(retryCount + 1);
        }
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
                                    name="searchTextForAIGenerate"
                                    placeholder="eg. First day of school, 21st Birthday of my son"
                                    type="text"
                                    className='input-search-box'
                                    disabled={retryCount == 2 && `disabled`}
                                />
                                <span
                                    disabled={retryCount == 2 && `disabled`}
                                    className='input-search-button'
                                    onClick={(e) => { generateImageSearchHandler(e) }}
                                >
                                    <svg width="40px" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.33789 7C5.06694 4.01099 8.29866 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C8.29866 22 5.06694 19.989 3.33789 17M12 16L16 12M16 12L12 8M16 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                {
                                    retryCount == 2 && (<div style={{ color: 'red' }}>Attempts Exhausted: You've used all 2 attempts. Please try and upload your own image.
                                    </div>)
                                }
                            </Col>
                        </Row>

                    </Form>

                    {retryCount != 0
                        ? (
                            <React.Fragment>
                                <h5 className="pick-one-image-text">Please pick one image from those listed below.</h5>
                                <CardGroup>
                                    <Card className="card-image-wrapper" onClick={likedAnImage(0)}>
                                        {
                                            !isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <CardImg
                                                        alt="Card image cap"
                                                        src={`data:image/png;base64, ${base64s[0]}`}
                                                        top
                                                        width="100%"
                                                        className='card-image'
                                                    />
                                                    <CardBody>
                                                        <CardTitle tag="h5">
                                                            Like It ?
                                                        </CardTitle>
                                                    </CardBody>
                                                </React.Fragment>
                                            )
                                        }
                                        {isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <SkeletonTheme color="#202020" highlightColor="#c1c1c1">
                                                        <Skeleton height='100%' width='100%' />
                                                    </SkeletonTheme>
                                                </React.Fragment>
                                            )
                                        }
                                    </Card>
                                    <Card className="card-image-wrapper" onClick={likedAnImage(1)}>
                                        {
                                            !isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <CardImg
                                                        alt="Card image cap"
                                                        src={`data:image/png;base64, ${base64s[1]}`}
                                                        top
                                                        width="100%"
                                                        className='card-image'
                                                    />
                                                    <CardBody>
                                                        <CardTitle tag="h5">
                                                            Like It ?
                                                        </CardTitle>
                                                    </CardBody>
                                                </React.Fragment>
                                            )
                                        }
                                        {isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <SkeletonTheme color="#202020" highlightColor="#c1c1c1">
                                                        <Skeleton height='100%' width='100%' />
                                                    </SkeletonTheme>
                                                </React.Fragment>
                                            )
                                        }
                                    </Card>
                                </CardGroup>

                                <CardGroup>
                                    <Card className="card-image-wrapper" onClick={likedAnImage(2)}>
                                        {
                                            !isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <CardImg
                                                        alt="Card image cap"
                                                        src={`data:image/png;base64, ${base64s[2]}`}
                                                        top
                                                        width="100%"
                                                        className='card-image'
                                                    />
                                                    <CardBody>
                                                        <CardTitle tag="h5">
                                                            Like It ?
                                                        </CardTitle>
                                                    </CardBody>
                                                </React.Fragment>
                                            )
                                        }
                                        {isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <SkeletonTheme color="#202020" highlightColor="#c1c1c1">
                                                        <Skeleton height='100%' width='100%' />
                                                    </SkeletonTheme>
                                                </React.Fragment>
                                            )
                                        }
                                    </Card>
                                    <Card className="card-image-wrapper" onClick={likedAnImage(3)}>
                                        {
                                            !isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <CardImg
                                                        alt="Card image cap"
                                                        src={`data:image/png;base64, ${base64s[3]}`}
                                                        top
                                                        width="100%"
                                                        className='card-image'
                                                    />
                                                    <CardBody>
                                                        <CardTitle tag="h5">
                                                            Like It ?
                                                        </CardTitle>
                                                    </CardBody>
                                                </React.Fragment>
                                            )
                                        }
                                        {isLoadingImage
                                            && (
                                                <React.Fragment>
                                                    <SkeletonTheme color="#202020" highlightColor="#c1c1c1">
                                                        <Skeleton height='100%' width='100%' />
                                                    </SkeletonTheme>
                                                </React.Fragment>
                                            )
                                        }
                                    </Card>
                                </CardGroup>
                            </React.Fragment>
                        )
                        : (<CardGroup className='how-to-use-gif-wrapper'>
                            <h2 className="pick-one-image-text center">How to use</h2>
                            <div className='how-to-use-gif'>
                                <img src={howToUseGif} />
                            </div>
                        </CardGroup>)
                    }
                </ModalBody>
            </Modal>
        </React.Fragment >
    );
}

export default AIWidgetModal;