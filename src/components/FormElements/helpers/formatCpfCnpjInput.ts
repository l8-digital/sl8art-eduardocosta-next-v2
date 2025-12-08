export function formatCpfCnpjInput(v: string) {
  // Remove caracteres não numéricos
  v = v.replaceAll(/\D/g, "");
  console.log('formatar ', v, v.length)
  // Formatação para CPF (até 11 dígitos)
  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  // Formatação para CNPJ (mais de 11 dígitos)
  else if(v.length < 11 && v.length <= 14) {
    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1/$2");
    v = v.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  return v;
}
