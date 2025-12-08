import { NextResponse } from "next/server";
import { saveContact } from "@/server/contacts";
import { Contacts } from "@/types/contact";

export async function POST(request: Request) {

    try {
        const contactData = await request.formData();
        const recaptchaToken = contactData.get("recaptcha_token");
        console.log('back:', recaptchaToken);

        if (!recaptchaToken) {
            return NextResponse.json(
                { success: false, message: "Token reCAPTCHA ausente" },
                { status: 400 }
            );
        }
        const secret = process.env.NEXT_RECAPTCHA_SECRET;

        const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

        const responseRecaptcha = await fetch(verifyUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secret}&response=${recaptchaToken}`
        });

        const result = await responseRecaptcha.json();

        if (!result.success || result.score < 0.5) {
            return NextResponse.json(
            { success: false, message: "Falha na validação do reCAPTCHA", error: result },
            { status: 400 }
            );
        }
        const formToObject = Object.fromEntries(contactData.entries());

        const response = await saveContact(formToObject as unknown as Contacts);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Erro ao processar o contato:", error);
        return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 });
    }


}
