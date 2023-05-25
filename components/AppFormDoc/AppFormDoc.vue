<template lang="pug">
.app-form-doc
  .app-form-doc__title(
    :class="{ 'app-form-doc__title_error': agencyContractError }"
  ) {{ title }}

  AppFormMediaDoc(
    :type="'pdf'",
    :mediaName="agencyContractName",
    :mediaUrl="agencyContractUrl",
    @upload="uploadAgencyContract",
    @delete="deleteAgencyContract"
  )
</template>

<script src="./AppFormDoc.js" />
<style lang="scss" src="./AppFormDoc.scss" />
