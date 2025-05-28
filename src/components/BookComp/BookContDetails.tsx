import React from 'react';
import Image from "next/image";
import BookStatic from "../../Assets/images/BookStatic.png";


const BookContDetails = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white p-6 shadow-lg rounded-2xl max-w-4xl mx-auto" style={{display:'flex'}}>
    <div className="w-full md:w-1/3">
      <Image
        src={BookStatic}
        alt="Jahan e Mufti e Azam"
        width={300}
        height={400}
        className="rounded-lg shadow-md"
      />
    </div>
    <div className="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
      <h2 className="text-2xl font-bold">Jahan e Mufti e Azam</h2>
      <p className="text-gray-600">Author: Ulama e Ahle Sunnat</p>
      <div className="flex gap-4 mt-4">
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-md shadow hover:bg-gray-300">
          📖 Read
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-900">
          📥 Download
        </button>
      </div>
      <div className="mt-6 text-gray-700">
        <p>
          <strong>Publisher:</strong> Razvi Darul Ifta
        </p>
        <p>
          <strong>Category:</strong> Magazine
        </p>
        <p>
          <strong>Total Pages:</strong> 100
        </p>
        <p>
          <strong>Language:</strong> Urdu
        </p>
      </div>
    </div>
  </div>
  )
}

export default BookContDetails