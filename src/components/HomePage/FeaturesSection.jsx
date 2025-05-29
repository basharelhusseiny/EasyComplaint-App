import React from "react";
import { FaRegFileAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "الشكوي",
      desc: "أبلغ عن أي مشكلة تواجهها داخل الكلية ليتم التعامل معها بسرعة وفاعلية.",
      icon: <FaRegFileAlt className="text-3xl text-green-600" />,
    },
    {
      id: 2,
      title: "التريند",
      desc: "تابع حالة شكواك وتأكد من معالجتها في أسرع وقت ممكن.",
      icon: <FaChartLine className="text-3xl text-green-600" />,
    },
    {
      id: 3,
      title: "الفحص الناجح",
      desc: "تابع حالة شكواك وتأكد من معالجتها في أسرع وقت ممكن.",
      icon: <FaCheckCircle className="text-3xl text-green-600" />,
    },
  ];

  return (
    <section className="py-10 bg-green-200">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
          {features.map((feature) => {
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <span className="bg-green-600 text-white w-20 h-12 flex items-center justify-center font-semibold text-xl relative -left-9 overflow-hidden -skew-x-20 transform group-hover:skew-x-0 transition-transform duration-300">
                      <span className="relative z-10 text-2xl">
                        {feature.id < 10 ? `0${feature.id}` : feature.id}
                      </span>
                    </span>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-5">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
