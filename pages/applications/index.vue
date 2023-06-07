<template lang="pug">
.evalite-applications
  .evalite-applications__container
    v-tabs.evalite-applications--tabs(v-model="tab")
      v-tab.evalite-applications--tab Верификации
      v-tab.evalite-applications--tab Выплаты
      v-tab.evalite-applications--tab Архив выплат

    v-window.evalite-applications--window(v-model="tab")
      v-window-item.evalite-applications--window-item
        Verifications
      v-window-item.evalite-applications--window-item
        Payouts
      v-window-item.evalite-applications--window-item
        PayoutsCompleted
</template>

<script src="./applications.js" />
<style lang="scss" src="./applications.scss" />
