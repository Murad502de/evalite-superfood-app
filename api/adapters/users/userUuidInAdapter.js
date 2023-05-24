import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export const userUuidInAdapter = async (user) => ({
  uuid: user.uuid,
  avatar: user.avatar,
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
    registrationSpread: user.passport.passport_registration_spread,
    verificationSpread: user.passport.passport_verification_spread,
    registrationAddress: user.passport.registration_address,
    series: user.passport.series,
  },
  paymentDetailsSelfEmployed: await userUuidPaymentDetailsSelfEmployedInAdapter(user.payment_details_self_employed),
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
    swift: data.swift,
    transactionAccount: data.transaction_account,
  };
};
