<template lang="pug">
.home-referral(:key="key")
  component(:is="getComponent()", @forceRerender="forceRerender")
</template>

<script src="./HomeReferral.js" />
<style lang="scss" src="./HomeReferral.scss" />
