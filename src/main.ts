import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import PassengerGatewayHttp from './infra/gateways/PassengerGatewayHttp';
import DriverGatewayHttp from './infra/gateways/DriverGatewayHttp';

const app = createApp(App);
app.provide('passengerGateway', new PassengerGatewayHttp());
app.provide('driverGateway', new DriverGatewayHttp());
app.mount('#app')
