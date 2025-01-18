import { Link } from "react-router-dom";

export const MainPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-white py-16">
                <div className="container mx-auto text-center text-blue-600 px-4">
                    <div className="flex flex-col items-center md:flex-row md:justify-between md:space-x-12">
                        <div className="mb-8 md:mb-0">
                            <img
                                src={"/product1.jpg"}
                                alt="E-Commerce"
                                className="w-full md:w-1/2 rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="md:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Welcome to My E-Commerce Store!
                            </h1>
                            <p className="text-lg md:text-xl mb-6">
                                Discover the best products and offers in a simple, fast, and secure online shopping
                                experience. Our store provides a wide range of items, from fashion to electronics, with
                                quick shipping and excellent customer service.
                            </p>
                            <Link
                                to="/products"
                                className="bg-mainText text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-lightGray transition duration-300"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold mb-6">What Our Customers Are Saying</h2>
                        <div className="flex flex-wrap justify-center gap-12">
                            <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-80">
                                <p className="text-lg mb-4">"Amazing store! I found exactly what I was looking for, and the delivery was super fast."</p>
                                <p className="font-bold text-md">John D.</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-80">
                                <p className="text-lg mb-4">"The quality of the products is top-notch. I will definitely shop here again!"</p>
                                <p className="font-bold text-md">Sarah P.</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-80">
                                <p className="text-lg mb-4">"I am so impressed with the customer service and how fast my order arrived!"</p>
                                <p className="font-bold text-md">Mark T.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 bg-blue-500 text-white py-12">
                        <h2 className="text-3xl font-semibold mb-4">Limited Time Offer!</h2>
                        <p className="text-xl mb-6">Get 20% off on your first order. Use code <strong>WELCOME20</strong> at checkout.</p>
                        <Link
                            to="/products"
                            className="bg-mainText text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-lightGray transition duration-300"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </main>


        </div>
    );
};
