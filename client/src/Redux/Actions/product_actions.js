import axios from 'axios';
import { PRODUCT_SERVER } from '../../Components/Utils/Misc';
import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL } from './Types';

export function getProductsBySell () {

  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data)

    return {
      type: GET_PRODUCTS_BY_SELL,
      payload: request
    }

}

export function getProductsByArrival () {
  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=5`)
    .then(response => response.data)

    return {
      type: GET_PRODUCTS_BY_ARRIVAL,
      payload: request
    }
}