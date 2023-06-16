import axios from 'axios';
import React, { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function NewUser() {
    const navigate = useNavigate()

    const [obj, setObj] = useState([])
    const handleChange = (e) => {
        console.log(e.target.name);
        let {name, value} = e.target;
        setObj({
            ...obj,
            [name]:value
        })
    }

    const handleSubmit = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: obj,
        })
            .then(res => {
                navigate("/")
            })
            .catch((error) => console.log(error));
    }

    return (
        <Container className="pagina">
            <Row className='flex-column'>
                <Col>
                    <h1 className='mt-5'>Registrati</h1>
                </Col>
                <Col className='mt-5'>
                    <form >
                        <div className="mb-3">
                            <input type="text" name='fullname'   onChange={handleChange} className="form-control" placeholder="fullname..."/>
                        </div>
                        <div className="mb-3">
                            <input type="text" name="username"   onChange={handleChange} className="form-control" placeholder="username..." />
                        </div>
                        <div className="mb-3">
                            <input placeholder="email..." type="text" name="email"   onChange={handleChange}  className="form-control form-descrizione" />
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="password..." />
                        </div>
                        <div className="mb-2 d-grid gap-2">
                            <Button onClick={handleSubmit} variant="dark" type="button">Invia</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}



