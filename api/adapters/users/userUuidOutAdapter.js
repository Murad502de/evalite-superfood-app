export const userUuidOutAdapter = async (payload = null) => {
  if (payload === null) return null;

  let data = {
    uuid: payload.uuid,
    user_first_name: payload.firstName || null,
    user_second_name: payload.secondName || null,
    user_third_name: payload.thirdName || null,
    user_gender: payload.gender || null,
    user_birthday: payload.birthday || null,
    user_email: payload.email || null,
    user_phone: payload.phone || null,

    // pass_full_name: payload.passport?.fullName || null,
    // pass_series: payload.passport?.series || null,
    // pass_number: payload.passport?.number || null,
    // pass_issue_date: payload.passport?.issueDate || null,
    // pass_registration_address: payload.passport?.registrationAddress ? payload.passport?.registrationAddress.replace(/[^0-9]/g, '') : null,
    // pass_issue_by: payload.passport?.issueBy || null,
    // pass_department_code: payload.passport?.departmentCode || null,

    pass_full_name: payload.passportFullName || null,
    pass_series: payload.passportSeries || null,
    pass_number: payload.passportNumber || null,
    pass_issue_date: payload.passportIssueDate || null,
    pass_department_code: payload.passportDepartmentCode ? payload.passportDepartmentCode.replace(/[^0-9]/g, '') : null,
    pass_issue_by: payload.passportIssueBy || null,
    pass_registration_address: payload.passportRegistrationAddress || null,

    // ie_full_name: payload.paymentDetailsIndividualEntrepreneur?.fullName || null,
    // ie_organization_legal_address: payload.paymentDetailsIndividualEntrepreneur?.organizationLegalAddress || null,
    // ie_inn: payload.paymentDetailsIndividualEntrepreneur?.inn || null,
    // ie_ogrn: payload.paymentDetailsIndividualEntrepreneur?.ogrn || null,
    // ie_transaction_account: payload.paymentDetailsIndividualEntrepreneur?.transactionAccount || null,
    // ie_bank: payload.paymentDetailsIndividualEntrepreneur?.bank || null,
    // ie_bank_inn: payload.paymentDetailsIndividualEntrepreneur?.bankInn || null,
    // ie_bank_bic: payload.paymentDetailsIndividualEntrepreneur?.bankBic || null,
    // ie_bank_correspondent_account: payload.paymentDetailsIndividualEntrepreneur?.bankCorrespondentAccount || null,
    // ie_bank_legal_address: payload.paymentDetailsIndividualEntrepreneur?.bankLegalAddress || null,

    ie_full_name: payload.paymentDetailsFullName || null,
    ie_organization_legal_address: payload.paymentDetailsOrganizationLegalAddress || null,
    ie_inn: payload.paymentDetailsInn || null,
    ie_ogrn: payload.paymentDetailsOgrn || null,
    ie_transaction_account: payload.paymentDetailsTransactionAccount || null,
    ie_bank: payload.paymentDetailsBank || null,
    ie_bank_inn: payload.paymentDetailsBankInn || null,
    ie_bank_bic: payload.paymentDetailsBankBic || null,
    ie_bank_correspondent_account: payload.paymentDetailsBankCorrespondentAccount || null,
    ie_bank_legal_address: payload.paymentDetailsBankLegalAddress || null,

    se_full_name: payload.paymentDetailsSelfEmployed?.fullName || null,
    se_transaction_account: payload.paymentDetailsSelfEmployed?.transactionAccount || null,
    se_inn: payload.paymentDetailsSelfEmployed?.inn || null,
    se_swift: payload.paymentDetailsSelfEmployed?.swift || null,
    se_mailing_address: payload.paymentDetailsSelfEmployed?.mailingAddress || null,
    se_bank: payload.paymentDetailsSelfEmployed?.bank || null,
    se_bic: payload.paymentDetailsSelfEmployed?.bic || null,
    se_correspondent_account: payload.paymentDetailsSelfEmployed?.correspondentAccount || null,
    se_bank_inn: payload.paymentDetailsSelfEmployed?.bankInn || null,
    se_bank_kpp: payload.paymentDetailsSelfEmployed?.bankKpp || null,
  };

  if (!!payload.avatarFile) data.user_avatar = payload.avatarFile;

  // if (!!payload.passport?.mainSpreadFile) data.passport_main_spread = payload.passport.mainSpreadFile;
  // if (!!payload.passport?.registrationSpreadFile) data.passport_registration_spread = payload.passport.registrationSpreadFile;
  // if (!!payload.passport?.verificationSpreadFile) data.passport_verification_spread = payload.passport.verificationSpreadFile;

  if (!!payload.passportMainSpread) data.passport_main_spread = payload.passportMainSpread;
  if (!!payload.passportRegistrationSpread) data.passport_registration_spread = payload.passportRegistrationSpread;
  if (!!payload.passportVerificationSpread) data.passport_verification_spread = payload.passportVerificationSpread;

  // if (!!payload.paymentDetailsIndividualEntrepreneur?.confirmDocFile) data.ie_confirm_doc = payload.paymentDetailsIndividualEntrepreneur.confirmDocFile;

  if (!!payload.paymentDetailConfirmDocsFile) data.ie_confirm_doc = payload.paymentDetailConfirmDocsFile;

  if (!!payload.paymentDetailsSelfEmployed?.confirmDocFile) data.se_confirm_doc = payload.paymentDetailsSelfEmployed.confirmDocFile;
  if (payload.agencyContractFile !== undefined) {
    console.debug('payload.agencyContractFile', payload.agencyContractFile); //DELETE

    data.agency_contract = payload.agencyContractFile;
  }

  return data;
};
