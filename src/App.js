import React, { useState } from 'react';
import { Connection,clusterApiUrl } from '@solana/web3.js';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionDetails from './TransactionDetails';

// Setup connection to Solana cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const SolanaTransactionVisualizer = () => {
  // Define state variables for transactionId and transactionDetails
  const [transactionId, setTransactionId] = useState('');
  const [signatureId, setSignatureId] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch transaction details
  const fetchTransaction = async () => {
    try {
      const config= {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 1
      };
      console.log(transactionId);
      const transaction = await connection.getParsedTransaction(transactionId, config);
      if (!transaction) {
        setError('Transaction ID is not valid or does not exist.');
        setTransactionDetails(null);
        return;
      }
      setSignatureId(transactionId);
      setTransactionDetails(transaction);
      setError(null);
    } catch (e) {
      console.log(e);
      setTransactionDetails(null);
      setError('An error occurred while fetching the transaction details.');
    }
  };

  const handleInputChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTransaction();
  };

  return (
    <div className="mt-3 p-2">
      <Card>
        <Card.Body>
          <Card.Title>Solana Transaction Visualizer</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="transactionId">
              <Form.Label>Transaction ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Solana transaction ID"
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                The transaction ID should be a valid Solana transaction.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Fetch Transaction Details
            </Button>
          </Form>
          {transactionDetails && (
            <div className="mt-3">
                <TransactionDetails transaction={transactionDetails} signature={signatureId}  />
            </div>
          )}
        </Card.Body>
      </Card>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
};

export default SolanaTransactionVisualizer;
