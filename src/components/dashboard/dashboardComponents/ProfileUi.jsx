import { useCallback, useEffect, useRef, useState } from "react";
import { getChildProfileDetails, getWomenProfileDetails } from "../../../api/dashboard-api";
import { Modal } from "antd";
import { Calendar, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import store from "../../../config/storeInstance";
import axios from "axios";
import AddChildProfile from "./AddChildProifle";

const ProfileUi = () => {

  const dd = store.getData();

  const [selectedProfile, setSelectedProfile] = useState((Object.keys(dd).length !== 0) ? dd.current : 'women');
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);

  const [showAddProifle, setShowAddProfile] = useState(null);

  const [localMotherdDP, setLocalMotherDP] = useState(null);
  const [localChildDP, setLocalChildDP] = useState(null);

  const [womenProfileData, setWomenProfileData] = useState({});
  const [womenDP, setWomenDP] = useState('/images/women-demo.png');
  const [childProfileData, setChildProfileData] = useState({});
  const [childDP, setChildDP] = useState('/images/child-demo.png');

  const [completeProfile, setCompleteProfile] = useState('Calculating')

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isWomenGoalOpen, setIsWomenGoalOpen] = useState(false);
  const [selectedWomenGoalOptions, setSelectedWomenGoalOptions] = useState([]);
  const womenGoalDropdownRef = useRef(null);
  const toggleWomenGoalDropdown = () => setIsWomenGoalOpen(!isWomenGoalOpen);
  const toggleWomenGoalOption = (option) => {
    let selected = [];
    if (selectedWomenGoalOptions.some((item) => item === option))
      selected = selectedWomenGoalOptions.filter((item) => item !== option);
    else selected = [...selectedWomenGoalOptions, option];
    setSelectedWomenGoalOptions((prev) => selected);
    setWomenProfileData((prevData) => ({
      ...prevData,
      "intent": selected
    }));
  };


  const [isChildGoalOpen, setIsChildGoalOpen] = useState(false);
  const [selectedChildGoalOptions, setSelectedChildGoalOptions] = useState([]);
  const childGoalDropdownRef = useRef(null);
  const toggleChildGoalDropdown = () => setIsChildGoalOpen(!isChildGoalOpen);
  const toggleChildGoalOption = (option) => {
    let selected = [];
    if (selectedChildGoalOptions.some((item) => item === option))
      selected = selectedChildGoalOptions.filter((item) => item !== option);
    else selected = [...selectedChildGoalOptions, option];
    setSelectedChildGoalOptions((prev) => selected);
    setChildProfileData((prevData) => ({
      ...prevData,
      "goal": selected
    }));
  };


  const handleWomenProfileChange = (e) => {
    setWomenProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'country') fetchCities(e.target.value);
  };

  const handleChildProfileChange = (e) => {
    setChildProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };


  const getProfileCompletion = useCallback((profile) => {
    delete profile.image;
    delete profile.relation_with_child;
    const profileCopy = { ...profile };

    const keys = Object.keys(profileCopy);
    const totalKeys = keys.length;

    if (totalKeys === 0) return 0;

    const completedKeys = keys.filter((key) => {
      const value = profileCopy[key];
      if (value === null || value === undefined) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return false;
      return true;
    });

    const percentage = Math.round((completedKeys.length / totalKeys) * 100);
    setCompleteProfile(percentage);
    return percentage;
  }, [setCompleteProfile]);



  const fetchCities = useCallback((country) => {
    fetch(`https://api.ourlittlehugs.com/v1/api/city/?country_code=${country}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && Array.isArray(data[0].name)) {
          const cities = data[0].name;
          if (cities.length < 1) toast.error('Got Zero Cities Names');
          else setAllCities([...cities]);
        }
        // else toast.error('Please Check Cities');
      })
      .catch(error => { console.error('Error:', error); });

    fetch(`https://api.ourlittlehugs.com/v1/api/language/?country_code=${country}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && Array.isArray(data[0].name)) {
          const languages = data[0].name;
          if (languages.length < 1) toast.error('Got Zero Languages Names');
          else setAllLanguages([...languages]);
        }
        // else toast.error('Please Check Languages');
      })
      .catch(error => { console.error('Error:', error); });

  }, [setAllCities]);




  useEffect(() => {
    if ((Object.keys(dd).length !== 0)) setWomenProfileData(dd.women);
  }, [dd])



  const initialData = useCallback(async () => {
    try {
      const res1 = await getWomenProfileDetails();

      const women = { ...res1.mother_profile };
      women.name = res1.name;
      women.city = res1.city;
      women.country = res1.country;
      women.language = res1.language;

      if (women.image != null) setWomenDP(`https://api.ourlittlehugs.com/${women.image}`);
      setWomenProfileData({ ...women });
      getProfileCompletion(women);
      setSelectedWomenGoalOptions([...women.intent]);

      fetchCities(res1.country);

      const res2 = await getChildProfileDetails();

      if (res2 && res2.profiles && res2.profiles.length > 0) {
        setChildProfileData(res2.profiles[0]);
        setSelectedChildGoalOptions([...res2.profiles[0].goal]);
      }
      store.setData({
        current: selectedProfile,
        completingPercentage: selectedProfile === 'child'
          ? getProfileCompletion(res2.profiles[0])
          : getProfileCompletion(women),
        name: res1.name,
        women,
        child: (res2 && res2.profiles && res2.profiles.length > 0) ? res2.profiles[0] : null
      });

      if (res2.profiles[0].image != null) setChildDP(`${res2.profiles[0].image}`);
    } catch (error) {
      toast.error(error);
    }
  }, [fetchCities, getProfileCompletion, selectedProfile]);



  useEffect(() => { initialData(); }, [initialData]);


  useEffect(() => {
    (async () => {
      fetch('https://api.ourlittlehugs.com/v1/api/country')
        .then(response => response.json())
        .then(result => {
          if (Array.isArray(result)) {
            setAllCountries(result);
          } else {
            setAllCountries([]);
          }
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
        })
    })();
  }, []);



  useEffect(() => {
    const handleClickOutsideGoal = (event) => {
      if (womenGoalDropdownRef.current && !womenGoalDropdownRef.current.contains(event.target)) setIsWomenGoalOpen(false);
      if (childGoalDropdownRef.current && !childGoalDropdownRef.current.contains(event.target)) setIsChildGoalOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutsideGoal);
    return () => document.removeEventListener("mousedown", handleClickOutsideGoal);
  }, []);



  // Fetch Countries
  useEffect(() => {
    fetch('https://api.ourlittlehugs.com/v1/api/country/')
      .then(response => response.json())
      .then(result => {
        if (Array.isArray(result)) {
          setAllCountries(result);
        } else {
          setAllCountries([]);
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedProfile === 'women') {
      try {
        delete womenProfileData.image;
        const response1 = await fetch('https://api.ourlittlehugs.com/v1/api/mother-profile', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(womenProfileData)
        });

        if (!response1.ok) throw new Error(`HTTP error! Status: ${response1.status}`);

        if (localMotherdDP !== null) {
          const formData = new FormData();
          formData.append('image', localMotherdDP);

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

            toast.success('Women Image Chnaged Succesfull ');
            window.location.reload();
          } catch (error) {
            console.error('Upload failed:', error);
          }

        }

        delete womenProfileData.id;
        delete womenProfileData.name;
        const response2 = await fetch('https://api.ourlittlehugs.com/v1/api/user-profiles', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(womenProfileData)
        });

        if (!response2.ok) throw new Error(`HTTP error! Status: ${response2.status}`);

        toast.success('Mother Profile Updated Succesfull');
      } catch (error) {
        toast.error('Saving Profile failed')
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

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        if (localChildDP !== null) {
          const formData = new FormData();
          formData.append('image', localChildDP);
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
          );
        }

        toast.success('Child Profile Updated Succesfull');
        getProfileCompletion(childProfileData);
      } catch (error) {
        toast.error('Upload failed:')
      }
    }

    handleCancel();
    initialData();
  };



  return (
    <div >
      <div
        id="profile"
        onClick={showModal}
        className="w-full flex gap-2 items-center bg-gray-100 p-1 rounded-md border-gray-400 z-50 cp"
      >

        <div className="flex w-full items-center">
          <div className="aspect-square w-full max-w-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={selectedProfile === 'women' ? womenDP : childDP}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="ml-2 font-medium">
            {selectedProfile === 'women' ? womenProfileData.name : childProfileData.name}
          </span>
        </div>

        <button className="hidden md:block p-2 text-gray-500 hover:bg-gray-100 rounded-full">
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
          <h1 className="flex justify-center items-center gap-2 text-4xl font-medium text-center text-gray-700 mb-8">
            <span>  Profile </span>  <span className="my-auto text-2xl">({completeProfile} %)</span>
          </h1>


          <div className="flex gap-8 justify-center items-center">

            <div className="flex justify-center mb-10">
              <div className="relative flex flex-col items-center space-y-3">
                <div
                  className={`${selectedProfile === "women" ? "w-28 h-28" : "w-20 h-20"
                    } rounded-full overflow-hidden border-4 border-blue-400 shadow-md transition-all duration-300 transform hover:scale-105`}
                >
                  <img
                    onClick={() => {
                      setSelectedProfile("women");
                      getProfileCompletion(womenProfileData);
                      store.setData({
                        current: "women",
                        completingPercentage: getProfileCompletion(womenProfileData),
                        name: womenProfileData.name,
                      });
                    }}
                    alt="Women Profile"
                    src={womenDP}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>

                {selectedProfile === "women" && (
                  <label className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded shadow-md transition duration-200">
                    Change Photo
                    <input
                      type="file"
                      accept="image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setWomenDP(imageUrl);
                          setLocalMotherDP(file)
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>


            {/* {childProfileData && Object.keys(childProfileData).length === 0 &&
              <div onClick={() => setShowAddProfile('childProfile')} className="w-20 h-20 rounded-full bg-red-200">Add Child Profile</div>
            } */}

            {childProfileData && Object.keys(childProfileData).length > 0 && <div className="flex justify-center mb-10">
              <div className="relative flex flex-col items-center space-y-3">
                <div
                  className={`${selectedProfile === "child" ? "w-28 h-28" : "w-20 h-20"} rounded-full overflow-hidden border-4 border-blue-400 shadow-md transition-all duration-300 transform hover:scale-105`}
                >
                  <img
                    onClick={() => {
                      setSelectedProfile("child");
                      getProfileCompletion(childProfileData);
                      store.setData({
                        current: "child",
                        completingPercentage: getProfileCompletion(childProfileData),
                        name: childProfileData.name,
                      });
                    }}
                    alt="Child Profile"
                    src={childDP}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>

                {selectedProfile === "child" && (
                  <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded shadow-md transition duration-200">
                    Change Photo
                    <input
                      type="file"
                      accept="image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setChildDP(imageUrl);
                          setLocalChildDP(file)
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>}

          </div>


          {showAddProifle === 'childProfile' && <AddChildProfile />}


          {showAddProifle === null &&
            <>
              {selectedProfile === 'women' &&
                <form >

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">


                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Country
                      </label>
                      <select
                        name="country"
                        value={womenProfileData.country}
                        defaultValue=""
                        onChange={handleWomenProfileChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                        required
                      >
                        <option value="" hidden>Select Country</option>
                        {allCountries.map((country, i) => (
                          <option key={i} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * City
                      </label>
                      <select name="city" value={womenProfileData.city} onChange={handleWomenProfileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required >
                        {allCities.map((city, i) => (
                          <option key={i} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Language
                      </label>
                      <select name="language" value={womenProfileData.language} onChange={handleWomenProfileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required >
                        <option value="" hidden selected>
                          * Select Language
                        </option>
                        {allLanguages.map((language, i) => (
                          <option key={i} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    </div>



                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Date Of Birth
                      </label>
                      <div className="flex items-center border rounded-md">
                        <input
                          type="date"
                          name="dob"
                          className="flex-grow p-3 outline-none rounded-md"
                          value={womenProfileData.dob}
                          onChange={(e) => handleWomenProfileChange(e)}
                          placeholder="YYYY-MM-DD"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Current life stage
                      </label>
                      <div className="flex items-center border rounded-md">
                        <select
                          name="life_stage"
                          className="w-full border p-2 rounded border rounded-md"
                          value={womenProfileData.life_stage}
                          onChange={(e) => handleWomenProfileChange(e)}
                          required
                        >
                          <option value="" disabled hidden>
                            * Current life stage
                          </option>
                          <option>Early adulthood</option>
                          <option>Adulthood</option>
                          <option>Pregnancy</option>
                          <option>Menopause</option>
                          <option>Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Weight
                      </label>
                      <div className="flex items-center border rounded-md">
                        <input
                          type="number"
                          name="weight"
                          className="flex-grow p-3 outline-none rounded-md"
                          value={womenProfileData.weight}
                          onChange={(e) => handleWomenProfileChange(e)}
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
                          type="nuumber"
                          name="height"
                          className="flex-grow p-3 outline-none rounded-md"
                          value={womenProfileData.height}
                          onChange={(e) => handleWomenProfileChange(e)}
                        />
                        <span className="text-gray-400 mr-3">cm</span>
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Occupation
                      </label>
                      <input
                        type="text"
                        name="occupation"
                        className="w-full p-3 border rounded-md outline-none"
                        value={womenProfileData.occupation}
                        onChange={handleWomenProfileChange}
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Lifestyle
                      </label>
                      <select name="life_style" value={womenProfileData.life_style} className="w-full border p-2 rounded border rounded-md" onChange={(e) => handleWomenProfileChange(e)} required>
                        <option value="" disabled hidden>
                          * Life Style
                        </option>
                        <option>Nuclear Family</option>
                        <option>Joint Family</option>
                        <option>Single Parent</option>
                        <option>Shared Accommodation / Hostel</option>
                        <option>Urban / Metro City</option>
                        <option>Suburban / Town</option>
                        <option>Rural / Village</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative" ref={womenGoalDropdownRef}>
                      <label className="block text-sm text-gray-500 mb-1">
                        * Goal is to work on
                      </label>
                      <div>
                        <div
                          className="border rounded p-2 bg-white  min-h-10 cursor-pointer"
                          onClick={toggleWomenGoalDropdown}
                        >
                          {selectedWomenGoalOptions.length === 0 ? (
                            <span className="text-gray-500">
                              * Goal is to work on
                            </span>
                          ) : (
                            selectedWomenGoalOptions.map((option) => (
                              <div
                                key={option}
                                className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                              >
                                <span>{option}</span>
                              </div>
                            ))
                          )}
                        </div>

                        {isWomenGoalOpen && (
                          <div className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                            {["Sleep", "Hormones", "Fatigue", "Anxiety", "Self Care"]
                              .map((option) => (
                                <div
                                  key={option}
                                  className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedWomenGoalOptions.some(
                                    (item) => item === option
                                  )
                                    ? "bg-blue-50"
                                    : ""
                                    }`}
                                  onClick={() => toggleWomenGoalOption(option)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedWomenGoalOptions.some((item) => item === option)}
                                    readOnly
                                    className="mr-2"
                                  />
                                  {option}
                                </div>
                              ))}
                          </div>)}
                      </div>

                    </div>
                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Tone Preference
                      </label>
                      <div className="flex items-center border rounded-md">

                        <select name="tone_prefrence" value={womenProfileData.tone_prefrence} onChange={(e) => handleWomenProfileChange(e)} className="w-full border p-2 rounded" required>
                          <option value="" hidden selected>
                            * Tone Prefrence
                          </option>
                          {["Reassuring", "Motivational", "Calming", "Neutral"].map((tone, i) => {
                            return <option key={i}>{tone}</option>;
                          })}
                        </select>

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
                          type="number"
                          name="height"
                          className="flex-grow p-3 outline-none rounded-md"
                          value={childProfileData.height}
                          onChange={handleChildProfileChange}
                        />
                        <span className="text-gray-400 mr-3`">cm</span>
                      </div>
                    </div>


                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        * Goal is to work on
                      </label>
                      <div>
                        <div
                          className="border rounded p-2 bg-white  min-h-10 cursor-pointer"
                          onClick={toggleChildGoalDropdown}
                        >
                          {selectedChildGoalOptions.length === 0 ? (
                            <span className="text-gray-500">
                              * Goal is to work on
                            </span>
                          ) : (
                            selectedChildGoalOptions.map((option) => (
                              <div
                                key={option}
                                className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                              >
                                <span>{option}</span>
                              </div>
                            ))
                          )}
                        </div>

                        {isChildGoalOpen && (
                          <div ref={childGoalDropdownRef} className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                            {["Sleep", "Hormones", "Fatigue", "Anxiety", "Self Care"]
                              .map((option) => (
                                <div
                                  key={option}
                                  className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedWomenGoalOptions.some(
                                    (item) => item === option
                                  )
                                    ? "bg-blue-50"
                                    : ""
                                    }`}
                                  onClick={() => toggleChildGoalOption(option)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedChildGoalOptions.some((item) => item === option)}
                                    readOnly
                                    className="mr-2"
                                  />
                                  {option}
                                </div>
                              ))}
                          </div>)}
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
            </>
          }





        </div>
      </Modal>
    </div>
  );
};

export default ProfileUi;
