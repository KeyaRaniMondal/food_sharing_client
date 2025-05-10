import React, { useContext } from "react";
import { UserPlus, Star, Trophy, Zap } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { AuthContext } from "../providers/authProviders";

const Profile=()=>{
    const{user}=useContext(AuthContext)
  return (
    <div className=" mt-52">
      <div className="bg-[#dddcdc] rounded-2xl shadow-xl p-4 max-w-md mx-auto -mt-16">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-white -mt-12 shadow-md"
          />
          <h2 className="text-xl font-semibold mt-2">{user.displayName}</h2>
          <p className="text-sm text-gray-500">lucasbennett@gmail.com</p>
          <div className="flex gap-6 mt-4">
            <div className="text-center">
              <p className="font-semibold text-lg">1.5K</p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">0</p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
          </div>
          <button variant="outline" className="mt-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Friends
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Star className="text-yellow-400 mb-2" />
              <p className="font-semibold">51</p>
              <p className="text-sm text-gray-500">Balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Trophy className="text-yellow-500 mb-2" />
              <p className="font-semibold">1</p>
              <p className="text-sm text-gray-500">Level</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <p className="font-semibold text-pink-500 mb-2">Barefoot</p>
              <p className="text-sm text-gray-500">Current League</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Zap className="text-yellow-500 mb-2" />
              <p className="font-semibold">30</p>
              <p className="text-sm text-gray-500">Total XP</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

}
export default Profile