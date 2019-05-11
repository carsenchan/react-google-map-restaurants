import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getRestaurantDetail } from "../../controllers/index";

export default class RestaurantInfo extends Component {
  state = {
    detail: undefined
  };

  componentDidMount() {
    if (this.props.restaurant) {
      getRestaurantDetail(this.props.restaurant.place_id)
        .then(data => {
          console.log(data.data.result);
          this.setState({ detail: data.data.result });
        })
        .catch(error => console.log(error));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.restaurant &&
      prevProps.restaurant.place_id !== this.props.restaurant.place_id
    ) {
      getRestaurantDetail(this.props.restaurant.place_id)
        .then(data => {
          console.log(data.data.result);
          this.setState({ detail: data.data.result });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { restaurant, showingInfoWindow, onClose } = this.props;
    const { detail } = this.state;
    return (
      <Modal
        isOpen={showingInfoWindow}
        toggle={onClose}
        className={this.props.className}
      >
        <ModalHeader toggle={onClose}>{restaurant.name}</ModalHeader>
        <ModalBody>
          <div>Restaurant Name: {restaurant.name}</div>
          <div>
            Rating: {restaurant.rating} (Total No. of Rating:{" "}
            {restaurant.user_ratings_total})
          </div>
          {"priceLevel" in restaurant ? (
            <div>Cost: {restaurant.priceLevel}</div>
          ) : null}
          {detail && (
            <div>
              <a href={detail.website}>Website: {detail.website}</a>
              <div>Address: {detail.formatted_address}</div>
              <a href={`tel:${detail.international_phone_number}`}>
                {detail.international_phone_number}
              </a>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
