<template>
  <div class="" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: { required: true },
    selected: { default: false },
    quantity: { default: 0 }
  },
  name: 'Tab',
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    this.isActive = this.selected
    this.$emit('quantityEmit', this.quantity)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
