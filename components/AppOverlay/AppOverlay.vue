<template lang="pug">
v-dialog.app-overlay(
  v-model="dialog",
  fullscreen,
  hide-overlay,
  transition="dialog-bottom-transition",
  scrollable,
  persistent
)
  v-card.app-overlay__container(tile)
    v-toolbar.app-overlay--toolbar(flat, dark, color="#0082DE")
      v-btn(icon, dark, @click="close")
        v-icon mdi-close
      v-toolbar-title {{ title }}
      v-spacer
      v-toolbar-items
        slot(name="actions")
    .app-overlay--main
      slot
</template>

<script src="./AppOverlay.js" />
<style lang="scss" src="./AppOverlay.scss" />
