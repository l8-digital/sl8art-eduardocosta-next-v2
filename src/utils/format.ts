// utils/formatPhone.ts

export const formatPhone = (value: string): string => {
  if (!value) return '';
  return value.replace(/[()\s-]/g, '');
};

export const formatDate = (dateString = '', options: Intl.DateTimeFormatOptions = {}): string => {
  const date = new Date(dateString);

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return ''; // Retorna uma string vazia se a data for inválida
  }

 return date.toLocaleDateString('pt-BR', {
    ...options,
    timeZone: 'America/Sao_Paulo',
  });
};

export const formatDay = (day: string): string => {
  return day.padStart(2, '0');
};
