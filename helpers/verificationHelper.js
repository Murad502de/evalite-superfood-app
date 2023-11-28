import * as verificationStatuses from '@/shared/verificationStatuses.js';
import circleWarningRedSVG from '@/assets/svg/circle_warning_red.svg';
import stopSVG from '@/assets/svg/stop_outlined.svg';
import hourglassEmptySVG from '@/assets/svg/hourglass_empty.svg';
import reportOutlinedSVG from '@/assets/svg/report_outlined.svg';
import checkCircleSVG from '@/assets/svg/check_circle.svg';
import updateOutlinedOrangeSVG from '@/assets/svg/update_outlined_orange.svg';

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

export const getUserVerificationStatusIconName = (status) => {
  switch (status) {
    case verificationStatuses.verified:
      return checkCircleSVG;
    case verificationStatuses.notVerified:
      return circleWarningRedSVG;
    case verificationStatuses.waiting:
      return hourglassEmptySVG;
    case verificationStatuses.rejected:
      return stopSVG;
    case verificationStatuses.toUpdate:
      return updateOutlinedOrangeSVG;
    default:
      return reportOutlinedSVG;
  }
};
