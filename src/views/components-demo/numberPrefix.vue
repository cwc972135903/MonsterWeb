<!--
 * @Descripttion: 数字前缀控件
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-08-05 15:17:14
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-08-19 11:10:16
 -->
 
 <template>
  <div class="components-container">
    <p class="warn-content">
      数字前缀控件
    </p>
    <NumberPrefix type="primary">1</NumberPrefix>
    <NumberPrefix type="success">2</NumberPrefix>
    <NumberPrefix type="warning">3</NumberPrefix>
    <NumberPrefix type="danger">4</NumberPrefix>
    <NumberPrefix type="info">5</NumberPrefix>
    <NumberPrefix>6</NumberPrefix>
    <code>
      import NumberPrefix from "@/components/NumberPrefix";
      <br>
      &lt;NumberPrefix type="primary"&gt;1&lt;/NumberPrefix&gt;
      <br>
      type:primary/success/warning/danger/info
    </code>
  </div>
</template>

<script>
import NumberPrefix from "@/components/NumberPrefix";

export default {
  name: 'NumberPrefixDemo',
  components: { NumberPrefix },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>

