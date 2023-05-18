import * as roles from '@/shared/roles';

export const getRoleTitleByCode = (code) => {
  switch (code) {
    case roles.admin:
      return 'Администратор';
    case roles.referral:
      return 'Реферал';
    default:
      return '';
  }
};
