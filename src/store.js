import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid4'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    enteties: []
  },
  mutations: {
    createEntity (state) {
      state.enteties.push({
        id: uuid4(),
        name: 'New entity',
        features: []
      })
    },

    deleteEntity (state, payload) {
      state.enteties = state.enteties.filter(e => e.id !== payload.id)
    },

    editEntity (state, payload) {
      state.enteties = state.enteties.map(e => {
        if (e.id !== payload.id) return e
        return { ...e, ...payload.update }
      })
    },

    createFeature (state, payload) {
      state.enteties = state.enteties.map(e => {
        if (e.id !== payload.entityId) return e
        e.features.push({
          id: uuid4(),
          name: 'New feature'
        })
        return e
      })
    },

    updateFeature (state, payload) {
      state.enteties = state.enteties.map(e => {
        if (e.id !== payload.entityId) return e
        e.features = e.features.map(f => {
          if (f.id !== payload.featureId) return f
          f = { ...f, ...payload.update }
          return f
        })
      })
    },

    deleteFeature (state, payload) {
      state.enteties = state.enteties.map(e => {
        if (e.id !== payload.entityId) return e
        e.features = e.features.filter(f => f.id !== payload.featureId)
      })
    }
  },
  actions: {

  }
})
