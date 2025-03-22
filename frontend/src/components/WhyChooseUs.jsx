import { ShieldCheck, Truck, CreditCard, Headset } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure payments with end-to-end encryption. Shop with confidence."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your orders delivered swiftly with our express shipping services."
  },
  {
    icon: CreditCard,
    title: "Easy Refunds",
    description: "Hassle-free returns and quick refunds on eligible products."
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description: "Our team is available round the clock to assist you with any queries."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          We provide top-notch services to ensure the best shopping experience for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <benefit.icon className="w-12 h-12 text-black/80 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
