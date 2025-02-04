"use client";
import Link from 'next/link';
import Image from 'next/image';
import "./login.css";
import Modal from '@/components/ModalMessage';
import React, { useState, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Login = () => {
  const [email_consumidor, setEmail] = useState('');
  const [senha_consumidor, setSenha] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState({
    email_consumidor: false,
    senha_consumidor: false,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  // Função para fazer login
  const fazerLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/app/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          email_consumidor,
          senha_consumidor,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido ao tentar logar.');
      }

      const data = await response.json();
      toast.success('Login realizado com sucesso!', { position: "bottom-left", hideProgressBar: true, closeOnClick: true, pauseOnHover: true, theme: "dark" });
      setTimeout(() => {
        window.location.href = '../';
      }, 2000);
    } catch (error) {
      toast.error('Erro ao fazer login, tente novamente', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  // Função para alterar senha
  const alterarSenha = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/app/solicitar-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_consumidor: emailMessage
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar email, tente novamente.');
      }

      const data = await response.json();
      toast.success('Mensagem de confirmação enviada para o seu email!', { position: "top-center", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    } catch (error) {
      toast.error('Erro ao enviar o email', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    }
  };

  const exibirBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const getInputClass = (field: string) => {
    const isTouched = touched[field as keyof typeof touched];
    let isValid = false;

    if (field === 'email_consumidor') {
      isValid = email_consumidor.includes('@gmail') && email_consumidor.includes('.com');
    } else if (field === 'senha_consumidor') {
      isValid = senha_consumidor.length >= 8;
    }

    if (!isTouched) {
      return "shadow-black";
    }

    if (isTouched && !isValid) {
      return "border-red-500 shadow-red-500";
    }

    return "border-navigategreen shadow-navigategreen";
  };

  return (
    <header className="flex flex-col md:flex-row h-screen select-none">
      {showPasswordModal && (
        <Modal onClose={() => setShowPasswordModal(false)} onConfirm={alterarSenha} setCode={setEmailMessage} />
      )}
      <ToastContainer />
      <div className="flex-1 w-full h-full flex flex-col items-start justify-center bg-white">
        <Link href="/" className="flex flex-row text-base sm:text-lg md:text-xl lg:text-2xl ml-5 min-[1245px]:hidden text-black">
          <MdKeyboardArrowLeft size={30} />
          Voltar ao início
        </Link>
        <div className="max-w-6xl mx-auto p-6">
          <div className='mb-28'>
            <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-extrabold">
              Entre na sua conta
            </h1>
            <p className="text-xl sm:text-xl md:text-2xl lg:text2xl text-center mb-8">
              Preencha com os seus dados
            </p>
          </div>
          <form className="space-y-10 w-full max-w-lg mx-auto" onSubmit={fazerLogin}>
            <div className="flex flex-wrap -mx-8 mb-6">
              <div className="w-full px-3 relative">
                <Image
                  src="/img/icon_email.png"
                  alt="icon email"
                  width={40}
                  height={40}
                  priority
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 w-auto h-auto"
                />
                <input
                  id="email"
                  type="text"
                  className={`py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none shadow-md transition duration-500 ease-in-out largeInputOnDesktop ${getInputClass('email_consumidor')}`}
                  placeholder="Email"
                  required
                  value={email_consumidor}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => exibirBlur('email_consumidor')}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-8 mb-6">
              <div className="w-full px-3 relative">
                <Image
                  src="/img/icon_senha.png"
                  alt="icon senha"
                  width={40}
                  height={40}
                  priority
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 w-auto h-auto"
                />
                <input
                  id="password"
                  type="password"
                  className={`py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-4 w-full text-base sm:text-2xl md:text-2xl lg:text-2xl rounded-2xl border border-black focus:outline-none shadow-md transition duration-500 ease-in-out largeInputOnDesktop ${getInputClass('senha_consumidor')}`}
                  placeholder="Senha"
                  required
                  value={senha_consumidor}
                  onChange={(e) => setSenha(e.target.value)}
                  onBlur={() => exibirBlur('senha_consumidor')}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-16 lg:px-28 text-2xl sm:text-2xl md:text-2xl lg:text-2xl rounded-full border-2 bg-navigategreen text-white font-semibold transition duration-1000 ease-in-out hover:bg-white hover:text-slate-900 hover:border-slate-900">
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
              <div className='mt-5 text-xl min-[1245px]:hidden text-black'>
                <h1>Não tem cadastro? <Link href={"../cadastro_login/cadastrarConsumidor"}><span className='underline hover:text-black text-gray-600'>Cadastre-se</span></Link></h1>
                <h1>ou <span className='underline hover:text-black text-gray-600' onClick={() => setShowPasswordModal(true)}>Esqueci minha senha</span></h1>
              </div>
              <div className='mt-5 text-xl max-[1245px]:hidden text-black'>
                <h1>Esqueceu sua senha? Você pode alterá-la <span className='underline cursor-pointer hover:text-black text-gray-600' onClick={() => setShowPasswordModal(true)}>Aqui</span></h1>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/4 max-[1245px]:hidden h-full overflow-hidden bg-black bg-no-repeat flex items-center justify-center relative">
        <div className="absolute top-5 sm:top-6 md:top-8 lg:top-10 left-3 sm:left-4 md:left-5 lg:left-6">
          <a href="/" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-slate-300 transition duration-500 ease-in-out">
            <Image src="/img/setinha(login_cadastro).png" alt="" width={32} height={32} className="mr-2 hidden sm:block" />
            Voltar ao início
          </a>
        </div>
        <div className="text-white p-6 sm:p-8 md:p-10 lg:p-12 max-w-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-right max-sm:mt-10">
            <strong>Seja Bem- Vindo(a) <br /> ao Navigate Buy</strong>
          </h1>
          <br />
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-right">
            Caso não tenha uma<br />conta faça seu<br />
            cadastro agora mesmo!
          </p>
          <Link href="../cadastro_login/cadastrarConsumidor">
            <button className="mt-12 py-3 sm:py-4 md:py-5 lg:py-6 px-8 sm:px-10 md:px-12 lg:px-20 text-sm sm:text-base md:text-lg lg:text-xl rounded-full border-2 bg-transparent text-white font-semibold border-white transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-transparent btn-ajuste">
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Login;
