import * as verificationStatuses from '@/shared/verificationStatuses.js';

export const getUserVerificationStatusTitle = (status) => {
  switch (status) {
    case verificationStatuses.verified:
      return 'Подтвержден';
    case verificationStatuses.notVerified:
      return 'Требуется подтверждение';
    case verificationStatuses.waiting:
      return 'В обработке';
    case verificationStatuses.rejected:
      return 'Запрос отклонен';
    case verificationStatuses.toUpdate:
      return 'Требуется обновление';
    default:
      return 'Ошибка';
  }
};
