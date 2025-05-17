import { useEffect, useState } from "react";
import { getChildProfileDetails, getWomenProfileDetails } from "../../../api/dashboard-api";
import { Modal } from "antd";
import { Calendar, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import store from "../../../config/storeInstance";
import axios from "axios";

const ProfileUi = () => {

  const [selectedProfile, setSelectedProfile] = useState('women');
  const [allCountries, setAllCountries] = useState([]);

  const [womenProfileData, setWomenProfileData] = useState({});
  const [womenDP, setWomenDP] = useState('/images/women-demo.png');
  const [childProfileData, setChildProfileData] = useState({});
  const [childDP, setChildDP] = useState('/images/child-demo.png');

  const [completeProfile, setCompleteProfile] = useState('Calculating')

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWomenProfileChange = () => { };

  const handleChildProfileChange = (e) => {
    setChildProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        const dd = store.getData();
        if (Object.keys(dd).length !== 0) {
          setSelectedProfile(dd.current);
          setWomenProfileData(dd.women);
        }


        const res1 = await getWomenProfileDetails();

        const women = { ...res1.mother_profile };
        women.name = res1.name;
        women.city = res1.city;
        women.language = res1.language;
        if (women.image != null) setWomenDP(`https://api.ourlittlehugs.com/${women.image}`)
        setWomenProfileData({ ...women });
        getProfileCompletion(women);

        const res2 = await getChildProfileDetails();
        res2 && setChildProfileData(res2.profiles[0]);
        store.setData({ current: selectedProfile, women, child: res2.profiles[0] });
        if (res2.profiles[0].image != null) setChildDP(`${res2.profiles[0].image}`)
      } catch (error) {
        toast.error(error)
      }
    })();

    (async () => {
      fetch('https://countriesnow.space/api/v0.1/countries')
        .then(response => response.json())
        .then(result => {
          const countryNames = result.data.map(item => item.country);
          setAllCountries([...countryNames]);
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
        })
    })();

  }, [selectedProfile]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedProfile === 'women') {
      try {
        delete womenProfileData.image;
        const response = await fetch('https://api.ourlittlehugs.com/v1/api/mother-profile', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(womenProfileData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        toast.success('Mother Profile Updated Succesfull ')
      } catch (error) {
        toast.error('Upload failed:', error)
      }

    }

    if (selectedProfile === 'child') {
      try {
        delete childProfileData.image;
        const response = await fetch(`https://api.ourlittlehugs.com/v1/api/child-profiles/${childProfileData.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(childProfileData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        toast.success('Child Profile Updated Succesfull ')
      } catch (error) {
        toast.error('Upload failed:', error)
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


  const updateProfileDP = async (file) => {
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

      await axios.put(
        'https://api.ourlittlehugs.com/v1/api/user-child-profile-image',
        formData, {
        headers: {
          'accept': 'application/json',
          'authorization': localStorage.getItem("accessToken"),
          'content-type': 'multipart/form-data'
        }
      }
      )
    }
  }


  // const addChildProfile = async () => {
  //   try {
  //     const response = await fetch('https://api.ourlittlehugs.com/v1/api/child-profile', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization':  localStorage.getItem("accessToken"),
  //       },
  //       body: JSON.stringify({
  //     name: 'string',
  //     dob: '2025-05-16',
  //     age_group: 'string',
  //     goal: {},
  //     relation_with_child: 'string',
  //     weight: 0,
  //     height: 0
  //   })
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //     } else {
  //       const errorData = await response.json();
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };


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
                      updateProfileDP(file)
                    }
                  }}
                />}

              </div>
            </div>

            {childProfileData && Object.keys(childProfileData).length > 0 && <div className="flex justify-center mb-6">
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
                      updateProfileDP(file)
                    }
                  }}
                />}
              </div>
            </div>}

          </div>


          <div className="text-center mb-4">{completeProfile} %</div>

          {selectedProfile === 'women' &&
            <form >

              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                required
              >
                <option value="" hidden selected>
                  * Country
                </option>
                {allCountries.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>

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
                      onChange={(e) => handleWomenProfileChange("city", e.target.value)}
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
                      onChange={(e) => handleWomenProfileChange("language", e.target.value)}
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
                        handleWomenProfileChange("dateOfBirth", e.target.value)
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
                        handleWomenProfileChange("currentLifeStage", e.target.value)
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
                      onChange={(e) => handleWomenProfileChange("weight", e.target.value)}
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
                      onChange={(e) => handleWomenProfileChange("height", e.target.value)}
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
                    onChange={(e) => handleWomenProfileChange("occupation", e.target.value)}
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
                    onChange={(e) => handleWomenProfileChange("lifestyle", e.target.value)}
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
                      onChange={(e) => handleWomenProfileChange("goal", e.target.value)}
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
                        handleWomenProfileChange("tonePreference", e.target.value)
                      }
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button" onClick={handleSubmit}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>}


          {selectedProfile === 'child' &&
            <form >
              <button type="button" onClick={() => console.table(childProfileData)} >Child</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Child Name
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="text"
                      name="name"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.name}
                      onChange={handleChildProfileChange}
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
                      name="dob"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.dob}
                      onChange={handleChildProfileChange}
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
                      name="age_group"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.age_group}
                      onChange={handleChildProfileChange}
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
                      name="weight"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.weight}
                      onChange={handleChildProfileChange}
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
                      name="height"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={childProfileData.height}
                      onChange={handleChildProfileChange}
                    />
                    <span className="text-gray-400 mr-3`">cm</span>
                  </div>
                </div>

              </div>

              <div className="mt-8">
                <button type="submit" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition-colors">
                  Save
                </button>
              </div>

            </form>
          }

        </div>
      </Modal>
    </>
  );
};

export default ProfileUi;
