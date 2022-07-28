<template>
  <div class="flight-component">
    <a-row>
      <a-col>
        
    <router-link to="/flightInfo">
      <font-awesome-icon class="icon" :icon="['fas', 'plane-departure']" size="2x" />
    </router-link>
    
      </a-col>
      <a-col>
    <li>LOS {{title}}<sdFeatherIcons type="arrow-right" size="16" /> SAN</li>
    <li><sdFeatherIcons type="briefcase" size="12" />10-JUl-2022</li>
    <li>
       <font-awesome-icon class="icon-flightnumber" :icon="['fas', 'plane-departure']"  /> AA1245
      <sdFeatherIcons type="clock" size="12" />4:00
    </li>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props:['title'],

};
</script>
<style scoped>
li{
  text-decoration: none;
  list-style: none;
  
}

.icon{
  padding:20px;
  text-decoration: none;
  color:grey
}
.flight-component{
  padding:10px;
  margin: 1%;
  border-radius: 5px; 
  background: white;
}
  .icon-flightnumber{
    color:grey
  }
</style>