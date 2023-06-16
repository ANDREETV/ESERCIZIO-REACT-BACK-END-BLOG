import Card from 'react-bootstrap/Card';
import React from 'react'

export default function Footer() {
    return (
        <Card bg="dark" variant="dark" className="text-center">
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title className='text-white'>Prodotti</Card.Title>
                <Card.Text className='text-white'>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
