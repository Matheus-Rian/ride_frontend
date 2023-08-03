import { mount } from "@vue/test-utils";
import CreatePassengerVue from '../src/CreatePassenger.vue';
import PassengerGateway from "../src/infra/gateways/PassengerGateway";
import PassengerGatewayHttp from "../src/infra/gateways/PassengerGatewayHttp";
import AxiosAdapter from "../src/infra/gateways/http/AxiosAdapter";

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  }) 
}

test('Deve criar um passageiro', async () => {
  // given
  const httpClient = new AxiosAdapter();
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(httpClient)
      }
    }
  });
  await wrapper.get('.passenger-name').setValue('John Doe');
  await wrapper.get('.passenger-email').setValue('john.doe@gmail.com');
  await wrapper.get('.passenger-document').setValue('83432616074');

  // when
  await wrapper.get('.create-passenger-button').trigger('click');

  // Then
  await sleep(200);
  expect(wrapper.get('.passenger-id').text()).toHaveLength(36);
})

test('Não deve criar um passageiro com nome inválido', async () => {
  // given
  const httpClient = new AxiosAdapter();
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(httpClient)
      }
    }
  });
  await wrapper.get('.passenger-name').setValue('John');
  await wrapper.get('.passenger-email').setValue('john.doe@gmail.com');
  await wrapper.get('.passenger-document').setValue('83432616074');

  // when
  await wrapper.get('.create-passenger-button').trigger('click');

  // Then
  expect(wrapper.get('.error').text()).toBe('Invalid Name.');
})

test('Não deve criar um passageiro com email inválido', async () => {
  // given
  const httpClient = new AxiosAdapter();
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(httpClient)
      }
    }
  });
  await wrapper.get('.passenger-name').setValue('John Doe');
  await wrapper.get('.passenger-email').setValue('john.doe@.com');
  await wrapper.get('.passenger-document').setValue('83432616074');

  // when
  await wrapper.get('.create-passenger-button').trigger('click');

  // Then
  expect(wrapper.get('.error').text()).toBe('Invalid Email.');
})

test('Não deve criar um passageiro com documento inválido', async () => {
  // given
  const httpClient = new AxiosAdapter();
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(httpClient)
      }
    }
  });
  await wrapper.get('.passenger-name').setValue('John Doe');
  await wrapper.get('.passenger-email').setValue('john.doe@gmail.com');
  await wrapper.get('.passenger-document').setValue('93432616074');

  // when
  await wrapper.get('.create-passenger-button').trigger('click');

  // Then
  expect(wrapper.get('.error').text()).toBe('Invalid Cpf.');
})