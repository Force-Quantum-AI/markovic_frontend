import { Users, UserCheck, Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function MyUsersMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div 
        style={{ height: "142px" }}
        className="relative flex w-full p-6 justify-between items-center rounded-[24px] border border-[#BEDBFF] bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
        <div className="flex flex-col justify-between h-full z-10">
          <div className="flex items-center gap-2 text-[#1447E6] font-roboto text-[14px] font-medium leading-[20px]">
            <Users className="w-[18px] h-[18px]" />
            <span>Total Users</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[#1C398E] font-roboto text-[30px] font-bold leading-[36px]">
              2,847
            </span>
            <span className="flex items-center gap-1 text-[#1447E6] font-roboto text-[14px] font-normal leading-[20px]">
              <ArrowUpRight className="w-4 h-4" />
              <span>+8.2% this month</span>
            </span>
          </div>
        </div>
        
        {/* Card Bg image graphic */}
        <Image
          src="/admin-images/my-users/avg-case.png"
          alt="Total Users Graphic"
          width={155}
          height={155}
          className="absolute -top-[58px] left-1/2 -translate-x-[15%] w-[155px] h-[155px] select-none pointer-events-none z-0 object-contain"
        />
      </div>

      {/* Card 2: Active Users */}
      <div 
        style={{ height: "142px" }}
        className="relative flex w-full p-6 justify-between items-center rounded-[24px] border border-[#A4F4CF] bg-gradient-to-br from-[#D0FAE5] to-[#ECFDF5] shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
        <div className="flex flex-col justify-between h-full z-10">
          <div className="flex items-center gap-2 text-[#007A55] font-roboto text-[14px] font-medium leading-[20px]">
            <UserCheck className="w-[18px] h-[18px]" />
            <span>Active Users</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[#004F3B] font-roboto text-[30px] font-bold leading-[36px]">
              2,642
            </span>
            <span className="flex items-center gap-1 text-[#007A55] font-roboto text-[14px] font-normal leading-[20px]">
              <ArrowUpRight className="w-4 h-4" />
              <span>92.8% active rate</span>
            </span>
          </div>
        </div>
        
        {/* Card Bg image graphic */}
        <Image
          src="/admin-images/my-users/platform.png"
          alt="Active Users Graphic"
          width={155}
          height={155}
          className="absolute -top-[58px] left-1/2 -translate-x-[15%] w-[155px] h-[155px] select-none pointer-events-none z-0 object-contain"
        />
      </div>

      {/* Card 3: New Today */}
      <div 
        style={{ height: "142px" }}
        className="relative flex w-full p-6 justify-between items-center rounded-[24px] border border-[#FEE685] bg-gradient-to-br from-[#FEF3C6] to-[#FFFBEB] shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
        <div className="flex flex-col justify-between h-full z-10">
          <div className="flex items-center gap-2 text-[#BB4D00] font-roboto text-[14px] font-medium leading-[20px]">
            <Clock className="w-[18px] h-[18px]" />
            <span>New Today</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[#7B3306] font-roboto text-[30px] font-bold leading-[36px]">
              24
            </span>
            <span className="flex items-center gap-1 text-[#BB4D00] font-roboto text-[14px] font-normal leading-[20px]">
              <ArrowUpRight className="w-4 h-4" />
              <span>+15% vs yesterday</span>
            </span>
          </div>
        </div>
        
        {/* Card Bg image graphic */}
        <Image
          src="/admin-images/my-users/response.png"
          alt="New Today Graphic"
          width={155}
          height={155}
          className="absolute -top-[58px] left-1/2 -translate-x-[15%] w-[155px] h-[155px] select-none pointer-events-none z-0 object-contain"
        />
      </div>
    </div>
  );
}
