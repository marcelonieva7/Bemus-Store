import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const CheckoutForm = ({finishBuy, user}) => {
    const { register, handleSubmit , formState: { errors } } = useForm();

    const onSubmit = (data) => finishBuy(data);

    const trimField = (field) => value => (value.trim() !== "" || `${field} no valido`)

    return (
        <section className="h-screen flex items-center bg-white bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="container max-w-2xl mx-auto shadow-md md:w-3/4">
                <div className="p-4 border-t-2 border-indigo-500 rounded-lg bg-opacity-50 bg-blue-300">
                <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                    <h1 className="text-gray-800">
                        Datos del cliente
                    </h1>
                    </div>
                </div>
                </div>
                <div className="space-y-6 bg-white">
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                    Datos personales
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                    <div className="relative">
                        <ErrorMessage errors={errors} name="name" as={<span className="text-red-500"/>}/>
                        <input type="text" name="name" id="user-info-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nombre"
                        {...register('name', {
                            required: "El nombre es requerido",
                            minLength : {
                                value: 4,
                                message: 'Minimo 4 letras'
                            },
                            validate: trimField("Nombre")
                        })}/>
                    </div>
                    <div className="relative">
                        <ErrorMessage errors={errors} name="celphone" as={<span className="text-red-500"/>}/>
                        <input type="tel" name="celphone" id="user-info-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Celular"
                        {...register('celphone', {
                            required: "Celular es requerido",
                            minLength : {
                                value: 7,
                                message: 'Minimo 7 numeros'
                            },
                            pattern: {
                                value: /^\d+$/,
                                message: 'Solo numeros'
                            }
                        })}/>
                    </div>
                    </div>
                </div>
                <hr />
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                    Email
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                    <div>
                        <h2 className="max-w-sm mx-auto md:w-1/3 text-gray-800">
                        {user.email}
                        </h2>
                    </div>
                    </div>
                </div>
                <hr />
                <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                    <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Finalizar Compra
                    </button>
                </div>
                </div>
            </form>
        </section>

    );
}
 
export default CheckoutForm;