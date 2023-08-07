import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

export default function PrescriptionsScreen() {
  return (
    <div>
      <Helmet>
        <title>Prescriptions</title>
      </Helmet>
      <h1>Prescriptions</h1>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DOCTOR</th>
            <th>PATIENT</th>
            <th>DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
