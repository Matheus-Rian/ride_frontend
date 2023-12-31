import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import PassengerGatewayHttp from './infra/gateways/PassengerGatewayHttp';
import DriverGatewayHttp from './infra/gateways/DriverGatewayHttp';
import AxiosAdapter from './infra/gateways/http/AxiosAdapter';
import GeoLocationNavigatorAdapater from './infra/geolocation/GeoLocationNavigatorAdapter';

const app = createApp(App);
const httpClient = new AxiosAdapter();
// const httpClient = new FetchAdapter();
app.provide('passengerGateway', new PassengerGatewayHttp(httpClient));
app.provide('driverGateway', new DriverGatewayHttp(httpClient));
app.provide('geoLocation', new GeoLocationNavigatorAdapater());
app.mount('#app');
