import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

// Custom SVG Icons
const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M20 22C20 18.134 16.4183 15 12 15C7.58172 15 4 18.134 4 22" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UserProfilePage = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    occupation: '',
    maritalStatus: '',
    fatherName: '',
    motherName: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    bio: ''
  });
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        gender: currentUser.gender || '',
        age: currentUser.age || '',
        occupation: currentUser.occupation || '',
        maritalStatus: currentUser.maritalStatus || '',
        fatherName: currentUser.fatherName || '',
        motherName: currentUser.motherName || '',
        address: currentUser.address || {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        },
        bio: currentUser.bio || ''
      });
      setProfileImage(currentUser.profileImage || '');
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/images/createback.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header with Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className=" p-6 rounded-2xl shadow-sm text-center">
              <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 mb-4 overflow-hidden">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={() => setProfileImage('')}
                />
              ) : (
                <ProfileIcon className="w-16 h-16 text-blue-400" />
              )} {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer border border-gray-200 hover:bg-gray-50 transition-all">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <EditIcon className="w-5 h-5 text-gray-700" />
                </label>
              )}
              </div>
              <div className=" bg-white p-4 rounded-2xl shadow-sm text-center">
              <h1 className="text-xl font-semibold text-gray-800 mb-1">
                {formData.fullName}
              </h1>
              <p className="text-sm text-gray-500">@{formData.username}</p>
              </div>
              {/* Quick Stats */}
              {/* <div className="mt-6 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(currentUser?.createdAt).getFullYear()}
                  </p>
                </div>
               
              </div> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-gray-800">Profile Settings</h2>
              {isEditing ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Sections */}
            <div className="space-y-5">
              {/* Personal Info Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full Name" value={formData.fullName} isEditing={isEditing} name="fullName" onChange={handleChange} />
                  <Field label="Email" value={formData.email} isEditing={isEditing} name="email" onChange={handleChange} />
                  <Field label="Phone" value={formData.phone} isEditing={isEditing} name="phone" onChange={handleChange} />
                  <Field label="Age" value={formData.age} isEditing={isEditing} name="age" onChange={handleChange} />
                  <Field label="Gender" value={formData.gender} isEditing={isEditing} name="gender" onChange={handleChange} as="select">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
              </div>

              {/* Family & Address Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Family & Address</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Father's Name" value={formData.fatherName} isEditing={isEditing} name="fatherName" onChange={handleChange} />
                    <Field label="Mother's Name" value={formData.motherName} isEditing={isEditing} name="motherName" onChange={handleChange} />
                  </div>
                  <Field label="Address" value={formData.address.street} isEditing={isEditing} name="street" onChange={handleAddressChange} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="City" value={formData.address.city} isEditing={isEditing} name="city" onChange={handleAddressChange} />
                    <Field label="State" value={formData.address.state} isEditing={isEditing} name="state" onChange={handleAddressChange} />
                    <Field label="Postal Code" value={formData.address.postalCode} isEditing={isEditing} name="postalCode" onChange={handleAddressChange} />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">About Me</h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-300"
                    placeholder="Write something about yourself..."
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {formData.bio || 'No bio provided'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Field Component
const Field = ({ label, value, isEditing, name, onChange, as = 'input', children, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    {isEditing ? (
      as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          {...props}
        />
      )
    ) : (
      <div className="text-sm text-gray-700 py-2">{value || 'Not provided'}</div>
    )}
  </div>
);
