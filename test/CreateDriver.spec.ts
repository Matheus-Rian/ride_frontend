import { mount } from "@vue/test-utils";
import CreateDriverVue from '../src/CreateDriver.vue';
import DriverGateway from "../src/infra/gateways/DriverGateway";
import DriverGatewayHttp from "../src/infra/gateways/DriverGatewayHttp";
import AxiosAdapter from "../src/infra/gateways/http/AxiosAdapter";

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  }) 
}

test('Deve criar um motorista', async () => {
  // given
  // const driverGateway: DriverGateway = {
  //   async create (driver: any): Promise<any> {
  //     return '46018082-2fa5-11ee-be56-0242ac120002';
  //   }
  // }
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  });
  await wrapper.get('.driver-name').setValue('John Doe');
  await wrapper.get('.driver-email').setValue('john.doe@gmail.com');
  await wrapper.get('.driver-document').setValue('83432616074');
  await wrapper.get('.driver-car-plate').setValue('AAA9999');

  // when
  await wrapper.get('.create-driver-button').trigger('click');

  // Then
  await sleep(200);
  expect(wrapper.get('.driver-id').text()).toHaveLength(36);
})

test('Não deve criar um motorista com o nome inválido', async () => {
  // given
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  });
  await wrapper.get('.driver-name').setValue('John');
  await wrapper.get('.driver-email').setValue('john.doe@gmail.com');
  await wrapper.get('.driver-document').setValue('83432616074');
  await wrapper.get('.driver-car-plate').setValue('AAA9999');

  // when
  await wrapper.get('.create-driver-button').trigger('click');

  // Then
  expect(wrapper.get('.error').text()).toBe('Invalid Name.');
})
