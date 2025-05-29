import { motion } from "framer-motion";

const AboutCollegeSection = () => {
  const features = [
    { id: 1, title: "الخدمات التعليمية", icon: "🎓" },
    { id: 2, title: "الخدمات الطلابية", icon: "👨‍🎓" },
    { id: 3, title: "المعاملات الإدارية", icon: "📝" },
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Tetx */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-3/5 space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                مرحبا بكم في كلية العلوم
              </h2>
              <p className="text-xl text-green-600 font-semibold">
                بوابتك لعالم المعرفة والتجربة
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              أكثر من 15 عاما من العمل في كلية العلوم جعلتنا نطور منصتنا لتوفير
              أفضل طريقة لاستقبال اقتراحاتكم وشكاويكم.
            </p>

            <p className="text-gray-600 leading-relaxed">
              كلية العلوم هي المركز الرئيسي للبحث والتطوير، حيث يجتمع العلم
              والمعرفة لبناء مستقبل أفضل. نأسس على أسس الابتكار والاستكشافات
              ونسعى دائمًا إلى تحسين بيئتنا التعليمية والتجريبية ومن خلال العمل
              في إنشاء مجتمع أكاديمي وسيلة فعالة لاستقبال اقتراحاتكم وشكاويكم.
              فمعا يمكننا أن نطور الخدمات ونحسن التجربة التعليمية والإدارية
              لجميع الطلاب وأعضاء هيئة التدريس. نؤمن أن وجودكم هو المحرك الأساسي
              للتقدم ونسعى جاهدين للاستماع إلى آرائكم والعمل على تحقيق تطلعاتكم.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <p className="font-semibold text-gray-800">{feature.title}</p>
                </div>
              ))}
            </div>

            <button className="mt-6 bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 px-6 py-3 rounded-xl text-white cursor-pointer font-semibold hover:scale-105 duration-200 transition-all shadow-md">
              تقديم شكوى
            </button>
          </motion.div>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-2/5 mt-8 md:mt-0"
          >
            <img
              src="/Images/homepage/second.jpg"
              alt="كلية العلوم"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCollegeSection;
