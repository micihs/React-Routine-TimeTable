import i18n from 'react-native-i18n';

export default function validate(values) {
  const errors = {};

  if (values.starttime.isAfter(values.endtime, 'minutes')) {
    errors.endtime = i18n.t('endtime-greater-than-starttime');
  }
  if (values.startdate.isAfter(values.enddate, 'minutes')) {
    errors.enddate = i18n.t('enddate-greater-than-startdate');
  }
  return errors;
}