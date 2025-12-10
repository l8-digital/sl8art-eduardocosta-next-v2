'use client'
import { useState } from 'react';
import * as yup from 'yup';
import Input from '@/components/FormElements/Input';
// import { Button } from '@/components/Button/Button';

const REQUIRED_PASSWORD = "EC2026C";

const validationSchema = yup.object({
    password: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória')
        .oneOf([REQUIRED_PASSWORD], "Senha incorreta"),
});

export default function FormDriverPassword() {

    const [formStatus, setFormStatus] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        password: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormStatus(null);
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setTimeout(() => {
                window.open(
                    "https://drive.google.com/drive/folders/1SXQ4CUzCB53jWJ0e3YCM9XYe7Yc7IlZ4?usp=drive_link",
                    "_blank"
                );
            }, 300);
        } catch (error) {
            setFormStatus('Senha incorreta');
            console.error(error)
        }
    };

    return (

        <form onSubmit={handleSubmit} className='w-full'>

            <Input
                modelValue={formData.password}
                name="password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                onUpdateModelValue={(value) => handleChange('password', value)}
                onValidate={() => { }}
            />

            {formStatus && <p className="text-xs text-red-500 -mt-1.5 pl-2">{formStatus}</p>}

            {/* <Button type="submit" className="mt-6">
                    Enviar
                </Button> */}

        </form>

    );
}
