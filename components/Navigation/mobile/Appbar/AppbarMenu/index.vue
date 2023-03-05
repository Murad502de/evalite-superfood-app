<template lang="pug">
v-navigation-drawer.mobile-appbar-menu(
  v-model="isOpen"
  absolute
  temporary
  width="100%"
  style="z-index: 1000;"
)
  .mobile-appbar-menu-close
    v-icon.mobile-appbar-menu-close__icon(@click="close") mdi-close

  v-list(
    nav
    dense
  )
    v-list-item-group(
      v-model="group"
      active-class="deep-purple--text text--accent-4"
    )
      .mobile-appbar-menu-user
        Avatar.mobile-appbar-menu-user__avatar(
          width="64px"
          height="64px"
        )
        .mobile-appbar-menu-user__info
          .mobile-appbar-menu-user__fullname Станислав Станиславский
          .mobile-appbar-menu-user__link Мой профиль

      v-divider

      .mobile-appbar-menu-status
        v-switch(inset label="Доступен для работ")

      v-divider

      .mobile-appbar-menu-list
        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              fill-rule="evenodd"
              clip-rule="evenodd" d="M9.15118 0.512264C10.1073 -0.170732 11.3918 -0.170756 12.348 0.512202L19.5108 5.62828C20.7591 6.51991 21.5 7.95952 21.5 9.49357V17.2922C21.5 19.3633 19.8211 21.0422 17.75 21.0422H14.8924C13.3737 21.0422 12.1424 19.811 12.1424 18.2922V16.7922C12.1424 16.378 11.8067 16.0422 11.3924 16.0422H10.1067C9.69251 16.0422 9.35672 16.378 9.35672 16.7922V18.2922C9.35672 19.811 8.12551 21.0422 6.60672 21.0422H3.75C1.67893 21.0422 0 19.3633 0 17.2922V9.49347C0 7.95949 0.740805 6.51993 1.98904 5.62829L9.15118 0.512264ZM11.4762 1.73282C11.0415 1.42238 10.4577 1.42239 10.0231 1.73285L2.86092 6.84888C2.00687 7.45894 1.5 8.4439 1.5 9.49347V17.2922C1.5 18.5348 2.50736 19.5422 3.75 19.5422H6.60672C7.29708 19.5422 7.85672 18.9825 7.85672 18.2922V16.7922C7.85672 15.5496 8.86408 14.5422 10.1067 14.5422H11.3924C12.6351 14.5422 13.6424 15.5496 13.6424 16.7922V18.2922C13.6424 18.9825 14.2021 19.5422 14.8924 19.5422H17.75C18.9926 19.5422 20 18.5348 20 17.2922V9.49357C20 8.44396 19.4931 7.45896 18.639 6.8489L11.4762 1.73282Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Главное

        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          )
            path(
              d="M19.5 0.5H4.5C2.025 0.5 0 2.525 0 5V15.5C0 17.975 2.025 20 4.5 20H19.5C21.975 20 24 17.975 24 15.5V5C24 2.525 21.975 0.5 19.5 0.5ZM22.5 15.5C22.5 17.15 21.15 18.5 19.5 18.5H4.5C2.85 18.5 1.5 17.15 1.5 15.5V5C1.5 3.35 2.85 2 4.5 2H19.5C21.15 2 22.5 3.35 22.5 5V15.5ZM19.5 5.75C19.5 6.2 19.2 6.5 18.75 6.5H9.75C9.3 6.5 9 6.2 9 5.75C9 5.3 9.3 5 9.75 5H18.75C19.2 5 19.5 5.3 19.5 5.75ZM9 10.25C9 9.8 9.3 9.5 9.75 9.5H14.25C14.7 9.5 15 9.8 15 10.25C15 10.7 14.7 11 14.25 11H9.75C9.3 11 9 10.7 9 10.25ZM18 14.75C18 15.2 17.7 15.5 17.25 15.5H9.75C9.3 15.5 9 15.2 9 14.75C9 14.3 9.3 14 9.75 14H17.25C17.7 14 18 14.3 18 14.75ZM6.9 5.75C6.9 6.275 6.525 6.65 6 6.65C5.475 6.65 5.1 6.275 5.1 5.75C5.1 5.225 5.475 4.85 6 4.85C6.525 4.85 6.9 5.225 6.9 5.75ZM6.9 10.25C6.9 10.775 6.525 11.15 6 11.15C5.475 11.15 5.1 10.775 5.1 10.25C5.1 9.725 5.475 9.35 6 9.35C6.525 9.35 6.9 9.725 6.9 10.25ZM6.9 14.75C6.9 15.275 6.525 15.65 6 15.65C5.475 15.65 5.1 15.275 5.1 14.75C5.1 14.225 5.475 13.85 6 13.85C6.525 13.85 6.9 14.225 6.9 14.75Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Мои заявки

        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"
          )
            path(
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.25 4C0.25 1.92893 1.92893 0.25 4 0.25H18C20.0711 0.25 21.75 1.92893 21.75 4V12C21.75 14.0711 20.0711 15.75 18 15.75H4C1.92893 15.75 0.25 14.0711 0.25 12V4ZM4 1.75C2.75736 1.75 1.75 2.75736 1.75 4V12C1.75 13.2426 2.75736 14.25 4 14.25H18C19.2426 14.25 20.25 13.2426 20.25 12V4C20.25 2.75736 19.2426 1.75 18 1.75H4Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Account

        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.38436 1.93195C9.98215 0.494686 12.0182 0.494691 12.616 1.93195L14.6321 6.77937C14.6681 6.86593 14.7495 6.92507 14.843 6.93256L20.0762 7.35211C21.6278 7.4765 22.257 9.41289 21.0748 10.4256L17.0877 13.841C17.0165 13.902 16.9854 13.9977 17.0071 14.0888L18.2253 19.1956C18.5864 20.7097 16.9392 21.9065 15.6108 21.0951L11.1305 18.3585C11.0505 18.3096 10.9499 18.3096 10.8699 18.3585L6.38951 21.0951C5.06108 21.9065 3.41389 20.7097 3.77507 19.1956L4.99321 14.0888C5.01496 13.9977 4.98387 13.902 4.91267 13.841L0.925526 10.4256C-0.256666 9.41289 0.372512 7.4765 1.92415 7.35211L7.15735 6.93256C7.2508 6.92507 7.3322 6.86593 7.3682 6.77937L9.38436 1.93195ZM11.231 2.508C11.1456 2.30267 10.8547 2.30267 10.7693 2.508L8.75318 7.35542C8.50117 7.96133 7.93135 8.37532 7.27722 8.42777L2.04402 8.84731C1.82236 8.86508 1.73248 9.14171 1.90136 9.28637L5.88851 12.7018C6.38689 13.1287 6.60454 13.7986 6.45227 14.4369L5.23414 19.5436C5.18254 19.7599 5.41785 19.9309 5.60763 19.815L10.088 17.0784C10.648 16.7363 11.3523 16.7363 11.9124 17.0784L16.3927 19.815C16.5825 19.9309 16.8178 19.7599 16.7662 19.5436L15.5481 14.4369C15.3958 13.7986 15.6134 13.1287 16.1118 12.7018L20.099 9.28637C20.2679 9.1417 20.178 8.86508 19.9563 8.84731L14.7231 8.42777C14.069 8.37532 13.4992 7.96133 13.2472 7.35542L11.231 2.508Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Account

        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.25 4.6C4.25 2.19756 6.19756 0.25 8.6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6V8.1579C21.75 10.1418 20.1418 11.75 18.1579 11.75C17.6596 11.75 17.2697 11.3553 17.2459 10.8808C17.2333 10.6303 17.1837 10.05 16.9943 9.39382C16.8034 8.73271 16.4854 8.04607 15.9697 7.53033C14.5016 6.06227 12.2612 5.75 9.8686 5.75H5.4C4.76487 5.75 4.25 5.23513 4.25 4.6ZM5.77128 4.25H9.8686C12.2864 4.25 15.0969 4.53626 17.0303 6.46967C17.7896 7.22898 18.2048 8.17869 18.4354 8.97778C18.5652 9.42731 18.6413 9.84549 18.686 10.1828C19.5857 9.94878 20.25 9.13091 20.25 8.1579V6C20.25 3.65279 18.3472 1.75 16 1.75H8.6C7.14448 1.75 5.94381 2.8411 5.77128 4.25Z"
              fill="#0082DE"
            )
            path(
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.25 11.0714C0.25 7.30406 3.30406 4.25 7.07143 4.25H11.9286C15.6959 4.25 18.75 7.30406 18.75 11.0714C18.75 14.8388 15.6959 17.8929 11.9286 17.8929H11.0249L7.66391 21.2539C6.76746 22.1503 5.25987 21.2968 5.56735 20.0668L6.11579 17.8731C2.83333 17.6154 0.25 14.8701 0.25 11.5214V11.0714ZM7.07143 5.75C4.13248 5.75 1.75 8.13249 1.75 11.0714V11.5214C1.75 14.2118 3.93102 16.3929 6.62144 16.3929C7.33794 16.3929 7.86367 17.0662 7.6899 17.7613L7.24147 19.555L10.054 16.7425C10.2778 16.5186 10.5815 16.3929 10.8981 16.3929H11.9286C14.8675 16.3929 17.25 14.0104 17.25 11.0714C17.25 8.13249 14.8675 5.75 11.9286 5.75H7.07143Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Account

        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              d="M5 22.5C2.525 22.5 0.5 20.475 0.5 18V7.5C0.5 5.025 2.525 3 5 3H11.75C12.2 3 12.5 3.3 12.5 3.75C12.5 4.2 12.2 4.5 11.75 4.5H5C3.35 4.5 2 5.85 2 7.5V18C2 19.65 3.35 21 5 21H15.5C17.15 21 18.5 19.65 18.5 18V10.5C18.5 10.05 18.8 9.75 19.25 9.75C19.7 9.75 20 10.05 20 10.5V18C20 20.475 17.975 22.5 15.5 22.5H5ZM17.75 0.75C19.85 0.75 21.5 2.4 21.5 4.5C21.5 6.6 19.85 8.25 17.75 8.25C15.65 8.25 14 6.6 14 4.5C14 2.4 15.65 0.75 17.75 0.75Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Account

        v-divider.mobile-appbar-menu-list__item

        .mobile-appbar-menu-list__item
          svg.mobile-appbar-menu-list__item-icon(
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16H2V2H7C7.26522 2 7.51957 1.89464 7.70711 1.70711C7.89464 1.51957 8 1.26522 8 1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H7C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17Z"
              fill="#0082DE"
            )
            path(
              d="M18.714 9.69996C18.8969 9.51403 18.9996 9.26378 19 9.00296V8.99696C18.9995 8.73274 18.8941 8.47953 18.707 8.29296L14.707 4.29296C14.6148 4.19745 14.5044 4.12127 14.3824 4.06886C14.2604 4.01645 14.1292 3.98886 13.9964 3.98771C13.8636 3.98655 13.7319 4.01186 13.609 4.06214C13.4862 4.11242 13.3745 4.18667 13.2806 4.28056C13.1867 4.37446 13.1125 4.48611 13.0622 4.60901C13.0119 4.7319 12.9866 4.86358 12.9877 4.99636C12.9889 5.12914 13.0165 5.26036 13.0689 5.38236C13.1213 5.50437 13.1975 5.61471 13.293 5.70696L15.586 7.99996H6C5.73478 7.99996 5.48043 8.10532 5.29289 8.29285C5.10536 8.48039 5 8.73474 5 8.99996C5 9.26518 5.10536 9.51953 5.29289 9.70707C5.48043 9.8946 5.73478 9.99996 6 9.99996H15.586L13.293 12.293C13.1108 12.4816 13.01 12.7342 13.0123 12.9964C13.0146 13.2586 13.1198 13.5094 13.3052 13.6948C13.4906 13.8802 13.7414 13.9854 14.0036 13.9876C14.2658 13.9899 14.5184 13.8891 14.707 13.707L18.707 9.70696L18.714 9.69996Z"
              fill="#0082DE"
            )

          .mobile-appbar-menu-list__item-title Account
</template>

<script>
import Avatar from '@/components/UI/Avatar';

export default {
  components: {
    Avatar,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    group: null,
  }),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    close() {
      this.$emit('close');
    },

    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.mobile-appbar-menu {
  font-family: 'Source Sans Pro';
  font-style: normal;

  &-close {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    padding-right: 10px;
    padding-top: 10px;

    &__icon {
      cursor: pointer;
    }
  }

  &-user {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;

    &__info {
      margin-left: 13px;
    }

    &__fullname {
      font-weight: 700;
      font-size: 18px;
      line-height: 125%;
      color: #000000;
    }

    &__link {
      font-weight: 600;
      font-size: 14px;
      line-height: 125%;
      color: #0082DE;
    }
  }

  &-status {
    .v-input--switch--inset {
      margin: 0 !important;

      .v-input__slot {
        margin: 0 !important;

        .v-label {
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: #263043;
        }
      }

      .v-messages {
        display: none;
      }
    }
  }

  &-list {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: center;

    &__item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      margin-top: 21px;

      &:first-child {
        margin-top: 0;
      }

      &-title {
        margin-left: 11px;
      }

      &-icon {}
    }

    .v-divider {
      width: 100%;
    }
  }

  .v-list {
    padding: 0px 16px;
  }

  .v-divider {
    margin: 21px 0px;
  }
}
</style>
