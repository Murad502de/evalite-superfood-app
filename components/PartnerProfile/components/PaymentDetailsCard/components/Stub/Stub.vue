<template lang="pug">
.stub
  .stub__items(v-for="i in 10", :key="i")
    AppSkeleton.stub__item(:height="24")
</template>

<script src="./Stub.js" />
<style lang="scss" src="./Stub.scss" />
