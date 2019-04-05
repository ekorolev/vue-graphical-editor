<template>
  <b-card>
    <b-card-text>
      <input
        type="text"
        v-bind:value="name"
        v-bind:class="{ editable: !editable }"
        v-on:dblclick="setEditable(true)"
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
          <input
            type="text"
            v-bind:value="feature.name"
            v-bind:class="{ editable: !feature.editable }"
            v-on:dblclick="updateFeature(id, feature.id, { editable: true })"
            v-on:change="updateFeature(id, feature.id, { name: $event.target.value })"
            v-bind:readonly="!feature.editable">
          <b-button
            v-on:click="deleteFeature(id, feature.id)"
            size="sm"
            variant="info">
            X
          </b-button>
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
export default {
  props: {
    id: String,
    name: String,
    features: Array
  },
  data () {
    return {
      editable: false
    }
  },
  methods: {
    setEditable (value) {
      this.editable = typeof value === 'undefined' ? !this.editable : !!value
    },

    changeName (e, id) {
      this.$emit('updateEntity', { id, update: { name: e.target.value } })
      this.editable = false
    },

    deleteEntity (id) {
      this.$emit('deleteEntity', { id })
    },

    updateFeature (entityId, featureId, update) {
      if (typeof update.editable === 'undefined') update.editable = false
      this.$emit('updateFeature', { entityId, featureId, update })
    },
    
    deleteFeature (entityId, featureId) {
      this.$emit('deleteFeature', { entityId, featureId })
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
