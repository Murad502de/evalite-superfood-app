export const userUuidOutAdapter = async (payload = null) => {
  if (payload === null) return null;

  let data = {
    uuid: payload.uuid,
    user_first_name: payload.firstName,
    user_second_name: payload.secondName,
    user_third_name: payload.thirdName,
    user_gender: payload.gender,
    user_birthday: payload.birthday,
    user_email: payload.email,
    user_phone: payload.phone,
    pass_full_name: payload.passport.fullName,
    pass_series: payload.passport.series,
    pass_number: payload.passport.number,
    pass_issue_date: payload.passport.issueDate,
    pass_registration_address: payload.passport.registrationAddress,
    pass_issue_by: payload.passport.issueBy,
    pass_department_code: payload.passport.departmentCode,
    ie_full_name: payload.paymentDetailsIndividualEntrepreneur?.fullName,
    ie_organization_legal_address: payload.paymentDetailsIndividualEntrepreneur?.organizationLegalAddress,
    ie_inn: payload.paymentDetailsIndividualEntrepreneur?.inn,
    ie_ogrn: payload.paymentDetailsIndividualEntrepreneur?.ogrn,
    ie_transaction_account: payload.paymentDetailsIndividualEntrepreneur?.transactionAccount,
    ie_bank: payload.paymentDetailsIndividualEntrepreneur?.bank,
    ie_bank_inn: payload.paymentDetailsIndividualEntrepreneur?.bankInn,
    ie_bank_bic: payload.paymentDetailsIndividualEntrepreneur?.bankBic,
    ie_bank_correspondent_account: payload.paymentDetailsIndividualEntrepreneur?.bankCorrespondentAccount,
    ie_bank_legal_address: payload.paymentDetailsIndividualEntrepreneur?.bankLegalAddress,
    se_full_name: payload.paymentDetailsSelfEmployed?.fullName,
    se_transaction_account: payload.paymentDetailsSelfEmployed?.transactionAccount,
    se_inn: payload.paymentDetailsSelfEmployed?.inn,
    se_swift: payload.paymentDetailsSelfEmployed?.swift,
    se_mailing_address: payload.paymentDetailsSelfEmployed?.mailingAddress,
    se_bank: payload.paymentDetailsSelfEmployed?.bank,
    se_bic: payload.paymentDetailsSelfEmployed?.bic,
    se_correspondent_account: payload.paymentDetailsSelfEmployed?.correspondentAccount,
    se_bank_inn: payload.paymentDetailsSelfEmployed?.bankInn,
    se_bank_kpp: payload.paymentDetailsSelfEmployed?.bankKpp,
  };

  if (!!payload.avatarFile) data.user_avatar = payload.avatarFile;
  if (!!payload.passport.mainSpreadFile) data.passport_main_spread = payload.passport.mainSpreadFile;
  if (!!payload.passport.registrationSpreadFile) data.passport_registration_spread = payload.passport.registrationSpreadFile;
  if (!!payload.passport.verificationSpreadFile) data.passport_verification_spread = payload.passport.verificationSpreadFile;
  if (!!payload.paymentDetailsIndividualEntrepreneur?.confirmDocFile) data.ie_confirm_doc = payload.paymentDetailsIndividualEntrepreneur.confirmDocFile;
  if (!!payload.paymentDetailsSelfEmployed?.confirmDocFile) data.se_confirm_doc = payload.paymentDetailsSelfEmployed.confirmDocFile;
  if (payload.agencyContractFile !== undefined) {
    console.debug('payload.agencyContractFile', payload.agencyContractFile); //DELETE

    data.agency_contract = payload.agencyContractFile;
  }

  return data;
};
