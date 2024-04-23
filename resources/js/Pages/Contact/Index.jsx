import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';

const schema = z.object({
  search: z.string().min(1, { message: "Pesquisar deve ter pelo menos 1 caracteres" }).max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
});


export default function Index({ auth, contacts, queryParams = null, session }) {

  queryParams = queryParams || {};
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSearch = (data) => {
    queryParams['search'] = data;
    router.get(route('contact.index'), queryParams['search']);
  }


  const onDelete = (data) => {
    try {
      Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!'
      }).then((result) => {

        if (result.isConfirmed) {
          router.delete(`/contact/${data}`);
          Swal.fire("Sucesso", "Seu contato foi excluido com sucesso", "success")
        }
      })
    } catch (error) {
      Swal.fire("Whoops", "ocorreu um problema ao excluir o seu registro", "error")
    }
  }

  useEffect(() => {
    if (session) {
      Swal.fire("Sucesso", session, 'success')
    }
  })

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">List of Contacts</h2>}
    >
      <Head title="List of Contacts" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="px-6 py-4 flex items-center justify-between">
              <form onSubmit={handleSubmit(onSearch)}>
                <>
                  <input type="text"
                    {...register('search')}
                    placeholder='Pesquisar...'
                    className='w-96 border border-gray-200 rounded-md'
                  />
                  <button className='ml-4 bg-blue-400 text-white py-2 px-6 rounded-md'>Pesquisar</button>
                </>
                {errors['search'] && <span className='py-1 text-red-500 block'>{errors['search'].message}</span>}
              </form>
              <Link href='/contact/novo' className='bg-green-500 text-white rounded-md px-5 py-2'>Adicionar Contato</Link>
            </div>
            <div className='p-6'>
              <table className="w-full">
                <thead className='text-sm text-gray-700 uppercase bg-gray-100 border-b border-gray-500'>
                  <tr className="text-nowrap">
                    <th className="text-left py-2 px-3">Nome</th>
                    <th className="text-left py-2 px-3">Telefone</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Idade</th>
                    <th className="text-center py-2 px-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.data.map(contact => {
                    return (
                      <tr key={contact.id} className="border-b border-gray-200">
                        <td className="text-left py-2 px-3">{contact.name}</td>
                        <td className="text-left py-2 px-3">{contact.phone}</td>
                        <td className="text-left py-2 px-3">{contact.email}</td>
                        <td className="text-left py-2 px-3">{contact.age}</td>
                        <td className="py-2 px-3 flex gap-2 justify-center">
                          <button className='bg-blue-500 text-white cursor-pointer rounded-md px-4 py-2'>Editar</button>
                          <button className='bg-red-500 text-white cursor-pointer rounded-md px-4 py-2' onClick={() => onDelete(contact.id)}>Excluir</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Pagination links={contacts.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
