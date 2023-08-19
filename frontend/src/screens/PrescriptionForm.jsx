import React, { useState ,useContext,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { getError } from '../utils';
import { ViewIcon } from '@chakra-ui/icons';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const PrescriptionForm = () => {
  
  const { state } = useContext(Store);
  const { userInfo } = state;
  
  const [patientName, setPatientName] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');


  

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();

 

  try {
   

    const { data } = await Axios.post(
      '/api/prescription',
      {
        patientName,
        medication,
        dosage,
        instructions,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);
   
  } catch (error) {
    toast({
      title: 'Error Occured!',
      description: 'Failed to Creat the Pescription',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
  }
};

  return (
    <>
    <Container className="small-container mt-4">
      <h1 className="mb-4">Prescription Page</h1>
      <Form onSubmit={handlePrescriptionSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="patientName">Patient Name:</Form.Label>
          <Form.Control
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="medication">Medication:</Form.Label>
          <Form.Control
            type="text"
            id="medication"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="dosage">Dosage:</Form.Label>
          <Form.Control
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Instructions:</Form.Label>
          <Form.Control
            as="textarea"
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
          />
        </Form.Group>
        <div className="mt-3">
          <Button type="submit" variant="primary">
            Submit Prescription
          </Button>
        </div>
      </Form>
    </Container></>
  );
};

export default PrescriptionForm;
