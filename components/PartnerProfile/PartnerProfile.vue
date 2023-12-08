<template lang="pug">
.partner-profile
  .partner-profile__main
    PersonalCard.partner-profile-card(
      :user="user",
      @edit="openCardSettings(cardNames.personalCard)"
    )
    .partner-profile-blocks
      BlockCard.partner-profile-block(
        :title="'Паспорт'",
        :items="passCardFields",
        @edit="openCardSettings(cardNames.passportCard)"
      )
      BlockCard.partner-profile-block(
        :title="'Платежные данные'",
        :items="paymentDetailsCardFields",
        @edit="openCardSettings(cardNames.paymentDetailsCard)"
      )
      BlockCard.partner-profile-block.partner-profile-contract(
        :title="'Договор'",
        @edit="openCardSettings(cardNames.contractCard)"
      )
        a.partner-profile-contract__link(
          v-if="agencyContractLink",
          :href="agencyContractLink",
          target="_blank"
        ) Просмотреть договор

        AppButton(
          :loading="newAgencyContractLoading",
          @click="getAgencyContractTemplate"
        ) Получить договор

        a.partner-profile-contract__link(
          v-show="false",
          ref="partner_contract_template_download_link",
          :href="newAgencyContractLink",
          download="Партнерский договор.pdf"
        )

  AppOverlay.partner-profile-settings(
    :dialog="dialog",
    :title="'Настройки'",
    @close="close"
  )
    template(v-slot:actions)
      v-btn(dark, text, @click="save", :loading="saveLoading") Сохранить

    PersonalCardSettings(
      v-show="openedSettings === cardNames.personalCard",
      ref="partner_profile_personal_card_settings"
      :user="user",
      @update:avatar="updateAvatar",
      @update:second_name="updateSecondName",
      @update:first_name="updateFirstName",
      @update:third_name="updateThirdName",
      @update:gender="updateGender",
      @update:birthday="updateBirthday",
      @update:email="updateEmail",
      @update:phone="updatePhone",
      @update:password="updatePassword"
    )
    PassportCardSettings(
      v-show="openedSettings === cardNames.passportCard",
      ref="partner_profile_passport_card_settings"
      :user="user",
      @update:pass_full_name="updatePassFullName",
      @update:pass_series="updatePassSeries",
      @update:pass_number="updatePassNumber",
      @update:pass_issue_date="updatePassIssueDate",
      @update:pass_registration_address="updatePassRegistrationAddress",
      @update:pass_issue_by="updatePassIssueBy",
      @update:pass_department_code="updatePassDepartmentCode",
      @update:pass_main_spread="updatePassMainSpread",
      @update:pass_registration_spread="updatePassRegistrationSpread",
      @update:pass_verification_spread="updatePassVerificationSpread"
    )
    PaymentDetailsCardSettings(
      v-show="openedSettings === cardNames.paymentDetailsCard",
      :user="user",
      @update:full_name="updatePaymentDetailsFullName",
      @update:organization_legal_address="updatePaymentDetailsOrganizationLegalAddress",
      @update:inn="updatePaymentDetailsInn",
      @update:ogrn="updatePaymentDetailsOgrn",
      @update:transaction_account="updatePaymentDetailsTransactionAccount",
      @update:bank="updatePaymentDetailsBank",
      @update:bank_inn="updatePaymentDetailsBankInn",
      @update:bank_bic="updatePaymentDetailsBankBic",
      @update:bank_correspondent_account="updatePaymentDetailsBankCorrespondentAccount",
      @update:bank_legal_address="updatePaymentDetailsBankLegalAddress",
      @update:confirm_doc="updatePaymentDetailConfirmDocs"
    )
    ContractCardSettings(
      v-show="openedSettings === cardNames.contractCard",
      :user="user",
      @update:agency_contract="updateAgencyContract"
    )
</template>

<script src="./PartnerProfile.js" />
<style lang="scss" src="./PartnerProfile.scss" />
