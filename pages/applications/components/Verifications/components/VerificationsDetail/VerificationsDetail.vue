<template lang="pug">
AppOverlay.verifications-detail(
    :dialog="dialog",
    :title="'Расулов Гаджимурад Зайнутдинович'",
    @close="close",
    @save="save"
  )
    .ttt AppOverlayMain TTT
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
