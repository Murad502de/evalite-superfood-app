<template lang="pug">
.evalite-home
  component(:is="getComponent(userData.role)")
</template>

<script src="./Home.js" />
<style lang="scss" src="./Home.scss" />
