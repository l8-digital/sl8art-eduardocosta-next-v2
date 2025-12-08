
const onlyDigits = (v: string) => (v || '').replace(/\D/g, '');

export function isValidPhoneBR(val?: string | null) {
    const d = onlyDigits(val || '');

    // rejeita sequências do tipo 0000000000 / 99999999999
    if (/^(\d)\1+$/.test(d)) return false;

    // (opcional) 0800-XXXXXXX -> 11 dígitos
    if (/^0800\d{7}$/.test(d)) return true;

    // Fixo: DDD (2) + número (8) => 10 dígitos
    if (d.length === 10) {
        const ddd = d.slice(0, 2);
        const firstSubscriber = d[2];
        const dddNum = Number(ddd);
        if (!Number.isFinite(dddNum) || dddNum < 11 || dddNum > 99) return false; // DDD válido
        if (!/[2-5]/.test(firstSubscriber)) return false; // fixo começa com 2–5
        return true;
    }

    // Móvel: DDD (2) + número (9) => 11 dígitos
    if (d.length === 11) {
        const ddd = d.slice(0, 2);
        const dddNum = Number(ddd);
        if (!Number.isFinite(dddNum) || dddNum < 11 || dddNum > 99) return false; // DDD válido
        if (d[2] !== '9') return false; // móvel começa com 9
        return true;
    }

    return false;
}
