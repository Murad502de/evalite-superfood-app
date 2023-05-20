<template lang="pug">
AppOverlay.verifications-detail(
    :dialog="dialog",
    :title="'Расулов Гаджимурад Зайнутдинович'",
    @close="close",
    @save="save"
  )
    v-text-field(
      outlined
      loading
    )
    AppSkeleton(height="56")
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
