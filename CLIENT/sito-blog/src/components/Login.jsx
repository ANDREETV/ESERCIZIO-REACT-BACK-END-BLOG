import axios from 'axios';
import React, { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    // const [errorPassword, setErrorPassword] = useState(null)
    // const [errorUsername, setErrorUsername] = useState(null)
    const [obj, setObj] = useState([])
    const handleChange = (e) => {
        // console.log(e.target.name);
        let { name, value } = e.target;
        setObj({
            ...obj,
            [name]: value
        })
    }
    // console.log("quai", obj);

    const handleSubmit = async () => {

        try {
            const response = await axios.post("http://localhost:3000/login", obj)
            console.log(response)
            // const isLogin = response.status === 200 
            // console.log(isLogin);
            if (response.status === 200) { navigate("/") }
        } catch (err) {
            console.log(err)
            alert("password o user errati")
            console.log(obj);

    }

    // const handleSubmit = () => {


    //     axios({
    //         method: 'POST',
    //         url: 'http://localhost:3000/login',
    //         data: obj,
    //     })
    //         .then(res => {
    //             navigate('/')

    //         })
    //         .catch((error) => console.log(error));
    }

    return (
        <Container className="pagina">
            <Row className='flex-column'>
                <Col>
                    <h1 className='mt-5'>Login</h1>
                </Col>
                <Col className='mt-5'>
                    <form >
                        <div className="mb-3">
                            <input type="text" name="username" onChange={handleChange} className="form-control" placeholder="username..." />
                            {/* {errorUsername && <p className='' style={{ color: "red" }}>{errorUsername}</p>} */}
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="password..." />
                            {/* {errorPassword && <p className='' style={{ color: "red" }}>{errorPassword}</p>} */}
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



