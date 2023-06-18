<template lang="pug">
.home-referral(:key="key")
  component(:is="getComponent()", @forceRerender="forceRerender")
</template>

<script src="./HomePartner.js" />
<style lang="scss" src="./HomePartner.scss" />
