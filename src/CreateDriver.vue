<script setup lang="ts">
  import { inject, ref } from 'vue';
  import DriverGateway from './infra/gateways/DriverGateway';
import Driver from './domain/Driver';

  const driver = ref(new Driver('', '', '', ''));
  const driverId = ref('');
  const driverGateway = inject('driverGateway') as DriverGateway;

  async function createDriver() {
    driverId.value  = await driverGateway.save(driver.value);
  }
</script>

<template>
  <input class="driver-name" v-model="driver.name" />
  <input class="driver-email" v-model="driver.email" />
  <input class="driver-document" v-model="driver.document" />
  <input class="driver-car-plate" v-model="driver.carPlate" />

  <button class="create-driver-button" @click="createDriver()">Create driver</button>
  <div class="driver-id">{{ driverId }}</div>
</template>

<style scoped>
</style>
