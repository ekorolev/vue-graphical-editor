<template>
  <b-card>
    <b-card-text>
      <input
        type="text"
        v-bind:value="name"
        v-bind:class="{ editable: !editable }"
        v-on:dblclick="setEditable(true, $event)"
        v-on:change="changeName($event, id)"
        v-bind:readonly="!editable">
      <b-button
        size="sm"
        v-on:click="deleteEntity(id)"
        variant="info">
        X
      </b-button>
      <b-list-group>
        <b-list-group-item
          v-for="feature in features"
          v-bind:key="feature.id">
          <Feature
            v-bind:feature="feature"
            v-bind:entityId="id"
            v-on:updateFeature="updateFeature"
            v-on:deleteFeature="deleteFeature"/>
        </b-list-group-item>
        <b-list-group-item
          v-on:click="handleCreateFeature(id)"
          button>
          [+] Create new item
        </b-list-group-item>
      </b-list-group>
    </b-card-text>
  </b-card>
</template>

<script>
import Feature from './FeatureComponent.vue'

export default {
  props: {
    id: String,
    name: String,
    features: Array
  },
  components: { Feature },
  data () {
    return {
      editable: false
    }
  },
  methods: {
    setEditable (value, event) {
      this.editable = typeof value === 'undefined' ? !this.editable : !!value
      event.target.select()
    },
    changeName (e, id) {
      this.$emit('updateEntity', { id, update: { name: e.target.value } })
      this.editable = false
    },
    deleteEntity (id) {
      this.$emit('deleteEntity', { id })
    },
    updateFeature (payload) {
      this.$emit('updateFeature', payload)
    },
    deleteFeature (payload) {
      this.$emit('deleteFeature', payload)
    },
    handleCreateFeature (id) {
      this.$store.commit('createFeature', {
        entityId: id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
input.editable {
  border: 0px;
  outline: none;
}
</style>
