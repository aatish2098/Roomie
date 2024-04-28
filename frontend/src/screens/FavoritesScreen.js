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
import { getFavs } from "../actions/userActions";

function FavoritesScreen({ params }) {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const userGetFavs = useSelector((state) => state.userGetFavs);
  const { error, loading, favs } = userGetFavs;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(favs);

  const handleViewUnit = (id) => {
    navigate(`/unit/${id}`);
  };

  useEffect(() => {
    dispatch(getFavs(userInfo.username));
  }, [dispatch]);

  return (
    <div>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                {id}'s Favorites
              </Card.Header>
              {favs &&
                favs.favourites &&
                favs.favourites.length > 0 &&
                favs.favourites.map((fav) => (
                  <Row className="my-2 ms-3">
                    <Col md={3}></Col>
                    <Col md={3}>
                      <Card.Text style={{ fontWeight: "bold" }}>
                        Unit Rent ID #
                      </Card.Text>
                    </Col>
                    <Col md={1}>{fav}</Col>
                    <Col md={1}>
                      <Button
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#4CAF50", // Green color for details button
                          color: "white",
                          fontSize: "60%",
                          height: "25px",
                          width: "98px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => handleViewUnit(fav)}
                      >
                        View Unit
                      </Button>
                    </Col>
                  </Row>
                ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FavoritesScreen;
