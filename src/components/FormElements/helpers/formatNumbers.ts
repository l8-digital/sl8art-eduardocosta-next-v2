export function formatNumbers(
    value: number | string | null | undefined
): string | number | null | undefined {

    if (value === null || value === undefined) return value;

    // Se for número
    if (typeof value === 'number') {
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // Se for string
    if (typeof value === 'string') {
        // Troca vírgula por ponto
        const clean = value.replace(',', '.').trim();

        // Regex permite número com casas decimais
        const isValid = /^[+-]?(\d+(\.\d{0,})?)$/.test(clean);

        if (isValid) {
            const parsed = parseFloat(clean);
            return parsed.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
    }

    // Caso não seja número válido, retorna valor original
    return value;
}
