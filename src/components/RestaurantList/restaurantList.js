import React, { Component } from "react";
import "./styles.css";

export default class RestaurantList extends Component {
  render() {
    return (
      <div className={"list"}>
        {this.props.restaurants && this.props.restaurants.length > 0
          ? this.props.restaurants.map((restaurant, index) => {
              return (
                <div
                  className="listItem"
                  key={`${index}`}
                  onClick={() => this.props.onItemClick(restaurant)}
                >
                  {`${index + 1}. ${restaurant.name} (Rating: ${restaurant.rating})`}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
