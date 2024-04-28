import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchListingDetails } from "../actions/listingsActions";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  ModalBody,
} from "react-bootstrap";

function ViewListingScreen({ params }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const unitState = useSelector((state) => state.unitDetails);
  const { unitDetails } = unitState;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  // console.log(unitDetails);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(fetchListingDetails(id));
    dispatch(fetchComments());
  }, [dispatch]);


  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`get_comments/`, {
        UnitRentID: id
      });
      setComments(data.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      alert('You must be logged in to comment.');
      return;
    }
    try {
      const { data } = await axios.post(`/api/add_comment/`, {
        UnitRentID: id,
        Username: userInfo.username,
        Content: newComment
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  }

  const apt = unitDetails.unitInfo;
  const aptAmenities = unitDetails.unitAmenities;
  const aptRooms = unitDetails.length !== 0 ? unitDetails.unitRooms[0] : null;
  const buildingInfo =
    unitDetails.length !== 0 ? unitDetails.buildingInfo[0] : null;
  const buildingAmenities = unitDetails.buildingAmenities;
  // console.log(apt);
  // console.log(aptAmenities);
  // console.log(aptRooms);
  console.log(buildingInfo);
  console.log(buildingAmenities);

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
                {unitDetails.length !== 0 && (
                  <Card.Body>
                    <Col>
                      <Card.Text style={{ fontSize: "150%" }}>
                        <span style={{ fontWeight: "bold", color: "#afd8fa" }}>
                          Unit Rent ID #:
                        </span>{" "}
                        {apt[0]}
                      </Card.Text>
                      <Button variant="info" style={{ fontSize: "75%" }}>
                        Add to Favorites
                      </Button>
                      <Button
                        variant="info"
                        className="m-3"
                        style={{ fontSize: "75%" }}
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
                {unitDetails.length !== 0 && (
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
                    <Card.Text
                      className="ms-3"
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
          <div>
            <Container>
              <h4>Comments</h4>
              {comments.map((comment, index) => (
                  <Card key={comment.CommentID}>
                    <Card.Body>
                      <Card.Text>{comment.Username}: {comment.Content}</Card.Text>
                      <Card.Text><small>{new Date(comment.CreatedAt).toLocaleString()}</small></Card.Text>
                    </Card.Body>
                  </Card>
              ))}
              {userInfo && (
                  <Form onSubmit={handleCommentSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Comment:</Form.Label>
                      <Form.Control
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          required
                      />
                    </Form.Group>
                    <Button type="submit">Submit Comment</Button>
                  </Form>
              )}
            </Container>
          </div>
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
      </div>
    </div>
  );
}

export default ViewListingScreen;
