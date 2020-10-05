import React, {useState} from 'react';
import { Table,Container,Card,Button, Modal, ModalHeader, ModalBody, ModalFooter,Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import data from './data.json'


const Example = (props) => {
  const [modal, setModal] = useState(false);
  const [values,setValues] = useState(false);
  const [error, setError] = useState(false);

  const toggle = () => setModal(!modal);

  const handleModal = (index) => {
    setValues(data[index])
    toggle();
  }

  const handleChange = (event) => {
      event.persist();
      setValues(values => ({
          ...values,
          [event.target.name] : event.target.value
      }));
  }

  const handleSave = () => {
    let errors = {};
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.name){
        errors.name = "Name is Required"
    }

    if (!values.email) {
        errors.email = "Email is required"
    } else if (!reg.test(String(values.email).toLowerCase())) {
        errors.email = "Email is not valid";
    }
    
    if(!values.username){
        errors.username = "Username is required"
    }


    if(Object.keys(errors).length === 0){
      toggle();
      setError(false)
    }else{
      setError(errors)
    }
  }

  return (
    <Container className="mt-5">
    <Card>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((v,i)=>{
          return(
            <tr>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.username}</td>
              <td>{v.email}</td>
              <td className="text-center"><Button color="light" size="sm" onClick={()=>handleModal(i)}><i className="fas fa-pencil-alt"></i></Button></td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="email" name="name" value={values.name} onChange={handleChange} placeholder="Name" />
                {error.name && <p className="text-danger">{error.name}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Username</Label>
              <Col sm={10}>
                <Input type="text" name="username" value={values.username} onChange={handleChange} placeholder="Username" />
                {error.username && <p className="text-danger">{error.username}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Email" />
                {error.email && <p className="text-danger">{error.email}</p>}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>handleSave()}>Save</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Card>
    </Container>
  );
}

export default Example;