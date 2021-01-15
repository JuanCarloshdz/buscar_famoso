import React, { useEffect, useState } from 'react'

import 'antd/dist/antd.css';

import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneros, getPeliculas, reinicarBusqueda, setListado } from '../../actions/busqueda';
import { useHistory } from 'react-router-dom';


import 'antd/dist/antd.css';
import { Button, Image, Typography, Spin } from 'antd';
import { ArrowLeftOutlined, UnorderedListOutlined, CreditCardOutlined } from '@ant-design/icons';

import './InfoActor.css'


import Moment from 'react-moment'
import 'moment/locale/fr';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Pelicula from './Pelicula/Pelicula';
import PeliculaCard from './PeliculaCard/PeliculaCard';

Moment.globalLocale = 'fr';

const { Title } = Typography;

const InfoActor = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.busqueda)

    const history = useHistory();

  
    useEffect(() => {

        if (state.actorName) {
            if (state.actorName.length > 0) {
                if (!state.peliculas) {
                    dispatch(getPeliculas(state.actorName));
                    dispatch(getGeneros());
                    console.log(state)
                }
            } else {
                console.log("No hay actor")
                history.push("/");
            }
        } else {
            console.log("No hay actor")
            history.push("/");
        }


    }, [dispatch, history, state])

    const regresar = () => {
        dispatch(reinicarBusqueda());
        history.push("/");
    }

    return (
        <>
            {state.peliculas && state.generos ? (
                <>
                    <Row className="cabecera" >
                        <Col span={8}>
                            <Button onClick={regresar} size='large' type="primary"> <ArrowLeftOutlined /> Regresar</Button>
                        </Col>
                    </Row>



                    <Row justify='center' align='top'  >

                        <ProfileInfo
                            actorName={state.actorName}
                            profile_path={(state.peliculas.results)[0].profile_path}
                            gender={state.peliculas.results[0].gender}
                            popularity={state.peliculas.results[0].popularity} />

                        <Col span={16}  >
                            <Row  >
                                <Col span='24'>
                                    <Row align="top">
                                        <Col span='18' >
                                            <Title >Peliculas </Title>
                                        </Col>

                                        <Col span='6' >
                                            <Row justify="end" >
                                                <Col>
                                                    <Button size='large'
                                                        icon={state.listado ? <UnorderedListOutlined /> : <CreditCardOutlined />}
                                                        onClick={() => dispatch( setListado(! state.listado))}></Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row align="bottom" >
                                        <Col span='24' >
                                            <Image.PreviewGroup>

                                                {state.listado ? state.peliculas.results[0].known_for.map(pelicula => <Pelicula key={pelicula.id} pelicula={pelicula} generos={state.generos} />) : (
                                                    <Row gutter={[8, 8]}>
                                                        {state.peliculas.results[0].known_for.map(pelicula => <Col xs={24} sm={18} md={12} xl={6} key={pelicula.id + 'card'}  > <PeliculaCard key={pelicula.id + 'card'} pelicula={pelicula} generos={state.generos} /> </Col>)}
                                                    </Row>)}

                                            </Image.PreviewGroup>
                                        </Col>
                                    </Row>


                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>) : <Spin />}


        </>
    )
}

export default InfoActor;
