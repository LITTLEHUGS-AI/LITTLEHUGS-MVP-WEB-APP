


const AddChildProfile = () => {


    return (<div>
        {true && <div className="">
            <h2 className="font-bold text-center">Child's Profile</h2>
            {/* Profile */}
            <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                <label htmlFor="childDPInput">
                    <img
                        // src={childDP}
                        alt="Profile"
                        className="w-full h-full object-cover cursor-pointer"
                    />
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="childDPInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            // const imageUrl = URL.createObjectURL(file);
                            // setChildDP(imageUrl);
                        }
                    }}
                />
            </div>

            {/* Form Fields */}
            <form  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <input
                        name="name"
                        type="text"
                        placeholder="* Child's Name"
                        className="border p-2 rounded"
                        required
                    />
                    <div className="relative">
                        <input
                            name="dob"
                            type="date"
                            placeholder="Date Of Birth"
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="* Weight"
                            className="border p-2 rounded w-full pr-10"
                            name="weight"
                            required
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">
                            kg
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="* Height"
                            className="border p-2 rounded w-full pr-10"
                            name="height"
                            required
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">
                            cm
                        </span>
                    </div>

                    <select
                        name="ageGroup"
                        className="border p-2 rounded"
                        required
                    >
                        <option value="" hidden selected>
                            * Age Group
                        </option>
                        <option>0-2 years</option>
                        <option>3-5 years</option>
                        <option>6-12 years</option>
                    </select>


                </div>
            </form>
        </div>}
    </div>);
}

export default AddChildProfile;