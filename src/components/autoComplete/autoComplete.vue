<template>
  <AutoCompleteStyled v-if="customComponent" :style="{ width }" @select="onSelect" @search="onSearching">
    <template v-if="myData.length" #options>
      <a-select-option v-for="item in myData" :key="item.title">
        {{ item.title }}
      </a-select-option>
    </template>
    <template v-else #options>
      <a-select-option key="Data not found!"> Data not found! </a-select-option>
    </template>
    <slot></slot>
  </AutoCompleteStyled>
  <AutoCompleteStyled
    v-else-if="patterns"
    v-model:value="value"
    class="certain-category-search"
    dropdownClassName="certain-category-search-dropdown"
    :dropdownMatchSelectWidth="false"
    :dropdownStyle="{ width: 300 }"
    :style="{ width }"
    :placeholder="placeholder"
    @search="onSearching"
  >
    <template v-if="myData.length" #options>
      <a-select-option v-for="item in myData" :key="item.title">
        {{ item.title }}
      </a-select-option>
    </template>
    <template v-else #options>
      <a-select-option key="Data not found!"> Data not found! </a-select-option>
    </template>
    <a-input>
      <template #suffix
        ><sdButton
          v-if="patternButtons"
          class="search-btn"
          :style="{ [rtl ? 'marginLeft' : 'marginRight']: -20 }"
          type="primary"
        >
          <sdFeatherIcons type="search" /> </sdButton
        ><sdFeatherIcons v-else type="search"
      /></template>
    </a-input>
  </AutoCompleteStyled>

  <AutoCompleteStyled
    :style="{ width }"
    @select="onSelect"
    @search="onSearching"
    :placeholder="placeholder"
    :value="value"
    v-else
  >
    <template v-if="myData.length" #options>
      <a-select-option v-for="item in myData" :key="item.title">
        {{ item.title }}
      </a-select-option>
    </template>
    <template v-else #options>
      <a-select-option key="Data not found!"> Data not found! </a-select-option>
    </template>
  </AutoCompleteStyled>
</template>

<script>
import { AutoCompleteStyled } from './style';
import VueTypes from 'vue-types';
import { toRefs, ref, computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AutoComplete',
  components: {
    AutoCompleteStyled,
  },
  props: {
    customComponent: VueTypes.bool.def(false),
    patterns: VueTypes.bool.def(false),
    patternButtons: VueTypes.bool.def(false),
    width: VueTypes.string.def('350px'),
    dataSource: VueTypes.array,
    placeholder: VueTypes.string.def('Input here'),
  },
  setup(props, { emit }) {
    const { dataSource } = toRefs(props);
    const { state } = useStore();
    const value = ref('');
    const myData = ref(dataSource.value);
    const rtl = computed(() => state.themeLayout.rtlData);

    const onSearching = (searchText) => {
      value.value = searchText;
      const data = dataSource.value.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
      emit('onSearch', searchText);
      return (myData.value = !searchText ? dataSource.value : data);
    };

    const onSelect = () => {};

    return {
      value,
      myData,
      rtl,
      onSearching,
      onSelect,
    };
  },
});
</script>
