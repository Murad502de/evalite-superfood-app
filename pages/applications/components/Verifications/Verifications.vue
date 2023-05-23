<template lang="pug">
.verifications
  AppTable(
    :headers="headers",
    :items="items",
    :loading="loading",
    :loading-text="'Данные загружаются'",
    :page="page",
    :lastPage="lastPage",
    :itemsPerPage="itemsPerPage",
    :itemsLength="itemsLength",
    @click:row="openVerificationsDetailDialog",
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )

  VerificationsDetail(
    :user="verificationsDetail",
    :dialog="verificationsDetailDialog",
    :loading="verificationsDetailLoading",
    @update:avatar="updateAvatar",
    @update:second_name="updateSecondName",
    @update:first_name="updateFirstName",
    @update:third_name="updateThirdName",
    @update:gender="updateGender",
    @update:birthday="updateBirthday",
    @update:email="updateEmail",
    @update:phone="updatePhone",
    @close="closeVerificationsDetailDialog",
    @approve="approveVerificationsDetail"
  )
</template>

<script src="./Verifications.js" />
<style lang="scss" src="./Verifications.scss" />
