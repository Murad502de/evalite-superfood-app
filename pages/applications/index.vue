<template lang="pug">
.ruqi-applications
  .ruqi-applications__container
    //- .ruqi-applications--top-bar
    //-   .ruqi-applications--top-bar__title Заявки

    v-tabs.ruqi-applications--tabs(v-model="tab")
      v-tab.ruqi-applications--tab Верификации
      v-tab.ruqi-applications--tab Выплаты

    v-window.ruqi-applications--window(v-model="tab")
      v-window-item.ruqi-applications--window-item QWERTY 1
      v-window-item.ruqi-applications--window-item QWERTY 2
</template>

<script src="./applications.js" />
<style lang="scss" src="./applications.scss" />
