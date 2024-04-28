import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Modal,
  ModalBody,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPets, addPet, editPet, deletePet } from "../actions/userActions";

function PetsScreen({ params }) {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const userPets = useSelector((state) => state.userPets);
  const { error, loading, pets } = userPets;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petSize, setPetSize] = useState("");

  const [petNameField, setPetNameField] = useState("");
  const [petTypeField, setPetTypeField] = useState("");
  const [petSizeField, setPetSizeField] = useState("");
  const [oldPetName, setOldPetName] = useState("");
  const [oldPetType, setOldPetType] = useState("");

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggleModal2 = (oldName, oldType) => {
    setShowModal2(!showModal2);
    setOldPetName(oldName);
    setOldPetType(oldType);
  };

  const handleToggleAlert = () => {
    setShowAlert(!showAlert);
  };

  useEffect(() => {
    if (!userInfo || id !== userInfo.username) {
      navigate("/login");
    }
    dispatch(getPets(id));
  }, [dispatch, showModal, showModal2]);

  const handleEdit = (
    currPetNameField,
    currPetTypeField,
    currPetSizeField,
    oldName,
    oldType
  ) => {
    setPetNameField(currPetNameField);
    setPetTypeField(currPetTypeField);
    setPetSizeField(currPetSizeField);
    handleToggleModal2(oldName, oldType);
  };

  const handleDelete = () => {
    console.log(oldPetName, oldPetType);
    dispatch(deletePet(id, oldPetName, oldPetType));
    setTimeout(handleToggleAlert(), 500);
    setTimeout(handleToggleModal2("", ""), 500);
  };

  const submitEdit = async (e) => {
    dispatch(
      editPet(
        id,
        petNameField,
        petTypeField,
        petSizeField,
        oldPetName,
        oldPetType
      )
    );

    setTimeout(handleToggleModal2("", ""), 500);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addPet(userInfo.username, petName, petType, petSize));

    setTimeout(handleToggleModal, 500);
  };

  return (
    <div>
      <div>
        <Container className="mt-5 mb-5">
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  {id}'s Pets
                </Card.Header>
                <Card.Body>
                  <Button
                    style={{ borderRadius: "7px" }}
                    onClick={handleToggleModal}
                    variant="info"
                  >
                    Add Pet
                  </Button>
                  <Row className="mt-3">
                    <Col lg={4} xl={3}>
                      <h5
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        Pet Name
                      </h5>
                    </Col>
                    <Col lg={4} xl={3}>
                      <h5
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        Pet Type
                      </h5>
                    </Col>
                    <Col lg={4} xl={3}>
                      <h5
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        Pet Size
                      </h5>
                    </Col>
                    {pets["pets"] &&
                      pets["pets"].map((pet) => (
                        <Row className="mt-1">
                          <Col lg={4} xl={3}>
                            <p style={{ textAlign: "center" }}>{pet[0]}</p>
                          </Col>
                          <Col lg={4} xl={3}>
                            <p style={{ textAlign: "center" }}>{pet[1]}</p>
                          </Col>
                          <Col lg={4} xl={3}>
                            <p style={{ textAlign: "center" }}>{pet[2]}</p>
                          </Col>
                          <Col lg={4} xl={3}>
                            <Button
                              size="sm"
                              style={{
                                display: "flex",
                                margin: "auto",
                                textSizeAdjust: "small",
                                height: "30px",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                handleEdit(
                                  pet[0],
                                  pet[1],
                                  pet[2],
                                  pet[0],
                                  pet[1]
                                )
                              }
                            >
                              Edit
                            </Button>
                          </Col>
                        </Row>
                      ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
        <Modal
          centered={true}
          size="lg"
          show={showModal}
          backdrop={true}
          keyboard="true"
          onHide={handleToggleModal}
          scrollable={true}
        >
          <Modal.Header closeButton style={{ backgroundColor: "#000000" }}>
            <Modal.Title
              style={{
                font: "caption",
                fontFamily: "revert-layer",
              }}
              className="text-light"
            >
              Add a New Pet
            </Modal.Title>
          </Modal.Header>
          <ModalBody style={{ backgroundColor: "#fffaf0" }}>
            <Form onSubmit={submitHandler} style={{ color: "black" }}>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Pet Name</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of your pet"
                  name="petName"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Pet Type</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  required
                >
                  <option>Choose...</option>
                  <option value="Bird">Bird</option>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                  <option value="Frog">Frog</option>
                  <option value="Guinea Pig">Guinea Pig</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Turtle">Turtle</option>
                  <option value="Rodent">Rodent</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Pet Size</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Select
                  value={petSize}
                  onChange={(e) => setPetSize(e.target.value)}
                  required
                >
                  <option>Choose...</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </ModalBody>
          <Modal.Footer style={{ backgroundColor: "#fffaf0" }}>
            <Button
              variant="danger"
              onClick={handleToggleModal}
              style={{ borderRadius: "5px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-md btn-success"
              variant="info"
              onClick={submitHandler}
              style={{ borderRadius: "5px" }}
            >
              Submit Pet
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          centered={true}
          size="lg"
          show={showModal2}
          backdrop={true}
          keyboard="true"
          onHide={() => handleToggleModal2("", "")}
          scrollable={true}
        >
          <Modal.Header closeButton style={{ backgroundColor: "#000000" }}>
            <Modal.Title
              style={{
                font: "caption",
                fontFamily: "revert-layer",
              }}
              className="text-light"
            >
              Edit Pet
            </Modal.Title>
          </Modal.Header>
          <ModalBody style={{ backgroundColor: "#fffaf0" }}>
            <Form onSubmit={submitEdit} style={{ color: "black" }}>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Pet Name</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of your pet"
                  name="petName"
                  value={petNameField}
                  onChange={(e) => setPetNameField(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Pet Type</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Select
                  value={petTypeField}
                  onChange={(e) => setPetTypeField(e.target.value)}
                  required
                >
                  <option>Choose...</option>
                  <option value="Bird">Bird</option>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                  <option value="Frog">Frog</option>
                  <option value="Guinea Pig">Guinea Pig</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Turtle">Turtle</option>
                  <option value="Rodent">Rodent</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Pet Size</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Select
                  value={petSizeField}
                  onChange={(e) => setPetSizeField(e.target.value)}
                  required
                >
                  <option>Choose...</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </Form.Select>
              </Form.Group>
              <Modal.Footer style={{ backgroundColor: "#fffaf0" }}>
                <Button
                  variant="danger"
                  style={{
                    borderRadius: "5px",
                    display: "flex",
                    marginRight: "auto",
                  }}
                  onClick={handleToggleAlert}
                >
                  Delete
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleToggleModal2("", "")}
                  style={{ borderRadius: "5px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn btn-md btn-success"
                  variant="info"
                  style={{ borderRadius: "5px" }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </ModalBody>
        </Modal>
        <Modal
          show={showAlert}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop={true}
          keyboard={true}
          onHide={handleToggleAlert}
        >
          <Modal.Header closeButton>
            <Modal.Title>ALERT</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete your listing?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              style={{ borderRadius: "5px" }}
              onClick={handleToggleAlert}
            >
              No
            </Button>
            <Button
              variant="info"
              style={{ borderRadius: "5px" }}
              onClick={handleDelete}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default PetsScreen;
