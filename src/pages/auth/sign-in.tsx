
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/axios';
import { APIError } from '@/types/APIError';

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

type signInForm = z.infer<typeof signInForm>
export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<signInForm>();
  const navigate = useNavigate();
  
  function handleSignIn(data: signInForm) {
    const { email, password } = data;

    api.post('sessions', {
      email,
      password,
    })
      .then(response => {
        const { token } = response.data;
        sessionStorage.setItem('authToken', token);
        toast.success('Login realizado com sucesso!');
        navigate('/');
      })
      .catch((error: AxiosError) => {
        const APIError = error.response?.data as APIError
        toast.error(APIError.message);
      });
  }

  return (
    <div className='p-8'>
      <div className='w-[350px] flex flex-col justify-center gap-6'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Realizar Login
            </h1>
            <p className='text-sn text-muted-foreground'>
              Faça login para ter acesso ao seu plano e acompanhar as suas atividades.
            </p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)}className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Insira seu e-mail</Label>
            <Input type='email' id='email' {...register('email')}/>

            <Label htmlFor='password'>Insira sua senha</Label>
            <Input type='password' id='password' {...register('password')}/>
          </div>

          <Button disabled={isSubmitting} className='w-full' type='submit'>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}