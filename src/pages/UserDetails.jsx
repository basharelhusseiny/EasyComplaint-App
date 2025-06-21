import React, { useEffect, useState } from "react";
import { useComplaintIdContext } from "../context/ComplaintIdContext";
import axios from "axios";

const UserDetails = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [usersDetails, setUsersDetails] = useState();
  const { CompId } = useComplaintIdContext();

  useEffect(() => {
    const fetchUsersDetails = async () => {
      try {
        const res = await axios.get(
          `https://complain.runasp.net/api/Workflow/GetByComplaintType/${CompId}`,
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        );
        setUsersDetails(res.data);
      } catch (err) {
        console.log("خطأ في جلب تفاصيل المستخدمين:", err);
      }
    };
    fetchUsersDetails();
  }, []);

  console.log(usersDetails);
  return (
    <div className="bg-gray-100 px-5 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-4">
          تفاصيل المستخدمين
        </h1>
        {/* <!-- Add Button --> */}
        <div className="text-right mb-6">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 float-left">
            إضافة مستخدم
          </button>
          <br />
        </div>

        {/* <!-- Table --> */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="border p-2 text-center">الاسم</th>
                <th className="border p-2 text-center">الايميل</th>
                <th className="border p-2 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="border p-2 text-center">محمد أحمد</td>
                <td className="border p-2 text-center">
                  as876899879@gmail.com
                </td>
                <td className="border p-2 text-center">
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 sm:px-3 sm:py-1">
                      تعديل
                    </button>
                    <button className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 sm:px-3 sm:py-1">
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border">
                <td className="border p-2 text-center">مستخدم 2</td>
                <td className="border p-2 text-center">mohamed@example.com</td>
                <td className="border p-2 text-center">
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 sm:px-3 sm:py-1">
                      تعديل
                    </button>
                    <button className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 sm:px-3 sm:py-1">
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
