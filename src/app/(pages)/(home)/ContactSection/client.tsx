'use client'
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';
// import { Button } from '@/components/Button/Button';
import { formatPhone } from '@/utils/format';
import Modal from '@/components/Modal/Modal';
import { useEffect, useState } from 'react';
import FormContact from '@/components/FormElements/FormContact'
import { DepartamentType } from '@/types/department';
import { State } from '@/types/state';
import { useConfigApp } from '@/app/providers/app';
import { Button } from '@/components/Button/Button';
import FormDriverPassword from '@/components/FormElements/FormDriverPassword';

// import { City } from '@/types/city';
// import { baseUrl } from '@/utils/baseUrl';

interface Props {
  data: DepartamentType[];
  states: State[];
  linkDriver: string | null;
  logo: string | null;
}

export default function ContactSection({ data, linkDriver, states }: Props) {

  const [showModal, setShowModal] = useState(false);
  const [showBox, setShowBox] = useState(0);
  const [idDepartament, setIdDepartment] = useState<number | null>(null);
  const [departamentDescription, setDepartmentDescription] = useState<DepartamentType | undefined>();
  const [departament, setDepartment] = useState<number>(0);
  const [showInput, setShowInput] = useState(false);
  const departments = data;
  const { logo } = useConfigApp() ?? {};

  useEffect(() => {
    setIdDepartment(departments[0].id);
    setShowBox(0);
    setDepartmentDescription(departments[0] as DepartamentType);
  }, [departments])

  function handleClickEmail(department: DepartamentType) {
    // setShowModal(true);

    setDepartment(department.id);
    setShowModal(true)
    // console.log(idDepartament);
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      const newWidth = window.innerWidth;
      if (newWidth > 768)
        setIsMobile(false);
      else
        setIsMobile(true);
    };

    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);


  return (
    <>
      <section id="contact" className={style['contact']} >
        <div className="container relative italic md:px-16">
         

          <div className="flex relative">

            <div className="w-full flex flex-col gap-4 md:gap-7 pb-6">
              <div className='flex flex-col md:flex-row-reverse w-full h-full justify-between items-start md:items-end gap-8'>

                <div className='flex flex-col gap-8 w-full justify-start'>
                  <h2 className="o-title text-white italic !font-black md:text-end">Contatos</h2>


                  <div className="md:mt-2 order-2 md:order-3 grid grid-cols-1 max-md:gap-6 gap-[1rem] md:h-[32rem]">

                    {departments.map((department, index) => (

                      <div key={index} className={`${style['department']} active`}>

                        <div onClick={() => setShowBox(index)} className={`w-full flex items-center md:justify-end z-[1] relative md:py-0 gap-4 `}>

                          <p className={`${style['department__name']} !font-bold`}>
                            {department.description}
                          </p>

                        </div>

                        <ul className={`${style['box']} !flex `} >

                          <li className={style['box__responsible']}>
                            {department.responsible}
                          </li>

                          {(department.phone1 || department.phone2) && (
                            <li className={style['box__phone']}>
                              {department.phone1 && (
                                <a href={`tel:${formatPhone(department.phone1)}`}>
                                  {department.phone1}
                                </a>
                              )}
                              {department.phone2 && (
                                <>
                                  {' / '}
                                  <a href={`tel:55${formatPhone(department.phone2)}`}>
                                    {department.phone2}
                                  </a>
                                </>
                              )}
                            </li>
                          )}

                          {department.email1 && (
                            <li className={style['box__mail']}>
                              {department.email1}
                            </li>
                          )}
                          {department.email2 && (
                            <li className={style['box__mail']}>
                              {department.email2}
                            </li>
                          )}
                          {department.url && (
                            <li className={style['box__url']}>
                              <a href={department.url} className="hover:opacity-70" target="_blank" rel="noopener noreferrer">
                                {department.url}
                              </a>
                            </li>
                          )}
                          {
                            (department?.email1 || department?.email2) &&
                            <Button color="primary" type="button" onClick={() => handleClickEmail(department as DepartamentType)}
                              className="md:mb-8 md:ml-auto rounded-full items-center gap-3 w-full md:w-max flex">
                              <Icon name="icon-mail" className="w-6 stroke-black" />
                              ENVIAR E-MAIL
                            </Button>
                          }
                        </ul>


                      </div>
                    ))}
                  </div>
                </div>

              </div>


              <div className="relative w-full md:w-max mt-3">

                {showInput &&
                  <div className="absolute -top-3 left-0 h-full w-full z-[2] ">
                    <FormDriverPassword />
                  </div>
                }

                <div className={style['c-download']}>

                  <Button
                    type="button"
                    onClick={() => setShowInput(true)}
                    className={`${style['c-download__download']} lowercase`}>
                    contratante download
                  </Button>

                </div>

              </div>

              <div className="order-4 justify-start gap-6 flex flex-col md:flex-row w-full items-start md:items-center">
                <Icon name='icon-ecxpetaculo' className=' relative md:-left-14 w-60 flex  max-md:self-center h-max md:w-72 pointer-events-none' />
              </div>

            </div>
          </div>
        </div>


      </section>


      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        header={<h2 className="text-white font-secondary text-7xl text-center">Contato</h2>}
        body={

          <FormContact idDepartment={departament} statesProps={states} departmentsProps={departments} closeModal={() => setShowModal(false)} />

        }
      />
    </>
  )
}
