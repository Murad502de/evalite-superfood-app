<template lang="pug">
v-avatar.app-avatar(size="256", color="#0082DE", @click="selectFile")
  img.app-avatar__img(v-show="url", :src="url", alt="John")
  v-icon(v-show="!url", width="32", height="32", color="#FFFFFF") mdi-camera
  input.app-avatar__input(
    ref="input",
    type="file",
    accept="image/*",
    @change="selectedFile"
  )
</template>

<script src="./AppAvatar.js" />
<style lang="scss" src="./AppAvatar.scss" />
