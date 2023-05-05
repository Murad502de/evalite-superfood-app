<template lang="pug">
.ruqi-home
  component(:is="getComponent(userData.role)")
</template>

<script src="./home.js" />
<style lang="scss" src="./home.scss" />
