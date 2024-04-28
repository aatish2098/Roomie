import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncError, useParams } from "react-router-dom";

import {
  fetchListingDetails,
  getPetPolicies,
} from "../actions/listingsActions";
import { getPets, addFav, checkFav, delFav } from "../actions/userActions";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  ModalBody,
  Carousel,
  CarouselItem,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function ViewListingScreen({ params }) {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unitState = useSelector((state) => state.unitDetails);
  const { loading, error, unitDetails } = unitState;
  const userPets = useSelector((state) => state.userPets);
  const { errorPet, loadingPet, pets } = userPets;
  const unitPetPolicy = useSelector((state) => state.unitPetPolicy);
  const { errorPolicy, loadingPolicy, petPolicy } = unitPetPolicy;
  const userCheckFav = useSelector((state) => state.userCheckFav);
  const { errorFav, loadingFav, isFav } = userCheckFav;
  const [flag, setFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);
  // const [favorited, setFavorited] = useState(false);
  // console.log(unitDetails);
  console.log(isFav);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTogglepetModal = () => {
    setShowPetModal(!showPetModal);
  };

  const loadPolicies = () => {
    dispatch(getPetPolicies(buildingInfo[0], buildingInfo[1], pets.pets));
    setShowPetModal(!showPetModal);
  };

  const handleFav = () => {
    dispatch(addFav(userInfo.username, id));
    setFlag(!flag);
  };

  const handleRemoveFav = () => {
    dispatch(delFav(userInfo.username, id));
    setFlag(!flag);
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(checkFav(userInfo.username, id));
      dispatch(getPets(userInfo.username));
    }
    dispatch(fetchListingDetails(id));
  }, [dispatch, flag]);

  const apt = unitDetails.unitInfo;
  const aptAmenities = unitDetails.unitAmenities;
  const aptRooms = unitDetails.length != 0 ? unitDetails.unitRooms[0] : null;
  const buildingInfo =
    unitDetails.length != 0 ? unitDetails.buildingInfo[0] : null;
  const buildingAmenities = unitDetails.buildingAmenities;

  // console.log(petPolicy);

  return (
    <div>
      <div>
        <Container>
          <Row>
            {/* {loading && <Loader />} */}
            <Col>
              <Card
                className="my-4"
                bg="primary"
                style={{
                  color: "white",
                  borderRadius: "10px",
                  border: "4px solid white",
                }}
              >
                {unitDetails.length != 0 && (
                  <Card.Body>
                    <Col>
                      <Card.Text style={{ fontSize: "150%" }}>
                        <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                          Unit Rent ID #:
                        </span>{" "}
                        {apt[0]}
                      </Card.Text>
                      {userInfo && isFav && !isFav.isFav && (
                        <Button
                          variant="info"
                          onClick={handleFav}
                          style={{ fontSize: "75%", borderRadius: "7px" }}
                        >
                          Add to Favorites
                        </Button>
                      )}
                      {userInfo && isFav && isFav.isFav && (
                        <Button
                          variant="danger"
                          onClick={handleRemoveFav}
                          style={{ fontSize: "75%", borderRadius: "7px" }}
                        >
                          Remove From Favorites
                        </Button>
                      )}
                      <Button
                        variant="info"
                        className="m-3"
                        style={{ fontSize: "75%", borderRadius: "7px" }}
                        onClick={handleToggleModal}
                      >
                        View Interests
                      </Button>
                    </Col>
                    <Card.Text className="mt-3" style={{ fontSize: "100%" }}>
                      <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                        Apartment #:
                      </span>{" "}
                      {apt[3]}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "100%" }}>
                      <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                        Square Footage:
                      </span>{" "}
                      {apt[5]} ft
                      <span style={{ verticalAlign: "super" }}>2</span>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "100%" }}>
                      <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                        Monthly Rent Price:
                      </span>{" "}
                      $ {apt[4]}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "100%" }}>
                      <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                        Available Date For Move-In:
                      </span>{" "}
                      {apt[6]}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "100%" }}>
                      {aptRooms[1]} Bedroom(s) | {aptRooms[0]} Bathroom(s)
                    </Card.Text>
                    <Card.Text style={{ fontSize: "100%" }}>
                      <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                        In-Unit Amenities:{" "}
                      </span>{" "}
                      {aptAmenities &&
                        aptAmenities.map((amenity) => amenity + ", ")}{" "}
                    </Card.Text>
                  </Card.Body>
                )}
              </Card>
            </Col>
          </Row>
          <Card
            style={{ borderRadius: "8px", border: "4px solid white" }}
            bg="primary"
          >
            <Row>
              <Col sm={12} md={6} lg={4} xl={7} className="p-2">
                {unitDetails.length != 0 && (
                  <Card.Body>
                    <Card.Text
                      className="ms-3"
                      style={{
                        color: "white",
                        fontSize: "150%",
                      }}
                    >
                      <span style={{ fontWeight: "bold", color: "#faafaf" }}>
                        Company:{" "}
                      </span>
                      {buildingInfo[0]}
                    </Card.Text>
                    {userInfo && (
                      <Button
                        className="ms-3"
                        variant="info"
                        onClick={loadPolicies}
                        style={{ fontSize: "75%", borderRadius: "7px" }}
                      >
                        View Pet Policies
                      </Button>
                    )}
                    <Card.Text
                      className="ms-3 mt-3"
                      style={{ color: "white", fontSize: "100%" }}
                    >
                      <span style={{ fontWeight: "bold", color: "#faafaf" }}>
                        Building Name:
                      </span>{" "}
                      {buildingInfo[1]}
                    </Card.Text>
                    <Card.Text
                      className="ms-3"
                      style={{ color: "white", fontSize: "100%" }}
                    >
                      <span style={{ fontWeight: "bold", color: "#faafaf" }}>
                        Address:{" "}
                      </span>{" "}
                      {buildingInfo[2]} {buildingInfo[3]}
                      {", "}
                      {buildingInfo[4]}
                      {", "}
                      {buildingInfo[5]} {buildingInfo[6]}
                    </Card.Text>
                    <Card.Text
                      className="ms-3"
                      style={{ color: "white", fontSize: "100%" }}
                    >
                      <span style={{ fontWeight: "bold", color: "#faafaf" }}>
                        Year Built:{" "}
                      </span>{" "}
                      {buildingInfo[7]}
                    </Card.Text>
                    <Card.Text className="ms-3" style={{ color: "white" }}>
                      <span style={{ fontWeight: "bold", color: "#faafaf" }}>
                        Shared Amenities:
                      </span>{" "}
                      {buildingAmenities &&
                        buildingAmenities.map((amenity) => amenity + ", ")}
                    </Card.Text>
                    <Card.Text className="ms-3" style={{ color: "white" }}>
                      <span style={{ fontWeight: "bold", color: "#faafaf" }}>
                        Total Available Units For Rent:
                      </span>{" "}
                      {buildingInfo[8]}
                    </Card.Text>
                  </Card.Body>
                )}
              </Col>
              <Col sm={12} md={6} lg={4} xl={5}>
                <Card.Text className="mt-4">&nbsp;</Card.Text>
              </Col>
            </Row>
          </Card>
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
              View Interests
            </Modal.Title>
          </Modal.Header>
          <ModalBody style={{ backgroundColor: "#fffaf0" }}>
            <Form style={{ color: "black" }}>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>Move-In Date</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Control
                  type="date"
                  // value={petName}
                  // onChange={(e) => setPetName(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="petName">
                <Form.Label>How Many Roommates Are You Looking For?</Form.Label>
                &nbsp;
                <i
                  className="fa-solid fa-asterisk"
                  style={{ color: "#ff0000" }}
                ></i>
                <Form.Control
                  type="number"
                  // value={petType}
                  // onChange={(e) => setPetType(e.target.value)}
                  required
                ></Form.Control>
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
              // onClick={submitHandler}
              style={{ borderRadius: "5px" }}
            >
              Submit Interest
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          centered={true}
          size="lg"
          show={showPetModal}
          backdrop={true}
          keyboard="true"
          onHide={handleTogglepetModal}
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
              Pet Eligibility
            </Modal.Title>
          </Modal.Header>
          <ModalBody style={{ backgroundColor: "#fffaf0" }}>
            <Row>
              <Col>
                <Card.Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Your Pet
                </Card.Text>
              </Col>
              <Col>
                <Card.Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Pet Type
                </Card.Text>
              </Col>
              <Col>
                <Card.Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Pet Size
                </Card.Text>
              </Col>
              <Col>
                <Card.Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Allowed?
                </Card.Text>
              </Col>
              <Col>
                <Card.Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Reg. Fee
                </Card.Text>
              </Col>
              <Col>
                <Card.Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Monthly Fee
                </Card.Text>
              </Col>
              {petPolicy &&
                petPolicy.policies.map((policy) => (
                  <Row>
                    <Col>
                      <Card.Text style={{ textAlign: "center" }}>
                        {policy[0]}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text style={{ textAlign: "center" }}>
                        {policy[1]}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text style={{ textAlign: "center" }}>
                        {policy[2]}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text style={{ textAlign: "center" }}>
                        {policy[3] ? (policy[3][0] == 1 ? "Yes" : "No") : "N/A"}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text style={{ textAlign: "center" }}>
                        {policy[3] ? `$${policy[3][2]}` : "N/A"}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text style={{ textAlign: "center" }}>
                        {policy[3] ? `$${policy[3][1]}` : "N/A"}
                      </Card.Text>
                    </Col>
                  </Row>
                ))}
            </Row>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default ViewListingScreen;
