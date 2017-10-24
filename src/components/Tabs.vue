<template>
  <div class="row">
    <div class="col-md-3">
      <div class="list-group mb-3">
        
        <button type="button" 
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
                v-for="tab in tabs"
                :class="{ 'active': tab.isActive }"
                :disabled="tab.quantity <= 0"
                @click="selectTab(tab)">
          {{ tab.name }}
          <span class="badge badge-dark badge-pill" v-if="tab.quantity > 0">{{ tab.quantity }}</span>
        </button>

      </div>
    </div>

    <div class="col-md-9">
      <div class="row">

        <slot @quantityEmit="getQuantity()"></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
