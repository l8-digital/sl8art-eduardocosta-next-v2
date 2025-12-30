// utils/formatPhone.ts

export const formatPhone = (value: string): string => {
  if (!value) return '';
  return value.replace(/[()\s-]/g, '');
};

export const formatDate = (
  dateString = '',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  if (!dateString) return '';

  // força a data para meia-noite no fuso do Brasil
  const date = new Date(`${dateString}T00:00:00-03:00`);

  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('pt-BR', {
    ...options,
    timeZone: 'America/Sao_Paulo',
  });
};

export const formatDay = (day: string): string => {
  return day.padStart(2, '0');
};
