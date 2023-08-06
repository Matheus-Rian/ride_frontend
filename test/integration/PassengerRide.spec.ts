import { mount } from '@vue/test-utils';
import PassengerRideVue from '../../src/view/PassengerRide.vue';
import RideGatewayHttp from '../../src/infra/gateways/RideGatewayHttp';
import AxiosAdapter from '../../src/infra/gateways/http/AxiosAdapter';

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
