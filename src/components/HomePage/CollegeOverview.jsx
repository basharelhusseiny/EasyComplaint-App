import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CollegeOverview = () => {
  const stats = [
    { id: 1, number: 200, prefix: "+", text: "مختبر لأبحاث الطلاب" },
    { id: 2, number: 50, prefix: "+", text: "قسم علمي يعمل كل عام" },
    {
      id: 3,
      number: 95,
      prefix: "+",
      suffix: "%",
      text: "من الشكاوى تم حلها في أسبوع",
    },
    { id: 4, number: 1500, prefix: "+", text: "شكوى تم التعامل معها بنجاح" },
  ];

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.1 });

  // استخدام useState لتخزين قيم العدادات
  const [counters, setCounters] = React.useState(stats.map(() => 0));

  // تحديث العدادات عندما يصبح القسم مرئيًا
  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        // بدء من صفر
        let startValue = 0;
        const endValue = stat.number;
        const duration = 2000; // 2 ثانية
        const increment = endValue / 60; // 60 إطار في الثانية

        const timer = setInterval(() => {
          startValue += increment;

          if (startValue >= endValue) {
            startValue = endValue;
            clearInterval(timer);
          }

          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = Math.round(startValue);
            return newCounters;
          });
        }, 1000 / 60);

        // تنظيف المؤقتات عند إلغاء تحميل المكون
        return () => clearInterval(timer);
      });
    }
  }, [isInView]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 -left-95 w-[600px] h-full bg-green-600 skew-x-[25deg] origin-top-left transform -translate-x-10"></div>

      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          {/* Top */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            <div className="w-full lg:w-1/2">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/Images/homepage/third.jpg"
                  alt="معامل كلية العلوم"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="relative z-5 w-full lg:w-1/2 text-right">
              <p className="text-base md:text-lg leading-relaxed">
                كلية العلوم هي واحدة من أعرق كليات جامعتنا، وتشتهر بتخصصاتها
                المتنوعة في مجالات الفيزياء والكيمياء وعلوم الحاسب. لقد أعدت
                المختبرات العلمية والتكنولوجية لتوفر مناخًا مثاليًا لدعم مسيرة
                البحث العلمي والابتكار. بالإضافة إلى ذلك، نحن ملتزمون بدعم
                الطلاب وتحسين تجربة التعليم من خلال الاستماع للاقتراحات والشكاوى
                والعمل على تطويرها.
              </p>
              <button className="mt-7 bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 px-5 py-2 rounded-xl text-white cursor-pointer font-semibold duration-200 transition-colors">
                عرض المزيد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom*/}
      <div ref={statsRef} className="relative bg-black z-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.id} className="text-center">
                <motion.h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {counters[index]}
                  {stat.suffix || ""} {stat.prefix}
                </motion.h3>
                <p className="text-white text-sm md:text-base">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeOverview;
