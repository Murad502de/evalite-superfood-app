<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="title",
  @close="close"
)
  template(v-slot:actions)
    v-btn(
      dark,
      text,
      @click="approve",
      :loading="approveLoading",
      :disabled="saveLoading"
    ) Утвердить

  AppCard.verifications-detail--card
    v-tabs.verifications-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
      :hide-slider="approveLoading || saveLoading"
    )
      v-tab.verifications-detail--tab(
        :disabled="approveLoading || saveLoading"
      ) Персональные данные
      v-tab.verifications-detail--tab(
        :disabled="approveLoading || saveLoading"
      ) Паспорт
      v-tab.verifications-detail--tab(
        :disabled="approveLoading || saveLoading"
      ) Платежные данные
      v-tab.verifications-detail--tab(
        :disabled="approveLoading || saveLoading"
      ) Договор

    v-window.verifications-detail--window(v-model="tab")
      v-window-item.verifications-detail--window-item
        AppFormPersonalData(
          ref="personal_data_form",
          :data="user",
          :loading="loading",
          :disabled="approveLoading || saveLoading",
          @update:avatar="updateAvatar",
          @update:second_name="updateSecondName",
          @update:first_name="updateFirstName",
          @update:third_name="updateThirdName",
          @update:gender="updateGender",
          @update:birthday="updateBirthday",
          @update:email="updateEmail",
          @update:phone="updatePhone"
        )

      v-window-item.verifications-detail--window-item
        AppFormPassport(
          ref="passport_form",
          :data="user",
          :loading="loading",
          :disabled="approveLoading || saveLoading",
          @update:full_name="updateFullNamePass",
          @update:series="updateSeriesPass",
          @update:number="updateNumberPass",
          @update:issue_date="updateIssueDatePass",
          @update:registration_address="updateRegistrationAddressPass",
          @update:issue_by="updateIssueByPass",
          @update:department_code="updateDepartmentCodePass",
          @update:main_spread="updateMainSpreadPass",
          @update:registration_spread="updateRegistrationSpreadPass",
          @update:verification_spread="updateVerificationSpreadPass"
        )

      v-window-item.verifications-detail--window-item
        AppFormPaymentDetailsSE(
          v-if="employmentTypeCrt === employmentTypeSE",
          ref="payment_details_form_se",
          :data="user",
          :loading="loading",
          :disabled="approveLoading || saveLoading",
          @update:full_name="updateFullNameSE",
          @update:transaction_account="updateTransactionAccountSE",
          @update:inn="updateInnSE",
          @update:swift="updateSwiftSE",
          @update:mailing_address="updateMailingAddressSE",
          @update:bank="updateBankSE",
          @update:bic="updateBicSE",
          @update:correspondent_account="updateCorrespondentAccountSE",
          @update:bank_inn="updateBankInnSE",
          @update:bank_kpp="updateBankKppSE",
          @update:confirm_doc="updateConfirmDocSE"
        )
        AppFormPaymentDetailsIE(
          v-if="employmentTypeCrt === employmentTypeIE",
          ref="payment_details_form_ie",
          :data="user",
          :loading="loading",
          :disabled="approveLoading || saveLoading",
          @update:full_name="updateFullNameIE",
          @update:organization_legal_address="updateOrganizationLegalAddressIE",
          @update:inn="updateInnIE",
          @update:ogrn="updateOgrnIE",
          @update:transaction_account="updateTransactionAccountIE",
          @update:bank="updateBankIE",
          @update:bank_inn="updateBankInnIE",
          @update:bank_bic="updateBankBicIE",
          @update:bank_correspondent_account="updateBankCorrespondentAccountIE",
          @update:bank_legal_address="updateBankLegalAddressIE",
          @update:confirm_doc="updateConfirmDocIE"
        )

      v-window-item.verifications-detail--window-item
        AppFormDoc(
          ref="agency_contract_form",
          :data="user ? user.agencyContract : null",
          :title="'Загрузите документ в формате .pdf'",
          :loading="loading",
          :disabled="approveLoading || saveLoading",
          @update:agency_contract="updateAgencyContract"
        )

    AppButton(
      @click="save",
      :disabled="loading || approveLoading",
      :loading="saveLoading"
    ) Сохранить
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
