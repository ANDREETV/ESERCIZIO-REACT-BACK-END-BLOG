import axios from 'axios';
import React, { useState } from 'react'
import { Col, Container, Row, Button,Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewBlog() {

    const navigate = useNavigate()

    const [obj, setObj] = useState([])
    // const handleChange = (e) => {
    //     console.log(e.target.name);
    //     let {name, value} = e.target;
    //     setObj({
    //         ...obj,
    //         [name]:value
    //     })
    // }
    const handleChange = (value) => {
        setObj({ ...obj, content: value })
    }

    const handleSubmit = () => {
        const formData = new FormData();
        // console.dir("qui", obj.cover )
        for ( var key in obj ) {
            formData.append(key, obj[key]);
        }
        // formData.append({...obj});
        formData.append("uploadFile", obj.cover);

        axios({
            method: 'POST',
            url: 'http://localhost:3000/blog',
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
                    <h1 className='mt-5'>Aggiungi Blog</h1>
                </Col>
                <Col className='mt-5'>
                    <form >
                        <div className="mb-3">
                            <input type="text" name='category' onChange={e => setObj({ ...obj, category: e.target.value })} className="form-control" placeholder="Category..." />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="title" onChange={e => setObj({ ...obj, title: e.target.value })} className="form-control" placeholder="Title..." />
                        </div>
                        <div className="mb-3">
                            <ReactQuill onChange={handleChange} value={obj.content} />
                        </div>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" 
                            name="cover"
                            onChange={e => setObj({ ...obj, cover: e.target.file})}
                            />
                        </Form.Group>
                        <div className="mb-2 d-grid gap-2">
                            <Button onClick={handleSubmit} variant="dark" type="button">Invia</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
//  <Form>
// <Form.Group className="mb-3" controlId="formBasicEmail">
//   <Form.Label>Nome Prodotto</Form.Label>
//   <Form.Control type="text" name='category' onChange={handleChange} placeholder="Category..."/>
// </Form.Group>

// <Form.Group className="mb-3" controlId="formBasicPassword">
//   <Form.Label>Title</Form.Label>
//   <Form.Control type="text" name="title" onChange={handleChange} placeholder="Title..."  />
// </Form.Group>

// <Form.Group className="mb-3" controlId="formBasicPassword">
//   <Form.Label>Cover</Form.Label>
//   <Form.Control placeholder="Cover..."  type="text" name="cover"   onChange={handleChange}  />
// </Form.Group>
// <Button variant="primary" type="submit">
//   Submit
// </Button>
//  </Form>

