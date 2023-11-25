<template lang="pug">
.profile
  component(:is="getComponent(userData.role)")
</template>

<script src="./Profile.js" />
<style lang="scss" src="./Profile.scss" />
