<template>
<div>
<Main>
    <sdCards class="center">
        <img :width="500" src="../static/img/LogATPLogo.png" />
    </sdCards>
    <sdCards title="PRO FEATURES">

        <a-row :gutter="25">
            <a-col
            v-for="obj of proFeaturesData.data"
            :key="obj"
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24"
          >
          <sdCards :title="obj.title">
            <ContactCardWrapper >
                <div>
                    <p>{{obj.text}}</p>
                    <span v-if="obj.Note">Note:{{obj.Note}}</span>
                    <!-- <p>{{obj.img}}</p> -->
        <img  :width="200"  :src="obj.img" />

                </div>

           </ContactCardWrapper>
        </sdCards> 
       

          </a-col>
          </a-row>
        



    </sdCards>
    <sdCards title>
           <a href="https://logatp.com/pricing.html" target="_blank"> <a-button  class="button">
            <font-awesome-icon class="icon" icon="fa-solid fa-circle-question" />
            <span class="custom">FAQs</span>
          </a-button ></a>
          <a href="https://logatp.com/terms.html" target="_blank">
            <a-button  class="button"  >
                <font-awesome-icon class="icon" icon="fa-solid fa-dollar-sign" />
                <span class="custom">Terms of Use</span>
                </a-button>
          </a>
          <a href="https://logatp.com/privacy.html" target="_blank">
            <a-button class="button">
                <font-awesome-icon class="icon" icon="fa-solid fa-lock" />
                <span class="custom">Privacy Policy</span>
              </a-button>
          </a>
          
   
        
        </sdCards>
          

    
    <sdCards title="PRICING">
        <a-button class="button" >
            <font-awesome-icon class="icon" icon="fa-solid fa-file" />
            <span  class="custom"><span>&#8377;</span>
            869 INR/year</span>          </a-button>

            <a-button class="button" >
            <font-awesome-icon class="icon" icon="fa-solid fa-file" />
            <span  class="custom"><span>&#8377;</span>
            8500 INR/year</span>
          </a-button>

    </sdCards>
</Main>
</div>
</template>

<script >
    import { defineComponent,ref,reactive } from "vue";
import { Main } from "./styled";




export default defineComponent({
  components: {
    Main
    
  },
  setup(){
    const proFeaturesData = reactive({
        data:[{
            title:'Real Flight Plan',
            text:"The app will look for your flight plan from o contracted ADS-B companv and save the flightplan together with your flight",
            img:require('../static/img/sc.jpg')
        },{
            title:"Real Flight Track",
            text:'The app will pin point your flight track fromtakeoff to landing at 30 seconds interval if ADS-B data is available.',
            Note:"ADS-B data may not be available in pacific or oceanic areas because there are noADS-B receivers",
            img:require('../static/img/map.jpg')
        },{
            title:'Real Flight Data',
            text:'The app will look for your flight data from takeoffto landing, provide altitude, groundspeed,latitude and longitude information to you atregular interval.',
            img:require('../static/img/data.png')

        },{
            title:"Actual Block Times",
            text:"If available, the app will look for your actualblock out, block off, block on and block in times",
            Note: "Some block times may be missing because there are no enough data fed to ADS-B data center",
            img:require('../static/img/block.jpg')

        }]
    })

    return{
      activeKey1: ref("1"),
      proFeaturesData


    }
  }
})

</script>

<style scoped>
    .center {
        display: flex;
        justify-content: center;
        text-align: center;
      }
.custom{
    margin-left: 10px;
}
.wrapper {
  display: inline-block;
  height: 150px;
  width: 250px;
  padding: 5px;
  margin: 5px;
  background: lightgray;
}

</style>