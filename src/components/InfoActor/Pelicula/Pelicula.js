import React from 'react'

import { Row, Col, Image, Typography, Tag } from 'antd';
import { URL_IMG_PELI } from '../../../constants/url';

const { Title, Paragraph } = Typography;

const Pelicula = ({ pelicula, generos }) => {

    const {  title, vote_average, poster_path, overview, release_date, genre_ids } = pelicula

    const castFecha = (_fecha) => {

        var fecha = new Date(_fecha);

        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString("es-ES", options);

    }

    const generos_peli = genre_ids.map( value => generos.filter( ( item ) => item.id === value  ) );

    console.log("generos " , generos_peli)

    return (
        <Row>
            <Col >
                <Row>
                    <Col span={18}>
                        <Title level={2}>{title}</Title>
                    </Col>
                    <Col span={6}>
                        <Title className='pelicula__text_align_rigth' level={2}>
                            {`${vote_average}/10`}  
                        </Title>
                    </Col>
                </Row>

                <Row >
                    <Col span={6} style={{ padding: '1%' }}>

                        <Row>
                            <Image
                                className="pelicula__img"
                                width={200}
                                src={URL_IMG_PELI + poster_path} />
                        </Row>

                    </Col>

                    <Col span={18} className='pelicula__container_detail' >

                        <Row className='pelicula__detail_container_arriba' >
                            <Col>
                                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'mas' }}>
                                    {overview}
                                </Paragraph>

                            </Col>
                        </Row>

                        <Row align="bottom" >
                            
                            <Col>
                            
                            {generos_peli.map( item =>  <Tag color="#55acee"> {item[0].name} </Tag>)}
                               <Title level={3} >{castFecha(release_date)}</Title>
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Col>

        </Row>
    )
}

export default Pelicula;
