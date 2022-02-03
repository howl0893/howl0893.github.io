<template>
  <div class="card">
    <div class="card__product-img">
      <img 
        class="card__img"
        alt="product-image" 
        :src="require('@/static/' + img)"
      >
    </div>
    <div class="card__content">
      <p class="card__name">{{ name }} <span v-if="id">#{{ id }}</span></p>
      <p class="card__description" v-if="description">{{ description }}</p>
      <div class="card__content-bottom">
        <div class="card__price">
          <div class="icon">
            <img src="@/assets/nft-card/icon-ethereum.svg" alt="">
          </div>
          <p>{{ price }} ETH</p>
        </div>
        <div v-if="time" class="card__time">
          <div class="icon">
            <img src="@/assets/nft-card/icon-clock.svg" alt="">
          </div>
          <p>{{ time }} days left</p>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <div class="card__avatar">
        <img :src="require('@/static/' + avatar)" alt="avatar-image">
      </div>
      <p class="card__autor">Creation of <span class="card__autor--alt-color">{{ autor }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    id: {
      type: [String, Number],
      default: null
    },
    price: {
      type: Number,
      default: 0,
      required: true
    },
    time: {
      type: [String, Number],
      default: ''
    },
    autor: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.icon {
  display: flex;
}
.card {
  background-color: #15263F;
  color: #8BACD9;
  border-radius: 16px;
  padding: 24px;
  width: 327px;
  font-size: 1.5rem;
  box-shadow: 0 25px 50px 0 rgba(0,0,0,0.1);
  @media screen and (min-width: 768px) {
    font-size: 1.6rem;
    width: 350px;
    padding-bottom: 32px;
  }
}
  .card__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    @mixin hoverOpacity {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }
  }
  .card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 0 16px 0;
    @media screen and (min-width: 768px) {
      gap: 16px;
      padding: 24px 0;
    }
  }
  .card__footer {
    display: flex;
    align-items: center;
    border-top: 1px solid #2E405A;
    gap: 16px;
    padding-top: 16px;
  }

.fade-enter-active,
.fade-leave-active {
    transition: 0.25s ease-out;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
