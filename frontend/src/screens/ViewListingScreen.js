import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchListing } from "../actions/listingsActions";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listingState = useSelector((state) => state.listingView);
  const { loading, error, listing } = listingState;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [title, setTitle] = useState(listing ? listing.title : "");
  const [description, setDescription] = useState(
    listing ? listing.description : ""
  );
  const [price, setPrice] = useState(listing ? listing.price : "");
  const [location, setlocation] = useState(listing ? listing.location : "");
  const [availableDate, setavailableDate] = useState(
    listing ? listing.available_from : ""
  );
  const [duration, setDuration] = useState(listing ? listing.duration : "");
  const [preferences, setPreferences] = useState(
    listing ? listing.Preferences : ""
  );
  const [isActive, setIsActive] = useState(listing ? listing.is_active : true);
  const [sqft, setSqft] = useState(listing ? listing.sqft : "");
  const [beds, setBeds] = useState(listing ? listing.bedrooms : "");
  const [baths, setBaths] = useState(listing ? listing.bathrooms : "");
  const [image, setImage] = useState(listing ? listing.image : []); //image URL
  const [amenities, setAmenities] = useState(listing ? listing.amenities : {});

  useEffect(() => {
    dispatch(fetchListing(id));
    if (listing) {
      setTitle(listing.title);
      setDescription(listing.description);
      setPrice(listing.price);
      setlocation(listing.location);
      setavailableDate(listing.available_from);
      setDuration(listing.duration);
      setPreferences(listing.preferences);
      setIsActive(listing.is_active);
      setSqft(listing.sqft);
      setBeds(listing.bedrooms);
      setBaths(listing.bathrooms);
      setImage(listing.image);
      setAmenities(listing.amenities);
    }
  }, [dispatch, showModal, listing.username_id]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAmenities = (e) => {
    const { name, value } = e.target;
    setAmenities({
      ...amenities,
      [name]: !amenities[name],
    });
  };

  const profileRedirect = (e) => {
    navigate(`/profile/${listing.username_id}/`);
  };

  return (
    <div>
      <div>
        <Container>
          <Row>
            {loading && <Loader />}
            <Col key={listing.id} md={{ span: 6, offset: 2 }} xl={8}>
              <Card
                className="my-4"
                bg="primary"
                style={{
                  color: "white",
                  borderRadius: "10px",
                  border: "4px solid white",
                }}
              >
                <Card.Body>
                  {userInfo && listing.username_id === userInfo.username ? (
                    <Row>
                      <Col xl={3}>
                        <Button
                          variant="info"
                          className="text-center"
                          onClick={handleToggleModal}
                          style={{
                            borderRadius: "5px",
                            height: "40px",
                            width: "140px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Edit Listing
                        </Button>
                      </Col>
                      <Col md={{ span: 6 }}>
                        <Card.Text
                          className="text-center mb-2"
                          style={{ fontSize: "200%" }}
                        >
                          {listing.title}
                        </Card.Text>
                      </Col>
                    </Row>
                  ) : (
                    <Card.Text
                      className="text-center mb-2"
                      style={{ fontSize: "200%" }}
                    >
                      {listing.title}
                    </Card.Text>
                  )}
                  {listing.image ? (
                    <Carousel>
                      {listing.image.map((img) => (
                        <Carousel.Item>
                          <img
                            style={{ borderRadius: "5px" }}
                            className="d-block w-100"
                            src={`/media/${img.image}`}
                            width="500"
                            height="500"
                          ></img>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <></>
                  )}
                  <Card.Text
                    className="mt-3 text-center"
                    style={{ fontSize: "150%" }}
                  >
                    <i className="fa-solid fa-location-dot fa-xl"></i>
                    &nbsp;&nbsp;Address: {listing.location}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card
            style={{ borderRadius: "8px", border: "4px solid white" }}
            bg="primary"
          >
            <Row>
              <Col sm={12} md={6} lg={4} xl={7} className="p-2">
                <Card.Text className="ms-3" style={{ color: "white" }}>
                  <i
                    className="fa-solid fa-file-lines"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;Description: {listing.description}
                </Card.Text>
                <Card.Text className="ms-3" style={{ color: "white" }}>
                  <i
                    className="fa-solid fa-dollar-sign"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;{listing.price} per month |{" "}
                  <i
                    className="fa-solid fa-ruler-combined"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;{listing.sqft} sqft |{" "}
                  <i
                    className="fa-solid fa-bed"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;{listing.bedrooms} bedroom(s) |&nbsp;{" "}
                  <i
                    className="fa-solid fa-shower"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;{listing.bathrooms} bathroom(s)
                </Card.Text>
                <Card.Text className="ms-3" style={{ color: "white" }}>
                  <i
                    className="fa-solid fa-circle-plus"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;Amenities:
                  {listing.amenities &&
                    Object.keys(listing.amenities).map((a) =>
                      listing.amenities[a] ? " " + a + " |" : <></>
                    )}
                </Card.Text>
                <Card.Text className="ms-3" style={{ color: "white" }}>
                  <i
                    className="fa-solid fa-users-line"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;Roommate Preferences: {listing.preferences}
                </Card.Text>
                <Card.Text className="ms-3" style={{ color: "white" }}>
                  <i
                    className="fa-regular fa-clock"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;Duration: {listing.duration}
                </Card.Text>
                <Card.Text className="ms-3" style={{ color: "white" }}>
                  <i
                    className="fa-regular fa-calendar-days"
                    style={{ color: "#0091ff" }}
                  ></i>
                  &nbsp;Available Move-In Date: {listing.available_from}
                </Card.Text>
              </Col>
              <Col sm={12} md={6} lg={4} xl={5}>
                <Card.Text className="mt-4">&nbsp;</Card.Text>
                <Card.Text className="ms-3 mt-5" style={{ color: "white" }}>
                  <Button
                    variant="light"
                    style={{
                      borderRadius: "5px",
                      height: "30px",
                    }}
                    name={listing.username_id}
                    onClick={profileRedirect}
                  >
                    <i
                      className="fa-solid fa-user fa-xl"
                      style={{
                        color: "#0091ff",
                        display: "block",
                        margin: "0 auto",
                      }}
                    ></i>
                  </Button>
                  &nbsp;Uploaded by: {listing.username_id}
                </Card.Text>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default ViewListingScreen;
