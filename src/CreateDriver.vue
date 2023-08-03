<script setup lang="ts">
  import { inject, ref } from 'vue';
  import DriverGateway from './infra/gateways/DriverGateway';
  import { DriverBuilder } from './domain/Driver';

  const driverBuilder = ref(new DriverBuilder());
  const driver = ref();
  const driverGateway = inject('driverGateway') as DriverGateway;

  async function createDriver() {
    driver.value = driverBuilder.value.build();
    driver.value.driverId = await driverGateway.create(driver.value);
  }
</script>

<template>
  <input class="driver-name" v-model="driverBuilder.name" />
  <input class="driver-email" v-model="driverBuilder.email" />
  <input class="driver-document" v-model="driverBuilder.document" />
  <input class="driver-car-plate" v-model="driverBuilder.carPlate" />

  <button class="create-driver-button" @click="createDriver()">Create driver</button>
  <div v-if="driver">
    <div class="driver-id">{{ driver.driverId }}</div>
  </div>
</template>

<style scoped>
</style>
