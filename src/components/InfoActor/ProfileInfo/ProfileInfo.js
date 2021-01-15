import React from 'react'

import { URL_IMG_PELI } from '../../../constants/url';

import { Row, Col, Image, Typography } from 'antd';

const { Title } = Typography;

const ProfileInfo = ({ profile_path, actorName, gender, popularity }) => {
    return (
        <Col justify='center'
            span={8} >


            <Row align="top">
                <Col span={24} style={{ padding: '10%' }}>
                    <Image
                        className="img_perfil"
                        width='100%'
                        src={URL_IMG_PELI + profile_path} />
                </Col>
            </Row>

            <Row justify='center'>
                <Col span={24}>
                    <Title className='container__text_center' >{actorName}</Title>
                </Col>
            </Row>

            <Row justify='center' >
                <Col>
                    <Title className='container__text_center' level={2} >{gender === 2 ? 'Hombre' : 'Mujer'}</Title>
                </Col>
            </Row>

            <Row justify='center' >
                <Col>
                    <Title className='container__text_center' level={3} >Popularidad: {popularity}</Title>
                </Col>
            </Row>


        </Col>
    )
}

export default ProfileInfo;
