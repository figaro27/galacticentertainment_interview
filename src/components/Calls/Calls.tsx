import React, { FC, useEffect, useState } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import { useSelector, actions, useDispatch } from '../../store';
import useAPI from '../../hooks/useAPI';
import { Call, ApiResponse } from '../../types';
import './Calls.scss';

const Calls: FC = () => {
  const calls = useSelector((state) => state.calls);
  const [newCall, setNewCall] = useState<Call>({
    id: 0,
    client: '',
    number: '',
    date: ''
  });
  const { getCalls, addCall } = useAPI();
  const dispatch = useDispatch();

  useEffect(() => {
    getCalls().then((res: ApiResponse)=> {
      const calls = res?.response
      if (res) dispatch(actions.set({ calls }));
    });
  }, []);

  const handleChange = <K extends keyof Call>(key: K) =>
  (e: { target: { value: string } }) => {
    const value = e.target.value;
    setNewCall((old) => ({ ...old, [key]: value }));
  };
  const handleSubmit = () => {
    addCall(newCall).then((res: ApiResponse) => {
      getCalls().then((res: ApiResponse)=> {
        const calls = res?.response
        if (res) dispatch(actions.set({ calls }));
      });
    })
  }

  return (
    <main className="calls">
      <h1>Calls</h1>
      <Form>
        <Row className="mb-3 d-flex align-items-end">
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jackson"
              value={newCall.client}
              onChange={handleChange('client')}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1 234 567 890"
              value={newCall.number}
              onChange={handleChange('number')}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="select date"
              value={newCall.date}
              onChange={handleChange('date')}
            />
          </Form.Group>

          <Col className="row__submit">
            <Button
              variant="primary"
              className="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Table bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Number</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call, idx) =>
            <tr key={idx}>
              <td>{call.id}</td>
              <td>{call.client}</td>
              <td>{call.number}</td>
              <td>{call.date}</td>
            </tr>
          )}
        </tbody>
      </Table>     
    </main>
  );
};

export default Calls;
