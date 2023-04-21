<template lang="pug">
.signup
  AppBarEmpty.signup--app-bar-empty
  Start.signup--start(
    v-if="activeSection === activeSections.start",
    @next="setActiveSection(activeSections.steps)"
  )
  Steps.signup--steps(
    v-if="activeSection === activeSections.steps",
    @next="signup"
  )
  Finish.signup--finish(
    v-if="activeSection === activeSections.finish",
    @next="redirectTo('signin')"
  )
</template>

<script src="./signup.js" />
<style lang="scss" src="./signup.scss" />
