import React from "react";
import { poppins } from "../app/fonts";
import Link from "next/link";

const Cards: React.FC = () => {
  return (
        <div className="flex flex-wrap space-x-4 px-4 py-4 justify-center gap-12">

          {/* Card 1 */}
          <div className="flex-none w-[283px] h-[280px] flex items-center justify-center">
            <div className='border border-green-700 hover:border-slate-900 hover:shadow-lg hover:shadow-slate-900 w-full h-full p-4 bg-white shadow-md shadow-green-700 rounded-2xl flex flex-col items-center justify-center'>
              <div className="flex items-center justify-center flex-grow">
                <Link href="../pages/Informática">
                  <img src="/img/Home (card Informática).png" alt="" className="max-w-full max-h-full" />
                </Link>
              </div>
              <p className={`text-black text-xl text-center mb-5 ${poppins.className}`}>Informática</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-none w-[283px] h-[280px] flex items-center justify-center">
            <div className='border border-slate-900 hover:border-green-700 hover:shadow-lg hover:shadow-green-700 w-full h-full p-4 bg-white shadow-md shadow-slate-900 rounded-2xl flex flex-col items-center justify-center'>
              <div className="flex items-center justify-center flex-grow">
                <Link href="../pages/Lazer">
                  <img src="/img/Home (card Lazer).png" alt="" className="max-w-full max-h-full" />
                </Link>
              </div>
              <p className={`text-black text-xl text-center mb-5 ${poppins.className}`}>Lazer</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-none w-[283px] h-[280px] flex items-center justify-center">
            <div className='border border-green-700 hover:border-slate-900 hover:shadow-lg hover:shadow-slate-900 w-full h-full p-4 bg-white shadow-md shadow-green-700 rounded-2xl flex flex-col items-center justify-center'>
              <div className="flex items-center justify-center flex-grow">
                <Link href="../pages/Decoração">
                  <img src="/img/Home (card Decoração).png" alt="" className="max-w-full max-h-full" />
                </Link>
              </div>
              <p className={`text-black text-xl text-center mb-5 ${poppins.className}`}>Decoração</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex-none w-[283px] h-[280px] flex items-center justify-center">
            <div className='border border-slate-900 hover:border-green-700 hover:shadow-lg hover:shadow-green-700 w-full h-full p-4 bg-white shadow-md shadow-slate-900 rounded-2xl flex flex-col items-center justify-center'>
              <div className="flex items-center justify-center flex-grow">
                <Link href="../pages/Beleza">
                  <img src="/img/Home (card Beleza).png" alt="" className="max-w-full max-h-full" />
                </Link>
              </div>
              <p className={`text-black text-xl text-center mb-5 ${poppins.className}`}>Beleza</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex-none w-[283px] h-[280px] flex items-center justify-center">
            <div className='border border-green-700 hover:border-slate-900 hover:shadow-lg hover:shadow-slate-900 w-full h-full p-4 bg-white shadow-md shadow-green-700 rounded-2xl flex flex-col items-center justify-center'>
              <div className="flex items-center justify-center flex-grow">
                <Link href="../pages/Eletrodomésticos">
                  <img src="/img/Home (card Eletrodomésticos).png" alt="" className="max-w-full max-h-full" />
                </Link>
              </div>
              <p className={`text-black text-xl text-center mb-5 ${poppins.className}`}>Eletrodomésticos</p>
            </div>
          </div>

        </div>
  );
};

export default Cards;