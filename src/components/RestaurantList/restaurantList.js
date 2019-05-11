import React from "react";
import "./styles.css";

const RestaurantList = (props) => {
  return (
    <div className={"list"}>
      {props.restaurants && props.restaurants.length > 0
        ? props.restaurants.map((restaurant, index) => {
          
          const itemStyle = ()=>props.selectedRestaurant.place_id === restaurant.place_id ? "listItem isActive" : "listItem";
            return (
              <div
                className={itemStyle()}
                key={`${index}`}
                onClick={() => {
                  props.onItemClick(restaurant)}}
              >
                {`${index + 1}. ${restaurant.name} (Rating: ${restaurant.rating})`}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default RestaurantList
