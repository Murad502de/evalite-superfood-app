<template lang="pug">
.app-form-doc
  slot(name="header")
    .app-form-doc__title(:class="{ 'app-form-doc__title_error': docError }") {{ title }}

  AppFormMediaDoc(
    :type="'pdf'",
    :mediaName="docName",
    :mediaUrl="docUrl",
    :disabledForm="disabled",
    @upload="uploadAgencyContract",
    @delete="deleteAgencyContract"
  )
</template>

<script src="./AppFormDoc.js" />
<style lang="scss" src="./AppFormDoc.scss" />
