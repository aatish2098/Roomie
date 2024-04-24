import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, createListing } from "../actions/listingsActions";
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
} from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";

function ListingsScreen() {
  const dispatch = useDispatch();
  const listingsState = useSelector((state) => state.listingsView);
  const { loading, error, listings } = listingsState;
  const navigate = useNavigate(); // Hook for navigation
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // State for the new listing form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setlocation] = useState("");
  const [availableDate, setavailableDate] = useState("");
  const [duration, setDuration] = useState("");
  const [sqft, setSqft] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [amenities, setAmenities] = useState({});

  const [showModal, setShowModal] = useState(false);

  const listingRedirect = (e) => {
    navigate(`${e.target.name}/`);
  };

  const handleAmenities = (e) => {
    const { name, value } = e.target;
    setAmenities({
      ...amenities,
      [name]: !amenities[name],
    });
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setTitle("");
    setDescription("");
    setPrice("");
    setlocation("");
    setavailableDate("");
    setDuration("");
    setSqft("");
    setBeds("");
    setBaths("");
    setAmenities({});
  };

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch, showModal]);

  // Handle form submission
  const submitHandler = async (e) => {};

  return (
    <div>
      <div>
        <Container>
          <Row>
            <Card
              className="p-4 my-4"
              style={{ borderRadius: "10px", border: "4px solid white" }}
              bg="primary"
            >
              <h1 className="text-center text-light">Available Units</h1>

              {userInfo ? (
                <Button
                  style={{
                    backgroundPosition: "center",
                    display: "block",
                    margin: "auto",
                    borderRadius: "5px",
                  }}
                  onClick={handleToggleModal}
                  className="btn btn-md btn-success"
                >
                  Create New Listing
                </Button>
              ) : (
                <></>
              )}
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                <Row>
                  {listings.map((listing) => (
                    <Col key={listing.id} sm={12} md={6} lg={4} xl={4}>
                      <Card
                        className="my-4"
                        // bg="secondary"
                        border="light"
                        style={{
                          color: "black",
                          borderRadius: "10px",
                          backgroundColor: "#f2f1e1",
                        }}
                      >
                        <Card.Body>
                          <Card.Title className="mt-3">
                            {listing.title}
                          </Card.Title>
                          <Card.Text>
                            <i className="fa-solid fa-location-dot"></i>
                            &nbsp;{listing.location}
                          </Card.Text>

                          <Card.Text>
                            <i className="fa-solid fa-dollar-sign"></i>
                            &nbsp;{listing.price} per month
                          </Card.Text>
                          <Card.Text className="mt-0">
                            <i className="fa-solid fa-ruler-combined"></i>
                            &nbsp;{listing.sqft} sqft |&nbsp;
                            <i className="fa-solid fa-bed"></i>
                            &nbsp;{listing.bedrooms} beds |&nbsp;
                            <i className="fa-solid fa-shower"></i>
                            &nbsp;{listing.bathrooms} baths
                          </Card.Text>
                          <Button
                            variant="info"
                            style={{
                              backgroundColor: "#9e0b00",
                              borderRadius: "5px",
                              backgroundPosition: "center",
                              display: "block",
                              margin: "auto",
                            }}
                            name={listing.created_at}
                            onClick={listingRedirect}
                          >
                            View
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ListingsScreen;
