import Image from "next/image";
import TransparentCard from "../transparent-card/page";
import Card from "../card/page";
import { HiOutlineLightBulb } from "react-icons/hi";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-[674px]">
      {/* Background Image */}
      <Image
        src="/hero-section-image.png"
        alt="MyMedicare"
        className="object-cover lg:rounded-[20px] w-full"
        fill
        quality={100}
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black lg:rounded-[20px] opacity-30 z-0"></div>

      
      {/* Navigation and Hero Content */}
      <div className="relative z-10 w-full">
        <div className="flex lg:flex-row sm:flex-col lg:p-[54px] sm:p-5">
            <div className="lg:w-[50%] lg:h-[572px] sm:w-full flex flex-col float-left">
                <div className="lg:w-[288px] lg:h-[40px] sm:w-full mb-5">
                    <TransparentCard >
                        <div className="md:p-2 sm:p-1 flex justify-center">
                            <h2 className="text-[16px]">Personalized Solution for Daily Need</h2>
                        </div>
                    </TransparentCard>
                </div>
                <h2 className="lg:font-[600] lg:text-[60px] sm:text-4xl font-bold text-white">
                    Providing Reliable <br /> and Affordable <br /> Healthcare for <br /> Africa
                </h2>
                <p className="font-[500] lg:text-[28px] sm:text-[20px] text-white my-5">Get access to certified professional <br /> healthcare providers for a <br />fraction of the cost with <br /> MyMedicare</p>
                <div className="lg:w-[231px] lg:h-[76px] sm:mt-20 lg:mt-0 bg-white rounded-[9999px] lg:p-[24px] gap-[8px] cursor-pointer">
                    <Link 
                        href={'https://play.google.com/store/apps/details?id=com.mymedicare.app'} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[400] text-[22px] lg:w-[183px] lg:h-[28px] sm:w-full flex items-center justify-center text-[#1E293B]"
                    >
                        Download the app
                    </Link>
                </div>
            </div>
            <div className="lg:w-[50%] lg:h-[399px] sm:w-full hidden lg:flex">
                <div className="lg:mt-[230px] flex flex-col float-right">
                    <div className="w-full lg:h-[88px]">
                        <div className="flex items-center gap-[8px] mb-3 w-full justify-end">
                            <div className="lg:w-[119px] lg:h-[40px]">
                                <TransparentCard>
                                    <h2 className="text-white font-bold capitalize text-center">quick access</h2>
                                </TransparentCard>
                            </div>
                            <div className="lg:w-[100px] lg:h-[40px]">
                                <TransparentCard>
                                    <h2 className="text-white font-bold capitalize text-center">health care</h2>
                                </TransparentCard>
                            </div>
                            <div className="lg:w-[99px] lg:h-[40px]">
                                <TransparentCard>
                                    <h2 className="text-white font-bold capitalize text-center">monitoring</h2>
                                </TransparentCard>
                            </div>
                        </div>
                        <div className="flex items-center gap-[8px] lg:w-[225px] lg:h-[40px] float-right">
                            <div className="lg:w-[104px] lg:h-[40px]">
                                <TransparentCard>
                                    <h2 className="text-white font-bold capitalize text-center">technology</h2>
                                </TransparentCard>
                            </div>
                            <div className="lg:w-[113px] lg:h-[40px]">
                                <TransparentCard>
                                    <h2 className="text-white font-bold capitalize text-center">support</h2>
                                </TransparentCard>
                            </div>
                        </div>
                    </div>


                    {/* insights */}
                    <div className="w-full lg:flex float-left sm:hidden lg:flex-row sm:flex-col gap-5 my-5 lg:w-[568px] lg:h-[272px]">
                        <div className="lg:w-[272px] lg:h-[272px]">
                            <Card color="white">
                                <div className="">
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="bg-[#1E293B] w-[24px] h-[24px] rounded-[5px] flex items-center justify-center p-2">
                                            <HiOutlineLightBulb size={20}/>
                                        </div>
                                        <h2 className="text-tertiary-1 font-[500] text-[16px] capitalize">insights</h2>
                                        </div>
                                        <h2 className="first-letter:capitalize font-[600] text-tertiary-1 text-[20px] mt-3">
                                        personalized care and <br /> demand
                                        </h2>
                                        <p className="first-letter:capitalize font-[400] text-[#647488]  text-[16px] mt-5 mb-3">
                                        enable remote monitoring for <br /> everyday wellness and advanced <br />health insights
                                        </p>
                                </div>
                            </Card>
                        </div>
                        <div className="lg:w-[272px] lg:h-[272px]">
                            <Card color="white" className="relative h-full rounded-[2rem] overflow-hidden">
                                <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url(/doc-re.png)" }}
                                />
                                <div className="relative z-10 p-2">
                                    <h2 className="text-[24px] font-[600] text-[#1E293B]">10+</h2>
                                    <h2 className="capitalize text-[14px] font-[500] text-[#1E293B]">doctors</h2>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
