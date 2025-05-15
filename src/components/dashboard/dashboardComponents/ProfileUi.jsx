import { useEffect, useState } from "react";
import { getChildProfileDetails, getWomenProfileDetails } from "../../../api/dashboard-api";
import { Modal } from "antd";
import { Calendar, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileUi = () => {

  const [selectedProfile, setSelectedProfile] = useState('women');

  const [womenProfileData, setWomenProfileData] = useState({});
  const [womenDP, setWomenDP] = useState('/images/women-demo.png');
  const [childProfileData, setChildProfileData] = useState({});
  const [childDP, setChildDP] = useState('/images/child-demo.png');

  const [completeProfile, setCompleteProfile] = useState('Calculating')

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [userProfile, setuserProfile] = useState({
  //   city: "",
  //   language: "",
  //   dateOfBirth: "",
  //   currentLifeStage: "",
  //   weight: "",
  //   height: "",
  //   occupation: "",
  //   lifestyle: "",
  //   goal: "",
  //   tonePreference: "",
  // });

  useEffect(() => {
    (async () => {
      try {
        const res1 = await getWomenProfileDetails();
        // setuserProfile(res1);

        const women = { ...res1.mother_profile };
        women.name = res1.name;
        women.city = res1.city;
        women.language = res1.language;
        if (women.image != null) setWomenDP(`https://api.ourlittlehugs.com/${women.image}`)
        setWomenProfileData({ ...women });
        getProfileCompletion(women);

        const res2 = await getChildProfileDetails();
        res2 && setChildProfileData(res2.profiles[0]);
        if (res2.profiles[0].image != null) setChildDP(`${res2.profiles[0].image}`)
      } catch (error) {
        toast.error(error)
      }
    })();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (field, value) => {
    // setuserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (file) => {
    if (selectedProfile === 'women') {

      const formData = new FormData();
      formData.append('image', file);

      try {
        await axios.put(
          'https://api.ourlittlehugs.com/v1/api/user-mother-profile-image',
          formData,
          {
            headers: {
              'accept': 'application/json',
              'authorization': localStorage.getItem("accessToken"),
              'content-type': 'multipart/form-data'
            }
          }
        )

        toast.success('Women Image Chnaged Succesfull ')
      } catch (error) {
        console.error('Upload failed:', error);
      }


    }

    if (selectedProfile === 'child') {

      const formData = new FormData();
      formData.append('image', file);
      formData.append('profile_id', childProfileData.id);

      try {
        await axios.put(
          'https://api.ourlittlehugs.com/v1/api/user-child-profile-image',
          formData,
          {
            headers: {
              'accept': 'application/json',
              'authorization': localStorage.getItem("accessToken"),
              'content-type': 'multipart/form-data'
            }
          }
        )

        toast.success('Child Image Chnaged Succesfull ')
      } catch (error) {
        console.error('Upload failed:', error);
      }


    }
  };




  const getProfileCompletion = (profile) => {
    const keys = Object.keys(profile);
    const totalKeys = keys.length;

    if (totalKeys === 0) return 0;

    const completedKeys = keys.filter((key) => {
      const value = profile[key];
      // Check for non-empty, non-null, non-undefined, non-empty-array/object
      if (value === null || value === undefined) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return false;

      return true;
    });

    setCompleteProfile(Math.round((completedKeys.length / totalKeys) * 100));
  };



  return (
    <>
      <div
        onClick={showModal}
        className="lg:flex items-center justify-between hidden border p-3 rounded-md border-gray-400 cp"
      >
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={selectedProfile === 'women' ? womenDP : childDP}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-2 font-medium">
            {selectedProfile === 'women' ? womenProfileData.name : childProfileData.name}
          </span>
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
      <Modal
        title="LittleHuges"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
      >
        <div className="mx-auto p-6 bg-white rounded-lg">
          <h1 className="text-4xl font-medium text-center text-gray-700 mb-8">
            Profile
          </h1>


          <div className="flex gap-8 justify-center items-center">

            <div className="flex justify-center  mb-6">
              <div className="relative flex flex-col items-center">
                <div
                  className={`${selectedProfile === 'women' ? 'w-24 h-24' : 'w-16 h-16'} rounded-full overflow-hidden border-4 border-yellow-400 transition-all duration-200`}
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <img
                      onClick={() => { setSelectedProfile('women'); getProfileCompletion(womenProfileData) }}
                      alt="Women Profile"
                      src={womenDP}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                </div>
                {selectedProfile === 'women' && <input
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setWomenDP(imageUrl);
                      handleSubmit(file)
                    }
                  }}
                />}

              </div>
            </div>

            {childProfileData && <div className="flex justify-center mb-6">
              <div className="relative flex flex-col items-center">
                <div
                  className={`${selectedProfile === 'child' ? 'w-24 h-24' : 'w-16 h-16'} rounded-full overflow-hidden border-4 border-yellow-400 transition-all duration-200`}
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <img
                      onClick={() => { setSelectedProfile('child'); getProfileCompletion(childProfileData) }}
                      alt="Child Profile"
                      src={childDP}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                </div>
                {selectedProfile === 'child' && <input
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setChildDP(imageUrl);
                      handleSubmit(file)
                    }
                  }}
                />}
              </div>
            </div>}

          </div>


          <div className="text-center mb-4">{completeProfile} %</div>

          {selectedProfile === 'women' &&
            <form >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * City
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Language
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.language}
                      onChange={(e) => handleChange("language", e.target.value)}
                    />
                    {/* <ChevronDown className="w-5 h-5 text-gray-400 mr-3" /> */}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Date Of Birth
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.dob}
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      placeholder="YYYY-MM-DD"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Current life stage
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.life_stage}
                      onChange={(e) =>
                        handleChange("currentLifeStage", e.target.value)
                      }
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Weight
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                    />
                    <span className="text-gray-400 mr-3">kg</span>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Height
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                    />
                    <span className="text-gray-400 mr-3">cm</span>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Occupation
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md outline-none"
                    value={womenProfileData.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Lifestyle
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md outline-none"
                    value={womenProfileData.life_style}
                    onChange={(e) => handleChange("lifestyle", e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Goal is to work on
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.intent}
                      onChange={(e) => handleChange("goal", e.target.value)}
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Tone Preference
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={womenProfileData.tone_prefrence}
                      onChange={(e) =>
                        handleChange("tonePreference", e.target.value)
                      }
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>}

          {selectedProfile === 'child' &&
            <form >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Child Name
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.name}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Date of Birth
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.dob}
                      onChange={(e) => handleChange("language", e.target.value)}
                    />
                    {/* <ChevronDown className="w-5 h-5 text-gray-400 mr-3" /> */}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Age Group
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.age_group}
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      placeholder="YYYY-MM-DD"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Weight
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.weight}
                      onChange={(e) =>
                        handleChange("currentLifeStage", e.target.value)
                      }
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>



                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Height
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                    />
                    <span className="text-gray-400 mr-3">cm</span>
                  </div>
                </div>

              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>}


        </div>
      </Modal>
    </>
  );
};

export default ProfileUi;
