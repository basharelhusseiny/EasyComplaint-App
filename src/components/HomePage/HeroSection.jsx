import { useNavigate } from "react-router";
import { useWebsiteInfo } from "../../context/WebsiteContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { websiteInfo } = useWebsiteInfo();
  return (
    <div className="relative bg-[url(/Images/homepage/first.jpg)] bg-cover bg-center w-full h-[calc(100vh-72px)]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4">
        <div className="absolute z-10 text-white w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 sm:px-0">
          <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold">
              يسعدنا الترحيب بكم في{" "}
              <span className="text-green-400">{websiteInfo?.name}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium">
              {websiteInfo?.description}
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              نؤمن بأن رأيك هو الأساس في تطوير خدماتنا. لا تتردد في مشاركة
              ملاحظاتك لتساعدنا في الارتقاء عن أي مشكلة تواجهها، وسنعمل جاهدين
              على معالجتها بأسرع وقت ممكن.
            </p>
            <div className="flex gap-5 items-center justify-center">
              <button
                onClick={() => navigate("/ContactUs")}
                className="bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 px-5 py-2 rounded-xl text-white cursor-pointer font-semibold  hover:scale-105 duration-200 transition-colors"
              >
                تواصل معنا
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 px-5 py-2 rounded-xl text-white cursor-pointer font-semibold  hover:scale-105 duration-200 transition-colors"
              >
                تقديم شكوى
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
