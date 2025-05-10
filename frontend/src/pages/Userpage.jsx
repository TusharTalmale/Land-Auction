import { useContext, useState, useEffect ,useRef } from "react";
import { UserContext } from "../contexts/UserContext";

// Custom SVG Icons (Keep these as they are)
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

// Spinner SVG for loading indicator
const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2.03-2.647z"></path>
    </svg>
);


export const UserProfilePage = () => {
    // Destructure new states: updating and updateError
    const { currentUser, updateUser, loading, error, updating, updateError, setUpdateError } = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);
   
       // State for image upload process
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);


    // Ref to track if the component is mounted (for async operations)
    const isMounted = useRef(true);
    const [formData, setFormData] = useState({
        // Initialize with structure matching backend User entity fields for profile update
        fullName: '',
        username: '', // Although username might not be updatable via this form, keep it for display
        email: '', // Although email might not be updatable via this form, keep it for display
        phone: '',
        gender: '',
        age: '',
        occupation: '',
        maritalStatus: '',
        fatherName: '',
        motherName: '',
        // Address fields now directly in formData to match backend User entity
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        bio: '',
        // profileImageUrl is the field the backend expects for the image location
        profileImageUrl: '' // Initialize with empty string
    });

    // Local state for image preview ONLY - not sent directly to backend in this form
    const [profileImagePreview, setProfileImagePreview] = useState('');

    // Effect to initialize form data when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setFormData({
                // Map currentUser fields to formData
                fullName: currentUser.fullName || '',
                username: currentUser.username || '', // Display username
                email: currentUser.email || '',     // Display email
                phone: currentUser.phone || '',
                gender: currentUser.gender || '',
                age: currentUser.age || '',
                occupation: currentUser.occupation || '',
                maritalStatus: currentUser.maritalStatus || '',
                fatherName: currentUser.fatherName || '',
                motherName: currentUser.motherName || '',
                // Map address fields from currentUser directly
                street: currentUser.street || '',
                city: currentUser.city || '',
                state: currentUser.state || '',
                postalCode: currentUser.postalCode || '',
                country: currentUser.country || '',
                bio: currentUser.bio || '',
                // Initialize profileImageUrl from currentUser
                profileImageUrl: currentUser.profileImageUrl || ''
            });
            // Set the preview state from the fetched profileImageUrl
            setProfileImagePreview(currentUser.profileImageUrl || '');
        }
    }, [currentUser]); // Rerun when currentUser changes

  
    // Generic handler for most form fields


    useEffect(() => {
        return () => {
            isMounted.current = false; // Set ref to false when component unmounts
        };
    }, []);

 // --- Reintegrated Image Upload Handler ---
//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];
//         setImageUploadError(null); // Clear previous errors

//         if (file) {
//             // Basic file validation (optional but recommended)
//             const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
//             const maxSize = 5 * 1024 * 1024; // 5MB

//             if (!validImageTypes.includes(file.type)) {
//                 setImageUploadError('Invalid file type. Please select a JPG, PNG, or GIF image.');
//                 return;
//             }

//             if (file.size > maxSize) {
//                 setImageUploadError(`File size exceeds the limit (${maxSize / 1024 / 1024}MB).`);
//                 return;
//             }

//             // Set immediate client-side preview using FileReader
//             const reader = new FileReader();
//             reader.onload = () => {
//                 if (isMounted.current) { // Check if mounted before updating state
//                     setProfileImagePreview(reader.result); // Show client-side preview immediately
//                 }
//             };
//             reader.readAsDataURL(file);

//             setIsUploadingImage(true); // Indicate that upload is in progress

//             const formDataForUpload = new FormData();
//             formDataForUpload.append('image', file); // 'image' should match the field name your backend expects


//             try {
    
//                 // --- API Call to upload image ---
//                 const response = await fetch('/api/profile/image', { // Verify this endpoint
//                     method: 'POST', // Typically POST for file uploads
//                     // Do NOT set Content-Type header when using FormData, the browser does it correctly
//                     body: formDataForUpload,
//                     // Add headers like Authorization if needed
//                     headers: {
//                         // Add your authorization header here if required
//                         // e.g., 'Authorization': `Bearer ${yourAuthToken}`
//                     },
//                 });

//                 // Check if component is still mounted before processing response
//                 if (!isMounted.current) {
//                     console.log("Component unmounted, ignoring image upload response.");
//                     return; // Do not proceed if component is unmounted
//                 }


//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.error || `Failed to upload image: ${response.statusText}`);
//                 }

//                 const result = await response.json();
//                 const uploadedImageUrl = result.imageUrl; // Ensure your backend sends back the URL in a field like 'imageUrl'

//                 // Update states on successful upload
//                 if (isMounted.current) {
//                     console.log("Image uploaded successfully, backend URL:", uploadedImageUrl);
//                     // Update the preview to the new backend URL (more reliable)
//                     setProfileImagePreview(uploadedImageUrl);
//                     // Update formData so the new URL is sent with the next profile update
//                     setFormData(prev => ({ ...prev, profileImageUrl: uploadedImageUrl }));
//                     setImageUploadError(null); // Clear any lingering errors
//                 }


//             } catch (error) {
//                 console.error("Image upload failed:", error);
//                 // Set the upload error state
//                 if (isMounted.current) {
//                     setImageUploadError(error.message || 'An error occurred during image upload.');
//                     // Revert preview to old image or placeholder on error? Depends on desired UX.
//                     // setProfileImagePreview(currentUser?.profileImageUrl || ''); // Option to revert
//                 }
//             } finally {
//                 // Set uploading state back to false
//                 if (isMounted.current) {
//                     setIsUploadingImage(false);
//                 }
//             }
//         }
//     };
const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageUploadError(null);

    if (!file) return;

    // Basic validation
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!validImageTypes.includes(file.type)) {
        setImageUploadError('Invalid file type. Please select a JPG, PNG, or GIF image.');
        return;
    }

    if (file.size > maxSizeBytes) {
        setImageUploadError(`File size exceeds ${maxSizeMB}MB limit.`);
        return;
    }

    try {
        // Create preview before compression
        const previewURL = URL.createObjectURL(file);
        setProfileImagePreview(previewURL);

        // Start compression process
        setIsUploadingImage(true);
        
        // Use canvas for compression
        const compressedBlob = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions (max 2500x1500)
                    const maxWidth = 2500;
                    const maxHeight = 1500;
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(
                            maxWidth / width,
                            maxHeight / height
                        );
                        width = width * ratio;
                        height = height * ratio;
                    }

                    // Set canvas dimensions
                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        blob => resolve(blob),
                        'image/jpeg',
                        0.7 // 70% quality
                    );
                    
                    URL.revokeObjectURL(img.src);
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = error => reject(error);
        });

        // Upload compressed image
        const formDataForUpload = new FormData();
        formDataForUpload.append('image', compressedBlob, 'profile.jpg');

        const response = await fetch('/api/profile/image', {
            method: 'POST',
            body: formDataForUpload
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Image upload failed');
        }

        const result = await response.json();
        setFormData(prev => ({ 
            ...prev, 
            profileImageUrl: result.imageUrl 
        }));
        
    } catch (error) {
        console.error("Image processing failed:", error);
        setImageUploadError(error.message || 'Failed to process image');
        setProfileImagePreview(currentUser?.profileImageUrl || '');
    } finally {
        setIsUploadingImage(false);
    }
};

// Helper function to convert data URL to Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

     // Handler for address fields (now flattened in formData)
     // We can simplify this to just use handleChange if address fields are direct properties of User
     // If you prefer the nested structure in frontend state, you would keep this:
    const handleAddressChange = (e) => {
       const { name, value } = e.target;
       setFormData(prev => ({
         ...prev,
         // Assuming address fields are direct properties on the backend User entity for PUT /profile
         [name]: value // Update the direct property in formData
         /*
         // Keep this if address is still a nested object in frontend state and you handle mapping before sending
         address: {
           ...prev.address,
           [name]: value
         }
         */
       }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Do not proceed if already updating or if there's no current user
   // Do not proceed if already updating profile, uploading image, or if there's no current user
        if (updating || isUploadingImage || !currentUser) {
            console.log("Submission blocked: updating:", updating, "isUploadingImage:", isUploadingImage, "currentUser:", !!currentUser);
            return;
        }

        try {
            // Call the updateUser function from context
            // Send formData. Note: This assumes profileImageUrl is included in formData
            // If you implement image upload separately, you'd handle that here or in updateUser.
            // For now, we assume formData contains the string profileImageUrl.
            setUpdateError(null);
            await updateUser(formData);

            // If update is successful, exit editing mode
            setIsEditing(false);

            // Clear any previous update errors on success
            // setUpdateError(null);

        } catch (error) {
            // Error is already set in context, you can optionally log or show a local message
            console.error("Profile update failed in component:", error);
            // The updateError state from context can be displayed in the UI
        }
    };

    // Show loading or error from the initial fetch
    if (loading) {
        return <div className="text-center py-10 text-gray-600">Loading profile...</div>;
    }

    if (error) {
         return <div className="text-center py-10 text-red-600">Error loading profile: {error}</div>;
    }

    // Render nothing or redirect if no currentUser is found after loading
    if (!currentUser && !loading) {
         // You might want to redirect to a login page here
         return <div className="text-center py-10 text-yellow-600">Please log in to view your profile.</div>;
    }


    return (
        // Added background style for the whole div
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
  <div className="p-6 rounded-2xl shadow-sm text-center">
    {/* Profile Image Container */}
    <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 mb-4 overflow-hidden">
      {/* Profile Image Display */}
      {profileImagePreview ? (
        <img
          src={`http://localhost:4000${profileImagePreview}`}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            setProfileImagePreview(''); // Clear preview if image fails to load
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <ProfileIcon className="w-16 h-16 text-blue-400" />
        </div>
      )}

      {/* Edit Button (only visible in edit mode) */}
      {isEditing && (
        <label
          className={`absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer border border-gray-200 transition-all flex items-center justify-center
            ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          htmlFor="profile-image-upload"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploadingImage}
            id="profile-image-upload"
          />
          {isUploadingImage ? (
            <SpinnerIcon />
          ) : (
            <EditIcon className="w-5 h-5 text-gray-700" />
          )}
        </label>
      )}
    </div>

    {/* User Info */}
    <div className="">
      <h1 className="text-xl font-semibold text-yellow-700 mb-1">
        {formData.fullName || currentUser?.fullName || 'N/A'}
      </h1>
      <p className="text-sm text-gray-500">
        @ {formData.username || currentUser?.username || 'N/A'}
      </p>
    </div>

    {/* Error Message */}
    {imageUploadError && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 text-sm" role="alert">
        {imageUploadError}
      </div>
    )}
  </div>
</div>                  {/* Main Content */}
                    <div className="flex-1">
                         {/* Header and Edit/Save Buttons */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-light text-gray-800">Profile Settings</h2>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                             setIsEditing(false);
                                             // Optionally reset formData and preview on cancel
                                             if(currentUser){
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
                                                    street: currentUser.street || '',
                                                    city: currentUser.city || '',
                                                    state: currentUser.state || '',
                                                    postalCode: currentUser.postalCode || '',
                                                    country: currentUser.country || '',
                                                    bio: currentUser.bio || '',
                                                    profileImageUrl: currentUser.profileImageUrl || ''
                                                });
                                                setProfileImagePreview(currentUser.profileImageUrl || '');
                                             }
                                            setUpdateError(null); // Clear update error on cancel
                                            setImageUploadError(null); // Clear update error on cancel
                                        }}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                                        disabled={updating || isUploadingImage} // Disable while updating or image uploading
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={updating} // Disable while updating is in progress
                                    >
                                         {(updating || isUploadingImage) ? 'Saving...' : 'Save Changes'} {/* Button text indicates loading */}
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

                        {/* Display Update Error Message */}
                        {updateError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{updateError}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg onClick={() => setUpdateError(null)} className="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.03a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15L5.652 6.85a1.2 1.2 0 1 1 1.697-1.697l2.757 3.153L13.651 5.15a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.15 2.758 3.152a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                </span>
                            </div>
                        )}


                        {/* Profile Sections */}
                        <div className="space-y-5">
                            {/* Personal Info Card */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Note: Username and Email fields are often not updatable via this form.
                                               Keep them as read-only if that's the case. */}
                                    <Field label="Full Name" value={formData.fullName} isEditing={isEditing} name="fullName" onChange={handleChange} />
                                    <Field label="Username" value={formData.username} isEditing={false} /> {/* Assuming Username is not editable */}
                                    <Field label="Email" value={formData.email} isEditing={false} />       {/* Assuming Email is not editable */}
                                    <Field label="Phone" value={formData.phone} isEditing={isEditing} name="phone" onChange={handleChange} />
                                    <Field label="Age" value={formData.age} isEditing={isEditing} name="age" onChange={handleChange} type="number" /> {/* Use type="number" for age */}
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
                                {/* Address fields are now direct properties on User, so use handleChange */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Field label="Father's Name" value={formData.fatherName} isEditing={isEditing} name="fatherName" onChange={handleChange} />
                                        <Field label="Mother's Name" value={formData.motherName} isEditing={isEditing} name="motherName" onChange={handleChange} />
                                    </div>
                                    {/* Use handleChange directly for flattened address fields */}
                                    <Field label="Street Address" value={formData.street} isEditing={isEditing} name="street" onChange={handleChange} />
                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Field label="City" value={formData.city} isEditing={isEditing} name="city" onChange={handleChange} />
                                        <Field label="State / Province" value={formData.state} isEditing={isEditing} name="state" onChange={handleChange} />
                                        <Field label="Postal Code" value={formData.postalCode} isEditing={isEditing} name="postalCode" onChange={handleChange} />
                                     </div>
                                    <Field label="Country" value={formData.country} isEditing={isEditing} name="country" onChange={handleChange} />
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

const Field = ({ label, value, isEditing, name, onChange, as = 'input', children, ...props }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
        {isEditing ? (
            as === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-300 outline-none" // Added focus styles
                    {...props}
                >
                    {children}
                </select>
            ) : (
                <input
                    type="text" // Default type is text, can be overridden by props (e.g., type="number")
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-300 outline-none" // Added focus styles
                    {...props}
                />
            )
        ) : (
            <div className="text-sm text-gray-700 py-2 break-words">{value || 'Not provided'}</div> // Added break-words
        )}
    </div>
);