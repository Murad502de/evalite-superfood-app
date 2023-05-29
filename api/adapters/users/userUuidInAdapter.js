import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export const userUuidInAdapter = async (user) => ({
  uuid: user.uuid,
  avatar: user.avatar,
  avatarFile: null,
  fullName: `${user.second_name} ${user.first_name} ${user.third_name}`,
  firstName: user.first_name,
  secondName: user.second_name,
  thirdName: user.third_name,
  gender: user.gender,
  birthday: parseFromISOtoDdMmYyyy(user.birthday),
  email: user.email,
  phone: user.phone,
  employmentType: user.employment_type,
  passport: {
    uuid: user.passport.uuid,
    departmentCode: user.passport.department_code,
    fullName: user.passport.full_name,
    issueBy: user.passport.issue_by,
    issueDate: parseFromISOtoDdMmYyyy(user.passport.issue_date),
    number: user.passport.number,
    mainSpread: user.passport.passport_main_spread,
    mainSpreadFile: null,
    registrationSpread: user.passport.passport_registration_spread,
    registrationSpreadFile: null,
    verificationSpread: user.passport.passport_verification_spread,
    verificationSpreadFile: null,
    registrationAddress: user.passport.registration_address,
    series: user.passport.series,
  },
  paymentDetailsSelfEmployed: await userUuidPaymentDetailsSelfEmployedInAdapter(user.payment_details_self_employed),
  paymentDetailsIndividualEntrepreneur: await userUuidPaymentDetailsIndividualEntrepreneurInAdapter(user.payment_details_individual_entrepreneur),
  agencyContract: user.agency_contract?.agency_contract_url,
  agencyContractFile: undefined,
});

const userUuidPaymentDetailsSelfEmployedInAdapter = async (data) => {
  if (!data) return null;

  return {
    uuid: data.uuid,
    bank: data.bank,
    bankInn: data.bank_inn,
    bankKpp: data.bank_kpp,
    bic: data.bic,
    correspondentAccount: data.correspondent_account,
    fullName: data.full_name,
    inn: data.inn,
    mailingAddress: data.mailing_address,
    confirmDoc: data.se_confirm_doc,
    confirmDocFile: null,
    swift: data.swift,
    transactionAccount: data.transaction_account,
  };
};

const userUuidPaymentDetailsIndividualEntrepreneurInAdapter = async (data) => {
  if (!data) return null;

  return {
    uuid: data.uuid,
    bank: data.bank,
    bankBic: data.bank_bic,
    bankCorrespondentAccount: data.bank_correspondent_account,
    bankInn: data.bank_inn,
    bankLegalAddress: data.bank_legal_address,
    fullName: data.full_name,
    confirmDoc: data.ie_confirm_doc,
    confirmDocFile: null,
    inn: data.inn,
    ogrn: data.ogrn,
    organizationLegalAddress: data.organization_legal_address,
    transactionAccount: data.transaction_account,
  };
};
