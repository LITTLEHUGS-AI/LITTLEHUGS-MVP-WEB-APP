import { useCallback, useEffect, useRef, useState } from "react";
import { getWomenProfileDetails } from "../../../api/dashboard-api";
import { Modal } from "antd";
import { Calendar, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import store from "../../../config/storeInstance";
import axios from "axios";
import SearchableSelect from "../../../widgets/layouts/SearchableSelect";


const ProfileUi = () => {

  const dd = store.getData();
  const [profiles, setProfiles] = useState({});

  const [selectedProfile, setSelectedProfile] = useState((Object.keys(dd).length !== 0) ? dd.current : null);

  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);

  const [localMotherdDP, setLocalMotherDP] = useState(null);
  const [localChildDP, setLocalChildDP] = useState(null);
  const [localMendDP, setLocalMenDP] = useState(null);

  const [womenProfileData, setWomenProfileData] = useState({});
  const [womenDP, setWomenDP] = useState('/images/women-demo.png');
  const [childProfileData, setChildProfileData] = useState({});
  const [childDP, setChildDP] = useState('/images/child-demo.png');
  const [menProfileData, setMenProfileData] = useState({});
  const [menDP, setMenDP] = useState('/images/men-demo.jpg');

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



  const [isMenGoalOpen, setIsMenGoalOpen] = useState(false);
  const [selectedMenGoalOptions, setSelectedMenGoalOptions] = useState([]);
  const menGoalDropdownRef = useRef(null);
  const toggleMenGoalDropdown = () => setIsMenGoalOpen(!isMenGoalOpen);
  const toggleMenGoalOption = (option) => {
    let selected = [];
    if (selectedMenGoalOptions.some((item) => item === option))
      selected = selectedMenGoalOptions.filter((item) => item !== option);
    else selected = [...selectedMenGoalOptions, option];
    setSelectedMenGoalOptions((prev) => selected);
    setMenProfileData((prevData) => ({
      ...prevData,
      "intent": selected
    }));
  };


  const handleWomenProfileChange = (e) => {
    setWomenProfileData({
      ...womenProfileData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'country') fetchCities(e.target.value);
  };

  const handleChildProfileChange = (e) => {
    setChildProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleMenProfileChange = (e) => {
    setMenProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'country') fetchCities(e.target.value);
  };


  const getProfileCompletion = useCallback((profile) => {
    const profileCopy = { ...profile };
    delete profileCopy.image;
    delete profileCopy.relation_with_child;

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
    if (typeof country !== 'string' || country.trim() === '') return;

    fetch(`${process.env.REACT_APP_API_URL}/v1/api/city/?country_code=${country}`, {
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

    fetch(`${process.env.REACT_APP_API_URL}/v1/api/language/?country_code=${country}`, {
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
    if (dd.women && (Object.keys(dd.women).length !== 0)) {
      setWomenProfileData(dd.women);
      if (dd.women.image != null) setWomenDP(dd.women.image);
    }
    if (dd.child && (Object.keys(dd.child).length !== 0)) {
      setChildProfileData(dd.child);
      if (dd.child.image != null) setChildDP(dd.child.image);
      setSelectedChildGoalOptions([...dd.child.goal]);
    }
    if (dd.men && (Object.keys(dd.men).length !== 0)) {
      setMenProfileData(dd.men);
      setSelectedMenGoalOptions([...dd.men.intent])
    }
  }, [dd])



  const initialData = useCallback(async () => {
    try {

      if (selectedProfile != null) {
        const data = store.getData();
        setWomenProfileData(data.women);
        setChildProfileData(data.child);
        setMenProfileData(data.men);
        setCompleteProfile(data.completingPercentage);

        switch (selectedProfile) {
          case 'women': fetchCities(data.women.country); break;
          case 'child': fetchCities(data.child.country); break;
          case 'men': fetchCities(data.men.country); break;
          default: ;
        }

        setProfiles(prev => {
          const newState = {
            women: Object.keys(dd.women).length > 0,
            child: Object.keys(dd.child).length > 0,
            men: Object.keys(dd.men).length > 0,
          };
          if (prev.women === newState.women && prev.child === newState.child && prev.men === newState.men) return prev;
          return newState;
        });
        return;
      }

      const res1 = await getWomenProfileDetails();
      let localProfiles = { women: false, child: false, men: false };
      let current = null;
      let completeage = 0;
      if (res1.mother_profile && Object.keys(res1.mother_profile).length > 0) localProfiles.women = true;
      if (Array.isArray(res1.child_profiles) && res1.child_profiles.length > 0) { localProfiles.child = true }
      if (res1.men_profile && Object.keys(res1.men_profile).length > 0) localProfiles.men = true;
      setProfiles({ ...localProfiles });

      if (localProfiles.women) { current = 'women'; completeage = getProfileCompletion(res1.mother_profile) }
      else if (localProfiles.child) { current = 'child'; completeage = getProfileCompletion(res1.child_profiles[0]); }
      else if (localProfiles.men) { current = 'men'; completeage = getProfileCompletion(res1.men_profile) }
      setSelectedProfile(current);


      const women = { ...res1.mother_profile };
      if (Object.keys(women).length > 0) {
        women.name = res1.name;
        women.city = res1.city;
        women.country = res1.country;
        women.language = res1.language;
      }

      if (localProfiles.women) {

        if (women.image != null) setWomenDP(`${process.env.REACT_APP_API_URL}/${women.image}`);
        setWomenProfileData({ ...women });
        getProfileCompletion(women);
        setSelectedWomenGoalOptions([...women.intent]);
        fetchCities(res1.country);
      }


      if (localProfiles.child) {
        setChildProfileData(res1.child_profiles[0]);
        setChildDP(`${res1.child_profiles[0].image}`);
        setSelectedChildGoalOptions([...res1.child_profiles[0].goal]);
      }

      const men = { ...res1.men_profile };
      if (localProfiles.men) {
        men.city = res1.city;
        men.country = res1.country;
        men.language = res1.language;

        setMenProfileData({ ...men });
        setSelectedMenGoalOptions([...res1.men_profile.intent]);
        fetchCities(res1.country);
      }

      store.setData({
        current,
        completingPercentage: completeage,
        name: "",
        women,
        child: res1.child_profiles[0] ?? {},
        men
      });

    } catch (error) {
      toast.error(error);
    }
  }, [fetchCities, getProfileCompletion, selectedProfile, dd.women, dd.child, dd.men]);



  useEffect(() => { initialData(); }, [initialData]);


  useEffect(() => {
    (async () => {
      fetch(`${process.env.REACT_APP_API_URL}/v1/api/country`)
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
      if (menGoalDropdownRef.current && !menGoalDropdownRef.current.contains(event.target)) setIsMenGoalOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutsideGoal);
    return () => document.removeEventListener("mousedown", handleClickOutsideGoal);
  }, []);



  // Fetch Countries
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/api/country/`)
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

    const profile = { womenProfileData, childProfileData, menProfileData };

    if (selectedProfile === 'women') {
      try {
        delete womenProfileData.image;
        const response1 = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/mother-profile`, {
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
              `${process.env.REACT_APP_API_URL}/v1/api/user-mother-profile-image`,
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
            // window.location.reload();
          } catch (error) {
            console.error('Upload failed:', error);
          }

        }

        delete womenProfileData.id;
        delete womenProfileData.name;
        const response2 = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/user-profiles`, {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/child-profiles/${childProfileData.id}`, {
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
            `${process.env.REACT_APP_API_URL}/v1/api/user-child-profile-image`,
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


    if (selectedProfile === 'men') {
      try {
        delete menProfileData.image;
        const response1 = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/men-profile`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menProfileData)
        });

        if (!response1.ok) throw new Error(`HTTP error! Status: ${response1.status}`);

        if (localMendDP !== null) {
          const formData = new FormData();
          formData.append('image', localMendDP);

          try {
            await axios.put(
              `${process.env.REACT_APP_API_URL}/v1/api/user-men-profile-image`,
              formData,
              {
                headers: {
                  'accept': 'application/json',
                  'authorization': localStorage.getItem("accessToken"),
                  'content-type': 'multipart/form-data'
                }
              }
            )

            toast.success('Men Image Chnaged Succesfull ');
            // window.location.reload();
          } catch (error) {
            console.error('Upload failed:', error);
          }

        }

        delete menProfileData.id;
        delete menProfileData.name;
        const response2 = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/user-profiles`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menProfileData)
        });

        if (!response2.ok) throw new Error(`HTTP error! Status: ${response2.status}`);

        toast.success('Men Profile Updated Succesfull');
      } catch (error) {
        toast.error('Saving Profile failed')
      }
    }

    handleCancel();

    let complete = 0;
    switch (selectedProfile) {
      case 'women': complete = getProfileCompletion(womenProfileData); break;
      case 'child': complete = getProfileCompletion(childProfileData); break;
      case 'men': complete = getProfileCompletion(menProfileData); break;
      default: ;
    }

    store.setData({
      completingPercentage: complete,
      women: profile.womenProfileData,
      child: profile.childProfileData,
      men: profile.menProfileData
    });

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

            {selectedProfile === null && <p>Please Select a Profile First</p>}

            {selectedProfile === 'women' && <img
              src={womenDP}
              alt="Profile"
              className="w-full h-full object-cover"
            />}

            {selectedProfile === 'child' &&
              <img
                src={childDP}
                alt="Profile"
                className="w-full h-full object-cover"
              />}

            {selectedProfile === 'men' && <img
              src={menDP}
              alt="Profile"
              className="w-full h-full object-cover"
            />}

          </div>

          <span className="ml-2 font-medium">

            {selectedProfile === 'women' && womenProfileData.name}

            {selectedProfile === 'child' && childProfileData.name}

            {selectedProfile === 'men' && menProfileData.name}

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

              <div className="flex flex-col gap-2">

                <div className="flex items-center gap-3">

                  {profiles.women &&
                    <div
                      className={`${selectedProfile === 'women' ? "w-24 h-24" : "w-16 h-16"}
                     rounded-full overflow-hidden border-4 border-blue-400 shadow-md transition-all duration-300 transform hover:scale-105`}                  >
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
                  }

                  {profiles.child &&
                    <div
                      className={`${selectedProfile === 'child' ? "w-24 h-24" : "w-16 h-16"}
                     rounded-full overflow-hidden border-4 border-blue-400 shadow-md transition-all duration-300 transform hover:scale-105`}                  >
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
                  }


                  {profiles.men &&
                    <div
                      className={`${selectedProfile === 'men' ? "w-24 h-24" : "w-16 h-16"}
                     rounded-full overflow-hidden border-4 border-blue-400 shadow-md transition-all duration-300 transform hover:scale-105`}                  >
                      <img
                        onClick={() => {
                          setSelectedProfile("men");
                          getProfileCompletion(menProfileData);
                          store.setData({
                            current: "men",
                            completingPercentage: getProfileCompletion(menProfileData),
                            name: menProfileData.name,
                          });
                        }}
                        alt="Men Profile"
                        src={menDP}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                  }

                </div>

                <label className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white text-center text-sm font-semibold py-1 px-3 rounded shadow-md transition duration-200">
                  Change Photo
                  <input
                    type="file"
                    accept="image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);

                        if (selectedProfile === 'women') {
                          setWomenDP(imageUrl);
                          setLocalMotherDP(file)
                        }
                        if (selectedProfile === 'child') {
                          setChildDP(imageUrl);
                          setLocalChildDP(file)
                        }
                        if (selectedProfile === 'men') {
                          setMenDP(imageUrl);
                          setLocalMenDP(file)
                        }
                      }
                    }}
                  />
                </label>

              </div>


            </div>

          </div>



          {selectedProfile === 'women' &&
            <form >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Country
                  </label>
                  <SearchableSelect
                    name="country"
                    placeHolder="* Country"
                    key1="name"
                    key2="code"
                    defaultValue={womenProfileData.country}
                    options={allCountries}
                    onChnageType="true"
                    setValue={handleWomenProfileChange}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * City
                  </label>
                  <SearchableSelect
                    name="city"
                    placeHolder="* City"
                    defaultValue={womenProfileData.city}
                    options={allCities}
                    onChnageType="true"
                    setValue={handleWomenProfileChange}
                  />
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

          {selectedProfile === 'men' &&
            <form >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Country
                  </label>
                  <select
                    name="country"
                    value={menProfileData.country}
                    defaultValue=""
                    onChange={handleMenProfileChange}
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
                  <select name="city" value={menProfileData.city} onChange={handleMenProfileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required >
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
                  <select name="language" value={menProfileData.language} onChange={handleMenProfileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required >
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


                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Life Stage
                  </label>
                  <select name="language" value={menProfileData.language} onChange={handleMenProfileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required >
                    <option value="" hidden selected>
                      * Select Life Stage
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
                      value={menProfileData.dob}
                      onChange={(e) => handleMenProfileChange(e)}
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
                      value={menProfileData.life_stage}
                      onChange={(e) => handleMenProfileChange(e)}
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


                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Weight
                  </label>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="number"
                      name="weight"
                      className="flex-grow p-3 outline-none rounded-md"
                      value={menProfileData.weight}
                      onChange={(e) => handleMenProfileChange(e)}
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
                      value={menProfileData.height}
                      onChange={(e) => handleMenProfileChange(e)}
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
                    value={menProfileData.occupation}
                    onChange={handleMenProfileChange}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-500 mb-1">
                    * Lifestyle
                  </label>
                  <select name="life_style" value={menProfileData.life_style} className="w-full border p-2 rounded border rounded-md" onChange={(e) => handleMenProfileChange(e)} required>
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
                <div className="relative" ref={menGoalDropdownRef}>
                  <label className="block text-sm text-gray-500 mb-1">
                    * Goal is to work on
                  </label>
                  <div>
                    <div
                      className="border rounded p-2 bg-white  min-h-10 cursor-pointer"
                      onClick={toggleMenGoalDropdown}
                    >
                      {selectedMenGoalOptions.length === 0 ? (
                        <span className="text-gray-500">
                          * Goal is to work on
                        </span>
                      ) : (
                        selectedMenGoalOptions.map((option) => (
                          <div
                            key={option}
                            className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                          >
                            <span>{option}</span>
                          </div>
                        ))
                      )}
                    </div>

                    {isMenGoalOpen && (
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
                              onClick={() => toggleMenGoalOption(option)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedMenGoalOptions.some((item) => item === option)}
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

                    <select name="tone_prefrence" value={menProfileData.tone_prefrence} onChange={(e) => handleMenProfileChange(e)} className="w-full border p-2 rounded" required>
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
            </form>
          }





        </div>
      </Modal>
    </div>
  );
};

export default ProfileUi;
