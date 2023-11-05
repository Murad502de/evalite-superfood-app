<template lang="pug">
.home-partner(:key="key")
  component(:is="getComponent()", @forceRerender="forceRerender")
</template>

<script src="./HomePartner.js" />
<style lang="scss" src="./HomePartner.scss" />
