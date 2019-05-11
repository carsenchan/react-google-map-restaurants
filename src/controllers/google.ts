import axios from "axios";

const getRestaurants = ({ lat, lng }: { lat: number; lng: number }, radius) => {
  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=YOUR_API_KEY

  const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant,bar,cafe,bakery,meal_delivery,meal_takeaway
  &key=${process.env.REACT_APP_GOOGLE_API_KEY}&langugage=zh-TW`;

  return axios
    .get(url)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
      alert("Network Error while fetching restaurant data");
    });
};

export { getRestaurants };
