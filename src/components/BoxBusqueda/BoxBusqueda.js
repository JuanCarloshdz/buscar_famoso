import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Upload, message, Row, Col, Typography, Spin } from 'antd';

import { InboxOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import { getActor } from '../../actions/busqueda';

import { useHistory } from 'react-router-dom';



const { Title } = Typography
const BoxBusqueda = () => {

    const { Dragger } = Upload;
    const [cargando, setCargando] = useState(false);
    const dispatch = useDispatch();

    const state = useSelector((state) => state.busqueda)


    const history = useHistory();

    useEffect(() => {
        console.log(state)
        if (state.actorName) {
            if (state.actorName.length > 0) {
                console.log('hay actor');
                history.push("/info");
            } else {
                console.log("No hay actor")
            }
        } else {
            console.log("No hay actor")
        }

        if (state.error) {
            if (state.error.length > 0) {
                message.error(state.error);
                setCargando(false)
            }
        }

    }, [state, history]);


    const propsDragger = {
        multiple: false,
        customRequest(info) {
            setCargando(true);
            dispatch(getActor(info.file));

        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {

                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    return (
        <>
            <div style={{ height: '35vh' }} ></div>
            <Row justify="center">
                <Col span={12}>
                    <div style={{ height: '30vh', border: '30px solid #d3d3d3', borderRadius: '15px' }} >
                        <Row justify="center" >
                            <Col  >
                                <Title>¿Quién es el Actor?</Title>
                            </Col>
                        </Row>
                        {cargando === false ? <Row justify="center" >
                            <Col  >
                                <Dragger {...propsDragger} fileList={[]}>

                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Haz click o arrastra una imagen</p>
                                    <p className="ant-upload-hint">Selecciona la foto de un actor famoso para conocer quién es y en qué peliculas ha salido  </p>
                                </Dragger>
                            </Col>
                        </Row> :
                            <Row justify="center" >
                                <Col  >
                                    <Spin tip="Loading...">
                                        <Dragger {...propsDragger} fileList={[]}>

                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Haz click o arrastra una imagen</p>
                                            <p className="ant-upload-hint">Selecciona la foto de un actor famoso para conocer quién es y en qué peliculas ha salido  </p>
                                        </Dragger>
                                    </Spin>
                                </Col>
                            </Row>}

                    </div>
                </Col>
            </Row>
            <div style={{ height: '35vh' }} ></div>
        </>

    )
}

export default BoxBusqueda;
