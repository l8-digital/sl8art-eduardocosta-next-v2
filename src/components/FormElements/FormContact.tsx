import { useEffect, useState, } from 'react';
import * as yup from 'yup';
import Input from '@/components/FormElements/Input';
import Select from '@/components/FormElements/Select';
import Textarea from '@/components/FormElements/Textarea';
import { Button } from '@/components/Button/Button';
import { State } from '@/types/state';
import { City } from '@/types/city';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { DepartamentType } from '@/types/department';
import Swal from "sweetalert2";

const validationSchema = yup.object({
    name: yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    departament_id: yup.string().required('Departamento é obrigatório'),
    state: yup.string().required('Estado é obrigatório'),
    cities_id: yup.string().required('Cidade é obrigatória'),
    message: yup.string().required('Mensagem é obrigatória'),
});

interface Props {
    statesProps: State[];
    departmentsProps?: DepartamentType[];
    idDepartment: number;
    closeModal?: () => void;
}

interface SelectOption {
    label: string;
    value: string | number;
}

export default function FormPage({ statesProps, departmentsProps, idDepartment, closeModal }: Props) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [recaptchaReady, setRecaptchaReady] = useState(false);


    const [states] = useState<SelectOption[]>(statesProps.map(state => ({
        label: state.name,
        value: state.id
    })));
    const [departments] = useState<SelectOption[]>(departmentsProps ? departmentsProps.map(dept => ({
        label: dept.description,
        value: dept.id
    })) : []);

    const [loading, setLoading] = useState(false);

    const [cities, setCities] = useState<SelectOption[]>([]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [loadingCities, setLoadingCities] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        departament_id: String(idDepartment),
        state: '',
        cities_id: '',
        message: '',
        date_show: '',
        time_show: '',
        place: '',
        type_event: '',
        recaptcha_token: ''
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
        if (field === 'state') {
            getCities(value)
        }
    };

    const getCities = async (stateId: string | number) => {
        const params = new URLSearchParams();
        params.set("stateId", String(stateId));
        setLoadingCities(true);
        setFormData((prev) => ({ ...prev, cities_id: "" }));
        setCities([]);
        const response: City[] | null = await fetch(`/api/routes/get-cities?${params.toString()}`).then(res => res.json());
        if (response) {
            const cityOptions = response.map(city => ({
                label: city.name,
                value: city.id
            }));
            setCities(cityOptions);
        }
        setLoadingCities(false);

    }

    useEffect(() => {
        if (executeRecaptcha) {
            setRecaptchaReady(true);
        }
    }, [executeRecaptcha]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!executeRecaptcha) {
            console.warn("reCAPTCHA ainda não carregou");
            return;
        }


        const token = await executeRecaptcha("contact_form");


        try {

            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            const formToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== "recaptcha_token") {
                    formToSend.append(key, (formData as Record<string, string>)[key]);
                }
            });
            console.log('front:', token);
            formToSend.set("recaptcha_token", token);
            const response = await fetch('/api/routes/send-contact', {
                method: 'POST',
                body: formToSend,
            });

            if (response.ok) {
                Swal.fire({
                    title: "Mensagem Enviada!",
                    html: `
        <div class="flex flex-col items-center justify-center mt-2">
            <div class="w-14 h-14 rounded-full bg-green flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <p class="text-gray-700 text-base">
                Sua mensagem foi enviada com sucesso!
            </p>
        </div>
    `,
                    showConfirmButton: true,
                    confirmButtonText: "Fechar",
                    confirmButtonColor: "#000",
                    width: "26rem",
                    background: "#ffffff",
                    color: "#000000",
                    customClass: {
                        popup: "rounded-2xl shadow-xl border border-gray-200",
                        confirmButton: "rounded-full px-5 py-2",
                    },
                }).then(() => {
                    if (closeModal) closeModal();
                });

            } else {
                Swal.fire({
                    title: "Não foi possível enviar",
                    html: `
        <div class="flex flex-col items-center justify-center mt-2">
            <div class="w-14 h-14 rounded-full bg-red flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <p class="text-gray-700 text-base">
                Ocorreu um problema ao enviar sua mensagem.
                <br />
                Por favor, tente novamente em alguns instantes.
            </p>
        </div>
    `,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#ef4444", // vermelho tailwind
                    width: "26rem",
                    background: "#ffffff",
                    color: "#000000",
                    customClass: {
                        popup: "rounded-2xl shadow-xl border border-gray-200",
                        confirmButton: "rounded-full px-5 py-2",
                    },
                });

            }
        } catch (error) {

            const newErrors: Record<string, string> = {};
            (error as yup.ValidationError).inner.forEach((e) => {
                newErrors[e.path!] = e.message;
            });

            setErrors(newErrors);
            console.error('Erro ao enviar mensagem:', error);
        } finally {
            setLoading(false);

        }

    };

    const validateFieldOnBlur = async (field: string) => {
        try {
            await validationSchema.validateAt(field, formData);
            setErrors((prev) => ({ ...prev, [field]: "" }));
        } catch (err) {
            const yupError = err as yup.ValidationError;
            setErrors((prev) => ({ ...prev, [field]: yupError.message }));
        }
    };


    return (
        <div>
            <form className="mt-8" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                    <Input
                        modelValue={formData.name}
                        name="name"
                        type="text"
                        label="Nome"
                        onUpdateModelValue={(value) => handleChange('name', value)}
                        error={errors.name}
                        onValidate={() => validateFieldOnBlur("name")}
                    />
                    <Input
                        modelValue={formData.email}
                        name="email"
                        type="email"
                        label="E-mail"
                        error={errors.email}
                        onUpdateModelValue={(value) => handleChange('email', value)}
                        onValidate={() => validateFieldOnBlur("email")}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                    <Input
                        modelValue={formData.phone}
                        name="phone"
                        type="tel"
                        maskType="phone"
                        label="Telefone"
                        onUpdateModelValue={(value) => handleChange('phone', value)}
                        error={errors.phone}
                        onValidate={() => validateFieldOnBlur("phone")}
                    />

                    <Select
                        modelValue={formData.departament_id}
                        name="departament_id"
                        label="Departamento"
                        options={departments}
                        onUpdateModelValue={(value) => handleChange('departament_id', value)}
                        error={errors.departament_id}
                        onValidate={() => validateFieldOnBlur("departament_id")}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                    <Select
                        modelValue={formData.state}
                        name="state"
                        label="Estado"
                        options={states}
                        onUpdateModelValue={(value) => handleChange('state', value)}
                        error={errors.state}
                        onValidate={() => validateFieldOnBlur("state")}
                    />

                    <Select
                        modelValue={formData.cities_id}
                        name="cities_id"
                        label="Cidade"
                        options={cities}
                        error={errors.cities_id}
                        onUpdateModelValue={(value) => handleChange('cities_id', value)}
                        loading={loadingCities}
                        onValidate={() => validateFieldOnBlur("cities_id")}
                    />
                </div>

                <div className="w-full">
                    <Textarea
                        modelValue={formData.message}
                        name="message"
                        label="Mensagem"
                        onUpdateModelValue={(value) => handleChange('message', value)}
                        error={errors.message}
                        onValidate={() => { }}
                    />
                </div>
                <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
                <Button color="primary" type="submit" className='md:mx-auto md:w-[12rem] rounded-full mt-8' disabled={!recaptchaReady || loading} loading={loading}>
                    Enviar
                </Button>
            </form>
        </div>
    );
}
