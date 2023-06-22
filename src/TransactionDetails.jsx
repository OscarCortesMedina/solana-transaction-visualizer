import React from 'react';
import { Table,OverlayTrigger,Tooltip } from 'react-bootstrap';
import './App.css';
const TransactionDetails = ({ transaction,signature }) => {
  if (!transaction) return null;
  
  const { blockTime, meta, slot, version } = transaction;
  
  return (
    <Table striped bordered hover className="responsive-table">
     
      <tbody>
        <tr>
          <td>Signature</td>
          <OverlayTrigger
            overlay={
                <Tooltip id={`tooltip-${signature}`}>
                {signature}
                </Tooltip>}>
              <td className="truncate">{signature}</td>
          </OverlayTrigger>
        </tr>
        <tr>
          <td>Result</td>
          <td>{meta.err ? "Error: "+meta.err.InstructionError[1]: "Success"}</td>
        </tr>
        <tr>
          <td>Block Time</td>
          <td>{blockTime ? new Date(blockTime * 1000).toLocaleString() : 'N/A'}</td>
        </tr>
        <tr>
          <td>Slot</td>
          <td>{slot}</td>
        </tr>
        <tr>
          <td>Recent blockhash</td>
          <td className="truncate">{transaction ? transaction.transaction.message.recentBlockhash : 'N/A'}</td>
        </tr>
        <tr>
          <td>Fee</td>
          <td>{meta ? meta.fee/1000000000: 'N/A'}</td>
        </tr>
        <tr>
          <td>Compute units consumed</td>
          <td>{meta ? meta.computeUnitsConsumed: 'N/A'}</td>
        </tr>
         <tr>
          <td>Version</td>
          <td>{version || 'N/A'}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TransactionDetails;