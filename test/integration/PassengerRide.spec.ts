import { mount } from '@vue/test-utils';
import PassengerRideVue from '../../src/view/PassengerRide.vue';
import CreatePassengerVue from '../../src/view/CreatePassenger.vue';
import RideGatewayHttp from '../../src/infra/gateways/RideGatewayHttp';
import AxiosAdapter from '../../src/infra/gateways/http/AxiosAdapter';
import PassengerGatewayHttp from '../../src/infra/gateways/PassengerGatewayHttp';

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  }) 
}

test('O passegeiro deve calcular o preço de uma corrida', async () => {
  const wrapper = mount(PassengerRideVue, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter())
      }
    }
  });
  await wrapper.get('.ride-from-lat').setValue('-8.087602480277932');
  await wrapper.get('.ride-from-long').setValue('-34.94039886110192');
  await wrapper.get('.ride-to-lat').setValue('-7.998906652322922');
  await wrapper.get('.ride-to-long').setValue('-34.97156026714327');
  await wrapper.get('.calculate-ride-button').trigger('click');
  await sleep(200);
  expect(wrapper.get('.ride-price').text()).toBe('29');
})

test('O passegeiro deve solicitar uma corrida', async () => {
  const wrapperCreatePassenger = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  });
  await wrapperCreatePassenger.get('.passenger-name').setValue('John Doe');
  await wrapperCreatePassenger.get('.passenger-email').setValue('john.doe@gmail.com');
  await wrapperCreatePassenger.get('.passenger-document').setValue('83432616074');
  await wrapperCreatePassenger.get('.create-passenger-button').trigger('click');
  await sleep(200);
  const passengerId = wrapperCreatePassenger.get('.passenger-id').text();

  const wrapperPassengerRide = mount(PassengerRideVue, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter())
      }
    }
  });
  await wrapperPassengerRide.get('.ride-passenger-id').setValue(passengerId);
  await wrapperPassengerRide.get('.ride-from-lat').setValue('-8.087602480277932');
  await wrapperPassengerRide.get('.ride-from-long').setValue('-34.94039886110192');
  await wrapperPassengerRide.get('.ride-to-lat').setValue('-7.998906652322922');
  await wrapperPassengerRide.get('.ride-to-long').setValue('-34.97156026714327');
  await wrapperPassengerRide.get('.calculate-ride-button').trigger('click');
  await sleep(200);
  await wrapperPassengerRide.get('.request-ride-button').trigger('click');
  await sleep(200);
  expect(wrapperPassengerRide.get('.ride-id').text()).toHaveLength(36);
})
