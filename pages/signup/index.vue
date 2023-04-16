<template lang="pug">
.signup
  AppBarEmpty.signup--app-bar-empty
  Start.signup--start(
    v-if="activeSection === activeSections.start",
    @next="setActiveSection(activeSections.steps)"
  )
  Steps.signup--steps(v-if="activeSection === activeSections.steps")
  Finish.signup--finish(v-if="activeSection === activeSections.finish")
</template>

<script src="./signup.js" />
<style lang="scss" src="./signup.scss" />
