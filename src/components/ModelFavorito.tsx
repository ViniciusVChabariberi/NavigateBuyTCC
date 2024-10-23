import React, { useState } from 'react';

interface ModalProps {
    onClose: () => void;
    onConfirm?: (receberAlerta: boolean) => void;
}

const handleAlertChoice = async (receberAlerta: boolean) => {
    const response = await fetch('http://localhost:5000/app/enviar_alerta', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receberAlerta: receberAlerta,
        }),
    });

    const data = await response.json();
    if (data.success) {
        alert('Funcionou')
        console.log('Preferência de alerta salva com sucesso');
    } else {
        alert('Não funcionou')
        console.log('Erro ao salvar preferência de alerta');
    }
};


const ModalFavorito: React.FC<ModalProps> = ({ onClose, onConfirm}) => {
    const [receberAlerta, setReceberAlerta] = useState<boolean | null>(null);

    const handleConfirm = () => {
        if (onConfirm && receberAlerta !== null) {
            onConfirm(receberAlerta);
            handleAlertChoice(receberAlerta);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
            <div className='bg-white p-10 md:p-24 rounded-xl mb-44 border-4 border-navigateblue z-20'>
                <h1 className='text-2xl text-start font-bold max-w-lg text-black'>
                    Você deseja receber alertas dos seus produtos favoritos?
                </h1>
                <p className='mt-5 text-lg text-start max-w-lg text-black'>
                    Selecione a melhor opção:
                </p>
                <div className='flex flex-row space-x-10 mt-10 md:mt-20'>
                    <div className="flex flex-row mt-4">
                        <button
                            className="w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 rounded-full border-2 bg-white hover:bg-navigategreen border-black"
                            onClick={() => setReceberAlerta(true)}
                        >
                        </button>
                        <p className="ml-2">Sim</p>
                        <button
                            className="w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 ml-4 rounded-full border-2 bg-white hover:bg-navigategreen border-black"
                            onClick={() => setReceberAlerta(false)}
                        >
                        </button>
                        <p className="ml-2">Não</p>
                    </div>
                </div>
                <button onClick={onClose} className='mt-5 text-red-600'>Fechar</button>
                <button onClick={handleConfirm} className='text-green-600'>Confirmar</button>
            </div>
        </div>
    );
};

export default ModalFavorito;