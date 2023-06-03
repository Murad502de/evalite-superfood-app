<template lang="pug">
.app-status(:class="`app-status--${status}`")
  .app-status__title(:class="`app-status--${status}__title`") {{getTitle()}}
</template>

<script src="./AppStatus.js" />
<style lang="scss" src="./AppStatus.scss" />
