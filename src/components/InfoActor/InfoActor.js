import React, { useEffect } from 'react'

import 'antd/dist/antd.css';

import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneros, getPeliculas, reinicarBusqueda } from '../../actions/busqueda';
import { useHistory } from 'react-router-dom';


import 'antd/dist/antd.css';
import { Button, Image, Typography, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './InfoActor.css'


import Moment from 'react-moment'
import 'moment/locale/fr';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Pelicula from './Pelicula/Pelicula';

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

    const regresar =()=>{
        dispatch(reinicarBusqueda());
        history.push("/");
    }

    return (
        <>
            {state.peliculas && state.generos ? (
                <>
                    <Row className="cabecera" >
                        <Col span={8}>
                            <Button onClick={ regresar } size='large' type="primary"> <ArrowLeftOutlined /> Regresar</Button>
                        </Col>
                    </Row>



                    <Row justify='center' align='top'  >

                        <ProfileInfo
                            actorName={state.actorName}
                            profile_path={(state.peliculas.results)[0].profile_path}
                            gender={state.peliculas.results[0].gender}
                            popularity={state.peliculas.results[0].popularity} />

                        <Col span={16}  >
                            <Row gutter={8}  >
                                <Col>
                                    <Row align="top">
                                        <Col span='24' >
                                            <Title >Peliculas</Title>
                                        </Col>
                                    </Row>

                                    <Row align="bottom" >
                                        <Col>
                                            <Image.PreviewGroup>
                                                {state.peliculas.results[0].known_for.map(pelicula => <Pelicula key={pelicula.id} pelicula={pelicula} generos={state.generos} />)}
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
