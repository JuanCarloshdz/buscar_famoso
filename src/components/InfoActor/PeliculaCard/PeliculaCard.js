import React from 'react'
import { Col, Row, Card, Typography, Image, Tag } from 'antd';
import 'antd/dist/antd.css';
import { URL_IMG_PELI } from '../../../constants/url';

const { Title, Paragraph } = Typography
const PeliculaCard = ({ pelicula, generos }) => {

    const { title, vote_average, poster_path, overview, release_date, genre_ids } = pelicula

    const castFecha = (_fecha) => {

        var fecha = new Date(_fecha);

        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString("es-ES", options);

    }

    const generos_peli = genre_ids.map(value => generos.filter((item) => item.id === value));


    return (
        <Row>
            <Col>
                <Card
                    hoverable
                    style={{ width: 220 }}
                    cover={<Image alt="example" src={URL_IMG_PELI + poster_path} />}>
                    <Row>
                        <Col>
                            <Title level={5}>{title}</Title>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Title level={5}>
                                {`${vote_average}/10`}
                            </Title>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Paragraph copyable={{ text: overview }} ellipsis={{ rows: 2, expandable: true, symbol: 'mas' }}>
                                {overview}
                            </Paragraph>
                        </Col>
                    </Row>



                    {generos_peli.map(item => <Row gutter={[8, 8]}> <Col key={item[0].name + 'card'} span={8} > <Tag color="#55acee"> {item[0].name} </Tag> </Col> </Row>)}

                    <Row align="bottom" >
                        <Col>
                            <Title level={5} >Fecha de estreno: {castFecha(release_date)}</Title>
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row>
    )
}

export default PeliculaCard;
