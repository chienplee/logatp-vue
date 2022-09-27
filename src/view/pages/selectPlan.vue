<template>
  <div>
    <Main>
      <h1>Payment</h1>
    </Main>
  </div>
</template>
<script>
import { defineComponent,onMounted   } from 'vue'
import { Main } from "../styled";
import PropTypes from "vue-types";


export default defineComponent({
  components: {  Main},
  props: {
    cusId:{
      required:true,
      type:PropTypes.String
    },
    priceId:{
      required:true,
      type:PropTypes.String

    }
  },
  setup(props) {
    onMounted(()=>{
      console.log(props)
    })
  },

})
</script>
