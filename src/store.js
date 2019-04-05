import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid4'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entities: [{
      id: uuid4(),
      name: 'Entity #1',
      features: [{
        id: uuid4(),
        name: 'Feature #1'
      }]
    }]
  },
  mutations: {
    createEntity (state) {
      state.entities.push({
        id: uuid4(),
        name: 'New entity',
        features: []
      })
    },

    deleteEntity (state, payload) {
      state.entities = state.entities.filter(e => e.id !== payload.id)
    },

    updateEntity (state, payload) {
      state.entities = state.entities.map(e => {
        if (e.id !== payload.id) return e
        return { ...e, ...payload.update }
      })
      console.log(state.entities)
    },

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

    deleteFeature (state, payload) {
      state.entities = state.entities.map(e => {
        if (e.id !== payload.entityId) return e
        e.features = e.features.filter(f => f.id !== payload.featureId)
        return e
      })
    }
  },
  actions: {

  }
})
