import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }).max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(11, { message: "Telefone inválido, precisa ter no mínimo 11 caracteres" }).max(11, { message: "Telefone inválido, precisa ter no máximo 11 caracteres" }),
  age: z.string().min(1, { message: "Você precisa colocar pelo menos 1 número na idade" })
});

export default function Edit({ auth, contact }) {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    try {
      router.put(`/contact/${contact.id}`, data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro ao criar o contato'
      })
      console.error(error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar a contact</h2>}
    >
      <Head title="Edit a contact" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
              <div>
                <InputLabel htmlFor="name" value="Nome Completo" />

                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  {...register('name')}
                  defaultValue={contact.name}
                  className="mt-1 block w-full"
                />

                {errors['name'] && <InputError message={errors['name'].message} className="mt-2" />}
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor="email" value="E-mail" />

                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  {...register('email')}
                  defaultValue={contact.email}
                  className="mt-1 block w-full"
                />

                {errors['email'] && <InputError message={errors['email'].message} className="mt-2" />}
              </div>

              <div className='mt-4'></div><div>
                <InputLabel htmlFor="phone" value="Telefone" />

                <TextInput
                  id="phone"
                  type="text"
                  name="phone"
                  defaultValue={contact.phone}
                  {...register('phone')}
                  className="mt-1 block w-full"
                />

                {errors['phone'] && <InputError message={errors['phone'].message} className="mt-2" />}
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor="age" value="Idade" />

                <TextInput
                  id="age"
                  type="number"
                  name="age"
                  {...register('age')}
                  defaultValue={contact.age}
                  className="mt-1 block w-full"
                />

                {errors['age'] && <InputError message={errors['age'].message} className="mt-2" />}
              </div>

              <div className='mt-4'>
                <button className='w-full bg-green-600 text-white uppercase font-semibold py-3 rounded-md'>Editar Contato</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )

}