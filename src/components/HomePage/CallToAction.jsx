import { FaCheckCircle } from "react-icons/fa";

const CallToAction = () => {
  const priorities = [
    "تحسين جودة المحاضرات والتفاعل",
    "تحسين جودة المحاضرات والتفاعل",
    "تحسين جودة المحاضرات والتفاعل",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-right text-gray-800">
              صوتك يصنع الفرق في كلية العلوم!
            </h2>
            <p className="text-gray-600 text-right">
              نؤمن بأن التطوير يبدأ منكم! شارك شكواك أو اقتراحاتك وساهم في تحسين
              بيئة التعلم والبحث العلمي
            </p>
            <div className="flex justify-between gap-4 mt-4">
              <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full">
                تقديم شكوى
              </button>
              <button className="cursor-pointer bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg w-full">
                متابعة شكوى
              </button>
            </div>

            <h3 className="text-xl font-bold text-right text-gray-800 mt-8">
              أولوياتنا في الاستماع إليك:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {priorities.map((priority, index) => (
                <div key={index} className="flex items-center gap-2 text-right">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{priority}</span>
                </div>
              ))}
              {priorities.map((priority, index) => (
                <div
                  key={index + 3}
                  className="flex items-center gap-2 text-right"
                >
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{priority}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Images */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/public/Images/homepage/fourth.jpg"
                alt="هدف"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
