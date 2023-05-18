<template lang="pug">
.ruqi-applications
  .ruqi-applications__container
    v-tabs.ruqi-applications--tabs(v-model="tab")
      v-tab.ruqi-applications--tab Верификации
      v-tab.ruqi-applications--tab Выплаты

    v-window.ruqi-applications--window(v-model="tab")
      v-window-item.ruqi-applications--window-item
        Verifications
      v-window-item.ruqi-applications--window-item
        Payouts
</template>

<script src="./applications.js" />
<style lang="scss" src="./applications.scss" />
