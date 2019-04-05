import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid4'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entities: []
  },
  mutations: {
    // Add entity to the list
    createEntity (state) {
      state.entities.push({
        id: uuid4(),
        name: 'New entity',
        features: []
      })
    },

    // Delete entity by id
    deleteEntity (state, payload) {
      state.entities = state.entities.filter(e => e.id !== payload.id)
    },

    // Update entity by id
    updateEntity (state, payload) {
      state.entities = state.entities.map(e => {
        if (e.id !== payload.id) return e
        return { ...e, ...payload.update }
      })
      console.log(state.entities)
    },

    // Create feature for particular entity
    createFeature (state, payload) {
      state.entities = state.entities.map(e => {
        if (e.id !== payload.entityId) return e
        e.features.push({
          id: uuid4(),
          name: 'New feature',
          editable: false
        })
        return e
      })
    },

    // Update specific feature for particular entity
    updateFeature (state, payload) {
      state.entities = state.entities.map(e => {
        if (e.id !== payload.entityId) return e
        e.features = e.features.map(f => {
          if (f.id !== payload.featureId) return f
          f = { ...f, ...payload.update }
          return f
        })
        return e
      })
    },

    // Delete specific feature from entity feature list
    deleteFeature (state, payload) {
      state.entities = state.entities.map(e => {
        if (e.id !== payload.entityId) return e
        e.features = e.features.filter(f => f.id !== payload.featureId)
        return e
      })
    }
  }
})
