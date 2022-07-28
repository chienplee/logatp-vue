<script>
import {
  BannerNormal,
  BannerWrapper,
  Figure2,
  Figure3,
  Figure6,
  Figure7,
  BannerCarouselWrap,
  BannerLongWrap,
  BannerCardWrap,
  BannerCtaWrap,
} from './Style';
import { defineComponent } from 'vue';

export const Banner1 = defineComponent({
  name: 'Banner1',
  render() {
    return (
      <BannerNormal>
        <sdCards headless bodyStyle={{ minHeight: '270px' }}>
          <h2>15 Days Free Trail</h2>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</p>
          <sdButton class="btn-outlined" size="small" outlined type="primary">
            Start
          </sdButton>
        </sdCards>
      </BannerNormal>
    );
  },
});

export const Banner2 = () => {
  return (
    <BannerWrapper>
      <sdCards
        class="mb-70"
        bodyStyle={{
          background: '#5F63F2',
          borderRadius: '10px',
          minHeight: '270px',
        }}
        headless
      >
        <Figure2>
          <img src={require('../../static/img/banner/1.png')} alt="" />
          <figcaption>
            <h2>Upgrade your plan</h2>
            <p>Lorem ipsum dolor sit amet</p>
            <sdButton size="large" type="white">
              Upgrade
            </sdButton>
          </figcaption>
        </Figure2>
      </sdCards>
    </BannerWrapper>
  );
};

export const Banner3 = () => {
  return (
    <BannerWrapper>
      <sdCards
        bodyStyle={{
          borderRadius: '10px',
          minHeight: '270px',
          background: '#5F63F2',
        }}
        headless
      >
        <Figure3>
          <img src={require('../../static/img/banner/2.png')} alt="" />
          <figcaption>
            <h2>Earn More Money</h2>
            <sdButton size="large" type="white">
              Learn More
            </sdButton>
          </figcaption>
        </Figure3>
      </sdCards>
    </BannerWrapper>
  );
};

export const Banner4 = () => {
  return (
    <BannerWrapper>
      <sdCards
        bodyStyle={{
          background: '#272B41',
          borderRadius: '10px',
          minHeight: '270px',
        }}
        headless
      >
        <Figure3 class="theme-3">
          <img src={require('../../static/img/banner/3.png')} alt="" />
          <figcaption>
            <h2>Win Your Bonus</h2>
            <p>Weekly performance bonus</p>
            <sdButton size="large" type="white">
              Learn More
            </sdButton>
          </figcaption>
        </Figure3>
      </sdCards>
    </BannerWrapper>
  );
};

export const Banner5 = () => {
  return (
    <BannerWrapper>
      <sdCards
        bodyStyle={{
          background: '#5F63F2',
          borderRadius: '10px',
          minHeight: '265px',
          display: 'flex',
          alignItems: 'center',
        }}
        headless
      >
        <Figure3 class="theme-wide">
          <img src={require('../../static/img/banner/4.png')} alt="" />
          <figcaption>
            <h2>Congratulations Jhon!</h2>
            <p>Best Seller on the last month.</p>
            <sdButton size="large" type="white">
              Learn More
            </sdButton>
          </figcaption>
        </Figure3>
      </sdCards>
    </BannerWrapper>
  );
};

export const Banner6 = () => {
  return (
    <BannerWrapper>
      <sdCards
        bodyStyle={{
          background: `url(${require('../../static/img/banner/5.png')})`,
          backgroundSize: 'cover',
          borderRadius: '10px',
          minHeight: '265px',
          display: 'flex',
          direction: 'ltr',
          alignItems: 'center',
        }}
        headless
      >
        <Figure6>
          <img src={require('../../static/img/banner/badge.svg')} alt="" />
          <figcaption>
            <h2>Up to 50 OFF</h2>
            <sdButton class="btn-outlined" size="small" outlined type="danger">
              Buy Now
            </sdButton>
          </figcaption>
        </Figure6>
      </sdCards>
    </BannerWrapper>
  );
};

export const Banner7 = () => {
  return (
    <BannerNormal class="theme-wide">
      <sdCards headless>
        <Figure7>
          <img src={require('../../static/img/banner/6.png')} alt="" />
          <figcaption>
            <h2>Subscribe to our newsletter</h2>
            <p>Lorem ipsum dolor sit amet, consetetur </p>
            <sdButton class="btn-outlined ant-btn-lg" outlined type="primary">
              Subscribe Now
            </sdButton>
          </figcaption>
        </Figure7>
      </sdCards>
    </BannerNormal>
  );
};

export const BannerCarousel = defineComponent({
  name: 'BannerCarousel',
  render() {
    return (
      <BannerCarouselWrap>
        <a-carousel autoplay>
          <div class="banner-signle">
            <div class="banner-single__img">
              <img src={require('../../static/img/banner/8.png')} alt="" />
            </div>
            <div class="banner-single__content">
              <h3>Achievements</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
            </div>
          </div>
          {/* End of /.banner-signle */}
          <div class="banner-signle">
            <div class="banner-single__img">
              <img src={require('../../static/img/banner/8.png')} alt="" />
            </div>
            <div class="banner-single__content">
              <h3>Achievements</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
            </div>
          </div>
          {/* End of /.banner-signle */}
          <div class="banner-signle">
            <div class="banner-single__img">
              <img src={require('../../static/img/banner/8.png')} alt="" />
            </div>
            <div class="banner-single__content">
              <h3>Achievements</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
            </div>
          </div>
          {/* End of /.banner-signle */}
        </a-carousel>
      </BannerCarouselWrap>
    );
  },
});

export const BannerLong = () => {
  return (
    <BannerLongWrap>
      <div class="banner-long-inner">
        <h2>Up To Date </h2>
        <img src={require('../../static/img/banner/9.png')} alt="" />
      </div>
    </BannerLongWrap>
  );
};

export const BannerCard = () => {
  return (
    <BannerCardWrap>
      <div
        class="banner-card-inner"
        style={{
          backgroundImage: `url("${require('../../static/img/banner/card-banner-1.png')}")`,
        }}
      >
        <h2>Need More Space?</h2>
        <sdButton size="large" type="white">
          Buy Storage
        </sdButton>
      </div>
    </BannerCardWrap>
  );
};

export const BannerCard2 = () => {
  return (
    <BannerCardWrap>
      <div
        class="banner-card-inner theme-2"
        style={{
          backgroundImage: `url("${require('../../static/img/banner/card-banner-2.png')}")`,
        }}
      >
        <h2>Create Sale Report</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>
        <sdButton size="large" type="white">
          Learn More
        </sdButton>
      </div>
    </BannerCardWrap>
  );
};

export const BannerCta = () => {
  return (
    <BannerCtaWrap>
      <div
        class="banner-cta align-center-v"
        style={{
          backgroundImage: `url("${require('../../static/img/banner/cta-banner-1.png')}")`,
        }}
      >
        <div class="banner-cta__content">
          <h2>Dedicated Support</h2>
          <sdButton size="large" type="primary">
            Learn More
          </sdButton>
        </div>
      </div>
    </BannerCtaWrap>
  );
};

export const BannerCta2 = () => {
  return (
    <BannerCtaWrap>
      <div
        class="banner-cta align-center-v theme-2"
        style={{
          backgroundImage: `url("${require('../../static/img/banner/cta-banner-2.png')}")`,
        }}
      >
        <div class="banner-cta__content">
          <h2>Welcome Back Garry Sobars!</h2>
          <p>Lorem ipsum dolor amet, consetetur sadipscing elitr sed diam </p>
          <sdButton size="large" type="white">
            Learn More
          </sdButton>
        </div>
      </div>
    </BannerCtaWrap>
  );
};

export default Banner1;
</script>
