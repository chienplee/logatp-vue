<script>
import { PageHeaderStyle } from './style';
import VueTypes from 'vue-types';
import { defineComponent } from 'vue';
export const PageHeader = defineComponent({
  components: {
    PageHeaderStyle,
  },
  props: {
    title: VueTypes.oneOfType([VueTypes.string, VueTypes.object]),
    subTitle: VueTypes.oneOfType([VueTypes.string, VueTypes.object]),
    bgColor: VueTypes.string,
    class: VueTypes.string,
    routes: VueTypes.object,
    buttons: VueTypes.array,
    ghost: VueTypes.bool,
    breadcrumb: VueTypes.object,
  },

  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: this.bgColor || '#F4F5F7',
          }}
        >
          <PageHeaderStyle
            style={{
              backgroundColor: 'rgb(244, 245, 247)',
            }}
            class={this.class}
            title={this.title || this.$slots.title()}
            subTitle={this.subTitle || (this.$slots.subTitle ? this.$slots.subTitle() : null)}
            breadcrumb={this.breadcrumb && this.breadcrumb}
            ghost={this.ghost}
            extra={this.$slots.buttons && this.$slots.buttons()}
          ></PageHeaderStyle>
        </div>
      </div>
    );
  },
});

export default PageHeader;
</script>
