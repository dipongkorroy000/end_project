import { FaUserCircle, FaEnvelope, FaIdBadge, FaUserTag } from "react-icons/fa";

function Profile() {
  const {
    name = "John Doe",
    email = "john@example.com",
    image = "",
    role = "Buyer",
    phone = "+880123456789",
    joinedDate = "2025-07-10",
  } = {};

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn mt-10">
      <div className="flex items-center space-x-4">
        <img
          src={image || "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg"}
          alt="User"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-sm"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{name}</h2>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <FaUserTag /> {role}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-500" /> {email}
        </p>
        <p className="flex items-center gap-2">
          <FaIdBadge className="text-blue-500" /> {phone}
        </p>
        <p className="flex items-center gap-2">
          <FaUserCircle className="text-blue-500" /> Joined: {joinedDate}
        </p>
      </div>
    </div>
  );
}

export default Profile;
