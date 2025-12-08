'use client'
import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';
// import Image from 'next/image';
// import { Button } from '@/components/Button/Button';
import { formatPhone } from '@/utils/format';
import Modal from '@/components/Modal/Modal';
import { useEffect, useState } from 'react';
import FormContact from '@/components/FormElements/FormContact'
import { DepartamentType } from '@/types/department';
import { State } from '@/types/state';

// import { City } from '@/types/city';
// import { baseUrl } from '@/utils/baseUrl';

interface Props {
  data: DepartamentType[];
  states: State[];
  linkDriver: string | null;
  logo: string | null;
}
function Description({ departament }: { departament: DepartamentType }) {
    if (!departament) return null;

    return (
        <>
            <div>
                <ul className={style['c-info']} >

                        <li className={style[`c-info__text`]}>
                            { departament.responsible }
                        </li>

                        {(departament.phone1 || departament.phone2) &&
                            <li className={style[`c-info__text`]}>
                                <a href={`tel:${formatPhone(departament.phone1 === null ? "" : departament.phone1)}`} className="hover:opacity-70 text-white">
                                    { departament.phone1 }
                                </a>

                                <>
                                    <a href={`tel:${formatPhone(departament.phone2 === null ? "" : departament.phone2)}`} className="hover:opacity-70">
                                        { departament.phone2 }
                                    </a>
                                </>
                            </li>
                        }

                        {departament.email1 &&
                            <li  className={style[`c-info__text`]}>
                                { departament.email1 }
                            </li>
                        }
                        {departament.email2 &&
                            <li  className={style[`c-info__text`]}>
                                { departament.email2 }
                            </li>
                        }
                        {departament.url &&
                            <li  className={style[`c-info__text`]}>
                                <a href={departament.url} className="hover:opacity-70" target="_blank">
                                    { departament.url}
                                </a>
                            </li>
                        }
                    </ul>




            </div>
        </>
    );
}

export default function ContactSection({ data, linkDriver, states }: Props) {

  const [showModal, setShowModal] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [idDepartament, setIdDepartment] = useState<number | null>(null);
  const [departamentDescription, setDepartmentDescription] = useState<DepartamentType | undefined>();
   const [departament, setDepartment] = useState<number>(0);
  const departments = data;
  

  function clickDepartment(departament: DepartamentType) {

    if (idDepartament !== departament.id) {
      setIdDepartment(departament.id);
      setDepartmentDescription(departament);
      setShowBox(true);
    }
  }

  useEffect(() => {
    setIdDepartment(departments[0].id);
    setShowBox(true);
    setDepartmentDescription(departments[0] as DepartamentType);
  }, [departments])

  function handleClickEmail(department: DepartamentType) {
    // setShowModal(true);
   
    setDepartment(department.id);
    setShowModal(true)
    // console.log(idDepartament);
  }


  return (
    <>
      <section id="contact" className={style['contact']} >
        <div className="container relative italic flex h-full w-full flex-col justify-between">

          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-5 justify-center w-full md:px-4">
            {data.map((departament) => (
              <div key={departament.id} className="w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => clickDepartment(departament as DepartamentType)}
                  className={`md:px-8 md:py-2 text-xl md:text-2xl backdrop-blur-lg italic md:border-[0.5px] border-white-light text-left md:text-center rounded-full w-max md:w-max uppercase transition-all duration-500 ease-in-out font-tertiary ${departament.id === idDepartament ? 'text-white font-black' : 'text-white font-black md:text-white/80 hover:text-white md:font-bold'}`}
                >
                  {departament.description}
                </button>

                <div className='w-full h-full flex flex-col justify-center items-start md:hidden mt-3'>

                  <Description departament={departament as DepartamentType} />

                  <button type="button" onClick={() => handleClickEmail(departament)}
                    className="text-white border-[0.5px] border-white flex w-full gap-2 md:gap-4 items-center justify-center text-base tracking-[0.175rem] italic font-tertiary rounded-full py-2.5 md:py-2 md:px-4 hover:opacity-80">
                    <div
                      className="flex justify-center font-semibold border-white ">
                      <Icon name="icon-mail" className="w-5 md:w-6 stroke-white" />
                    </div>
                    ENVIAR E-MAIL
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showBox && (
            <div className='w-full h-full md:flex flex-col justify-center items-center hidden'>

              <Description departament={departamentDescription as DepartamentType} />
              {
                (departamentDescription?.email1 || departamentDescription?.email2) &&
                <button type="button"  onClick={() => handleClickEmail(departamentDescription)}
                  className="text-white flex border-[0.5px] gap-4 items-center text-base tracking-[0.175rem] italic font-tertiary mx-auto rounded-full py-2 px-4 hover:opacity-80">
                  <div
                    className="flex justify-center font-semibold border-white ">
                    <Icon name="icon-mail" className="w-6 stroke-white" />
                  </div>
                  ENVIAR E-MAIL
                </button>
              }
            </div>
          )}

          {linkDriver && (
            <div className='flex flex-col justify-center md:justify-start items-center md:items-start gap-7 mt-12 md:mt-0'>
              <div className={style['download']}>
                <a href={linkDriver}
                  target="_blank" type="a"
                  className="bg-white md:bg-transparent border-white md:text-white font-bold italic border-[0.5px] rounded-full px-6 py-2 md:py-2 hover:opacity-80 text-lg text-center backdrop-blur-md transition duration-300 ease-in-out">
                  contratante download
                </a>
              </div>


            </div>


          )}
        </div>
      </section>


       <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        header={<h2 className="text-white font-secondary text-7xl text-center">Contato</h2>}
        body={

          <FormContact idDepartment={departament} statesProps={states} departmentsProps={departments} closeModal={() => setShowModal(false)}/>

        }
      />
    </>
  )
}
