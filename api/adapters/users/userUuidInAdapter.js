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
  passport: {
    uuid: user.passport.uuid,
    departmentCode: user.passport.department_code,
    fullName: user.passport.full_name,
    issueBy: user.passport.issue_by,
    issueDate: parseFromISOtoDdMmYyyy(user.passport.issue_date),
    number: user.passport.number,
    passportMainSpread: user.passport.passport_main_spread,
    passportRegistrationSpread: user.passport.passport_registration_spread,
    passportVerificationSpread: user.passport.passport_verification_spread,
    registrationAddress: user.passport.registration_address,
    series: user.passport.series,
  },
});
