export const userUuidInAdapter = async (user) => {
  console.debug('userUuidInAdapter', user); //DELETE

  return {
    uuid: user.uuid,
    avatar: user.avatar,
    avatarFile: null,
    fullName: `${user.second_name} ${user.first_name} ${user.third_name}`,
    firstName: user.first_name,
    secondName: user.second_name,
    thirdName: user.third_name,
    gender: user.gender,
    birthday: user.birthday,
    email: user.email,
    phone: user.phone,
    role: user.role,
    employmentType: user.employment_type,
    referralLink: user.referral_link,
    inviteCode: user.invite_code,
    verificationStatus: user.verification_status,
    passport: await userUuidPassportInAdapter(user.passport),
    paymentDetailsSelfEmployed: await userUuidPaymentDetailsSelfEmployedInAdapter(user.payment_details_self_employed),
    paymentDetailsIndividualEntrepreneur: await userUuidPaymentDetailsIndividualEntrepreneurInAdapter(user.payment_details_individual_entrepreneur),
    agencyContract: user.agency_contract?.agency_contract_url,
    agencyContractFile: undefined,
  }
};

const userUuidPassportInAdapter = async (data) => {
  if (!data) return null;

  return {
    uuid: data.uuid,
    departmentCode: departmentCode(data.department_code),
    fullName: data.full_name,
    issueBy: data.issue_by,
    issueDate: data.issue_date,
    number: data.number,
    mainSpread: data.passport_main_spread,
    mainSpreadFile: null,
    registrationSpread: data.passport_registration_spread,
    registrationSpreadFile: null,
    verificationSpread: data.passport_verification_spread,
    verificationSpreadFile: null,
    registrationAddress: data.registration_address,
    series: data.series,
  };
};

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

const departmentCode = (value) => {
  if (!value.length) return;
  return `${value[0]}${value[1]}${value[2]}-${value[3]}${value[4]}${value[5]}`;
};
