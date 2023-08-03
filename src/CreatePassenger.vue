<script setup lang="ts">
  import { inject, ref } from 'vue';
  import PassengerGateway from './infra/gateways/PassengerGateway';
  import { PassengerBuilder } from './domain/Passenger';

  const passengerBuilder = ref(new PassengerBuilder());
  const passenger = ref();
  const passengerGateway = inject('passengerGateway') as PassengerGateway;

  async function createPassenger() {
    passenger.value = passengerBuilder.value.build();
    passenger.value.passengerId = await passengerGateway.create(passenger.value);
  }
</script>

<template>
  <input class="passenger-name" v-model="passengerBuilder.name" />
  <input class="passenger-email" v-model="passengerBuilder.email" />
  <input class="passenger-document" v-model="passengerBuilder.document" />
  <button class="create-passenger-button" @click="createPassenger()">Create passenger</button>
  <div v-if="passenger">
    <div class="passenger-id">{{ passenger.passengerId }}</div>
  </div>
</template>

<style scoped>
</style>
