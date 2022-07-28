<template>
  <div class="full-width-table">
    <sdCards title="Top Selling Products" bodypadding="0px" more>
      <template #button>
        <div class="card-nav">
          <ul>
            <li :class="products === 'today' ? 'active' : 'deactivate'">
              <router-link
                @click="(e) => handleActiveChangeProducts(e, 'today')"
                to="#"
              >
                Today
              </router-link>
            </li>
            <li :class="products === 'week' ? 'active' : 'deactivate'">
              <router-link
                @click="(e) => handleActiveChangeProducts(e, 'week')"
                to="#"
              >
                Week
              </router-link>
            </li>
            <li :class="products === 'month' ? 'active' : 'deactivate'">
              <router-link
                @click="(e) => handleActiveChangeProducts(e, 'month')"
                to="#"
              >
                Month
              </router-link>
            </li>
            <li :class="products === 'year' ? 'active' : 'deactivate'">
              <router-link
                @click="(e) => handleActiveChangeProducts(e, 'year')"
                to="#"
              >
                Year
              </router-link>
            </li>
          </ul>
        </div>
      </template>
      <template #more>
        <router-link to="#">
          <span>2 years</span>
        </router-link>
        <router-link to="#">
          <span>3 years</span>
        </router-link>
        <router-link to="#">
          <span>4 years</span>
        </router-link>
      </template>
      <!-- <TopSellerWrap> -->
      <div class="table-bordered top-seller-table table-responsive">
        <a-table
          :columns="sellingColumns"
          :dataSource="sellingData"
          :pagination="false"
        />
      </div>
      <!-- </TopSellerWrap> -->
    </sdCards>
  </div>
</template>
<script>
import { computed, onMounted, ref, defineComponent } from "vue";
import { useStore } from "vuex";
// import { TopSellerWrap } from "../../style";

const sellingColumns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Sold",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
  },
];

const TopSellingProduct = defineComponent({
  name: "TopSellingProduct",
  // components: { TopSellerWrap },
  setup() {
    const { dispatch } = useStore();
    const topSaleState = computed(() => "");
    const products = ref("year");
    onMounted(() => dispatch("topSaleGetData"));
    const handleActiveChangeProducts = (event, value) => {
      event.preventDefault();
      products.value = value;
      dispatch("topSaleFilterData", value);
    };

    const sellingData = computed(() =>
      topSaleState.value
        ? topSaleState.value.map((value) => {
            const { key, name, img, price, sold, revenue } = value;
            return {
              key,
              name: (
                <div class="product-info align-center-v">
                  <div class="product-img">
                    <img
                      src={require(`../../../../static/img/products/electronics/${img}`)}
                      alt=""
                    />
                  </div>
                  <span class="product-name">{name}</span>
                </div>
              ),
              price,
              sold,
              revenue,
            };
          })
        : []
    );

    return {
      topSaleState,
      products,
      handleActiveChangeProducts,
      sellingData,
      sellingColumns,
    };
  },
});

export default TopSellingProduct;
</script>
