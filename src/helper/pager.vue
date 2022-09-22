<template>
  <a-pagination v-model:current="current.page" :pageSize="pageSize" @change="change()" :total="total" :showQuickJumper="true" />
</template>
<script>
import { defineComponent, reactive} from 'vue';
export default defineComponent({
   props: {
    pageSize:{
      required:true,
      type:Number
    },
    total:{
      required:true,
      type:Number
    },
  },  
  setup(props,context) {
      const current=reactive({
          page:1,
      });
  const change=()=>{
      console.log("changed",current.page);
      context.emit("changed",current.page);
  };

return {
      current,
      change
    };

  
  },

});
</script>