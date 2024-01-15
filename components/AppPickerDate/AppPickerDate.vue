<template lang="pug">
.app-picker-date
  v-menu(
    ref="menu1",
    v-model="menu",
    :close-on-content-click="false",
    transition="scale-transition",
    content-class="app-picker-date__menu",
    offset-y
  )
    template(v-slot:activator="{ on, attrs }")
      .app-picker-date__wrapper(@click="onFieldClicked")
        v-text-field.app-picker-date__field(
          v-model="dateRangeText",
          name="name",
          filled,
          single-line,
          outlined,
          :prefix="prefix",
          readonly,
          :rules="rules",
          :disabled="disabled",
          :loading="loading"
        )

    v-date-picker.app-picker-date__picker(
      v-model="dates",
      no-title,
      :range="range"
    )
      v-spacer
      v-btn(v-if="!hideActions", text, color="primary", @click="cancel") Отмена
      v-btn(v-if="!hideActions", text, color="primary", @click="ok") OK
</template>

<script src="./AppPickerDate.js" />
<style lang="scss" src="./AppPickerDate.scss" />
