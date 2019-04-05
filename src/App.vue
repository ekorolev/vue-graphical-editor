<template>
  <b-container fluid class="flex-content">
    <Entity
      class="m-2"
      v-for="entity in entities"
      v-bind:key="entity.id"
      v-bind:name="entity.name"
      v-bind:id="entity.id"
      v-on:updateEntity="handleUpdateEntity"
      v-on:createFeature="handleCreateFeature"
      v-on:deleteFeature="handleDeleteFeature"
      v-on:updateFeature="handleUpdateFeature"
      v-on:deleteEntity="handleDeleteEntity"
      v-bind:features="entity.features"/>
    <b-list-group class="m-2">
      <b-list-group-item
        v-on:click="handleCreateEntity()"
        button>
        Create an entity
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import Entity from './components/EntityComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  // Add entities to the app
  computed: {
    ...mapState({
      entities: state => state.entities
    })
  },
  components: { Entity },
  methods: {
    handleCreateEntity () {
      this.$store.commit('createEntity')
    },
    handleUpdateEntity (payload) {
      this.$store.commit('updateEntity', payload)
    },
    handleDeleteEntity (payload) {
      this.$store.commit('deleteEntity', payload)
    },
    handleCreateFeature (payload) {
      this.$store.commit('createFeature', payload)
    },
    handleUpdateFeature (payload) {
      console.log(payload)
      this.$store.commit('updateFeature', payload)
    },
    handleDeleteFeature (payload) {
      this.$store.commit('deleteFeature', payload)
    }
  }
}
</script>

<style>
.flex-content {
  display: flex;
  flex-wrap: wrap;
}
</style>
