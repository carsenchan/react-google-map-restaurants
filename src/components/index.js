import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { getRestaurants } from "../controllers/index";
import RestaurantList from "./RestaurantList/restaurantList";
import ToolBar from "./Toolbar";
import Marker from "./Markers";
// import { Restaurant } from "../interfaces";

// class App extends Component {
//   render() {
//     return <div>Hello World.</div>;
//   }
// }

class Map extends Component {
  state = {
    currentPos: {
      lat: undefined,
      lng: undefined
    },
    defaultZoom: 10,
    restaurants: [],
    viewingPos: {
      lat: undefined,
      lng: undefined
    }
  };

  getCurrentPos = () => {
    const position = window.navigator && window.navigator.geolocation;
    position.getCurrentPosition(
      this.getPosSuccessCallback,
      this.getPosFailCallback
    );
  };

  getPosSuccessCallback: PositionCallback = (position: Position) => {
    const { latitude, longitude } = position.coords;
    const newPostion = { lat: latitude, lng: longitude };
    this.setState({
      currentPos: newPostion,
      viewingPos: newPostion,
      defaultZoom: 17
    });
    getRestaurants(newPostion, 1000).then((data: any) => {
      const { next_page_token, results } = data.data;
      console.log(results);
      this.setState({ restaurants: results });
    });
  };

  getPosFailCallback: PositionErrorCallback = () => {
    alert("Please check your browser if is enable location");
  };

  onBoundsChange = (center, zoom, bounds, marginBounds) => {
    console.log(center, zoom);
    this.setState({ viewingPos: center, defaultZoom: zoom }, () => {
      getRestaurants(center, 1000).then((data: any) => {
        const { next_page_token, results } = data.data;
        console.log(results);
        this.setState({ restaurants: results });
      });
    });
  };

  onChildPress = () => {};

  onChildEnter = () => {};

  onChildLeave = () => {};

  componentDidMount() {
    this.getCurrentPos();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.viewingPos !== this.state.viewingPos) {
    //   getRestaurants(this.state.viewingPos, 1000).then((data: any) => {
    //     const { next_page_token, results } = data.data;
    //     console.log(results);
    //     this.setState({ restaurants: results });
    //   });
    // }
  }

  render() {
    const { currentPos, defaultZoom, restaurants } = this.state;
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          center={currentPos}
          zoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onBoundsChange={this.onBoundsChange}
        >
          <Marker.CurrentMarker
            lat={currentPos.lat}
            lng={currentPos.lng}
            text="My Marker"
          />
          {restaurants && restaurants.length > 0
            ? restaurants.map((restaurant, index) => {
                return (
                  <Marker.ResturantMarker
                    lat={restaurant.geometry.location.lat}
                    lng={restaurant.geometry.location.lng}
                    text={restaurant.name}
                    key={`${index}`}
                  />
                );
              })
            : null}
        </GoogleMapReact>
        {restaurants && restaurants.length > 0 ? (
          <RestaurantList restaurants={restaurants} />
        ) : null}
        <ToolBar />
      </div>
    );
  }
}

export default Map;
