import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { getRestaurants } from "../controllers/index";
import RestaurantList from "./RestaurantList/restaurantList";
import ToolBar from "./Toolbar";
import Marker from "./Markers";
import RestaurantInfo from "./InfoWindow/InfoWindow";
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
    },
    showingInfoWindow: false,
    selectedRestaurant: {},
    activeMarker: {},
    sorting: 'name'
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
      defaultZoom: 16
    });
    getRestaurants(newPostion, 1000).then((data: any) => {
      const { next_page_token, results } = data.data;
      this.updateSorting(results)(this.state.sorting);
    });
  };

  getPosFailCallback: PositionErrorCallback = () => {
    alert("Please check your browser if is enable location");
  };

  onBoundsChange = (center, zoom, bounds, marginBounds) => {
    this.setState({ viewingPos: center, defaultZoom: zoom }, () => {
      getRestaurants(center, 1000).then((data: any) => {
        const { next_page_token, results } = data.data;
        this.updateSorting(results)(this.state.sorting);
      });
    });
  };

  onChildPress = restaurant => () => {
    this.setState({
      selectedRestaurant: restaurant,
      showingInfoWindow: true
    });
  };

  onListItemClick = restaurant => {
    const { lat, lng } = restaurant.geometry.location;
    this.setState({ viewingPos: { lat, lng }, selectedRestaurant: restaurant, });
  };

  onReset = ()=>{
    this.setState({viewingPos: this.state.currentPos});
  }

  updateSorting = (restaurants) => (sortBy) =>{
    let newSorting = restaurants;
    if(sortBy === 'name'){
      
      newSorting = newSorting.sort( (first, second) => {
        return first.name.charCodeAt(0) - second.name.charCodeAt(0)
      } );
    } else{
      newSorting = newSorting.sort( (first, second) => second.rating - first.rating );
    }
    this.setState({restaurants: newSorting, sorting: sortBy});
  }

  onChildClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  };

  componentDidMount() {
    this.getCurrentPos();
  }

  render() {
    const {
      currentPos,
      viewingPos,
      defaultZoom,
      restaurants,
      showingInfoWindow,
      selectedRestaurant
    } = this.state;
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          center={viewingPos}
          zoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onBoundsChange={this.onBoundsChange}
          hoverDistance={30}
        >
          <Marker.CurrentMarker
            lat={currentPos.lat}
            lng={currentPos.lng}
            text="ME"
          />
          {restaurants && restaurants.length > 0
            ? restaurants.map((restaurant, index) => {
              const isActive = selectedRestaurant && selectedRestaurant.place_id === restaurant.place_id
              return (
                <Marker.ResturantMarker
                  lat={restaurant.geometry.location.lat}
                  lng={restaurant.geometry.location.lng}
                  key={`${index}`}
                  restaurant={restaurant}
                  index={index}
                  onChildPress={this.onChildPress(restaurant)}
                  isActive ={isActive}
                />
              );
              })
            : null}
        </GoogleMapReact>
        <RestaurantInfo
          onClose={this.onChildClose}
          restaurant={selectedRestaurant}
          showingInfoWindow={showingInfoWindow}
        />
        {restaurants && restaurants.length > 0 ? (
          <RestaurantList
            restaurants={restaurants}
            onItemClick={this.onListItemClick}
          />
        ) : null}
        <ToolBar reset={this.onReset} updateSorting={this.updateSorting(restaurants)}/>
      </div>
    );
  }
}

export default Map;
