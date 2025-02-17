"use client";

import { useState } from "react";
import Image from 'next/image';

const Page = () => {
  // Trạng thái của các API
  const [helloMessage, setHelloMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [sumResult, setSumResult] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  // Trao đổi thông tin thông qua API và trả về kết quả
  const fetchHelloMessage = async () => {
    const response = await fetch("http://localhost:3000/api/hello");
    const message = await response.text();
    setHelloMessage(message);
  };

  const fetchUserInfo = async (id: string, name: string, email: string) => {
    const response = await fetch(`http://localhost:3000/api/user/${id}/Name/${name}/Email/${email}`);
    const user = await response.json();
    setUserInfo(user);
  };

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchSum = async (a: string, b: string) => {
    const response = await fetch(`http://localhost:3000/api/sum/${a}/${b}`);
    const result = await response.json();
    setSumResult(`Sum of ${result.a} and ${result.b} is ${result.sum}`);
  };

  const fetchImage = async () => {
    const response = await fetch("http://localhost:3000/api/image");
    const blob = await response.blob();
    setImageUrl(URL.createObjectURL(blob));
  };
  // Giao diện
  return (
    <div className="container mx-auto p-4 bg-gray-100 text-gray-800">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">API Demo</h1>
      </header>
      <main>
        <p>Hello</p>
        <section className="mb-8">
          <button
            onClick={fetchHelloMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Welcome Message
          </button>
          <p className="mt-4">{helloMessage}</p>
        </section>

        <p>Get User Information</p>
        <section className="mb-8">
          <input
            id="userId"
            placeholder="User ID"
            className="border p-2 rounded mb-2"
          />
          <input
            id="userName"
            placeholder="User Name"
            className="border p-2 rounded mb-2"
          />
          <input
            id="userEmail"
            placeholder="User Email"
            className="border p-2 rounded mb-2"
          />
          <button
            onClick={() =>
              fetchUserInfo(
                (document.getElementById("userId") as HTMLInputElement).value,
                (document.getElementById("userName") as HTMLInputElement).value,
                (document.getElementById("userEmail") as HTMLInputElement).value
              )
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get User Info
          </button>
          {userInfo && (
            <div className="mt-4">
              <p>ID: {userInfo.id}</p>
              <p>Name: {userInfo.Name}</p>
              <p>Email: {userInfo.Email}</p>
            </div>
          )}
        </section>

        <p>Product Infomation</p>
        <section className="mb-8">
          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Products
          </button>
          <ul className="mt-4">
            {products.map((product) => (
              <li key={product.id}>
                ID: {product.id}, Name: {product.name}, Price: ${product.price}
              </li>
            ))}
          </ul>
        </section>

        <p>Calc sum</p>
        <section className="mb-8">
          <input
            id="numA"
            placeholder="Enter number A"
            type="number"
            className="border p-2 rounded mb-2"
          />
          <input
            id="numB"
            placeholder="Enter number B"
            type="number"
            className="border p-2 rounded mb-2"
          />
          <button
            onClick={() =>
              fetchSum(
                (document.getElementById("numA") as HTMLInputElement).value,
                (document.getElementById("numB") as HTMLInputElement).value
              )
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Sum
          </button>
          <p className="mt-4">{sumResult}</p>
        </section>

        <p>Get Image</p>
        <section className="mb-8">
          <button
            onClick={fetchImage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Image
          </button>
          {imageUrl && <img src={imageUrl} alt="Fetched Image" className="mt-4" />}
        </section>
      </main>
      <div style={{ display: 'list-item'}}>
      <Image src="/1.jpg" alt="Image 1" width={1000} height={800}  />
      <Image src="/hust.jpg" alt="Image 2" width={200} height={150} />
      <Image src="/3.jpg" alt="Image 3"  width={1000} height={800} />
    </div>
    </div>
  );
};

export default Page;
