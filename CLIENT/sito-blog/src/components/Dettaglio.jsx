import axios from 'axios'
import React, { useEffect,  useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Dettaglio() {
    const [products, setProducts] = useState(null)
    let { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/blog/' + id)
            .then(resp => setProducts(resp.data))

            .catch(err => console.error(err))
    }, [id]);


    return (
        <>

            {
                products ?
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={products.image} />
                        <Card.Body>
                            <Card.Title>{products.name}</Card.Title>
                            <Card.Text>
                                {products.price}
                            </Card.Text>
                            <Card.Text>
                                {products.description}
                            </Card.Text>
                            <Button variant="primary">Acquista</Button>
                        </Card.Body>
                    </Card>
                    : ""
            }
        </>

    )
}
