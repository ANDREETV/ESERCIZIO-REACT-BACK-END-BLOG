import React, { useEffect, useState } from 'react'
import { Col, Container, Row, ListGroup, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [nome, setNome] = useState("");
    const [prezzo, setPrezzo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [image, setImage] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/blog/')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, []);


    const editSubmit = (e) => {
        e.preventDefault()
        const editProducts = {
            name: nome,
            price: prezzo,
            description: descrizione,
            image: image
        }

        axios.put('http://localhost:3000/blog/' + selectedProduct._id, editProducts)
            .then(res => {

                const updatedProducts = products.map((pro) =>
                    // console.log("vedi",  (pro._id))
                    (pro._id === selectedProduct._id ? res.data : pro)
                );
                setProducts(updatedProducts);
                setSelectedProduct(null)
                // setNome("");
                // setPrezzo("");
                // setDescrizione("");
                // setImage("");
            })
            .catch((error) => console.log(error));
        handleClose()
    }



    const putSubmit = (id) => {
        handleShow()
        const productsEdit = products.find((pro) => pro._id === id)
        if (productsEdit) {
            setSelectedProduct(productsEdit);
            setNome(productsEdit.name);
            setPrezzo(productsEdit.price);
            setDescrizione(productsEdit.description);
            setImage(productsEdit.image);
        }
    };

    const dettaglio = (id) => {
        navigate('/dettaglio/' + id)
    }

    const deleteProduct = (id) => {
        axios.delete('http://localhost:3000/blog/' + id)
            .then(() => {
                let productFilter = products.filter(p => p._id !== id)
                setProducts(productFilter)
            })
            .catch(err => console.error(err))
    }
    return (
        <Container className="pagina">
            <Row>
                <Col>
                    <h1 className='mt-5'>Prodotti</h1>
                    <ListGroup className='mt-5 gap-3'>
                        {products.map(pros => (
                            <ListGroup.Item key={pros._id} className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex gap-2'>
                                    <span>NOME : {pros.category} </span>
                                    <span>PREZZO: {pros.title} </span>
                                    <span>DESCRIZIONE: {pros.cover}</span>
                                    <span>IMMAGINE: {pros.content}</span>
                                </div>
                                <div className='d-flex gap-2'>
                                    <Button onClick={() => dettaglio(pros._id)} variant="outline-success">Dettaglio</Button>
                                    <Button onClick={() => putSubmit(pros._id)} variant="outline-warning">Modifica</Button>
                                    <Button onClick={() => deleteProduct(pros._id)} variant="outline-danger">Elimina</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica prodotto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <input type="text" name='nome' value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" placeholder="Nome Prodotto..." />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="prezzo" value={prezzo} onChange={(e) => setPrezzo(e.target.value)} className="form-control" placeholder="Prezzo..." />
                        </div>
                        <div className="mb-3">
                            <textarea style={{ height: '100px' }} placeholder="Descrizione..." type="text" name="descrizione" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} className="form-control form-descrizione" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} className="form-control" placeholder="Image..." />
                        </div>
                        <div className="mb-2 d-grid gap-2">
                            <Button variant="dark" type="submit" onClick={editSubmit}>Invia</Button>
                        </div>
                    </form>
                </Modal.Body>





                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}




