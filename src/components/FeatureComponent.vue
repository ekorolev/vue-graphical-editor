<template>
  <div>
    <input
      type="text"
      v-bind:value="feature.name"
      v-bind:class="{ editable: !feature.editable }"
      v-on:dblclick="handleUpdateFeature(entityId, feature.id, { editable: true }, $event)"
      v-on:change="handleUpdateFeature(entityId, feature.id, { name: $event.target.value })"
      v-bind:readonly="!feature.editable">
    <b-button
      v-on:click="handleDeleteFeature(entityId, feature.id)"
      size="sm"
      variant="info">
      X
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    feature: Object,
    entityId: String
  },
  methods: {
    handleUpdateFeature (entityId, featureId, update, event) {
      if (typeof update.editable === 'undefined') {
        update.editable = false
      } else {
        event.target.select()
      }
      this.$emit('updateFeature', { entityId, featureId, update })
    },
    handleDeleteFeature (entityId, featureId) {
      this.$emit('deleteFeature', { entityId, featureId })
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
