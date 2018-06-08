import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    }
  },
}